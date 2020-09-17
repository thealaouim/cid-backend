const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { query } = require("./db");

//routes
app.get("/", (req, res) => {
  res.send("we are home");
});

//middleware
app.use(cors());
app.use(express.json());

/// routes ///
//create a project
app.post("/api/projects", async (req, res) => {
  try {
    const { project_name, city, country, project_code } = req.body;

    const currentDate = new Date();
    const newProject = await pool.query(
      "INSERT INTO projects (project_name, city, country, project_code, creation_date) Values($1, $2, $3, $4, $5) RETURNING *",
      [project_name, city, country, project_code, currentDate]
    );

    res.json(newProject.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const allProjects = await pool.query("SELECT * FROM projects");
    res.json(allProjects.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a project
app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [id]
    );
    res.json(project.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a project
app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_name,
      city,
      country,
      project_code,
      client_name,
      client_address,
      deadline,
    } = req.body;
    console.log(req.body);

    const updateProject = await pool.query(
      "UPDATE projects SET project_name= $1, city= $2, country = $3, project_code = $4, client_name = $6,  client_address = $7, deadline = $8 WHERE project_id = $5 RETURNING *",
      [
        project_name,
        city,
        country,
        project_code,
        id,
        client_name,
        client_address,
        deadline,
      ]
    );
    res.json(updateProject.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//patch a project

app.patch("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completion_date } = req.body;
    if ("completion_date" in req.body) {
      const query =
        "UPDATE projects SET completion_date= $1 WHERE project_id = $2 RETURNING *";
      const dataArr = [new Date(), id];
      const updateProject = await pool.query(query, dataArr);
      res.json(updateProject.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});
//delete a project
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await pool.query(
      "DELETE FROM projects WHERE project_id = $1",
      [id]
    );
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//how we started listening
//don't forget port from context
app.listen(5000, () => {
  console.log("server has started on port 5000");
});

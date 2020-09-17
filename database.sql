CREATE DATABASE cidappdb;

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    supervisor_id numeric,
    project_name VARCHAR(255),
    client_name VARCHAR(255),
    client_address VARCHAR(255),
    city VARCHAR(50),
    country VARCHAR(55),
    project_code VARCHAR(20) ,
    creation_date timestamp ,
    completion_date timestamp,
    deadline timestamp,
    cctp_link VARCHAR(200),
    cdp_link VARCHAR(200),
    bpu_link VARCHAR(200),


);
const { Pool, Client } = require(`pg`);
const pool = new Pool({
  user: `rarovhlw`,
  host: `tai.db.elephantsql.com`,
  database: `rarovhlw`,
  password: `QfXIYy8FsDwy_l4nVXPJCwKRWOtLKWEt`,
  port: 5432,
});
const md5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const { response } = require("express");

//GET TASKS
const getTasks = (request, response) => {
  const sessionToken = request.headers.sessiontoken;
  console.log(sessionToken);
  pool.query(
    "SELECT * FROM USERS WHERE TOKEN = $1",
    [sessionToken],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount != 0) {
        console.log("get-all-tasks");
        pool.query(`SELECT * FROM TASKS ORDER BY id ASC`, (error, result) => {
          if (error) {
            throw error;
          }
          response.status(200).json(result.rows);
        });
      } else {
        response.status(401);
      }
    }
  );
};

//CREATE TASK
const createTask = (request, response) => {
  const { task, status } = request.body.data;
  console.log(task);
  pool.query(
    `INSERT INTO TASKS (task,  status) VALUES ($1, $2) RETURNING id`,
    [task, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Task added with ID: ${result.rows[0].id}`);
    }
  );
};

//DELETE TASK
const deleteTask = (request, response) => {
  const { id } = request.body;
  console.log(id + ": deleted");
  pool.query(
    `DELETE FROM TASKS WHERE id = $1 RETURNING id`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task deleted with ID: ${request.body.id}`);
    }
  );
};

//UPDATE TASK
const updateTask = (request, response) => {
  const { id, task } = request.body.data;
  console.log(id + ": " + task);
  pool.query(
    `UPDATE TASKS SET task = $2 WHERE id = $1`,
    [id, task],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task text modified with ID: ${id}`);
    }
  );
};

//UPDATE STATUS
const updateStatus = (request, response) => {
  const { id, status } = request.body.data;
  console.log(id + ": " + status);
  pool.query(
    `UPDATE TASKS SET status = $2 WHERE id = $1`,
    [id, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task text modified `);
    }
  );
};

//GET USER
const getUser = (request, response) => {
  const { name } = request.body.data;
  console.log(name);
  pool.query("SELECT * FROM USERS WHERE NAME=$1", [name], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rowCount);
  });
};

//CREATE USER
const createUser = (request, response) => {
  const { name, pass } = request.body.data;
  console.log(name + " " + pass);
  const hashed = md5(pass).toString();
  pool.query(
    `INSERT INTO USERS (name,  pass) VALUES ($1, $2) RETURNING id`,
    [name, hashed],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: `);
    }
  );
};

const login = (request, response) => {
  const { name, pass } = request.body.data;
  console.log(request.body.data);
  const hashed = md5(pass).toString();
  pool.query(
    `SELECT * FROM USERS WHERE name=$1 AND pass=$2`,
    [name, hashed],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        console.log(result.rowCount)
        if (result.rowCount) {
          const token = jwt.sign(
            {
              name: result.rows[0].name,
              pass: result.rows[0].pass,
            },
            "secret"
          );
          pool.query(
            `UPDATE USERS SET token = $1 WHERE id = $2`,
            [token, result.rows[0].id],
            (error, result) => {
              if (error) {
                throw error;
              }
              response.status(201).send(token);
            }
          );
        } else {
          response.status(401).send(result.rowCount);
        }
      }
    }
  );
};

module.exports = {
  getUser,
  createUser,
  login,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  updateStatus,
};

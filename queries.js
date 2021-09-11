const { Pool, Client } = require(`pg`);
const pool = new Pool({
  user: `rarovhlw`,
  host: `tai.db.elephantsql.com`,
  database: `rarovhlw`,
  password: `QfXIYy8FsDwy_l4nVXPJCwKRWOtLKWEt`,
  port: 5432,
});

//GET TASKS
const getTasks = (request, response) => {
  pool.query(`SELECT * FROM TASKS ORDER BY id ASC`, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

//CREATE TASK
const createTask = (request, response) => {
  const { task, status, owner } = request.body.data;
  console.log(request.body.data);
  pool.query(
    `INSERT INTO TASKS (task,  status, owner) VALUES ($1, $2, $3) RETURNING id`,
    [task, status, owner],
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
  console.log(id + ": " + task)
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
  console.log(id + ": " + status)
  pool.query(
    `UPDATE TASKS SET status = $2 WHERE id = $1`,
    [id, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task text modified with ID: ${id}`);
    }
  );
};

//GET USER
const getUser = (request, response) => {
  const userName = parseInt(request.params.userName);

  pool.query("SELECT * FROM USERS WHERE USER = $1", [userName], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//CREATE USER
const createUser = (request, response) => {
  const { userName, pass } = request.body.data;
  console.log(request.body.data);
  pool.query(
    `INSERT INTO USERS (USER,  PASS) VALUES ($1, $2) RETURNING id`,
    [userName, pass],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.rows[0].id}`);
    }
  );
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  updateStatus,
  getUser,
  createUser,
  //loginUser
};

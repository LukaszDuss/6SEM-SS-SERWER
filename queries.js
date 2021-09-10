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
  pool.query(`SELECT * FROM KANBAN ORDER BY id ASC`, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

//CREATE TASK
const createTask = (request, response) => {
  const { task, due, priority, status } = request.body;
  pool.query(
    `INSERT INTO KANBAN (task,due,priority,status) VALUES ($1, $2, $3, $4) RETURNING id`,
    [task, due, priority, status],
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
  pool.query(
    `DELETE FROM KANBAN WHERE id = ${request.body.id} RETURNING id`,
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
  const { id, task } = request.body;
  pool.query(
    `UPDATE KANBAN SET task = $2 WHERE id = $1 `,
    [id, task],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task text modified with ID: ${id}`);
    }
  );
};

//UPDATE DUE
const updateDue = (request, response) => {
  const { id, due } = request.body;
  pool.query(
    `UPDATE KANBAN SET due = $2 WHERE id = $1 `,
    [id, due],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task due modified with ID: ${id}`);
    }
  );
};

//UPDATE PRIORITY
const updatePriority = (request, response) => {
  const { id, priority } = request.body;
  pool.query(
    `UPDATE KANBAN SET priority = $2 WHERE id = $1 `,
    [id, priority],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task priority modified with ID: ${id}`);
    }
  );
};

//UPDATE STATUS
const updateStatus = (request, response) => {
  const { id, status } = request.body;
  pool.query(
    `UPDATE KANBAN SET status = $2 WHERE id = $1 `,
    [id, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task status modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  updateDue,
  updatePriority,
  updateStatus,
};

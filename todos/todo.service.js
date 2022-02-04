const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

//
// CRUD APIs
//
async function getById(id) {
  return await getTodo(id);
}

async function getAll() {
  return await db.Todo.findAll();
}

async function create(params) {
  if (await db.Todo.findOne({ where: { name: params.name } })) {
    throw 'To_Do "' + params.name + '" is already existed';
  }
  const todo = new db.Todo(params);
  await todo.save();
}

async function update(id, params) {
  const todo = await getTodo(id);

  const nameChanged = params.name && todo.name !== params.name;
  if (nameChanged && await db.Todo.findOne({ where: { name: params.name } })) {
      throw 'To_Do "' + params.name + '" is already existed';
  }

  Object.assign(todo, params);
  await todo.save();
}

async function _delete(id) {
  const todo = await getTodo(id);
  await todo.destroy();
}

//
// non export functions
//
async function getTodo(id) {
  const todo = await db.Todo.findByPk(id);
  if (!todo) throw 'To_Do not found';
  return todo;
}

module.exports = {   
  getById,
  getAll,
  create,
  update,
  delete: _delete
};

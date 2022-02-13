const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

//
// CRUD APIs
//

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

async function getById(id) {
  return await getUser(id);
}

async function getAll() {
  return await db.User.findAll();
}

async function create(params) {
    
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is not available';
  }
  const user = new db.User(params);
  user.passwordHash = await bcrypt.hash(params.password, 10);
  await user.save();
  
  
}

async function update(id, params) {
  const user = await getUser(id);

  const emailChanged = params.email && user.email !== params.email;
  if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
      throw 'Email "' + params.email + '" is not available';
  }

  if (params.password) {
      params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await user.save();
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

//
// non export functions
//


module.exports = {   
  getById,
  getAll,
  create,
  update,
  delete: _delete
};

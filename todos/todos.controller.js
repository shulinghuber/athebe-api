const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const todoService = require('./todo.service');
const Role = require('../_helpers/role');

//
// routes
//
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

//
// route functions
//
function getById(req, res, next) {
  todoService.getById(req.params.id)
    .then(todo => res.json(todo))
    .catch(next);
}

function getAll(req, res, next) {
  todoService.getAll()
    .then(todos => res.json(todos))
    .catch(next);
}

function create(req, res, next) {
  todoService.create(req.body)
    .then(() => res.json({ message: 'todo created!' }))
    .catch(next);
}

function update(req, res, next) {
  todoService.update(req.params.id, req.body)
    .then(() => res.json({ message: 'todo updated!' }))
    .catch(next);
}

function _delete(req, res, next) {
  todoService.delete(req.params.id)
    .then(() => res.json({ message: 'todo deleted!' }))
    .catch(next);
}
//
// schema functions
//
function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(''),
    status: Joi.string().empty(''),
  });
  validateRequest(req, next, schema);
}

module.exports = router;

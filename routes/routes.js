const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.route('/')
  .get(controller.getAllContacts)
  .post(controller.createContact);

router.route('/:id')
  .get(controller.getContactById)
  .put(controller.updateContact)
  .delete(controller.deleteContact);

module.exports = router;

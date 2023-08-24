const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // Apply validateToken middleware to protect routes

router.route('/')
  .get(controller.getAllContacts)
  .post(controller.createContact);

router.route('/:id')
  .get(controller.getContactById)
  .put(controller.updateContact)
  .delete(controller.deleteContact);

module.exports = router;

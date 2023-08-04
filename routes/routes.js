const express = require("express");
const router = express.Router();
const {getAllContacts} = require('../controllers/controller')
const {createContact} = require('../controllers/controller')
const {getContactById} = require('../controllers/controller')
const {updateContact} = require('../controllers/controller')
const {deleteContact} = require('../controllers/controller')


router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;
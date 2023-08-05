const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel');

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (!name || !email || !phone) {
      res.status(400).json({ error: 'All fields are mandatory' });
    } else {
      const newContact = await Contact.createContact(name, email, phone);
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.getContactById(id);
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await Contact.updateContact(id, name, email, phone);
    if (!updatedContact) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.deleteContact(id);
    if (!deletedContact) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.status(200).json({ message: 'Contact deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};

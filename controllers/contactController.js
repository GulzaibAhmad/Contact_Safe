const contactModel = require('../model/contactModel');

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await contactModel.createContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactModel.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const contact = await contactModel.updateContact(id, name, email, phone);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactModel.deleteContact(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};

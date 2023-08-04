const asyncHandler = require('express-async-handler')

const getAllContacts = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'Get all contacted'});
})

const createContact = asyncHandler(async(req, res)=>{
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ('All Fields are mandatory')
    }else(
        console.log("This is request body",req.body)
    )
    res.status(200).json(req.body);
})

const getContactById = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Get contact for ${req.params.id}`});
})

const updateContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message: `Update contact for ${req.params.id}`});
})

const deleteContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message: `Delete contact for ${req.params.id}`});
})

module.exports = {getAllContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact
};
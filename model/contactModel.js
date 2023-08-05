const { Client } = require("pg");

const contactSchema = new Client({
    name:{
        type : String,
        required: [true,'Please add contact name']
    },
    email:{
        type : String,
        required: [true,'Please add contact email']
    },
    phone:{
        type : Number,
        required: [true,'Please add contact phone']
    },
},{
    timestamps: true,
}
)

module.exports = Client("contact",contactSchema);

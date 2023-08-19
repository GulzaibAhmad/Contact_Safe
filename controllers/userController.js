const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel");


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }
    const userAvailable = await userModel.getUserByEmail(email);
    if (userAvailable) {
      return res.status(400).json({ error: "User with this email is already registered." });
    }

    //cody AI give me code for hash password
    const passwordString = password.toString();
    const hashedPassword = await bcrypt.hash(passwordString, 10);
    console.log(`Hashed Password ${hashedPassword}`);
    const user = await userModel.createUser(username, email, hashedPassword);
    if(user){
      res.status(201).json({ id: user.id, username: user.username });
    }else{
      res.status(400);
      throw new Error ("User data isn't valid")
    }

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body
    if(!email || !password){
      res.status(400);
      throw new Error ("All fields are mandatory!")
    }

    // compare fields
    const user =  await userModel.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign(
        {
          user:{
            username : user.username,
            email: user.email,
            id: user.id
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
      )
      res.status(200).json( {accessToken} )
    }else{
    res.status(401);
    throw new Error ("Email or password isn't valid!")
  }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

const currentUser = async (req, res) => {
  try {
    // Implement your current user logic here
    // Fetch user details from authentication data, database, etc.
    res.json({ message: "Current user details." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};

const asyncHandler = require("express-async-handler")
const User =  require("../models/userModel")
const generateToken = require("../config/generateToken")
const {hashPassword, comparePasswords} = require("../config/hashComparePassword")

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("All fields not available")
    }

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
    })

    if(user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user)
        })
    }else {
        res.status(400)
        throw new Error("Failed to create user")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && await comparePasswords(password, user.password)){
        res.status(201).json({
            name: user.name,
            id: user._id,
            email: user.email,
            token: generateToken(user)
        })
    }else {
        res.status(400)
        throw new Error("User not authenticated")
    }
})

const allPosts = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const userWithPosts = await User.findById(userId).populate('posts');
        if (!userWithPosts) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ user: userWithPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
})

module.exports = {registerUser, authUser, allPosts}
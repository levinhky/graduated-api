const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');

const authController = {

    // REGISTER USER
    registerUser: async (req,res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await userSchema({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    //LOGIN USER
    loginUser: async (req,res) => {
        try {
            const user = await userSchema.findOne({username: req.body.username});
            if (!user) {
               return res.status(404).json('Tài khoản không chính xác');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                return res.status(404).json('Mật khẩu không chính xác');
            }

            if (user && validPassword) {
                return res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET ALL USER
    getAllUsers: async (req,res) => {
        try {
            const user = await userSchema.find();
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // DELETE USER
    deleteUser: async (req,res) => {
        try {
            const user = await userSchema.findByIdAndDelete(req.params.id);
            return res.status(200).json('Delete successfully!');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = authController
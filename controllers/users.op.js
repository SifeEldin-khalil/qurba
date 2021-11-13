const Responser  = require('../helpers/responser')
const mongoose   = require("mongoose");
const User       = require('../models/user')
const validate   = require('../helpers/validate');
const _          = require("lodash");
const chalk      = require('chalk');


// Users Functions====================
const createUser = async (req, res) => {
    let data = req.body;
    let error = validate({...data}, [
        { path: 'fullname', model: 'fullname', required: true},
        { path: 'phone', model: 'phone', required: false},
        { path: 'email', model: 'email', required: false},
        { path: 'country', model: 'country', required: false},
    ]);
    if (error) return(new Responser(res).error("Validation error").setData(error).send())
    
    try {
        const newUser = new User({...data});
        let user = await newUser.save();
        
        return(new Responser(res).success('User created').setData({user}).send())
    } catch (error) {
        console.log(chalk.red("Error creating user"))
        console.log(error)
        return(new Responser(res).error("Error creating user").setData(error).send())
    }
}

const updateUser = async (req, res) => {
    let userId = req.body._id;
    let updates = req.body.updates;

    let error = validate({userId, ...updates}, [
        { path: 'userId', model: '_id', required: true},
        { path: 'fullname', model: 'fullname', required: false},
        { path: 'phone', model: 'phone', required: false},
        { path: 'email', model: 'email', required: false},
        { path: 'country', model: 'country', required: false},
    ]);
    if (error) return(new Responser(res).error("Validation error").setData(error).send())

    try {
        let existUser = await User.findById(userId);
        if(!existUser) return(new Responser(res).error("User not found").send())

        let pathsToUpdate = Object.keys(updates);
        pathsToUpdate.forEach((e) => {
            const newValue = _.get(updates, e);
            _.set(existUser, e, newValue);
        });

        let updatedUser = await User.findByIdAndUpdate(userId, { $set: existUser }, { new: true })
        if(!updatedUser) return(new Responser(res).error("User updating faild").send())

        return(new Responser(res).success('User updated').setData({updatedUser}).send())

    } catch (error) {
        console.log(chalk.red("Error updating user"))
        console.log(error)
        return(new Responser(res).error("Error updating user").setData(error).send())
    }
}

const getUser = async (req, res) => {
    let data = req.params;

    let error = validate({...data}, [
        { path: '_id', model: '_id', required: true},
    ]);
    if (error) return(new Responser(res).error("Validation error").setData(error).send())

    try {
        let existUser = await User.findOne({ _id: data._id, isDeleted:false });
        if(!existUser) return(new Responser(res).error("No active found").send())

        return(new Responser(res).success('User Info').setData({existUser}).send())

    } catch (error) {
        console.log(chalk.red("Error getting user"))
        console.log(error)
        return(new Responser(res).error("Error getting user").setData(error).send())
    }
}

const deleteUser = async (req, res) => {
    let data = req.params;

    let error = validate({...data}, [
        { path: '_id', model: '_id', required: true},
    ]);
    if (error) return(new Responser(res).error("Validation error").setData(error).send())

    try {
        let deletedUser = await User.findByIdAndUpdate(data._id, { isDeleted: true }, { new: true });

        if(!deletedUser) return(new Responser(res).error("User not found").send())

        return(new Responser(res).success('User deleted').setData({deletedUser}).send())

    } catch (error) {
        console.log(chalk.red("Error deleting user"))
        console.log(error)
        return(new Responser(res).error("Error deleting user").setData(error).send())
    }
}

const getUsers = async (req, res) => {    
    try {
        let users = await User.find({ isDeleted: false });

        if(users.length <= 0) return(new Responser(res).error("No Acyiive users found").setData(users).send())

        return(new Responser(res).success('Users list').setData({users}).send())

    } catch (error) {
        console.log(chalk.red("Error getting users"))
        console.log(error)
        return(new Responser(res).error("Error getting users").setData(error).send())
    }
}

const updateUserCuisines = async (req, res) => {    
    try {
        let users = await User.find({ isDeleted: false });

        if(users.length <= 0) return(new Responser(res).error("No Acyiive users found").setData(users).send())

        return(new Responser(res).success('Users list').setData({users}).send())

    } catch (error) {
        console.log(chalk.red("Error getting users"))
        console.log(error)
        return(new Responser(res).error("Error getting users").setData(error).send())
    }
}

// Expot Functions====================
module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser,
    getUsers,
    updateUserCuisines
    
}
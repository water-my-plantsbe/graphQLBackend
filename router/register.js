const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users= require('../data/userModel.js');
router.post('/', (req, res) => {
    try{
        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 3); 
        if(user.username && user.password && user.phone && user.email){
            user.password = hash;
            Users.add(user)
            .then(info => {res.status(201).json({message: "Registration Successful", info});})
        } else {
            res.status(402).json({error: 'Please provide a Username, Password, Email and Phone number'})
        }
    } catch(error) {
        res.status(500).json({ error: "Unable to Register, try again", error});
    }
});

module.exports = router;
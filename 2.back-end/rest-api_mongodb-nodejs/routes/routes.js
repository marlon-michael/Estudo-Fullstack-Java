const express = require('express')
const Model = require('../model/model.js')


const router = express.Router()

router.get('/get', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    try{
        const users = await Model.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/get/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    try{
        const user = await Model.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.post('/post', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    if (typeof(req.body)=="string") req.body = JSON.parse(req.body)
    const user = new Model({ name: req.body.name })
    try{
        const savingUser = await user.save()
        res.status(200).json(savingUser)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.patch('/patch/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    if (typeof(req.body)=="string") req.body = JSON.parse(req.body)
    try{
        const filter = {_id: req.params.id}
        const updatedUser = req.body
        const options = {new: true}
        const result = await Model.findOneAndUpdate(
            filter, updatedUser, options
        )
        res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    try{
        const user = await Model.findByIdAndDelete(req.params.id)
        res.status(200).send(`User [${user.name}] has been deleted`)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

module.exports = router
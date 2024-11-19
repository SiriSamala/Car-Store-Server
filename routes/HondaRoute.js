const express=require('express')
const router =express.Router();
const Honda=require('../models/HondaModel')
const { validateTokenAdmin } = require('../config/auth')

router.get('/count',validateTokenAdmin,async(req,res)=>{
    try{
        const count =await Honda.countDocuments()
        return res.status(200).json({count:count})
    }catch (error){
        return res.status(500).json({ message: error.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const honda = await Honda.find()
        return res.status(200).json(honda)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post('/add',validateTokenAdmin, async (req, res) => {
    try {
        
        const { name, price, img,description } = req.body
        if (!name || !price || !img || !description) {
            return res.status(400).json({ message: "All fields required" })
        }

        const honda = new Honda({
            name,
            price,
            img,
            description
        })
        await honda.save()
        return res.status(200).json(honda)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put('/edit/:id',validateTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const existingcar = await Honda.findOne({ _id: id })
        if (!existingcar) {
            return res.status(404).json({ message: "Car not found" })
        }
        const updatedcar = await Honda.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updatedcar)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


router.delete('/delete/:id',validateTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const existingcar = await Honda.findOne({ _id: id })
        if (!existingcar) {
            return res.status(404).json({ message: "Car not found" })
        }
        await Honda.findByIdAndDelete(id)
        return res.status(200).json({ message: "Car Deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = router

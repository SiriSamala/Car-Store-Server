const express=require('express')
const router =express.Router();
const Volkswagen=require('../models/VolkswagenModel')
const { validateTokenAdmin } = require('../config/auth')

router.get('/count',validateTokenAdmin,async(req,res)=>{
    try{
        const count =await Volkswagen.countDocuments()
        return res.status(200).json({count:count})
    }catch (error){
        return res.status(500).json({ message: error.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const volkswagen = await Volkswagen.find()
        return res.status(200).json(volkswagen)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post('/add',validateTokenAdmin, async (req, res) => {
    try {
        
        const { name, price, img,description } = req.body
        if (!name || !price || !img || !description ) {
            return res.status(400).json({ message: "All fields required" })
        }

        const volkswagen = new Volkswagen({
            name,
            price,
            img,
            description
        })
        await volkswagen.save()
        return res.status(200).json(volkswagen)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put('/edit/:id',validateTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const existingcar = await Volkswagen.findOne({ _id: id })
        if (!existingcar) {
            return res.status(404).json({ message: "Car not found" })
        }
        const updatedcar = await Volkswagen.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updatedcar)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


router.delete('/delete/:id',validateTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const existingcar = await Volkswagen.findOne({ _id: id })
        if (!existingcar) {
            return res.status(404).json({ message: "Car not found" })
        }
        await Volkswagen.findByIdAndDelete(id)
        return res.status(200).json({ message: "Car Deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = router

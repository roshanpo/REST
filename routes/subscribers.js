//This is route file. It takes the requests and responses to /subscribers route. we define all the routes and define
//what to respond . Mainly asynchronous functions are used to try and catch the exceptions.
//If that is POST request, then we have to create new object according to our schema and save it to the database.

const express = require('express');
const router = express.Router()
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

//getting all

router.get('/', async(req,res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch(error){
        res.status(500).json({message: err.message})
    }
} )
//getting one

router.get('/:id', getSubscriber, (req,res) => {
    res.send(res.subscriber);
})
//creating one
router.post('/', async (req,res) => {
    const subscriber = new Subscriber({                         //created new object according to our schema and saved into database.
        name : req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
} )
//updating one
router.patch('/:id', getSubscriber, async (req,res) => {
    if(req.body.name !=null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !=null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }
    catch(err){
        res.json({message: err.message})
    }

} )
//deleting one
router.delete('/:id', getSubscriber, async (req,res) => {
    try{
        await res.subscriber.deleteOne()
        res.json({message:'Deleted Sucessfully'})
    }
    catch(err){
        res.json({message: err.message})
    }
} )

//creating middleware function
//We can use this in all above methods of defferent routes.
async function getSubscriber(req, res, next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(400).json({message: 'Subscriber not found'})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber;
    next();

}


module.exports = router
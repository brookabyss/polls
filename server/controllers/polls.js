const mongoose = require("mongoose")
const User = mongoose.model("User")
const Poll = mongoose.model("Poll")

module.exports = {
    create:(req,res)=>{
            console.log("creating bucket list",req.body)
            let new_poll = new Poll({question: req.body.question, options: req.body.options, _creator: req.body._creator,votes: req.body.votes })
					new_poll.save()
						.then(() => {
                            Poll.find({})
                                .populate('_creator')
		                        .then(data => res.json(data))
	                            .catch(err => res.status(500).json(err))
						})
                        .catch(err => {
                            console.log("error creating poll",err)
                            res.status(500).json(err)})
    },
    getPolls: (req,res)=>{
        console.log("get polls controller")
        Poll.find({})
        .populate('_creator')
            .then(data => {
                console.log(data,"Hoping to get polls back")

                res.json(data)

            })
            .catch(err => res.status(500).json(err))
    },
    getPoll: (req,res)=>{
        Poll.findOne({_id:req.body.id})
        .populate('_creator')
            .then(data => {
                console.log(data,"Hoping to get poll back")

                res.json(data)

            })
            .catch(err => res.status(500).json(err))
    
    },
    
    updatePoll: (req,res)=>{
        console.log("update Poll controller")
        Poll.findOne({_id : req.body._id}, function(err,poll){
            if (err){
                console.log("Poll not found",err)
                res.status(500).json(err)
            }
            else{
                poll.options=req.body.options
                poll.save()
                .then(()=>{
                    Poll.findOne({_id: req.body._id})
                .populate('_creator')
            .then(data => {
                console.log(data,"Hoping to get poll back")

                res.json(data)

            })
            .catch(err => res.status(500).json(err))
    
                })
                .catch(err=>{
                    console.log("bucket can't save",err)
                    res.status(500).json(err)
                })
            }
        })
    },
    deletePoll: (req,res)=>{
        console.log("delete poll action ", req.body.id)
        Poll.remove({_id:req.body.id})
        .then(()=>{
            Poll.find({})
            .populate('_creator')
            .then(polls=>{
                res.json(polls)
            })
            .catch(err=>{
                    console.log("poll delete error",err)
                    res.status(500).json(err)
            })

        })
    }
            
        
    }


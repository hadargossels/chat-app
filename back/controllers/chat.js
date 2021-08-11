let Chat = require("../models/chat")

exports.findAll = function (req, res) {
    Chat.find({},function (err, chats) {
        if (err)
            {res.send(err)
            console.log(err)}
        else {
            res.setHeader('Content-Range', `${chats.length}`)
            res.send(chats)
        }
    })
}


exports.addChat = function (req, res) {

    let ChatData = req.body

    Chat.create({...ChatData}, function (err) {
        if (err)
            res.send(err)

        else
            res.json({error:false, message: 'Chat Added successfully'})
    })
}

exports.findOneChat = function (req, res) {
    Chat.findOne({ id: req.params.id}, function (err, chats) {
        if (err)
            res.send(err)
        else{
            res.send(chats)
        }
    })
}



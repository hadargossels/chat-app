var express = require('express');
var router = express.Router();
var Chat = require('../controllers/chat')

router.get('/', Chat.findAll);

router.get('/:id', Chat.findOneChat);

router.post('/', Chat.addChat);


module.exports = router;

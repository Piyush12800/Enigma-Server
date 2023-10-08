const express = require("express")
const router = express.Router()
require('dotenv').config();
const { createPost, getAllPosts, updatePost , deletePost } = require("../controllers/Post")


const {auth} = require("../middlewares/auth");
const { uploadImage } = require("../controllers/imageUpload");


router.post('/createPost' , auth ,createPost )
router.put('/updatePost' , auth , updatePost)
router.delete('/deletePost' , auth , deletePost)
router.get('/getAllPosts' , getAllPosts)
router.post('/upload' , auth , uploadImage)


module.exports = router;


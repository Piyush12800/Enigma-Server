const User = require("../models/User")

const Post = require('../models/Post'); // Import the Post model


exports.createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postName, postDescription, postShortDescription } = req.body;

        if (!postName || !postDescription || !postShortDescription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const adminDetails = await User.findById(userId);
        if (!adminDetails) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // Create a new Post instance
        const newPost = new Post({
            postName,
            postDescription,
            postShortDescription
        });

        // Save the new post to the database
        await newPost.save();

        // Update the admin's posts array
        await User.findByIdAndUpdate(
            {
                _id: adminDetails._id,
            },
            {
                $push: {
                    posts: newPost._id,
                },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllPosts = async(req , res)=>{
    try {
        const posts = await Post.find()
        return res.status(200).json({
            success:true,
            data:posts
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
          })
    }
    
}

exports.updatePost = async(req , res)=>{
    try {
        const {
            postId ,
            name,
            ShortDescription , Description
        } =req.body

        const updates = req.body
        const post = await Post.findById(postId)

            if(!post){
                return res.status(404).json({
                    success:false,
                    message:"Post not found"
                })
            }

            if (updates.name) {
                post.postName = name;
              }
              if (updates.description) {
                post.postDescription = Description;
              }
              if (updates.shortDescription) {
                post.postShortDescription = ShortDescription;
              }
          
              // Save the updated post
              const updatedPost = await post.save();


    } catch (error) {
        console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
    }
}

exports.deletePost = async(req , res)=>{
    try {
        const {
            postId 
        } =req.body

        const post = await Post.findOneAndDelete(postId)

            if(!post){
                return res.status(404).json({
                    success:false,
                    message:"Post not found"
                })
            }
            // await post.remove()
            return res.status(200).json({
                success:true,
                message:"Post deleted successfully"
            })
    } catch (error) {
        console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
    }
}
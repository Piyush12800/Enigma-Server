const {uploadImageToCloudinary} = require('../utils/imageUploader')
const Post = require('../models/Post')
// exports.uploadImage = async (req, res) => {
//         try {
//               // Get user ID from request object
//             const userId = req.user.id
//             const postId = req.body;
//             const thumbnail = req.files.thumbnailImage

//             if(!postId || !thumbnail){
//                 return(
//                     res.status(400).json({
//                         success:false,
//                         message:"Post id or thumbnail is required"
//                     }))
//             }

//             const realPost = await Post.findById(postId);
//             if(!realPost){
//                 return(
//                     res.status(404).json({
//                         success:false,
//                         message:"Post not found"
//                     }))
//             }   
//             // Upload the Thumbnail to Cloudinary
//                 const thumbnailImage = await uploadImageToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//             )

//             // Update the post with the thumbnail image URL
//         realPost.imageUrls.push(thumbnailImage.secure_url); // Assuming you store the secure URL in the 'secure_url' field
//         await realPost.save(); // Save the updated post

//         res.status(200).json({
//             success: true,
//             message: "Thumbnail uploaded and added to post",
//             thumbnailURL: thumbnailImage.secure_url
//         });




//         } catch (error) {
//             console.error(error);
//             res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//         }
// }



exports.uploadImage = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;
        const {postId} = req.body;
        const thumbnail = req.files && req.files.thumbnailImage; // Check if 'thumbnailImage' exists in req.files
            console.log(postId);
            console.log(thumbnail);
            if (!thumbnail) {
                return res.status(400).json({
                    success: false,
                    message: " thumbnail is required"
                });
            }
        if (!postId || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Post id  is required"
            });
        }

        const realPost = await Post.findById(postId);
        if (!realPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // Update the post with the thumbnail image URL
        realPost.imageUrls.push(thumbnailImage.secure_url); // Assuming you store the secure URL in the 'secure_url' field
        await realPost.save(); // Save the updated post

        res.status(200).json({
            success: true,
            message: "Thumbnail uploaded and added to post",
            thumbnailURL: thumbnailImage.secure_url
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




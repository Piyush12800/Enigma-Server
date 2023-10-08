const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema({
        postName : {
            type:String,
            required:true
        },
        postDescription : {
            type:String,
            required:true
        },
        
        postShortDescription : {
            type:String,
            required:true
        },
        
        imageUrls : [{
            type:String,
           
        }],
      
        

})

module.exports = mongoose.model("Post" , postSchema);
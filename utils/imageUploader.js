const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file , folder , height , quality)=>{
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
        quality.resource_type = 'auto';
    }

    return await cloudinary.uploader.upload(file.tempFilePath , options);
}
exports.uploadVideoToCloudinary = async (file, folder, quality) => {
    const options = {
        resource_type: 'video', // Set resource type to 'video' for video uploads
        folder,
    };
    
    if (quality) {
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
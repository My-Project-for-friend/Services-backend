const mongoose = require("mongoose");
const postModel = require("../models/post.model.js");
const { postValidationSchema } = require("../validations/post.validation.js");


const createPostHandler = async (req) => {
    const userId = req.user?._id;
    const result = postValidationSchema.safeParse(req.body);
  
    // Validate user existence
    if (!userId) {
      throw new Error("UserId required");
    }
  
    // Validate request body using Zod schema
    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      throw new Error(`Validation failed: ${JSON.stringify(validationErrors)}`);
    }
  
    const { data } = result;
  
    // Handle uploaded files
    const imageFiles = req.files; // Access uploaded files from Multer
  
    if (!imageFiles || imageFiles.length === 0) {
      throw new Error("At least one image is required.");
    }
  
    // Map uploaded files to include file paths or additional metadata
    const uploadedImages = imageFiles.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));
  
    // Create the post with userId, text data, and image metadata
    const post = await postModel.create({
      ...data,
      userId,
      images: uploadedImages, // Add images to the post
    });
  
    if (!post) {
      return { success: false, data: null };
    }
  
    return { success: true, data: post };
  };
  

  const updatePostHandler = async (req) => {
    const userId = req.user?._id;
    const id = req.params?.id;
  
    // Validate user and post existence
    if (!userId) {
      throw new Error("UserId required");
    }
  
    if (!id) {
      throw new Error("Post ID not provided");
    }
  
    // Validate the request body
    const result = postValidationSchema.safeParse(req.body);
    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      throw new Error(`Validation failed: ${JSON.stringify(validationErrors)}`);
    }
  
    const { data } = result;
  
    // Handle new image uploads
    const imageFiles = req.files; // Access uploaded files from Multer
    let newImages = [];
  
    if (imageFiles && imageFiles.length > 0) {
      newImages = imageFiles.map((file) => ({
        filename: file.filename,
        path: file.path,
      }));
    }
  
    // Fetch existing post
    const existingPost = await postModel.findById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }
  
    // Merge existing images with new images (if any)
    const updatedImages = [
      ...existingPost.images,
      ...newImages,
    ];
  
    // Prepare updated post data
    const postData = {
      ...data,
      userId,
      images: updatedImages, // Update the images field
    };
  
    // Update the post in the database
    const post = await postModel.findByIdAndUpdate(
      id,
      { $set: postData },
      { new: true } // Return the updated document
    );
  
    if (!post) {
      return { success: false, error: "Error while updating post" };
    }
  
    return { success: true, data: post };
  };
  

 

// GET /api/posts?services=Service1&services=Service2&attentionTo=Adults&placeOfService=Office&state=California

 

const getPostHandler = async (req) => {
    const {id,city,state,ethnicity,nationality,breastType,hairType,bodyType,services,attentionTo,placeOfService} = req.query;
    const userId = req.user?._id;

    // Ensure userId is present
    if (!userId) {
        throw new Error("User ID is required");
    }
    // Build match conditions dynamically
    const matchConditions = { userId };
    // Add filters for individual fields
    if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            matchConditions._id = new mongoose.Types.ObjectId(id);
        } else {
            throw new Error("Invalid ID format");
        }
    }

    if (city) {
        matchConditions.city = { $regex: city, $options: "i" }; // Case-insensitive search
    }

    if (state) {
        matchConditions.state = { $regex: state, $options: "i" };
    }

    if (ethnicity) {
        matchConditions.ethnicity = { $regex: ethnicity, $options: "i" };
    }

    if (nationality) {
        matchConditions.nationality = { $regex: nationality, $options: "i" };
    }
    if (breastType) {
        matchConditions.breastType = { $regex: breastType, $options: "i" };
    }
    if (hairType) {
        matchConditions.hairType = { $regex: hairType, $options: "i" };
    }

    if (bodyType) {
        matchConditions.bodyType = { $regex: bodyType, $options: "i" };
    }
    // Handle array fields using $in for multiple values
    if (services) {
        const servicesArray = Array.isArray(services) ? services : [services];
        matchConditions.services = { $in: servicesArray };
    }
    if (attentionTo) {
        const attentionToArray = Array.isArray(attentionTo) ? attentionTo : [attentionTo];
        matchConditions.attentionTo = { $in: attentionToArray };
    }

    if (placeOfService) {
        const placeOfServiceArray = Array.isArray(placeOfService) ? placeOfService : [placeOfService];
        matchConditions.placeOfService = { $in: placeOfServiceArray };
    }
    // Define pipeline
    const pipeline = [
        { $match: matchConditions }, // Match the filters
        {
            $project: {
                _id: 1,
                city: 1,
                state: 1,
                ethnicity: 1,
                nationality: 1,
                breastType: 1,
                hairType: 1,
                bodyType: 1,
                services: 1,
                attentionTo: 1,
                placeOfService: 1,
                paymentMethods: 1,
                perHourRate: 1,
                phoneNo: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ];
    // Execute the pipeline
    const posts = await postModel.aggregate(pipeline);
    if (!posts || posts.length === 0) {
        return { success: false, data: null };
    }
    return { success: true, data: posts };

};

 

// for specific post

// http://localhost:3000/api/post/?id=124433

 

// for all post

// http://localhost:3000/api/post/

 

const deletePostHandler = async (req) => {
    const { id } = req.query;
    const userId = req.user?._id;
    // Validate userId

    if (!userId) {
        throw new Error("UserId is required");
    }
    // Create match conditions
    const matchConditions = { userId };
    // Validate and add `id` to match conditions
    if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            matchConditions._id = new mongoose.Types.ObjectId(id);
        } else {
            throw new Error("Invalid Id format");
        }
    }
    // Perform delete operation based on whether `id` is provided
    let result;
    if (id) {
        result = await postModel.deleteOne(matchConditions); // Delete a specific post
    } else {
        result = await postModel.deleteMany(matchConditions); // Delete all posts for the user
    }
    // Check if any documents were deleted
    if (result.deletedCount === 0) {
        throw new Error("No matching posts found to delete");
    }
    return { success: true, message: "Deleted successfully" };

};

 

module.exports={createPostHandler,updatePostHandler,getPostHandler,deletePostHandler}
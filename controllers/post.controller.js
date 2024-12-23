const { createPostHandler, updatePostHandler, getPostHandler, deletePostHandler } = require("../handler/post.handler");

 

const createPostController=async(req,res)=>{
    console.dir(req.body,{depth:null});

    try{
        const {success,data}=await createPostHandler(req);
        if(!success){
            return res.status(401).json({
                success:false,
                message:"Missing Fields"
            })
        }
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Data creation failed",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Post created successfully",
            data
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}



  

const updatePostController=async(req,res)=>{
    try{
        const {success,error,data}=await updatePostHandler(req);
        if(!success){
            return res.status(401).json({
                success:false,
                message:error
            })
        }
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Data creation failed",

            });
        }
        return res.status(200).json({
            success:true,
            message:"Post updated successfully",
            data
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

 

const getPostController=async(req,res)=>{
    try{
        const {success,data}=await getPostHandler(req);
        if(!success){
            return res.status(401).json({
                success:false,
                message:"Error while fetching the data"
            })
        }
        if(!data){
            return res.status(401).json({
                success:false,
                message:"Error while fetching the data"
            })
        }
        console.log(data);
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

 

const deleteController = async (req, res) => {
    try {
        const response = await deletePostHandler(req);
        return res.status(200).json(response); // Return success response
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error", // Return error message
        });
    }
};

 

module.exports={createPostController,updatePostController,getPostController,deleteController}
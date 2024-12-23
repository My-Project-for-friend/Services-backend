const uploadController = (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      // Convert each file's buffer to Base64
      const filesBase64 = req.files.map((file) => ({
        originalName: file.originalname,
        base64: file.buffer.toString("base64"), // Convert buffer to Base64 string
        mimeType: file.mimetype, // Include MIME type for decoding purposes
      }));
     
      // Send the Base64 data back in the response
      return res.status(200).json({ files: filesBase64 });
    } catch (error) {
      console.error("Error processing files:", error);
      return res.status(500).json({ message: "Error processing files" });
    }
  };

  
  module.exports = {    uploadController  };
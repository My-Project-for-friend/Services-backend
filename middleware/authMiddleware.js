const userModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwt.utils");

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"] || req.headers["Authorization"];
        if (!authorization) {
            return res.status(401).json({
                message: "Authorization header missing",
                data: null,
            });
        }

        // Extract token from "Bearer <token>" format
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Bearer token not found",
            });
        }

        // Verify the token
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found",
            });
        }

        req.user = user; // Attach the user to the request object
        return next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token.",
                data: null,
            });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired, please log in again.",
                data: null,
            });
        }

        console.error("Error in authMiddleware:", error);
        return res.status(500).json({
            message: "Internal server error.",
            data: null,
        });
    }
};

module.exports = authMiddleware;

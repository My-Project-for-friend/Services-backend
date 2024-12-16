const missingFieldError = (res, error) => {
    return res.status(400).json({
        data: null,
        message: "Missing or invalid details",
        success: false,
    });
};

const internalServerError = (res, error) => {
    const errorMsg = error?.data?.response?.message || error?.message || "Internal Server Error";

    return res.status(500).json({
        success: false,
        data: null,
        message: errorMsg,
    });
};

const notFoundError = (res, subject, missingItems) => {
    return res.status(404).json({
        data: null,
        success: false,
        message: `The ${subject} with the specified ${missingItems} not found`,
    });
};

const conflictError = (res, subject, existingItems) => {
    return res.status(409).json({
        success: false,
        data: null,
        message: `The ${subject} already has the items ${existingItems}`,
    });
};

const unauthorizedError = (res, error) => {
    return res.status(401).json({
        success: false,
        data: null,
        message: "Unauthorized access. Please check your credentials.",
    });
};

const forbiddenError = (res, error) => {
    return res.status(403).json({
        success: false,
        data: null,
        message: "You do not have permission to access this resource.",
    });
};

module.exports = {
    missingFieldError,
    internalServerError,
    notFoundError,
    conflictError,
    unauthorizedError,
    forbiddenError,
};

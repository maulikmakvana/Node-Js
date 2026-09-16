const { body, validationResult } = require('express-validator');

const validatorList = [
    body('title').notEmpty()
        .withMessage("Movie title is required...")
        .isLength({ min: 2, max: 100 })
        .withMessage("Title must be between 2 and 100 characters"),

    body('director').trim().notEmpty()
        .withMessage("Director name is required...")
        .isLength({ min: 2, max: 50 })
        .withMessage("Director name must be between 2 and 50 characters"),

    body('genre').notEmpty()
        .withMessage("Genre is required..."),

    body('releaseYear').notEmpty()
        .withMessage("Release year is required...")
        .isNumeric()
        .withMessage("Release year must be a valid year"),

    body('rating').notEmpty()
        .withMessage("Rating is required...")
        .isFloat({ min: 0, max: 10 })
        .withMessage("Rating must be between 0 and 10"),

    body('budget').notEmpty()
        .withMessage("Budget is required...")
        .isNumeric()
        .withMessage("Budget must be a valid number")
];

const validation = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ 
            status: 400, 
            message: error.array(), 
            error: true 
        });
    }

    next();
};

module.exports = {
    validatorList,
    validation
};

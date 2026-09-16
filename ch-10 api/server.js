require('dotenv').config();
const express = require('express');

require('./config/db.config');

const movieModel = require('./model/movie.model');
const { validatorList, validation } = require('./middleware/validator.middleware');

const app = express();

// Built-In Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// APIs

// 1. Add Movie API
app.post('/addMovie', validatorList, validation, (req, res) => {
    console.log("Movie Body : ", req.body);

    movieModel.create(req.body).then(() => {
        return res.status(201).json({ 
            status: 201, 
            message: "Movie added successfully...", 
            error: false 
        });
    }).catch((error) => {
        console.log('Add Movie Error : ', error);
        return res.status(400).json({ 
            status: 400, 
            message: "Movie addition failed...", 
            error: true 
        });
    });
});

// 2. Fetch All Movies API
app.get('/allMovies', (req, res) => {
    movieModel.find({}).then((result) => {
        console.log("All Movies : ", result);
        return res.status(200).json({ 
            status: 200, 
            message: "All movies fetched successfully...", 
            allMovies: result, 
            error: false, 
            totalMovies: result.length 
        });
    }).catch((error) => {
        console.log("Fetch Error : ", error);
        return res.status(400).json({ 
            message: "All movies fetch failed...", 
            error: true 
        });
    });
});

// 3. Get Single Movie API
app.get('/singleMovie/:movieID', (req, res) => {
    movieModel.findById(req.params.movieID).then((result) => {
        if (result != null) {
            return res.status(200).json({ 
                status: 200, 
                message: "Movie fetched successfully...", 
                movie: result, 
                error: false 
            });
        } else {
            return res.status(404).json({ 
                status: 404, 
                message: "Movie not found...", 
                error: true 
            });
        }
    }).catch((error) => {
        console.log("Find Movie Error : ", error);
        return res.status(400).json({ 
            message: "Movie fetch failed...", 
            error: true 
        });
    });
});

// 4. Delete Movie API
app.delete('/deleteMovie/:movieID', (req, res) => {
    console.log("Delete Movie ID: ", req.params.movieID);

    movieModel.findById(req.params.movieID).then((result) => {
        if (result != null) {
            movieModel.findByIdAndDelete(req.params.movieID).then(() => {
                return res.status(200).json({ 
                    status: 200, 
                    message: "Movie deleted successfully.", 
                    error: false 
                });
            }).catch((error) => {
                console.log("Deletion Error : ", error);
                return res.status(400).json({ 
                    message: "Movie deletion failed...", 
                    error: true 
                });
            });
        } else {
            return res.status(404).json({ 
                status: 404, 
                message: "Movie not found...", 
                error: true 
            });
        }
    }).catch((error) => {
        console.log("Find Movie Error : ", error);
        return res.status(404).json({ 
            message: "Movie not found...", 
            error: true 
        });
    });
});

// 5. Update Movie API
app.patch('/updateMovie/:movieID', (req, res) => {
    console.log("Update Movie ID: ", req.params.movieID);

    movieModel.findByIdAndUpdate(req.params.movieID, req.body, { new: true }).then((result) => {
        return res.status(200).json({ 
            status: 200, 
            message: "Movie updated successfully.", 
            movie: result,
            error: false 
        });
    }).catch((error) => {
        console.log("Movie Update Error : ", error);
        return res.status(400).json({ 
            message: "Movie update failed...", 
            error: true 
        });
    });
});

// Server listening
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error : ", err);
        return;
    }
    console.log(`Server is running on port ${process.env.PORT}...`);
});

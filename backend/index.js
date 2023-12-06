import express from "express";
import { PORT , mongodbURL} from "./config.js";
import mongoose from "mongoose";
import foodItemroutes from "./routes/api/foodItemRoutes.js";

import cors from 'cors';

const app = express();
app.use(express.json());
//app.use(cors());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('MERN')
});


app.use('/foodCategories', foodItemroutes);


mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
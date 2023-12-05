import express from "express";
import { PORT , mongodbURL} from "./config.js";
import mongoose from "mongoose";
<<<<<<< Updated upstream
import { Inventory } from "./models/mongodbModel.js";
import routes from "./routes/routes.js";
import foodItemsRoutes from "./routes/foodItems";
=======
import routes from "./routes/api/foodItemRoutes.js";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
app.use('/inventory', routes);
app.use('/fooditems', foodItemsRoutes);
=======
app.use('/foodCategories', routes);
>>>>>>> Stashed changes

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
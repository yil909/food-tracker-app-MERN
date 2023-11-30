import express from "express";
import { PORT , mongodbURL} from "./config.js";
import mongoose from "mongoose";
import { Inventory } from "./models/mongodbModel.js";
import routes from "./routes/routes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('MERN')
});

app.use('/inventory', routes);

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
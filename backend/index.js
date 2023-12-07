import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import foodItemRouter from "./routes/api/foodItemRoutes.js";

// Setup Express
const app = express();
app.use(express.json());

// Enable CORS (use cors middleware before defining routes)
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Routes
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('MERN');
});

// Setup our routes
app.use(foodItemRouter);


// Start the server running.
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});

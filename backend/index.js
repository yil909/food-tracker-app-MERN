import express from "express";
import { LOCAL_IP, PORT } from "./config.js";
import cors from "cors";
import foodItemRouter from "./routes/api/foodItemRoutes.js";
import foodCatRouter from "./routes/api/foodCategoryRoutes.js";
import transactionLogRouter from "./routes/api/transactionLogRoutes.js";
import userRoutes from "./routes/api/userRoutes.js";

// Setup Express
const app = express();
app.use(express.json());

// Enable CORS (use cors middleware before defining routes)
app.use(cors({
    origin: 'http://'+LOCAL_IP+':5173', // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Handle OPTIONS requests
app.options('*', cors());

// Routes
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('MERN');
});

// Setup our routes
app.use(foodItemRouter);
app.use(foodCatRouter);
app.use(transactionLogRouter);
app.use(userRoutes);

// Start the server running.
app.listen(PORT, LOCAL_IP,  function () {
    console.log(`App listening on port ${PORT}!`);
});

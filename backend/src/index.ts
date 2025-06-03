import express from 'express';
import recipeRouter from './routes/recipeRoutes';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`listening http://localhost:${PORT}`);
});

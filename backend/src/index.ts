import express from 'express';
import recipeRouter from './routes/recipeRoutes';
import cors from 'cors';
import env from './config/env';

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors());
app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`listening http://localhost:${PORT}`);
});

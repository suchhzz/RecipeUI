import express from 'express';
import recipeRouter from './routes/recipeRoutes';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/recipes', recipeRouter);

app.get('/', (_req, res) => {
    res.send('api is working');
});

app.listen(PORT, () => {
    console.log(`listening http://localhost:${PORT}`);
});

import { Router, Request, Response } from "express";
import { getRecipeById, getRecipeList } from "../controllers/recipeController";

const recipeRouter = Router();

recipeRouter.get('/list', getRecipeList);
recipeRouter.get('/:id', getRecipeById)

export default recipeRouter;
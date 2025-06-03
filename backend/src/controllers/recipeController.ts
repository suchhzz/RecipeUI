import { Request, Response } from "express"
import { RecipeFilters } from "../types"
import RecipeService from '../services/recipeService'
import { DEFAULT_PAGE_SIZE } from "../config/pagination"
import { toRecipeDetailDTO } from "../dto/recipeDetail.dto"
import { toRecipeListItemDTO } from "../dto/recipeListItem.dto"

export const getRecipeList = async (req: Request, res: Response) => {
    try {
        const filters: RecipeFilters = {
            ingredient: req.query.ingredient as string | undefined,
            area: req.query.area as string | undefined,
            category: req.query.category as string | undefined,
        };

        const page = parseInt(req.query.page as string) || 1;
        const limit = DEFAULT_PAGE_SIZE;
        const offset = (page - 1) * limit;

        const recipeList = await RecipeService.getRecipes(filters);
        const totalItems = recipeList.length;
        const totalPages = Math.ceil(totalItems / limit);

        const paginated = recipeList.slice(offset, offset + limit);

        res.json({
            page,
            totalPages,
            recipes: paginated.map(toRecipeListItemDTO),
        });
    } catch (e) {
        res.status(500).json({ error: (e as Error).message });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipe = await RecipeService.getRecipeById(id);

        if (!recipe) {
            res.status(401).json({ error: "recipe not found" });
        }

        res.json(toRecipeDetailDTO(recipe));
    } catch (e) {
        res.status(500).json({ error: (e as Error).message })
    }
}
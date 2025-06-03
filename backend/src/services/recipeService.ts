import { Request, Response } from "express"
import { RecipeFilters } from "../types";
import axios from 'axios';
import api from '../config/api';
import env from "../config/env";

class RecipeService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = env.THEMEALDB_BASE_URL;
    }

    async getRecipes(filters: RecipeFilters) {
        try {

            if (filters.ingredient) {
                const { data } = await axios.get(`${this.baseUrl}${api.filterByIngredient}${filters.ingredient}`);
                return data.meals || [];
            }

            if (filters.area) {
                const { data } = await axios.get(`${this.baseUrl}${api.filterByArea}${filters.area}`);
                return data.meals || [];
            }

            if (filters.category) {
                const { data } = await axios.get(`${this.baseUrl}${api.filterByCategory}${filters.category}`);
                return data.meals || [];
            }

            const { data } = await axios.get(`${this.baseUrl}${api.getAllRecipes}`);
            return data.meals || [];
        } catch (e) {
            console.error('error fetching recipes:', e);
            throw new Error('failed to fetch recipes');
        }
    }

    async getRecipeById(id: string) {
        try {
            const { data } = await axios.get(`${this.baseUrl}${api.getRecipeById}${id}`);
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error('error fetching recipe by id:', error);
            throw new Error('failed to fetch recipe');
        }
    }
}

export default new RecipeService();
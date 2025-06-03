export interface RecipeListItemDTO {
    id: string;
    name: string;
    thumbnail: string;
}

export function toRecipeListItemDTO(raw: any): RecipeListItemDTO {
    return {
        id: raw.idMeal,
        name: raw.strMeal,
        thumbnail: raw.strMealThumb,
    };
}

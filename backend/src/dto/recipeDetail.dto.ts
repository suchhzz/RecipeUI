export interface Ingredient {
    ingredient: string;
    measure: string;
}

export interface RecipeDetailDTO {
    id: string;
    name: string;
    category: string | null;
    area: string | null;
    instructions: string;
    thumbnail: string;
    youtube: string | null;
    tags: string[];
    source: string | null;
    ingredients: Ingredient[];
}

export function toRecipeDetailDTO(raw: any): RecipeDetailDTO {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = raw[`strIngredient${i}`];
        const measure = raw[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure?.trim() || '',
            });
        }
    }

    return {
        id: raw.idMeal,
        name: raw.strMeal,
        category: raw.strCategory || null,
        area: raw.strArea || null,
        instructions: raw.strInstructions,
        thumbnail: raw.strMealThumb,
        youtube: raw.strYoutube || null,
        tags: raw.strTags ? raw.strTags.split(',').map((t: string) => t.trim()) : [],
        source: raw.strSource || null,
        ingredients,
    };
}

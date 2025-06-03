interface RecipeCardItem {
    id: number;
    name: string;
    thumbnail: string;
}

interface Ingredient {
    ingredient: string;
    measure: string;
}

interface Recipe {
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
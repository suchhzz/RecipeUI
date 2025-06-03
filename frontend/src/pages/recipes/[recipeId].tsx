import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { fetchRecipeById } from "@/api/recipes";

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

export default function RecipeById() {
    const router = useRouter();
    const { recipeId } = router.query;

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadRecipe() {
            if (!recipeId) return;

            setLoading(true);
            try {
                const response = await fetchRecipeById(Number(recipeId));
                setRecipe(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        loadRecipe();
    }, [recipeId]);

    const navigateToFilter = (filterType: "country" | "ingredient", value: string) => {
        router.push({
            pathname: "/",
            query: { [`filter_${filterType}`]: value },
        });
    };

    if (loading || !recipe) {
        return (
            <MainLayout>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        flex: 3,
                        bgcolor: "background.paper",
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    <Box
                        component="img"
                        src={recipe.thumbnail}
                        alt={recipe.name}
                        sx={{
                            width: "100%",
                            height: 300,
                            objectFit: "cover",
                            borderRadius: 2,
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        {recipe.name}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{
                            mb: 3,
                            cursor: "pointer",
                            color: "primary.main",
                            textDecoration: "underline",
                        }}
                        onClick={() => navigateToFilter("country", recipe.area ?? "")}
                    >
                        {recipe.area}
                    </Typography>

                    <Typography
                        variant="body1"
                        component="section"
                        sx={{ mb: 3, whiteSpace: "pre-line" }}
                    >
                        <strong>Instructions:</strong>
                        <br />
                        {recipe.instructions}
                    </Typography>

                    <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Ingredients:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            {recipe.ingredients.map((ingredient) => (
                                <Button
                                    key={ingredient.ingredient}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigateToFilter("ingredient", ingredient.ingredient)}
                                >
                                    {ingredient.ingredient}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "background.paper",
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        height: "fit-content",
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 2,
                        }}
                    >
                        Sidebar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Дополнительная информация, рекомендации, или фильтры.
                    </Typography>
                </Box>
            </Box>
        </MainLayout>
    );
}

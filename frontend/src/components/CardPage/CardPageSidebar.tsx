import { Box } from "@mui/material";
import CardPageSidebarItem from "./CardPageSidebarItem";
import { useEffect, useState } from "react";
import { fetchRecipesListByFilters } from "@/api/recipes";

export default function CardPageSidebar({ categoryName }: { categoryName: string | null }) {

    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        if (!categoryName) return;

        async function loadRecipesByCategory() {
            try {
                const data = await fetchRecipesListByFilters({
                    selectedFilter: "category",
                    filterValue: categoryName ?? undefined,
                    page: 1,
                });
                setRecipeList((data.recipes || []).slice(0, 3));
            } catch (e) {
                console.error(e);
            }
        }

        loadRecipesByCategory();
    }, [categoryName]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {recipeList.length > 0 ? (
                recipeList.map((recipe: Recipe) => (
                    <CardPageSidebarItem key={recipe.id} recipe={recipe} categoryName={categoryName ?? undefined} />
                ))
            ) : (
                <Box>No recipes...</Box>
            )}

        </Box>
    );
}

import { Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

interface RecipeCardItem {
    id: number,
    name: string,
    thumbnail: string,
}

export default function RecipeListContent({ recipeList }: { recipeList: RecipeCardItem[] }) {
    return (
        <>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '2rem'
            }}>

                {recipeList.map((item: any, index: number) => (
                    <RecipeCard
                        key={index}
                        recipeCardItem={item}
                    />
                ))}

            </Box>
        </>
    )
}
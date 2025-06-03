import { Box, Typography } from "@mui/material";

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

interface CardPageSidebarItemProps {
    recipe: Recipe;
}

export default function CardPageSidebarItem({ recipe }: CardPageSidebarItemProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: "background.paper",
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            <Box
                component="img"
                src={recipe?.thumbnail}
                alt="Card image"
                sx={{
                    width: "100%",
                    height: 170,
                    objectFit: "cover",
                }}
            />
            <Typography
                variant="subtitle1"
                sx={{
                    p: 1,
                    fontWeight: 600,
                    textAlign: "center",
                }}
            >
                {recipe?.name}
            </Typography>
        </Box>
    );
}

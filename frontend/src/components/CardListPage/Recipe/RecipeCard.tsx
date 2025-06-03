import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

interface RecipeCardItem {
    id: number;
    name: string;
    thumbnail: string;
}

export default function RecipeCard({ recipeCardItem }: { recipeCardItem: RecipeCardItem }) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.01)",
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={recipeCardItem.thumbnail}
                alt="Recipe Image"

                sx={{
                    "&:hover": {
                        cursor: 'pointer'
                    }
                }}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        "&:hover": {
                            color: "warning.main",
                            cursor: 'pointer'
                        }
                    }}
                >
                    {recipeCardItem.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

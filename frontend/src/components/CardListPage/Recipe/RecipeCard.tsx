import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Link from "next/link";

export default function RecipeCard({ recipeCardItem }: { recipeCardItem: RecipeCardItem }) {
    const href = `/recipes/${recipeCardItem.id}`;

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
            <Link href={href} passHref>
                <CardMedia
                    component="img"
                    height="200"
                    image={recipeCardItem.thumbnail}
                    alt="Recipe Image"
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                />
            </Link>

            <CardContent>
                <Link href={href} passHref>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            "&:hover": {
                                color: "warning.main",
                                cursor: "pointer",
                            },
                            textDecoration: 'none',
                        }}
                    >
                        {recipeCardItem.name}
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}

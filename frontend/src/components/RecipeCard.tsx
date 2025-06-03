import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

export default function RecipeCard() {
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
                image="https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg"
                alt="Recipe Image"
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        color: "text.primary",
                    }}
                >
                    Delicious Recipe Title
                </Typography>
            </CardContent>
        </Card>
    );
}

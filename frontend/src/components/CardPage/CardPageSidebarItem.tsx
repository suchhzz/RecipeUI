import Link from "next/link";
import { Box, Typography } from "@mui/material";

interface CardPageSidebarItemProps {
    recipe: Recipe;
    categoryName?: string;
}

export default function CardPageSidebarItem({ recipe, categoryName }: CardPageSidebarItemProps) {
    const category = categoryName || recipe.category || "";

    const hasCategory = category.trim() !== "";

    const href = {
        pathname: "/",
        query: {
            page: "1",
            filter: "Category",
            value: category,
        },
    };

    const ImageContent = (
        <Box
            component="img"
            src={recipe.thumbnail}
            alt="Card image"
            sx={{
                width: "100%",
                height: 170,
                objectFit: "cover",
                display: "block",
            }}
        />
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: "background.paper",
                overflow: "hidden",
                cursor: hasCategory ? "pointer" : "default",
            }}
        >
            {hasCategory ? (
                <Link href={href} passHref>
                    <Box component="a" sx={{ display: "block", width: "100%", height: 170, overflow: "hidden" }}>
                        {ImageContent}
                    </Box>
                </Link>
            ) : (
                ImageContent
            )}

            {hasCategory ? (
                <Link href={href} passHref>
                    <Typography
                        component="a"
                        variant="subtitle1"
                        sx={{
                            p: 1,
                            fontWeight: 600,
                            textAlign: "center",
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        {recipe.name}
                    </Typography>
                </Link>
            ) : (
                <Typography
                    variant="subtitle1"
                    sx={{ p: 1, fontWeight: 600, textAlign: "center" }}
                >
                    {recipe.name}
                </Typography>
            )}
        </Box>
    );
}

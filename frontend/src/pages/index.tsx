// src/pages/index.tsx
import { Box } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
    <MainLayout>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem'
      }}>

        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />

      </Box>

    </MainLayout>
  );
}

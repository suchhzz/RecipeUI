import { Box, Pagination } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import RecipeListContent from "@/components/CardListPage/Recipe/RecipeListContent";
import AppliedFilters from "@/components/CardListPage/AppliedFilters";
import FilterSidebar from "@/components/CardListPage/FilterSidebar";
import { useEffect, useState } from "react";
import { fetchRecipesList, fetchRecipesListByFilters } from "@/api/recipes";

interface RecipeCardItem {
  id: number,
  name: string,
  thumbnail: string,
}

export default function Home() {
  const [recipeList, setRecipeList] = useState<RecipeCardItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [appliedFilterContent, setAppliedFilterContent] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function loadRecipeList() {
      try {
        const data = await fetchRecipesList(page);
        setRecipeList(data.recipes);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error(e);
      }
    }

    loadRecipeList();
  }, [page]);

  const getRecipeByFilter = async () => {
    try {
      const data = await fetchRecipesListByFilters({
        selectedFilter,
        filterValue,
        page
      });

      setRecipeList(data.recipes);
      setTotalPages(data.totalPages);
      setAppliedFilterContent(`${filterValue}`);
    } catch (e) {
      console.error(e);
    }
  };

  const resetFilters = async () => {
    setSelectedFilter("");
    setFilterValue("");
    setPage(1);
    try {
      const data = await fetchRecipesList(1);
      setRecipeList(data.recipes);
      setTotalPages(data.totalPages);
      setAppliedFilterContent("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MainLayout>
      <Box>
        <Box>
          <Box
            sx={{
              p: 1,
              pr: 2,
              pl: 2,
              boxShadow: 1,
              borderRadius: 2,
              bgcolor: "background.paper",
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <FilterSidebar
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              getRecipeByFilter={getRecipeByFilter}
              resetFilters={resetFilters}
            />
            {appliedFilterContent && <AppliedFilters appliedFilterContent={appliedFilterContent} />}
          </Box>

          <RecipeListContent recipeList={recipeList} />

          {/* 👇 Pagination */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}

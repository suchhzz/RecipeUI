import { Box, Pagination, CircularProgress } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import RecipeListContent from "@/components/CardListPage/Recipe/RecipeListContent";
import AppliedFilters from "@/components/CardListPage/AppliedFilters";
import FilterSidebar from "@/components/CardListPage/FilterSidebar";
import { useEffect, useState } from "react";
import { fetchRecipesList, fetchRecipesListByFilters } from "@/api/recipes";
import { useRouter } from "next/router";

export default function RecipeList() {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [recipeList, setRecipeList] = useState<RecipeCardItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [appliedFilterContent, setAppliedFilterContent] = useState<string>("");

  const [readyToFetch, setReadyToFetch] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const { filter, value, page: pageQuery } = router.query;

    const selected = Array.isArray(filter) ? filter[0] : filter || "";
    const val = Array.isArray(value) ? value[0] : value || "";
    const pageNumber = pageQuery
      ? parseInt(Array.isArray(pageQuery) ? pageQuery[0] : pageQuery, 10)
      : 1;

    setSelectedFilter(selected);
    setFilterValue(val);
    setPage(pageNumber);
    setAppliedFilterContent(val);

    setReadyToFetch(true);

    if (!pageQuery) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            page: "1",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!readyToFetch) return;

    async function loadRecipeList() {
      setLoading(true);
      try {
        if (selectedFilter && filterValue) {
          const data = await fetchRecipesListByFilters({
            selectedFilter,
            filterValue,
            page,
          });
          setRecipeList(data.recipes);
          setTotalPages(data.totalPages);
        } else {
          const data = await fetchRecipesList(page);
          setRecipeList(data.recipes);
          setTotalPages(data.totalPages);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadRecipeList();
  }, [readyToFetch, selectedFilter, filterValue, page]);

  const getRecipeByFilter = () => {
    const query: any = { page: "1" };
    if (selectedFilter && filterValue) {
      query.filter = selectedFilter;
      query.value = filterValue;
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const resetFilters = () => {
    setSelectedFilter("");
    setFilterValue("");
    setAppliedFilterContent("");
    setPage(1);

    router.push(
      {
        pathname: router.pathname,
        query: { page: "1" },
      },
      undefined,
      { shallow: true }
    );
  };

  const onPageChange = (_: any, value: number) => {
    const query: any = { page: value.toString() };

    if (selectedFilter && filterValue) {
      query.filter = selectedFilter;
      query.value = filterValue;
    }

    setPage(value);

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
            {appliedFilterContent && (
              <AppliedFilters appliedFilterContent={appliedFilterContent} />
            )}
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <RecipeListContent recipeList={recipeList} />
          )}

          {!loading && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={onPageChange}
                color="primary"
                disabled={loading}
              />
            </Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
}

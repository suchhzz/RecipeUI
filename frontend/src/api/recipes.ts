import axios from "axios"

type FilterParams = {
    selectedFilter?: string;
    filterValue?: string;
    page?: number;
};

export async function fetchRecipesList(page = 1) {
    const response = await axios.get('http://localhost:8080/recipes/list', {
        params: { page }
    });
    return response.data;
}

export async function fetchRecipesListByFilters(params: FilterParams) {
    const { selectedFilter, filterValue, page = 1 } = params;

    return await axios.get('http://localhost:8080/recipes/list', {
        params: {
            [selectedFilter?.toLowerCase() || ""]: filterValue || "",
            page
        }
    }).then(res => res.data);
}

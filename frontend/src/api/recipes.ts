import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type FilterParams = {
    selectedFilter?: string;
    filterValue?: string;
    page?: number;
};

export async function fetchRecipesList(page = 1) {
    const response = await axios.get(`${baseUrl}/recipes/list`, {
        params: { page }
    });
    return response.data;
}

export async function fetchRecipesListByFilters(params: FilterParams) {
    const { selectedFilter, filterValue, page = 1 } = params;

    return await axios.get(`${baseUrl}/recipes/list`, {
        params: {
            [selectedFilter?.toLowerCase() || ""]: filterValue || "",
            page
        }
    }).then(res => res.data);
}

export async function fetchRecipeById(id: number) {
    return await axios.get(`${baseUrl}/recipes/${id}`);
}

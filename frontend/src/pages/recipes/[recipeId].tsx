import { useRouter } from "next/router"

export default function RecipeById() {

    const router = useRouter();

    return (
        <h1>recipe by id {router.query.recipeId}</h1>
    )
}
import { useLoaderData, Link } from "@remix-run/react";
import { dasherize } from "~/lib/helpers";

type LoaderData = {
  recipes: { id: number; name: string }[];
};

export const loader = () => {
  return {
    recipes: [
      { id: 1, name: "Pasta" },
      { id: 2, name: "Pizza" },
      { id: 3, name: "Burger" },
    ],
  };
};

export default function Recipes() {
  const { recipes } = useLoaderData<LoaderData>();
  return (
    <>
      <section className="hero is-small is-link">
        <div className="hero-body">
          <h1 className="title">Recipes</h1>
        </div>
      </section>
      <section className="content section">
        <div className="container">
          {recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              <div className="card-content">
                <h3>
                  <Link to={`/recipes/${recipe.id}/${dasherize(recipe.name)}`}>{recipe.name}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

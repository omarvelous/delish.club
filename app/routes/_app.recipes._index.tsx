import { useLoaderData, Link } from "@remix-run/react";
import { dasherize } from "~/lib/helpers";
import Stars from "~/components/stars";

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
        <div className="columns">
          <aside className="column is-one-third">
            <div className="mb-4">
              <h4>Search</h4>
              <input
                className="input"
                type="search"
                placeholder="By name or ingredients"
              />
            </div>
            <hr />

            <div className="mb-4">
              <h5>Sort By</h5>
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h5>Category</h5>
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h5>Cuisine</h5>
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h5>Time</h5>
            </div>

            <div className="mb-4">
              <h5>Rating</h5>
              <div className="radios is-flex is-flex-direction-column">
                <div>
                  <label className="radio">
                    <input type="radio" name="rating" value="5" />
                    <span className="has-text-warning ml-1">
                      <Stars rating={5} />
                    </span>
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <input type="radio" name="rating" value="4" />
                    <span className="has-text-warning ml-1">
                      <Stars rating={4} />
                    </span>
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <input type="radio" name="rating" value="3" />
                    <span className="has-text-warning ml-1">
                      <Stars rating={3} />
                    </span>
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <input type="radio" name="rating" value="2" />
                    <span className="has-text-warning ml-1">
                      <Stars rating={2} />
                    </span>
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <input type="radio" name="rating" value={1} />
                    <span className="has-text-warning ml-1">
                      <Stars rating={1} />
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5>Difficulty</h5>
            </div>
          </aside>
          <main className="column">
            {recipes.map((recipe) => (
              <div className="card" key={recipe.id}>
                <div className="card-content">
                  <h3>
                    <Link
                      to={`/recipes/${recipe.id}/${dasherize(recipe.name)}`}
                    >
                      {recipe.name}
                    </Link>
                  </h3>
                </div>
              </div>
            ))}
          </main>
        </div>
      </section>
    </>
  );
}

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
              <div className="field has-addons">
                <div className="control has-icons-left is-expanded">
                  <input
                    className="input"
                    type="search"
                    placeholder="By name or ingredients"
                  />
                  <span className="icon is-small is-left">
                    <i
                      aria-hidden="true"
                      className="fa-solid fa-magnifying-glass"
                    ></i>
                  </span>
                </div>
                <div className="control">
                  <button className="button is-link">Search</button>
                </div>
              </div>
            </div>
            <hr />
            <div className="is-hidden-mobile">
              <h4>Filter</h4>
              <div className="field mb-4">
                <label className="label">Sort By</label>
                <p className="control has-icons-left">
                  <span className="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i aria-hidden="true" className="fa-solid fa-sort"></i>
                  </span>
                </p>
              </div>
              <div className="field mb-4">
                <label className="label">Category</label>
                <p className="control has-icons-left">
                  <span className="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i aria-hidden="true" className="fa-solid fa-tags"></i>
                  </span>
                </p>
              </div>
              <div className="field mb-4">
                <label className="label">Cuisine</label>
                <p className="control has-icons-left">
                  <span className="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i
                      aria-hidden="true"
                      className="fa-solid fa-earth-africa"
                    ></i>
                  </span>
                </p>
              </div>
              <div className="field mb-4">
                <label className="label">Time</label>
              </div>
              <div className="filed mb-4">
                <label className="label">Rating</label>
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
              <div className="field mb-4">
                <label className="label">Difficulty</label>
              </div>
              <div className="buttons">
                <button className="button is-primary">Apply filters</button>
                <button className="button is-light">Clear all</button>
              </div>
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

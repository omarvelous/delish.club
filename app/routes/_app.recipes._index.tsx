import { useLoaderData, Link } from "@remix-run/react";
import Stars from "~/components/stars";

type LoaderData = {
  recipes: {
    id: number;
    name: string;
    summary: string;
    slug: string;
    rating: number;
    reviewsCount: number;
    images: {
      cover: string;
    };
    updatedAt: string;
  }[];
};

export const recipes = [
  {
    id: 1,
    name: "Pasta",
    summary: "This is a pasta recipe",
    slug: "pasta",
    rating: 4,
    reviewsCount: 100,
    images: {
      cover:
        "https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg",
    },
    updatedAt: "2022-02-22T12:00:00+00:00",
  },
  {
    id: 2,
    name: "Pizza",
    summary: "This is a pizza recipe",
    slug: "pizza",
    rating: 4,
    reviewsCount: 100,
    images: {
      cover:
        "https://www.rachelcooks.com/wp-content/uploads/2022/02/one-pan-pizza-pasta-1500-9-square.jpg",
    },
    updatedAt: "2022-02-22T12:00:00+00:00",
  },
  {
    id: 3,
    name: "Burger",
    summary: "This is a burger recipe",
    slug: "burger",
    rating: 4,
    reviewsCount: 100,
    images: {
      cover:
        "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
    },
    updatedAt: "2022-02-22T12:00:00+00:00",
  },
];

export const loader = () => {
  return {
    recipes
  };
};

const Search = () => {
  return (
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
              <i aria-hidden="true" className="fa-solid fa-earth-africa"></i>
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
  );
};

const Pagination = () => {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a href="#" className="pagination-previous">
        Previous
      </a>
      <a href="#" className="pagination-next">
        Next page
      </a>
      <ul className="pagination-list">
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 1">
            1
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 45">
            45
          </a>
        </li>
        <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >
            46
          </a>
        </li>
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 47">
            47
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 86">
            86
          </a>
        </li>
      </ul>
    </nav>
  );
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
          <Search />
          <main className="column">
            <div className="fixed-grid has-1-cols-mobile">
              <div className="grid">
                {recipes.map((recipe) => (
                  <div className="cell" key={recipe.id}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img
                            src={recipe.images.cover}
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h3>
                          <Link
                            to={`/recipes/${recipe.id}/${recipe.slug}`}
                          >
                            {recipe.name}
                          </Link>
                        </h3>
                        <p>{recipe.summary}</p>
                        <div className="">
                          <span className="mr-1">{recipe.rating}</span>
                          <span className="mr-1 has-text-warning">
                            <Stars rating={recipe.rating} />
                          </span>
                          <span>({recipe.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination />
          </main>
        </div>
      </section>
    </>
  );
}

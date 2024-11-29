import { useLoaderData, Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

type Recipe = {
  id: number;
  name: string;
  summary: string;
  rating: number;
  ingredients: {
    id: number;
    name: string;
  }[];
  steps: {
    id: number;
    name: string;
    description: string;
    ingredients: {
      id: number;
      name: string;
      amount: string;
    }[];
    images: {
      id: number;
      src: string;
      alt: string;
    }[];
  }[];
  reviews: {
    id: number;
    rating: number;
    comment: string;
    user: {
      id: number;
      name: string;
    };
  }[];
};

type LoaderData = {
  recipe: Recipe;
};

export const loader = () => {
  return {
    recipe: {
      id: 1,
      name: "Cookies",
      summary: "A delicious cookie recipe.",
      rating: 5,
      ingredients: [
        {
          id: 1,
          name: "Ingredient 1",
        },
        {
          id: 2,
          name: "Ingredient 2",
        },
      ],
      steps: [
        {
          id: 1,
          name: "Mix the Batter",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta lacus vitae urna auctor, et imperdiet nisl vestibulum. Ut vitae risus a metus rhoncus tincidunt.",
          ingredients: [
            {
              id: 1,
              name: "Ingredient 1",
              amount: "1 cup",
            },
            {
              id: 2,
              name: "Ingredient 2",
              amount: "2 cups",
            },
          ],
          images: [
            {
              id: 1,
              src: "https://info.ehl.edu/hubfs/Imported_Blog_Media/1440x960-cooking-terms-1.jpg",
              alt: "Image 1",
            },
          ],
        },
        {
          id: 2,
          name: "Mix the Eggs",
          description:
            "Nunc tempor mattis nunc, eget tincidunt ligula vehicula eget.",
          ingredients: [
            {
              id: 1,
              name: "Ingredient 1",
              amount: null,
            },
            {
              id: 2,
              name: "Ingredient 2",
              amount: "2 cups",
            },
          ],
          images: [],
        },
        {
          id: 3,
          name: "Bake the Cake",
          description:
            "Donec in volutpat augue, eu feugiat sapien. Morbi id nunc eu ipsum dapibus eleifend quis et lorem.",
          ingredients: [],
          images: [],
        },
      ],
      reviews: [
        {
          id: 1,
          rating: 5,
          comment: "This is a great recipe!",
          user: {
            id: 1,
            name: "User 1",
          },
        },
        {
          id: 2,
          rating: 4,
          comment: "This is a good recipe!",
          user: {
            id: 2,
            name: "User 2",
          },
        },
      ],
    },
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [];
  }

  const { recipe } = data;

  return [
    { title: recipe.name },
    { name: "description", content: recipe.summary },
    { property: "og:title", content: recipe.name },
    { property: "og:description", content: recipe.summary },
    { property: "og:url", content: "https://example.com" },
    { property: "og:locale", content: "en_US" },
  ];
};

export default function Recipe() {
  const { recipe } = useLoaderData<LoaderData>();

  return (
    <article>
      <section className="hero is-small is-info">
        <div className="hero-body">
          <p className="subtitle is-size-7">Dessert</p>
          <h1 className="title">{recipe.name}</h1>
        </div>
      </section>
      <div className="content">
        <section className="section">
          <p>{recipe.summary}</p>
          <hr />
          <h3>
            <Link to="#ingredients">Ingredients</Link>
          </h3>
          <ul id="ingredients">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
          <hr />
          <h3>
            <Link to="#steps">Steps</Link>
          </h3>
          <ol id="steps">
            {recipe.steps.map((step) => (
              <li key={step.id}>
                <h4>{step.name}</h4>
                {step.ingredients && (
                  <>
                    <ul className="ingredients">
                      {step.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.name}{" "}
                          {ingredient.amount && <>- {ingredient.amount}</>}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <p>{step.description}</p>
                {step.images.map((image) => (
                  <figure key={image.id}>
                    <img src={image.src} alt={image.alt} />
                    <figcaption>{image.alt}</figcaption>
                  </figure>
                ))}
              </li>
            ))}
          </ol>
          <hr />
          <h3>
            <Link to="#reviews">Reviews</Link>
          </h3>
          <ul id="reviews">
            {recipe.reviews.map((review) => (
              <li key={review.id}>
                <div className="has-text-warning">
                  <i aria-hidden="true" className="fa-solid fa-star"></i>
                  <i aria-hidden="true" className="fa-solid fa-star"></i>
                  <i aria-hidden="true" className="fa-solid fa-star"></i>
                  <i aria-hidden="true" className="fa-solid fa-star"></i>
                  <i
                    aria-hidden="true"
                    className="fa-regular fa-star-half-stroke"
                  ></i>
                </div>
                <p>{review.comment}</p>
                <p>By: {review.user.name}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

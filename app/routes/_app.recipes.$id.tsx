import { useLoaderData, Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

enum DirectionTypeEnum {
  Prep,
  Cook,
}

type RecipeType = {
  id: number;
  name: string;
  summary: string;
  category: string;
  rating: number;
  details: {
    prepTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
  };
  images: {
    cover: string;
  };
  ingredients: {
    id: number;
    name: string;
  }[];
  directions: {
    id: number;
    name: string;
    description: string;
    type: DirectionTypeEnum;
    timeInSeconds: number;
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
  nutrition: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
};

type LoaderData = {
  recipe: RecipeType;
};

export const loader = () => {
  return {
    recipe: {
      id: 1,
      name: "Cookies",
      summary: "A delicious cookie recipe.",
      category: "Dessert",
      rating: 5,
      images: {
        cover:
          "https://cdn.loveandlemons.com/wp-content/uploads/2024/08/chocolate-chip-cookie-recipe.jpg",
      },
      details: {
        prepTime: 10,
        cookTime: 20,
        totalTime: 30,
        servings: 12,
      },
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
      directions: [
        {
          id: 1,
          name: "Mix the Batter",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta lacus vitae urna auctor, et imperdiet nisl vestibulum. Ut vitae risus a metus rhoncus tincidunt.",
          type: DirectionTypeEnum.Prep,
          timeInSeconds: 300,
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
          type: DirectionTypeEnum.Prep,
          timeInSeconds: 300,
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
          type: DirectionTypeEnum.Cook,
          timeInSeconds: 300,
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
      nutrition: {
        calories: 100,
        fat: 10,
        carbs: 20,
        protein: 5,
      },
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

const Ingredients = ({
  ingredients,
}: {
  ingredients: RecipeType["ingredients"];
}) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-egg"></i>
          </span>
          <Link to="#ingredients">Ingredients</Link>
        </span>
      </h3>
      <ul id="ingredients">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Directions = ({
  directions,
}: {
  directions: RecipeType["directions"];
}) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-list-check"></i>
          </span>
          <Link to="#directions">Directions</Link>
        </span>
      </h3>
      <ol id="directions">
        {directions.map((direction, i) => (
          <li key={direction.id}>
            <span className="has-text-weight-semibold">Step {i + 1}</span>
            <h4>
              <span className="mr-1">
                <input type="checkbox" />
              </span>
              <Link to={`#direction-${i + 1}`}>{direction.name}</Link>
              <span className="subtitle is-size-6 is-pulled-right has-text-grey">
                <span className="icon-text">
                  <span className="icon">
                    <i aria-hidden="true" className="fa-regular fa-clock"></i>
                  </span>
                  {direction.timeInSeconds} sec
                </span>
              </span>
            </h4>
            {direction.ingredients && (
              <>
                <ul className="ingredients is-size-7">
                  {direction.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name}{" "}
                      {ingredient.amount && <>- {ingredient.amount}</>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p>{direction.description}</p>
            {direction.images.map((image) => (
              <figure key={image.id}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
};

const Nutrition = ({ nutrition }: { nutrition: RecipeType["nutrition"] }) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-apple-alt"></i>
          </span>
          <Link to="#nutrition">Nutrition</Link>
        </span>
        <span className="subtitle is-size-6 is-pulled-right has-text-grey">
          per serving
        </span>
      </h3>
      <dl id="nutrition">
        <dt className="has-text-weight-semibold">Calories</dt>
        <dd>{nutrition.calories}</dd>
        <dt className="has-text-weight-semibold">Fat</dt>
        <dd>{nutrition.fat}g</dd>
        <dt className="has-text-weight-semibold">Carbs</dt>
        <dd>{nutrition.carbs}g</dd>
        <dt className="has-text-weight-semibold">Protein</dt>
        <dd>{nutrition.protein}g</dd>
      </dl>
    </div>
  );
};

const Reviews = ({ reviews }: { reviews: RecipeType["reviews"] }) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-star"></i>
          </span>
          <Link to="#reviews">Reviews</Link>
        </span>
        <span className="subtitle is-size-6 is-pulled-right has-text-grey">
          {reviews.length}
        </span>
      </h3>
      <ul id="reviews">
        {reviews.map((review) => (
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
    </div>
  );
};

export default function Recipe() {
  const { recipe } = useLoaderData<LoaderData>();

  return (
    <article>
      <section
        className="hero is-small is-link has-background-image"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(66, 88, 255, 0.2), rgba(66, 88, 255, .9), rgba(66, 88, 255, 1)), url(${recipe.images.cover})`,
        }}
      >
        <div className="hero-body">
          <p className="subtitle">{recipe.category}</p>
          <h1 className="title">{recipe.name}</h1>
        </div>
      </section>
      <div className="content">
        <section className="section">
          <blockquote>{recipe.summary}</blockquote>
          <h4>Details</h4>
          <dl>
            <dt className="has-text-weight-semibold">Prep Time</dt>
            <dd>{recipe.details.prepTime} min</dd>
            <dt className="has-text-weight-semibold">Cook Time</dt>
            <dd>{recipe.details.cookTime} min</dd>
            <dt className="has-text-weight-semibold">Total Time</dt>
            <dd>{recipe.details.cookTime + recipe.details.prepTime} min</dd>
            <dt className="has-text-weight-semibold">Servings</dt>
            <dd>{recipe.details.servings}</dd>
          </dl>
          <Ingredients ingredients={recipe.ingredients} />
          <Directions directions={recipe.directions} />
          <Nutrition nutrition={recipe.nutrition} />
          <Reviews reviews={recipe.reviews} />
        </section>
      </div>
    </article>
  );
}

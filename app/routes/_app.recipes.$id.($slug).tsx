import { useState } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import Stars from "~/components/stars";

enum DirectionTypeEnum {
  Prep,
  Cook,
}

type RecipeType = {
  id: number;
  name: string;
  summary: string;
  publishedAtDate: string;
  category: string;
  cuisine: string;
  rating: number;
  details: {
    prepTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
    yield: {
      amount: number;
      unit: string;
    };
  };
  images: {
    cover: string;
  };
  ingredients: {
    id: number;
    name: string;
  }[];
  instructions: {
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
    createdAt: string;
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
      publishedAtDate: "2024-08-01",
      category: "Dessert",
      cuisine: "American",
      rating: 4.5,
      images: {
        cover:
          "https://cdn.loveandlemons.com/wp-content/uploads/2024/08/chocolate-chip-cookie-recipe.jpg",
      },
      details: {
        prepTime: 10,
        cookTime: 20,
        totalTime: 30,
        servings: 12,
        yield: {
          amount: 12,
          unit: "cookies",
        },
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
      instructions: [
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
              alt: "Mix the eggs",
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
          createdAt: "2024-08-01",
          user: {
            id: 1,
            name: "User 1",
          },
        },
        {
          id: 2,
          rating: 4,
          comment: "This is a good recipe!",
          createdAt: "2024-08-01",
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
    { property: "og:type", content: "article" },
    { property: "og:title", content: recipe.name },
    { property: "og:description", content: recipe.summary },
    { property: "og:site_name", content: "Delish.club" },
    { property: "og:url", content: "https://example.com" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: recipe.images.cover },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:site", content: "@delish.club" },
    { property: "twitter:title", content: recipe.name },
    { property: "twitter:description", content: recipe.summary },
    { property: "twitter:image", content: recipe.images.cover },
    { property: "twitter:image:alt", content: `Image of ${recipe.name}` },
    { itemProp: "name", content: recipe.name },
  ];
};

const Details = ({ details }: { details: RecipeType["details"] }) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-circle-info"></i>
          </span>
          <Link to="#details">Details</Link>
        </span>
      </h3>
      <dl id="details">
        <dt className="has-text-weight-semibold">Prep Time</dt>
        <dd>{details.prepTime} min</dd>
        <dt className="has-text-weight-semibold">Cook Time</dt>
        <dd>{details.cookTime} min</dd>
        <dt className="has-text-weight-semibold">Total Time</dt>
        <dd>{details.totalTime} min</dd>
        <dt className="has-text-weight-semibold">Servings</dt>
        <dd>{details.servings}</dd>
        <dt className="has-text-weight-semibold">Yield</dt>
        <dd>
          {details.yield.amount} {details.yield.unit}
        </dd>
      </dl>
    </div>
  );
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
          <li key={ingredient.id} itemProp="ingredients">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Instruction = ({
  instruction,
  index,
}: {
  instruction: RecipeType["instructions"][0];
  index: number;
}) => {
  const [isComplete, SetIsComplete] = useState(false);

  const handleChange = () => {
    SetIsComplete(!isComplete);
  };

  return (
    <>
      <span className="has-text-weight-semibold">Step {index}</span>
      <h4>
        <span className="mr-1">
          <input type="checkbox" checked={isComplete} onChange={handleChange} />
        </span>
        <Link to={`#instruction-${index}`}>{instruction.name}</Link>
        <span className="subtitle is-size-6 is-pulled-right has-text-grey">
          <span className="icon-text">
            <span className="icon">
              <i aria-hidden="true" className="fa-regular fa-clock"></i>
            </span>
            {instruction.timeInSeconds} sec
          </span>
        </span>
      </h4>
      <div className={isComplete ? "is-hidden" : ""}>
        <div className="columns mb-2">
          <div className="column">
            {instruction.ingredients && (
              <>
                <ul className="ingredients">
                  {instruction.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name}{" "}
                      {ingredient.amount && <>- {ingredient.amount}</>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p>{instruction.description}</p>
          </div>
          <div className="column is-two-fifths">
            {instruction.images.map((image) => (
              <figure key={image.id} className="">
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Instructions = ({
  instructions,
}: {
  instructions: RecipeType["instructions"];
}) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-list-check"></i>
          </span>
          <Link to="#instructions">Instructions</Link>
        </span>
      </h3>
      <ol id="instructions">
        {instructions.map((instruction, i) => (
          <li key={instruction.id} className="mb-2">
            <Instruction instruction={instruction} index={i + 1} />
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

const Reviews = ({
  rating,
  reviews,
}: {
  rating: RecipeType["rating"];
  reviews: RecipeType["reviews"];
}) => {
  return (
    <div className="mt-6">
      <h3>
        <span className="icon-text">
          <span className="icon has-text-link">
            <i aria-hidden="true" className="fa-solid fa-star"></i>
          </span>
          <Link to="#reviews">
            Reviews <span className="subtitle is-size-6">{rating}</span>
          </Link>
        </span>
        <span className="subtitle is-size-6 is-pulled-right has-text-grey">
          ({reviews.length})
        </span>
      </h3>
      <ul id="reviews">
        {reviews.map((review) => (
          <li key={review.id}>
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <span className="has-text-warning">
                <Stars rating={review.rating} />
              </span>
              <span className="is-size-7">{review.createdAt}</span>
            </div>
            <p>{review.comment}</p>
            <p>By: {review.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const StructuredData = ({ recipe }: { recipe: RecipeType }) => {
  // https://developers.google.com/search/docs/appearance/structured-data/recipe
  const content = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    image: recipe.images.cover,
    datePublished: recipe.publishedAtDate,
    description: recipe.summary,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      reviewCount: recipe.reviews.length,
    },
    recipeIngredient: recipe.ingredients.map((ingredient) => ingredient.name),
    recipeInstructions: recipe.instructions.map((instruction) => ({
      "@type": "HowToStep",
      text: instruction.description,
    })),
    recipeYield: [
      recipe.details.servings,
      `${recipe.details.yield.amount} ${recipe.details.yield.unit}`,
    ],
    prepTime: `PT${recipe.details.prepTime}M`,
    cookTime: `PT${recipe.details.cookTime}M`,
    totalTime: `PT${recipe.details.totalTime}M`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    nutrition: {
      "@type": "NutritionInformation",
      calories: recipe.nutrition.calories,
      fatContent: `${recipe.nutrition.fat}g`,
      carbohydrateContent: `${recipe.nutrition.carbs}g`,
      proteinContent: `${recipe.nutrition.protein}g`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: `${JSON.stringify(content)}` }}
    />
  );
};

export default function Recipe() {
  const { recipe } = useLoaderData<LoaderData>();

  return (
    <article id="recipe">
      <section
        className="hero is-small is-link has-background-image"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(66, 88, 255, 0.2), rgba(66, 88, 255, .9), rgba(66, 88, 255, 1)), url(${recipe.images.cover})`,
        }}
      >
        <div className="hero-body">
          <p className="subtitle is-size-7">{recipe.category}</p>
          <h1 className="title">
            {recipe.name}
            <div className="is-size-7 mt-1">
              <span className="mr-1">{recipe.rating}</span>
              <span className="mr-1 has-text-warning">
                <Stars rating={recipe.rating} />
              </span>
              <span className="mr-1">({recipe.reviews.length})</span>
              <span>{recipe.details.totalTime} min</span>
            </div>
          </h1>
        </div>
      </section>
      <div className="content">
        <section className="section">
          <blockquote>{recipe.summary}</blockquote>
          <div className="columns">
            <div className="column is-one-third">
              <Details details={recipe.details} />
            </div>
            <div className="column">
              <Ingredients ingredients={recipe.ingredients} />
            </div>
          </div>
          <Instructions instructions={recipe.instructions} />
          <div className="columns">
            <div className="column is-one-third">
              <Nutrition nutrition={recipe.nutrition} />
            </div>
            <div className="column">
              <Reviews rating={recipe.rating} reviews={recipe.reviews} />
            </div>
          </div>
        </section>
      </div>
      <StructuredData recipe={recipe} />
    </article>
  );
}

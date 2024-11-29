import { useLoaderData } from "@remix-run/react";

type Recipe = {
  id: number;
  name: string;
  rating: number;
  ingredients: {
    id: number;
    name: string;
  }[];
  steps: {
    id: number;
    name: string;
    description: string;
    ingredients?: {
      id: number;
      name: string;
      amount: string;
    }[];
    images?: {
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

export const loader = async () => {
  return {
    recipe: {
      id: 1,
      name: "Cookies",
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
            },
            {
              id: 2,
              name: "Ingredient 2",
              amount: "2 cups",
            },
          ],
        },
        {
          id: 3,
          name: "Bake the Cake",
          description:
            "Donec in volutpat augue, eu feugiat sapien. Morbi id nunc eu ipsum dapibus eleifend quis et lorem.",
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

export default function Recipe() {
  const { recipe } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step.id}>
            <h3>{step.name}</h3>
            {step.ingredients && (
              <ul>
                {step.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.name} - {ingredient.amount}
                  </li>
                ))}
              </ul>
            )}
            {step.images && (
              <ul>
                {step.images.map((image) => (
                  <li key={image.id}>
                    <img src={image.src} alt={image.alt} />
                  </li>
                ))}
              </ul>
            )}
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <h2>Reviews</h2>
      <ul>
        {recipe.reviews.map((review) => (
          <li key={review.id}>
            <h3>Rating: {review.rating}</h3>
            <p>{review.comment}</p>
            <p>By: {review.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

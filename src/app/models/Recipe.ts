export interface PartialRecipe {
  title: String;
  description: String;
  servings: String;
  prepTime: String;
  cookTime: String;
  ingredients: Ingredient[];
  directions: Direction[];
}

export interface FullRecipe {
  title: String;
  description: String;
  servings: String;
  prepTime: String;
  cookTime: String;
  ingredients: Ingredient[];
  directions: Direction[];
  images: Image;
  editDate: String;
  postDate: String;
  uuid: String;
}

export interface Recipe {
  partial: PartialRecipe;
  images: Image;
  editDate: String;
  postDate: String;
  uuid: String;
}

export interface Ingredient {
  amount: Number;
  measurement: String;
  name: String;
  uuid: String;
}

export interface Direction {
  instructions: string;
  optional: boolean;
}

export interface Image {
  full: string;
  medium: string;
  small: string;
}

export type Ingredient = {
  name: string;
  quantity: string;
  productUrl: string;
  linkVerified?: boolean;
};
export type Cocktail = {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  preparation: string;
  allergens: string;
  available: boolean;
  published: boolean;
  max_quantity: number;
};
export type OrderStatus =
  "NEW" | "ACCEPTED" | "PREPARING" | "DELIVERED" | "CANCELLED";
export type CocktailOrder = {
  id: number;
  reference: string;
  cocktail_id: string;
  cocktail_name: string;
  seat: string;
  quantity: number;
  note: string;
  status: OrderStatus;
  assigned_staff: string;
  version: number;
  created: string;
  updated: string;
};
export type OrderState = { message: string; ok?: boolean; reference?: string };

"use client";
import { useState } from "react";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveCocktail } from "../actions/cocktails.actions";
import type { Cocktail } from "../types";
export function CocktailEditor({ cocktail }: { cocktail?: Cocktail }) {
  const [rows, setRows] = useState(
    () =>
      cocktail?.ingredients.map((ingredient, i) => ({
        key: String(i),
        ingredient,
      })) || [
        {
          key: "0",
          ingredient: {
            name: "",
            quantity: "",
            productUrl: "",
            linkVerified: false,
          },
        },
      ],
  );
  return (
    <ActionForm
      action={saveCocktail}
      label={cocktail ? "Save cocktail" : "Add cocktail"}
    >
      <input type="hidden" name="id" value={cocktail?.id || ""} />
      <label>
        Name
        <Input
          name="name"
          defaultValue={cocktail?.name}
          required
          minLength={2}
          maxLength={120}
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          defaultValue={cocktail?.description}
          maxLength={1000}
        />
      </label>
      <label>
        Image URL
        <Input
          name="image"
          type={cocktail?.image.startsWith("data:") ? "hidden" : "url"}
          defaultValue={cocktail?.image}
          placeholder="https://…"
        />
      </label>
      <label>
        Upload image
        <Input
          name="imageFile"
          type="file"
          accept="image/png,image/jpeg,image/webp"
        />
        <span className="hint">PNG, JPEG or WebP, up to 700 KB.</span>
      </label>
      <fieldset className="cocktail-ingredients">
        <legend>Ingredients & product links</legend>
        {rows.map(({ key, ingredient }, i) => (
          <div className="ingredient-editor" key={key}>
            <input type="hidden" name="ingredientKey" value={key} />
            <label>
              Ingredient {i + 1}
              <Input
                name={`ingredientName-${key}`}
                defaultValue={ingredient.name}
                required
                maxLength={100}
              />
            </label>
            <label>
              Quantity <span className="hint">(where approved)</span>
              <Input
                name={`ingredientQuantity-${key}`}
                defaultValue={ingredient.quantity}
                maxLength={80}
                placeholder="e.g. 150 ml"
              />
            </label>
            <label>
              Osusu product URL <span className="hint">(optional)</span>
              <Input
                type="url"
                name={`ingredientUrl-${key}`}
                defaultValue={ingredient.productUrl}
                maxLength={2000}
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                name={`ingredientVerified-${key}`}
                defaultChecked={ingredient.linkVerified}
              />{" "}
              I checked that this link opens the correct product.
            </label>
            <Button
              variant="outline"
              type="button"
              disabled={rows.length === 1}
              onClick={() =>
                setRows((current) => current.filter((row) => row.key !== key))
              }
            >
              Remove ingredient
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          type="button"
          disabled={rows.length >= 30}
          onClick={() =>
            setRows((current) => [
              ...current,
              {
                key: crypto.randomUUID(),
                ingredient: {
                  name: "",
                  quantity: "",
                  productUrl: "",
                  linkVerified: false,
                },
              },
            ])
          }
        >
          Add ingredient
        </Button>
      </fieldset>
      <label>
        Preparation notes
        <textarea
          name="preparation"
          defaultValue={cocktail?.preparation}
          maxLength={3000}
        />
      </label>
      <label>
        Allergen information <span className="hint">(optional)</span>
        <textarea
          name="allergens"
          defaultValue={cocktail?.allergens}
          maxLength={1000}
        />
      </label>
      <label>
        Maximum quantity per order
        <Input
          name="maxQuantity"
          type="number"
          min={1}
          max={10}
          defaultValue={cocktail?.max_quantity || 1}
          required
        />
      </label>
      <label className="check">
        <input
          type="checkbox"
          name="available"
          defaultChecked={cocktail?.available ?? true}
        />{" "}
        Available to order
      </label>
      <label className="check">
        <input
          type="checkbox"
          name="published"
          defaultChecked={cocktail?.published ?? false}
        />{" "}
        Publish on guest menu
      </label>
    </ActionForm>
  );
}

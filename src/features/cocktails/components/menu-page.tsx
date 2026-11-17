import Image from "next/image";
import { getCatalogue } from "../data";
import { CocktailEditor } from "./cocktail-editor.client";
import { ActionForm } from "@/components/ui/action-form";
import { setAvailability } from "../actions/cocktails.actions";
import "../styles.css";
export async function CocktailMenuPage() {
  const { cocktails } = await getCatalogue();
  return (
    <section className="section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Coca-Cola cocktail bar</p>
          <h1>Cocktail menu.</h1>
          <p>
            Create the mixes, verify ingredient links, and keep availability up
            to date.
          </p>
        </div>
      </div>
      <p className="cocktail-notice">
        Product links are optional. Verify each ingredient link before
        publishing.
      </p>
      <div className="grid-2">
        <section className="panel">
          <div className="panel-head">
            <h2>Add a cocktail.</h2>
          </div>
          <div className="panel-body">
            <CocktailEditor />
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>The menu · {cocktails.length}</h2>
          </div>
          <div className="panel-body space-y-6">
            {!cocktails.length && (
              <p>No cocktails yet. Add the first mix to open your menu.</p>
            )}
            {cocktails.map((c) => (
              <article className="cocktail-admin-card" key={c.id}>
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={320}
                    height={200}
                    unoptimized
                    className="cocktail-image"
                  />
                )}
                <h3>{c.name}</h3>
                <p>
                  {c.published ? "Published" : "Draft"} ·{" "}
                  {c.available ? "Available" : "Unavailable"}
                </p>
                <ActionForm
                  action={setAvailability}
                  label={c.available ? "Mark unavailable" : "Make available"}
                >
                  <input type="hidden" name="id" value={c.id} />
                  <input
                    type="hidden"
                    name="available"
                    value={String(!c.available)}
                  />
                </ActionForm>
                <details>
                  <summary>Edit recipe & settings</summary>
                  <div className="mt-5">
                    <CocktailEditor cocktail={c} />
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

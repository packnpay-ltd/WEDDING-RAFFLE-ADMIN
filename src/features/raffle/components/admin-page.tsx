import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { Login, logout } from "@/features/auth";
import { Dashboard } from "./dashboard";
import { Button } from "@/components/ui/button";
export async function AdminPage() {
  const token = (await cookies()).get("raffle_admin")?.value;
  if (!token) return <Login />;
  let data, error;
  try {
    data = await api("/admin", undefined, token);
  } catch (e) {
    error = (e as Error).message;
  }
  if (error)
    return (
      <main className="gate">
        <div className="panel">
          <h2>Unable to load the desk</h2>
          <p className="my-5">{error}</p>
          <form action={logout}>
            <Button type="submit">Return to sign-in</Button>
          </form>
        </div>
      </main>
    );
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){function pick(){var links=[].slice.call(document.querySelectorAll(".nav a"));var nodes=links.map(function(a){return document.getElementById(a.getAttribute("href").slice(1));}).filter(Boolean);var hash=location.hash;var target=hash&&document.getElementById(hash.slice(1));var chosen=nodes[0];if(target){var top=target.getBoundingClientRect().top;if(top>=-8&&top<=140)chosen=target;}if(!chosen||chosen!==target){for(var i=0;i<nodes.length;i++)if(nodes[i].getBoundingClientRect().top<=120)chosen=nodes[i];}var id=chosen?"#"+chosen.id:"#overview";links.forEach(function(a){var on=a.getAttribute("href")===id;a.classList.toggle("active",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});var label=document.querySelector("[data-current]");var item=links.filter(function(a){return a.getAttribute("href")===id;})[0];if(label&&item)label.textContent=item.textContent.trim();}function boot(){pick();document.addEventListener("scroll",pick,true);window.addEventListener("hashchange",pick);}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();})();`,
        }}
      />
      <Dashboard data={data} />
    </>
  );
}

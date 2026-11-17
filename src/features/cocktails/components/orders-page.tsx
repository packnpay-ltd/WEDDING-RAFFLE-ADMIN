import { getOrders } from "../data";
import { OrdersQueue } from "./orders-queue.client";
import "../styles.css";
export async function CocktailOrdersPage() {
  return (
    <section className="section">
      <OrdersQueue orders={await getOrders()} />
    </section>
  );
}

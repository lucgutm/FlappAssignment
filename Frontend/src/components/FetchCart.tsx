import { Show, createSignal } from "solid-js";
import { storedCart } from "../utils/store";

export default function App() {
  const [cart, setCart] = storedCart;
  const [loading, setLoading] = createSignal(false);

  const fetchRandomCart = async () => {
    setLoading(true);
    // fetch the total number of carts, limit=1 for performance
    const cartsResponse = await fetch('https://dummyjson.com/carts?limit=1');
    const carts = await cartsResponse.json();

    // random cart between 1 and the total number of carts
    const randInt = Math.floor(1 + Math.random() * carts.total);
    const cartResponse = await fetch(`https://dummyjson.com/carts/${randInt}`);
    const cart = await cartResponse.json();

    setCart(JSON.stringify(cart));
    setLoading(false);
  }

  return (
    <>
      <button class="bg-[#0056b8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchRandomCart}>
        <Show when={loading()}>
          <svg class="animate-spin h-5 w-5 mr-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path>
          </svg>
        </Show>
        <Show when={cart() === "[]"} fallback="Generar nuevo carrito"> Generar carrito </Show>
      </button>
    </>
  );
};

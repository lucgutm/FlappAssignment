import { createEffect } from "solid-js";
import { storedCart } from "../utils/store";

export default function EmptyCart() {
  const [cart, setCart] = storedCart;

  return (
    <>
      <a href="/"
        class="bg-orange-300 font-bold rounded-md p-2"
        onClick={() => setCart("[]")}>
        Limpiar carrito
      </a>
    </>
  );
};

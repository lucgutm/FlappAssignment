import { Show, For } from "solid-js";
import { storedCart } from "../utils/store";

export default function CartList() {
  const [cart, _] = storedCart;

  return (
    <>
      <Show when={cart() !== "[]"} fallback="Carrito vacío">
        <div class="flex flex-col gap-4">
          <For each={JSON.parse(cart()).products}>
            {item => (
              <div class="bg-gray-100 rounded-md flex flex-row gap-2">
                <div class="flex flex-col items-center justify-center bg-white m-4 rounded-xl">
                  <img src={item.thumbnail} alt={item.title} class="basis-1/3 max-w-32 rounded-md" />
                </div>
                <div class="flex flex-col gap-2 p-4">
                  <p>Producto: {item.id}</p>
                  <p>Precio: {item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Descuento: {item.discountPercentage}</p>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </>
  );
};

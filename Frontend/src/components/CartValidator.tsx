import { createSignal, Show } from "solid-js";
import { storedCart } from "../utils/store";

export default function CartValidator() {
  const [cart, _] = storedCart;
  const [loading, setLoading] = createSignal(false);
  const [cartValid, setCartValid] = createSignal(false);
  const [firstRender, setFirstRender] = createSignal(true);

  const validateCart = async () => {
    setLoading(true);
    const cartBody = JSON.parse(cart()).products.map((item: any) => {
      return {
        productId: item.id,
        price: item.price,
        quantity: item.quantity,
        discount: item.discountPercentage
      };
    });
    const response = await fetch('https://flapp-validate-cart-426mr3fpua-ue.a.run.app/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartBody)
    });
    response.json()
    .then(data => setCartValid(data))
    .catch(err => console.error(err))
    .finally(() => {
      setLoading(false);
      setFirstRender(false);
    });
  }

  return (
    <>
      <Show when={cart() !== "[]"} fallback="">
        <div class="bg-gray-100 rounded-md flex flex-col gap-4 p-4">
          <h4 class="text-lg">Datos de la compra</h4>
          <div class="bg-gray-100 rounded-md pl-10">
            {/* compute total price */}
            <p>Precio total: $<span>{JSON.parse(cart()).products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}</span></p>
            <p>Despacho: <span>
              <Show when={loading()}>
                Cargando...
              </Show>
              <Show when={!firstRender() && !loading()}>
                <Show when={cartValid()} fallback="No hay envíos disponibles :(">
                  Envío Flapp ⚡ - $3670
                </Show>
              </Show>
            </span>
            </p>
          </div>
        </div>
      </Show>
      <div class="flex flex-row-reverse text-white font-bold">
        <button class="bg-[#0056b8] hover:bg-blue-700 rounded-md p-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          onClick={() => validateCart()}
          disabled={cart() === "[]" || loading()}>
          Cotizar despacho
        </button>
      </div>
    </>
  );
};

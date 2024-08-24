import { createSignal, type Signal } from 'solid-js';

// const initialCart = localStorage.getItem("cart") ?? "[]";
// const [cart, setCart] = createSignal(initialCart);

// createEffect(() => {
//   localStorage.setItem("cart", cart());
// })

// return [value, setValueAndStore];

function createStoredSignal(
  key: string,
  defaultValue: string, 
  storage = localStorage
): Signal<string> {

 const initialValue = storage.getItem(key) ?? defaultValue;

 const [value, setValue] = createSignal(initialValue);

 const setValueAndStore = ((arg: string) => {
   const v = setValue(arg);
   storage.setItem(key, arg);
   return v;
 }) as typeof setValue;

 return [value, setValueAndStore];
}

export const storedCart = createStoredSignal('cart', '[]');
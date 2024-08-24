## Prueba Técnica Flapp

### Descripción

Este proyecto es una prueba técnica para la empresa Flapp. Consiste en una aplicación web que simula un e-commerce usando la api `dummyjson.com`

### Tecnologías usadas

- Frontend:
    - Página web estática SPA
    - Node js
    - Astro para armar todo https://astro.build/
    - Solid JS para componentes reactivos https://www.solidjs.com/
    - Tailwind CSS para el diseño
    - APIs nativas para hacer solicitudes web (fetch) y manejar el estado de la aplicación (localStorage)

- Backend:
    - Flask para el servidor web
    - Google Cloud Run para escalar la aplicación

### Estructura del proyecto

- `frontend/`: Contiene el código del frontend de la aplicación. Se puede correr una versión local instalando las dependencias y corriendo el comando `npm run dev`
- `backend/`: Contiene el código del backend de la aplicación. Se puede correr una versión local instalando las dependencias (de preferencia en un entorno virtual) y corriendo el comando `python main.py`

### Demo

La aplicación tiene una demo acá hosteada en Firebase Hosting: https://showcase-5b975.web.app/

El backend está desplegado en Google Cloud Run y se puede acceder a través de la siguiente URL: [https://flapp-validate-cart-426mr3fpua-ue.a.run.app](https://flapp-validate-cart-426mr3fpua-ue.a.run.app)
Solo acepta solicitudes POST en la ruta `/api/cart` con el siguiente formato:

```json
{
    [
        {
            "productId": "1",
            "price": 2,
            "quantity": 1,
            "discount": 4
        },
        {
            "productId": "2",
            "price": 3,
            "quantity": 2,
            "discount": 0
        },
        ...
    ]
}
```
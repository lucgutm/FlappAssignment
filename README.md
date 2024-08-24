## Prueba Técnica Flapp

### Descripción

Este proyecto es una prueba técnica para la empresa Flapp. Consiste en una aplicación web que simula un e-commerce usando la api `dummyjson.com`

### Decisiones de diseño

Cosas que se tuvieron en cuenta al diseñar la aplicación:

- SPA: la app se despliega como una aplicación web estática, se comunica con el backend usando APIs nativas de los navegadores (como fetch) y maneja el estado de la aplicación usando localStorage
- Backend: un servidor sencillo usando Flask, hosteado en Google Cloud Run. Se agregaron headers de CORS para permitir solicitudes desde cualquier origen.
    - El cuello de botella del backend es la api de `dummyjson.com` que puede bloquear solicitudes si se hacen muchas en poco tiempo, causando que la aplicación retorne errores 500.

### Tecnologías usadas

- Frontend:
    - Node js usando typescript
    - Astro para armar todo https://astro.build/
    - Solid JS para componentes reactivos https://www.solidjs.com/
    - Tailwind CSS para el diseño
    - APIs nativas del navegador

- Backend:
    - Flask para el servidor web
    - Google Cloud Run para escalar la aplicación

### Estructura del proyecto

- `frontend/`: Contiene el código del frontend de la aplicación. Se puede correr una versión local instalando las dependencias y corriendo el comando `npm run dev`
- `backend/`: Contiene el código del backend de la aplicación. Se puede correr una versión local instalando las dependencias (de preferencia en un entorno virtual) y corriendo el comando `python main.py`

### Consideraciones

Apretar demasiado el botón "Cotizar despacho" puede causar que la api de `dummyjson.com` bloquee las solicitudes del backend con un error 429 Too Many Requests.

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
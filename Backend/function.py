from flask import Flask, request, jsonify, make_response
import requests
import asyncio
import aiohttp
# también se puede usar el modulo flask_cors e importar CORS
# pero no demuestra el uso de los headers

app = Flask(__name__)

@app.errorhandler(400)
def not_found(error):
    response = make_response("Bad request", 400)
    response.headers.add("Access-Control-Allow-Origin", "*") # no hacer esto en producción
    return response

async def fetch_data(session, url):
    async with session.get(url) as response:
        if response.status == 200:
            return await response.json()
        else:
            raise Exception(f"Error fetching data from {url}: {response.status}")
        
async def make_requests(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [asyncio.create_task(fetch_data(session, url)) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

@app.route('/api/cart', methods=['POST', 'OPTIONS'])
async def validate_cart():
    """Valida si hay suficiente stock para los productos en el carrito.

    Args:
        data (list): Lista de productos en el carrito. Cada elemento
        es un diccionario con las llaves 'productId', 'price', 'quantity' y 'discount'.

    Returns:
        bool: True si hay suficiente stock para todos los productos en el carrito, False en caso contrario.
    """
    if request.method == "OPTIONS": # CORS preflight
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response
    
    elif request.method == "POST":
        # Carrito enviado por el cliente
        cart = request.get_json()

        # Se obtiene la cantidad total de productos
        totalResponse = requests.get('https://dummyjson.com/products?limit=1').json()
        total = totalResponse['total']
        pages = total // 10 + 1

        # Se llama a la api (simulación de BD) de forma concurrente
        # Solo se solicita id, title(nombre), stock y rating
        urls = [
            f'https://dummyjson.com/products?select=title,stock,rating&limit=10&skip={i*10}'
            for i in range(pages)
        ]
        results = await make_requests(urls)
        # Se crea un diccionario con la BD
        dbItems = dict()
        for page in results:
            for item in page['products']:
                dbItems[item['id']] = item

        # Se verifica stock
        sufficientStock = True
        for cartItem in cart:
            id = cartItem['productId'] # id del producto del carrito

            if id in dbItems:
                dbItem = dbItems[id]

                # Impresión en consola de los datos
                # Notar que se muestra información tanto del carrito como de la BD
                print(f"Item id: {id}")
                print(f"\tNombre: {dbItem['title']}")
                print(f"\tPrecio por unidad: {cartItem['price']}")
                # Descuento = precio * cantidad * descuento%
                descuentoTotal = cartItem['price'] * cartItem['quantity'] * cartItem['discount'] / 100
                print(f"\tDescuento total: {descuentoTotal}")
                print(f"\tCantidad solicitada: {cartItem['quantity']}")
                print(f"\tStock obtenido: {dbItem['stock']}")
                print(f"\tRating: {dbItem['rating']}")

                # Stock real: Sr = floor(St / r)
                #   donde St es el stock y r es el rating
                #   se asume que ambos valores son positivos
                if dbItem['rating'] > 0:
                    stockReal = dbItem['stock'] // dbItem['rating']
                else:
                    stockReal = 'No calculable'
                print(f"\tStock real: {stockReal}")

                # Se verifica si hay suficiente stock
                if dbItems[id]['stock'] < cartItem['quantity']:
                    sufficientStock = False

        response = jsonify(sufficientStock)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response


if __name__ == '__main__':
    app.run(debug=True)
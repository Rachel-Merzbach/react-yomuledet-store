const API_URL = "http://localhost:8080/api/product";
import db from './db.json'
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

export function getProductsList() {
    return fetch(`${API_URL}/all`)
        .then((res) => res.json())
}


export function getProductsByIds(products) {
    let detailsProducts = []
    products.map( p => {
        return fetch(`${API_URL}/find?_id=${p.productId}`)
        .then(res => res.json())
        .then (res => {detailsProducts.push(res); return res})
        // .then(() => detailsProducts)
    })
    // .then(
    //     () => detailsProducts
    // )
    return detailsProducts
    // return fetch(`${API_URL}/find?${products.map(p => "id=" + p.productId).join("&")}`)
    //     .then((res) => res.json()
    //         .then((products) => {
    //             return products
    //         }));
}


export function removeProduct(id, setReload) {

    return fetch(`${API_URL}/delete?id=${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .then(setReload())
}

export function addProductToCatalog(newProduct) {
    console.log(newProduct)
    return fetch(`${API_URL}/create`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(newProduct)
    }).then((res) => res.json());
}

export function addSaleToProduct(product, mySale, reload) {
    const newProduct = {
        _id: product._id,
        name: product.name,
        description: product.description,
        picture: product.picture,
        price: product.price,
        sale: mySale
    }
    return fetch(`${API_URL}/update?id=${product._id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify(newProduct)
    }).then((res) => res.json())
        .then(reload())
}



export function insertAllProductsToDB () {
    let myProducts = db.products
    myProducts.forEach(product => {
        addProductToCatalog(product)
    })
}
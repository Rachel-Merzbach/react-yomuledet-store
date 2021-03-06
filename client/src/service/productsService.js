import db from './db.json'
const API_URL = "http://localhost:8080/api/product";

const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

export function getProductsList() {
    return fetch(`${API_URL}/all`)
        .then((res) => res.json())
}


function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
    return output;
}


export function getProductsByIds(products) {
    var ids = getFields(products, "productId");
    return fetch(`${API_URL}/allids`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({"ids": ids})
    }).then((res) => res.json())
    .then(res => res)
}


export function removeProduct(id, setReload) {

    return fetch(`${API_URL}/delete?id=${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .then(setReload())
}

export function addProductToCatalog(newProduct) {
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


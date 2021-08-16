
import { getProductsByIds } from "./productsService";

const API_URL = "http://localhost:8080/api/order";

const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

export function getUserProductsList() {
    return fetch(`${API_URL}/all?userId=${localStorage.getItem("userId")}`)
        .then(res => res.json())
        
        .then(res =>{
            if(res.length) return getProductsByIds(res)
            return undefined} )
        // .then(res => {console.log(res); return res;})
        // .then(res => {
        //     console.log(res)
        //     if(res.length) {

        //         return res.json();
        //     }
        //     return []
        // })
        // .then(res => {console.log(res); return res.json()});
}


export function addProduct(product) {
    console.log(product)
    return fetch(`${API_URL}/create`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(product)
    }).then((res) => res.json());
}


export function deleteProduct(userId, productId) {
    return fetch(`${API_URL}/find?userId=${userId}&productId=${productId}`)
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            return fetch(`${API_URL}/delete?_id=${res._id}`, {
                headers: API_HEADERS,
                method: "DELETE",
                params: {userId:userId, productId:productId}
            })
        })
}



export function isProductExist(productId) {
    return fetch(`${API_URL}/find?userId=${localStorage.getItem("userId")}&productId=${productId}`)
        .then(res => res.json())
        .then(res => res.message ? false : true)
        .then(res => res)
}




export async function getPayment() {
    const API_USER = "http://localhost:8080/api/product";
    let discount = 0;
    let price = 0;
    let itemsUser = await getUserProductsList();
    if (itemsUser) {
        for (let index = 0; index < itemsUser.length; index++) {
            let product = await fetch(`${API_USER}/find?_id=${itemsUser[index]._id}`).then(res => res.json());

            price += Math.round(((parseFloat(product[0].price)) - (parseFloat(product[0].price)) * (parseFloat(product[0].sale))/100)*10)/10
            discount += Math.round(((parseFloat(product[0].price)) * (parseFloat(product[0].sale))/100) *10) /10

        }
    }
    return [price, discount];
}



export  function deleteCart() {
    const userId = localStorage.getItem("userId")
    return getUserProductsList()
    .then(async (res) => {
        console.log(res)
        if(res.length) {
            console.log(res[0])
        }
        // if(!(res.length)) {return {}}
        for(let i = 0; i < res.length; i++) {
            console.log(res[i])
            const p = res[i];
            console.log(p)
            await deleteProduct(userId, p._id)
        }
        return {}
    })
}


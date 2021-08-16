const USERS_URL = "http://localhost:8080/api/user";

const API_HEADERS = {
    "Content-Type" : "application/json",
    Accept:"application/json"
}


export function getUsers () {
    return fetch(`${USERS_URL}/all`).then((res) =>  res.json());

}

export function isEmailExist (currentEmail) {
    return getUsers()
    .then(res => {
        return res.find(user => user.email === currentEmail)
    })
    .then(res => res);
}

export function userPassword (currentEmail, userEmail) {
    return currentEmail === userEmail
}






export function addUser(newUser) {
    console.log(newUser)
    return fetch(`${USERS_URL}/create`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(newUser)
    }).then((res) => res.json());
}




export function getUserDetails(){
    return fetch(`${USERS_URL}/find?id=${localStorage.getItem("userId")}`)
    .then(res =>  res.json())
    .then(res => res);
}

export function isManager () {
    return getUserDetails()
    .then(res => res.isManager == true)
}

export function updateUser (newUser) {
    console.log(newUser)
    return fetch(`${USERS_URL}/update?id=${localStorage.getItem("userId")}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify(newUser)
    }).then((res) => res.json());
}
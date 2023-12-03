const baseURL = 'http://my-env2.eba-ywmjxpre.us-east-1.elasticbeanstalk.com';

const fetchData = (url, token = '') => {
    let hdrr = {
        'Content-Type': 'application/json', // You can adjust other headers as needed
    }
    if (token.length > 0) {
        hdrr['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, {
        headers: hdrr
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
};

function postData(url, data, token = '') {
    let hdrr = {
        'Content-Type': 'application/json', // You can adjust other headers as needed
    }
    if (token.length > 0) {
        hdrr['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, {
        method: 'POST',
        headers: hdrr,
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

async function getCart(){
    return JSON.parse(localStorage.getItem("cart"));
}

async function addToCart(prod){
    let cartNow = await getCart();
    if(cartNow != null && cartNow?.some(c=>c.id == prod.id)){
        let index = cartNow.findIndex(c=>c.id == prod.id);
        cartNow[index] = {...cartNow[index],"quantity":(cartNow[index]['quantity'])+1}
    }
    else
    {
        if(cartNow == null){
            cartNow = [{quantity:1,...prod}]
        }
        else
        cartNow = [{quantity:1,...prod},...cartNow]
    }
    console.log('bef',cartNow);
    localStorage.setItem("cart", JSON.stringify(cartNow));
}


async function deleteFromCart(prod){
    let cartNow = await getCart();
    let newCart = cartNow.filter(c=>c.id != prod.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
}

async function reduceQantity(prod){
    let cartNow = await getCart();
    if(cartNow != null && cartNow?.some(c=>c.id == prod.id)){
        let index = cartNow.findIndex(c=>c.id == prod.id);
        if((cartNow[index]['quantity']) > 1)
        cartNow[index] = {...cartNow[index],"quantity":(cartNow[index]['quantity'])-1}
    }
    localStorage.setItem("cart", JSON.stringify(cartNow));
}

async function emptyCart(){
    localStorage.setItem("cart", JSON.stringify([]));
}
const userID = 25801

function getCartProducts(data){
    HTMLContentToAppend = '';
    data.forEach(element => {
        HTMLContentToAppend += `
        <tr>
            <th scope="row"><img src="${element.image}" width="50rem" alt=""></th>
            <td>${element.name}</td>
            <td>${element.currency} ${element.unitCost}</td>
            <td><input type="number" value="${element.count ?? 1}" min="1" max="100" oninput="getSubTotal(${element.unitCost},${element.count})"></td>
            <td>${element.currency} ${element.unitCost * element.count}</td>
        </tr>
        `
    });
    return HTMLContentToAppend;
}

document.addEventListener('DOMContentLoaded',async ()=>{
    const itemsContainer = document.getElementById('cartItems');
    const cartData = await getJSONData(CART_INFO_URL + userID + EXT_TYPE);

    itemsContainer.innerHTML = getCartProducts(cartData.data.articles);


    console.log(cartData.data);
})

function getSubTotal(unitCost,value){
    console.log("el costo es " + unitCost);
    console.log('el value es' + value);

}
const userID = 25801

function getCartProducts(data){
    let HTMLContentToAppend = '';
    let artCount = 0;
    data.forEach(element => {
        HTMLContentToAppend += `
        <tr>
            <th scope="row"><img src="${element.image}" width="50rem" alt=""></th>
            <td>${element.name}</td>
            <td>${element.currency} ${element.unitCost}</td>
            <td><input id=cantN${artCount} type="number" value="${element.count ?? 1}" min="1" max="100" oninput="getSubTotal(${element.unitCost},${artCount})"></td>
            <td>${element.currency} <span id=itemN${artCount}>${element.unitCost * element.count}</span></td>
        </tr>
        `
        artCount++
    });

    return HTMLContentToAppend;
}

document.addEventListener('DOMContentLoaded',async ()=>{
    const itemsContainer = document.getElementById('cartItems');
    const cartData = await getJSONData(CART_INFO_URL + userID + EXT_TYPE);

    itemsContainer.innerHTML = getCartProducts(cartData.data.articles);
    console.log(cartData.data);
})

function getSubTotal(unitCost,id){
    let multiplo = document.getElementById('cantN'+id).value;
    let subtotal = unitCost * multiplo;

    console.log("el costo es " + unitCost);
    console.log('el value es' + multiplo);
    document.getElementById('itemN'+id).innerHTML = subtotal;
}
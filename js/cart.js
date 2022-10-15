const userID = 25801
let itemCart = [];//array con items a mostrar en el carrito
let localCart = [];
let cartOrdened = [];

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

function getSubTotal(unitCost,id){
    let multiplo = document.getElementById('cantN'+id).value;
    let subtotal = unitCost * multiplo;

    document.getElementById('itemN'+id).innerHTML = subtotal;
}

function joinToCart(objArticles){
    objArticles.forEach(element => {
        itemCart.push(element);
    });
}

// Ordena los productos y los junta - DESAFIATE - 5
function sortAndfilterItems(item){
    item.sort((a,b)=>{
        if (a.id<b.id){
            return -1;
        }
        if (a.id>b.id){
            return 1;
        }
        return 0;
    })
    let objFiltrados = []
    for (let i = 0; i < item.length; i++) {

        if( JSON.stringify(item[i]) == JSON.stringify(item[i-1])){
            objFiltrados.pop()
            let data = {
                ...item[i],
                count : item[i].count += 1
            }
            objFiltrados.push(data);
        } else {
            objFiltrados.push(item[i])
        }
    }
    return objFiltrados;
}


document.addEventListener('DOMContentLoaded',async ()=>{
    const itemsContainer = document.getElementById('cartItems');
    const cartData = await getJSONData(CART_INFO_URL + userID + EXT_TYPE);
    localCart = cartData.data.articles;
    //joinToCart(cartData.data.articles); //añade los arituclos del fetch

    if(localStorage.getItem('localCart')){
        let ItemsObj = JSON.parse(localStorage.getItem('localCart'))
        ItemsObj.forEach(element => {
            localCart.push(element);
        });
    }

    cartOrdened = sortAndfilterItems(localCart);

    joinToCart(cartOrdened);//añade los articulos del localstorage
    itemsContainer.innerHTML = getCartProducts(itemCart);
})

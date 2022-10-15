var visibleCommentsArry = []; //array con comentarios con igualID
var allUserComments = []; //array con comentarios de todos los productos
var DATAinfo = {};//datos del producto en global
var localCart = [];//items en el carrito local

//escructura general del producto
function getHTMLInfo(product){
    return `
    <div class="card mt-3 mb-3">
        <div class="row g-0">
            <div class="col-md-6">
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${product.images[0]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.images[1]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.images[2]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.images[3]}" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>    
            </div>
            <div class="col-md-6">
                <div class="card-body d-grid">
                    <h2 class="card-title">${product.name}</h5>
                    <h3 class="card-text">Precio: ${product.currency} ${product.cost}</h3><br>
                    <h3 class="card-text">Descripción:</h3>
                    <h4 class="card-text">${product.description}</h4> <br>
                    <h4 class="card-text text-muted">${product.soldCount} vendidos</h4> <br>
                    <h4 class="btn btn-primary" onclick="joinToLocalCart()">Comprar</h4>
                </div>
            </div>
        </div>
    </div>
    `
}

function getRelatedProdcuts(product){
    return `
    <div class="d-flex">
        <div class="col-sm-5">
            <div class="card">
                <div class="card-body btn" onclick="setProductID(${product.relatedProducts[0].id})">
                    <h5 class="card-title">${product.relatedProducts[0].name}</h5>
                    <img class="w-100 p-0" src="${product.relatedProducts[0].image}">
                </div>
            </div>
        </div>
        <div class="col-sm-5">
            <div class="card">
                <div class="card-body btn" onclick="setProductID(${product.relatedProducts[1].id})">
                    <h5 class="card-title">${product.relatedProducts[1].name}</h5>
                    <img class="w-100 p-0" src="${product.relatedProducts[1].image}">
                </div>
            </div>
        </div>
    </div>
    `
}

//funcion para imporimir estrellas según su score
function getStarsBeta(n){
    let starsHTMLtoAppend =''
    let bstars = 5 - n ;
    while (n>0){
        starsHTMLtoAppend += '<span class="fa fa-star checked"></span>';
        n-- ;
    }
    while (bstars>0){
        starsHTMLtoAppend += '<span class="fa fa-star"></span>';
        bstars--;
    }
    return starsHTMLtoAppend;
}

//estructura para los comments
function getHTMLComments(items){
    let htmlContentToAppend = ''
    items.forEach(element => {
        htmlContentToAppend +=  `
        <div class="col">
            <div class="card-body">
                <h4 class="d-flex justify-content-between">${element.user} <span class="text-muted">${element.dateTime}</span></h4>
                <h5>${getStarsBeta(element.score)}</h5>
                <p class="card-text">${element.description}</p>
            </div>
        </div>
        `
    });
    return htmlContentToAppend;
}

//trae comentarios guardados en el localSorage - DESIAFIATE 3
function getNewComments(){
    let newData = localStorage.getItem('newComments');
    
    allUserComments = JSON.parse(newData);
    allUserComments.forEach(element => {
        if (element.productID == localStorage.getItem('productID')){
            visibleCommentsArry.push(element)
        }
    });
}

//muestra la hora al ejecutarse - DESIAFIATE 3
function getHour(){
    let now = new Date ();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let day = now.getDay();
    let mont = now.getMonth();
    let year = now.getFullYear();
    return `${year}-${mont}-${day} ${hour}:${min}:${sec}`;
}

function joinToLocalCart(){
    let product = DATAinfo.data;
    
    let itemData = {
        count: 1,
        currency: product.currency,
        id: product.id,
        image: product.images[0],
        name: product.name,
        unitCost: product.cost
    }
    console.log(itemData);
    localCart.push(itemData);
    let allItems = JSON.stringify(localCart);
    localStorage.setItem('localCart', allItems);

}
    


document.addEventListener('DOMContentLoaded',async ()=>{
    const infoContainer = document.getElementById('prod-info-cont');
    const submitComment = document.getElementById('sendComment');
    const inputComment = document.getElementById('setComment');
    const inputScore = document.getElementById('score');
    const additionalCont = document.getElementById('additional-content');
    const commentCont = document.getElementById('comments-container');

    let productID = localStorage.getItem('productID');
    DATAinfo = await getJSONData(PRODUCT_INFO_URL+productID+EXT_TYPE);
    const DATAcomments = await getJSONData(PRODUCT_INFO_COMMENTS_URL+productID+EXT_TYPE);
    infoContainer.innerHTML = getHTMLInfo(DATAinfo.data);
    commentCont.innerHTML += getHTMLComments(DATAcomments.data);
    additionalCont.innerHTML += getRelatedProdcuts(DATAinfo.data);
    console.log(DATAinfo.data);

    //si hay comentarios guardados, los trae - DESIAFIATE 3
    if (localStorage.getItem('newComments')){
        getNewComments();
        commentCont.innerHTML += getHTMLComments(visibleCommentsArry);
    }

    //si hay items en el Carrito local, los trae - DESAFIATE 5
    if (localStorage.getItem('localCart')){
        let dataObj = JSON.parse(localStorage.getItem('localCart'));
        dataObj.forEach(element => {
            localCart.push(element);
        });
        localCart.sort()
        console.log(localCart);
    }
    
    //guarda tus comentarios en el localStorage
    submitComment.addEventListener('click',()=>{
        let newComments= {
            dateTime: getHour(),
            user: localStorage.getItem('userEmail'),
            score: inputScore.value,
            description: inputComment.value,
            productID: localStorage.getItem('productID')
        }
        allUserComments.push(newComments); //array general con todos los comments
        localStorage.setItem('newComments',JSON.stringify(allUserComments));
    })
});
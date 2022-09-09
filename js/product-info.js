//escructura general del producto
function getHTMLInfo(product){
    return `
    <div class="card">
        <div class="row g-0">
            <div class="col-md-6">
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${product.data.images[0]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.data.images[1]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.data.images[2]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${product.data.images[3]}" class="d-block w-100" alt="...">
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
                    <h2 class="card-title">${product.data.name}</h5>
                    <h3 class="card-text">Precio: ${product.data.currency} ${product.data.cost}</h3><br>
                    <h3 class="card-text">Descripción:</h3>
                    <h4 class="card-text">${product.data.description}</h4> <br>
                    <h4 class="card-text text-muted">${product.data.soldCount} vendidos</h4> <br>
                    <a href="https://www.youtube.com/watch?v=DLzxrzFCyOs&ab_channel=AllKindsOfStuff" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        </div>
        <br>
        <div class="card">
            <h4 card-text>Productos relacionados: </h4>
            <div class="row">
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body btn" onclick="setProductID(${product.data.relatedProducts[0].id})">
                            <h5 class="card-title">${product.data.relatedProducts[0].name}</h5>
                            <img class="w-100 p-0" src="${product.data.relatedProducts[0].image}">
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body btn" onclick="setProductID(${product.data.relatedProducts[1].id})">
                            <h5 class="card-title">${product.data.relatedProducts[1].name}</h5>
                            <img class="w-100 p-0" src="${product.data.relatedProducts[1].image}">
                        </div>
                    </div>
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
    let htmlContentToAppend = '<h3 class="card-title mt-4">Comentarios</h3>'
    items.data.forEach(element => {
        htmlContentToAppend +=  `
        <div class="col" style="width: 30rem;">
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

function setComment(key){

}

document.addEventListener('DOMContentLoaded',async ()=>{
    const infoContainer = document.getElementById('prod-info-cont');
    const submitComment = document.getElementById('sendComment');
    const inputComment = document.getElementById('setComment');
    const inputScore = document.getElementById('score');

    let productID = localStorage.getItem('productID');
    const DATAinfo = await getJSONData(PRODUCT_INFO_URL+productID+EXT_TYPE);
    const DATAcomments = await getJSONData(PRODUCT_INFO_COMMENTS_URL+productID+EXT_TYPE);
    infoContainer.innerHTML = getHTMLInfo(DATAinfo);
    infoContainer.innerHTML += getHTMLComments(DATAcomments);

    console.log(DATAinfo);
    console.log(DATAcomments);

    submitComment.addEventListener('click',()=>{
        console.log(inputComment.value);
        console.log(inputScore.value);
    })
});


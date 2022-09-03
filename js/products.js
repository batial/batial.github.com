function getProducts(product) {
    return `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><small class="text-muted"> Vendidos: ${product.soldCount}</small></p>
                  <h3>${product.currency}: <span>${product.cost}</span></h3>
                </div>
            </div>
        </div>
    </div>
    `;
}

//variables necesarias
const ORDER_ASC_BY_PRICE = "sortDown";
const ORDER_DESC_BY_PRICE = "sortUp";
const ORDER_BY_PROD_SOLDCOUNT = "Rel";
let currentProductArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//funcionalidad de filtro según el boton.
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            if ( parseInt(a.soldCount) > parseInt(b.soldCount) ){ return -1; }
            if ( parseInt(a.soldCount) < parseInt(b.soldCount) ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(){
    let htmlContentToAppend = "";

    currentProductArray.forEach(element => {
        if (((minCount == undefined) || ( parseInt(element.cost) >= minCount)) &&
            ((maxCount == undefined) || ( parseInt(element.cost) <= maxCount))){

            htmlContentToAppend += getProducts(element);
        }
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
    });
}

function sortAndShowProducts(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray); //array con productos

    //Muestro las categorías ordenadas
    showProductList();
}

//Al cargar el dom...
document.addEventListener("DOMContentLoaded", async function(e){

    const catID = localStorage.getItem('catID'); //captura el id seleccionado en categorias
    const productURL = PRODUCTS_URL+catID+EXT_TYPE;
    const PRODUCTS = await getJSONData(productURL); // fetch a productos
    
    currentProductArray = PRODUCTS.data.products; //productos desde url
    showProductList();
    //captura de botones de filtrado
    const sortCheap = document.getElementById('sortCheap');
    const sortExpensive = document.getElementById('sortExpensive');
    const sortByPrice = document.getElementById('sortByPrice');

    //funcionalidad de botones de filtrado
    sortCheap.addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    sortExpensive.addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    sortByPrice.addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    //boton de limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    //funcionalidad filtrado según input
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
});
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
document.addEventListener('DOMContentLoaded',async ()=>{
    const productList = document.getElementById('product-list');
    const carList101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    const PRODUCT = await getJSONData(carList101);
    
    PRODUCT.data.products.forEach(element => {
        productList.innerHTML += getProducts(element)
    });
})
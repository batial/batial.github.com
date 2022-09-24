const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Estructura para mostrar el id del usuario en el nav.
document.addEventListener('DOMContentLoaded', ()=>{
  const userNameNav = document.getElementById('userName');
  const getKeyName = localStorage.getItem('userEmail');
  const signOff = document.getElementById('signOff')

  //si el user no es vacío, imprime el user con sus funcionalidades
  if (userNameNav !== null && getKeyName !== null){
      userNameNav.innerHTML = `<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${getKeyName}
      </button>
      <ul class="dropdown-menu" aria-labelledby="userName">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" onclick="signOff()">Cerrar sesión</a></li>
      </ul>`;
  }
})

//selecciona producto y guarda su id
function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

function signOff(){
  localStorage.removeItem('userEmail');
  window.location = 'index.html';
}
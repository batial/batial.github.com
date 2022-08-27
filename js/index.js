document.addEventListener("DOMContentLoaded",()=>{
    const boton = document.getElementById('ingresar');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');

    var userData; 
    if (boton !== null){ // condicional para evitar que se siga cargando el boton en el home <--
        boton.addEventListener('click',async (e)=> {
            e.preventDefault();
            const Data = {
                email: email.value,
                pass: pass.value,
            }
            if (Data.email !== '' && Data.pass !== '' ){
                window.location.href = "home.html";
            } else {
                alert('Por favor, asegurese de completar las casillas correctamente.')
            }
            localStorage.setItem('userName',Data.email)
        });
    }
    
    //Estructura para mostrar el id del usuario en home
    const userName = document.getElementById('userName');
    const getKeyName = local.getItem('userName')

    if (userName !== null && getKeyName !== null){ // condicional para evitar problemas fuera del home.
        userName.innerHTML = `<a class="nav-link" href="">${getKeyName}</a>`;
    }
});
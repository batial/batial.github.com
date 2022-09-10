document.addEventListener("DOMContentLoaded",()=>{
    const boton = document.getElementById('ingresar');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');

    if (boton !== null){ // condicional para evitar que se siga cargando el boton fuera del index.html <--
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
            localStorage.setItem('userEmail',Data.email);
        });
    }
});
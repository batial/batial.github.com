const boton = document.getElementById('ingresar');
const email = document.getElementById('email');
const pass = document.getElementById('pass');


boton.addEventListener('click',(e)=> {
    e.preventDefault();
    
    const data = {
        email: email.value,
        pass: pass.value,
    }
    if (data.email !== '' && data.pass !== '' ){
        window.location.href = "home.html";
    } else {
        alert('Por favor, asegurese de completar las casillas correctamente.')
    }

});

document.addEventListener("DOMContentLoaded",()=>{
    const email = document.getElementById('email');
    const form = document.querySelector('.needs-validation');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation()
        } else{
            window.location.href = "home.html";
            localStorage.setItem('userEmail', email.value);  
        }
        form.classList.add('was-validated');
        })
});

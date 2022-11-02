document.addEventListener('DOMContentLoaded',()=>{
    const pName = document.getElementById('pName'),
    pSecName = document.getElementById('pSecName'),
    pSurName = document.getElementById('pSurName'),
    pSecSurName = document.getElementById('pSecSurName'),
    pEmail = document.getElementById('pEmail'),
    pPhoto = document.getElementById('pPhoto'),
    pPhone = document.getElementById('pPhone'),
    btnSave = document.getElementById('saveChanges'),
    form = document.querySelector('.needs-validation');
    
    //trae data del userEmail, sino redirecciona al inicio de sesión.
    if(localStorage.getItem('userEmail')){
        pEmail.value = localStorage.getItem('userEmail');
    } else {
        window.location = "index.html";
    }
    
    if(localStorage.getItem('profileData')){
        let profileJSONData = JSON.parse(localStorage.getItem('profileData'));
        console.log(profileJSONData);
        pName.value = profileJSONData.name;
        pSecName.value = profileJSONData.secondName;
        pSurName.value = profileJSONData.surname;
        pSecSurName.value = profileJSONData.secondSurname;
        pPhone.value = profileJSONData.phone;

    }
    //validación de datos.
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        }
        if (form.checkValidity()){
            event.preventDefault()
            event.stopPropagation()
            
        let profileData = {
            name: pName.value,
            secondName: pSecName.value ?? '',
            surname: pSurName.value,
            secondSurname: pSecSurName.value ?? '',
            eMail: pEmail.value,
            phone: pPhone.value ?? ''
        }
        localStorage.setItem('profileData', JSON.stringify(profileData));
        }
        form.classList.add('was-validated')
    }, false)
    
});


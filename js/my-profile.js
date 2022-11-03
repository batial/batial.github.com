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

    function getBase64Image(img) {
        return new Promise ((resolve)=>{
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = ()=>{
                resolve(reader.result.split(',')[1]);
            }
        })
    }

    //funcion para convertir una imagen en base64 (string)
    async function changePhoto(myImg){
        let imgData = await getBase64Image(myImg);
        localStorage.setItem('imgData', imgData );
    }
    

    if (localStorage.getItem('imgData')) {
        var dataImage = localStorage.getItem('imgData');
        bannerImg = document.getElementById('tableBanner');
        bannerImg.src = "data:image/png;base64," + dataImage;
    }
    

    //validación de datos.
    form.addEventListener('submit', async (event)=>{
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

        //si el imput CargarFoto captura una imagen entonces la procesa.
        if (pPhoto.files[0]){
            await changePhoto(pPhoto.files[0]);
        }
        
        location.reload()
        form.classList.add('was-validated')
    }, false)
    
});


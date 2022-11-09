//DESAFIATE 1 - auth with firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVzLy-EfLMofcXvjDhKfSUWrhCWqqN1aE",
  authDomain: "formularioecommerce.firebaseapp.com",
  projectId: "formularioecommerce",
  storageBucket: "formularioecommerce.appspot.com",
  messagingSenderId: "313471921177",
  appId: "1:313471921177:web:020806b1a33fb8e1f78e88"
};

// Initialize Firebase y Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//GoogleForm
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

//function on click
const googleBtn = document.getElementById('googleBtn');
googleBtn.addEventListener('click', async(e) =>{
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    try {
        const credentials = await signInWithPopup(auth, provider);
        /* console.log(credentials.user.email); */
        localStorage.setItem('userEmail',credentials.user.email)
        window.location.href = "home.html";
    } catch (error) {
        console.log('error');
    }
})
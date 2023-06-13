import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxf3ikoJWkzHtvUCBoTnNjT1mRg8e4NzU",
  authDomain: "auth-courseofferings.firebaseapp.com",
  projectId: "auth-courseofferings",
  storageBucket: "auth-courseofferings.appspot.com",
  messagingSenderId: "484839394488",
  appId: "1:484839394488:web:b9d2f93946b5f945eab84d",
  measurementId: "G-PMQ4DGFSBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


    
auth.onAuthStateChanged(user => {
    console.log("running");
    console.log(user.email);
    if(user){
        document.getElementById("login-button").style.display='none';
        document.getElementById("logout-button").style.display='block';
        }
    })   


function logout(){
auth.signOut();
document.getElementById("login-button").style.display='block';
document.getElementById("logout-button").style.display='none';
window.location.assign('./index.html');

}
document.getElementById("logout-button").addEventListener('click',logout);



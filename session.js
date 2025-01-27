import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxf3ikoJWkzHtvUCBoTnNjT1mRg8e4NzU",
  authDomain: "auth-courseofferings.firebaseapp.com",
  databaseURL: "https://auth-courseofferings-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-courseofferings",
  storageBucket: "auth-courseofferings.firebasestorage.app",
  messagingSenderId: "484839394488",
  appId: "1:484839394488:web:b9d2f93946b5f945eab84d",
  measurementId: "G-PMQ4DGFSBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Check if the current user is set in localStorage
const currentUser = localStorage.getItem('currentuser');

// If no user is logged in (null or empty string), show login button and hide logout button
if (!currentUser || currentUser.trim() === '') {
    console.log("User is empty or not logged in.");
    document.getElementById("login-button").style.display = 'block';
    document.getElementById("logout-button").style.display = 'none';
   // alert('Go to homepage and Login');
} else {
    // If a user is logged in, hide login button and show logout button
    console.log("Logged in user:", currentUser);
    document.getElementById("login-button").style.display = 'none';
    document.getElementById("logout-button").style.display = 'block';
    
}

/*    
auth.onAuthStateChanged(user => {
    console.log("session running");
    console.log("session",user.email);
    if(user){
        document.getElementById("login-button").style.display='none';
        document.getElementById("logout-button").style.display='block';
        }
    })   

*/
function logout(){
auth.signOut();
document.getElementById("login-button").style.display='block';
document.getElementById("logout-button").style.display='none';
window.location.assign('./index.html');

}
document.getElementById("logout-button").addEventListener('click',logout);

const assignhome=()=>{
  window.location.assign('./index.html');
}
document.getElementById("login-button").addEventListener('click',assignhome)


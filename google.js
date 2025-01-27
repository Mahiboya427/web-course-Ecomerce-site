
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

    import { getAuth,signInWithPopup,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
   
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
    
    const provider = new GoogleAuthProvider(app);
    const auth = getAuth(app);

/*
  
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      */
var google_login=document.getElementById("google-btn");



const signInWithGoogle=()=>{
    console.log("hello");
    signInWithPopup(auth,provider)
    .then(()=>{
        window.location.assign('./index.html');
    })
    
    .catch(function(err) {
    alert("error"+err)
    
    })
}

google_login.addEventListener('click',signInWithGoogle);



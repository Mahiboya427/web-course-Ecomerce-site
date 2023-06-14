
            
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

    import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
   
    
    import { getFirestore,collection,getDocs,addDoc,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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


    
//var username=document.getElementById("username");
var login_email=document.getElementById("login-email");
//var register_email=document.getElementById("register-email");
var login_password=document.getElementById("login-password");
//var register_password=document.getElementById("register-password");


console.log(login_email.value,login_password.value);
const wrapper = document.querySelector('.wrapper'); 

window.login=function (e) {
    e.preventDefault();
    var obj1={
        email:login_email.value,
        password:login_password.value
    };
    console.log(obj1);

    
    signInWithEmailAndPassword(auth,obj1.email,obj1.password)
    .then((userCredential) => {
        // Signed in 
       const user = userCredential.user;
        
        wrapper.classList.remove('active-popup'); 
        console.log(user.email);
        alert("login sucessfull") ;
        

        // ...
      })
   
        .catch(function (err) {
        alert("login error"+err)
                
    })
    //console.log(obj1);
    

};


     
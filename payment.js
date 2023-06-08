   
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

//    import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
   
    import { getFirestore,collection,getDocs} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
   
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
    //init service
    const db=getFirestore();
    //collection reference
    const colRef=collection(db,'courses')
    //get collection data
    /*
    const reply_click=(e)=>{
        e.preventDefault();
        console.log("hello");
    }
    */
   
  var price=document.getElementById('price');
    
    getDocs(colRef)
        .then((snapshot)=>{
            let courses=[]   
            snapshot.docs.forEach((doc) => {
            courses.push({ ...doc.data(),doc_id:doc.id})    
            });
            console.log(courses);
            let total=0;
            for(let i = 0; i<courses.length;i++){
//                console.log("hello");
                console.log(courses[i]);
                
                console.log(Number(courses[i].price.slice(1,)));
                let sum=Number(courses[i].price.slice(1,));
                total=Number(total+sum);
            
            }
            console.log("total",total);
            price.textContent="$"+total;
            document.getElementById('total-price').textContent="$"+(total+40)
        })
        .catch((err)=>{
            console.log(err.massage);
        })

        

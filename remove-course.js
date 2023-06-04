   
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

//    import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
   
    import { getFirestore,collection,getDocs,doc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
   
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
    
let courseid=document.getElementById("courseid");
    
    getDocs(colRef)
        .then((snapshot)=>{
            
            let temp=[]   

            snapshot.docs.forEach((doc) => {
               
                temp.push({ ...doc.data(),doc_id:doc.id})
            });
            console.log(temp);
           // for(let i = 0; i<temp.length;i++){
               // console.log("hello");
            //    console.log(temp[i].id,temp[i].doc_id);
            //}
            window.delete_course=function(e){
                e.preventDefault();
                console.log("DELETE RUNNING");
                for(let i = 0; i<temp.length;i++){
                    if(courseid.value==temp[i].id){
                        console.log(temp[i].doc_id);
                        var x=temp[i].doc_id;
                    }
                }
                //console.log("x",x);
                const docRef=doc(db,'courses',x)
                deleteDoc(docRef)
                    .then(()=>{
                        console.log("deleted",x);
                        alert(courseid.value+" "+"deleted please referesh");
                        document.getElementById("del-form").reset();
                    })
                
            }
               
            
        

        })
        .catch((err)=>{
            console.log(err.massage);
        })




   
        
    





        
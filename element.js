
 
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

//    import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
   
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
    
    const db=getFirestore();
    const colRef=collection(db,'courses')

  
    var element_title=document.getElementById("element-title").textContent;
    var element_category=document.getElementById("element-category").textContent;
    var element_heading=document.getElementById("element-heading").textContent;
    var element_rating=document.getElementById("element-rating").textContent;
    var element_price=document.getElementById("element-price").textContent;
    var element_duration=document.getElementById("element-duration").textContent;
    var element_id=document.getElementById("EL").textContent;
    
    
    var addtocart=document.querySelector('.addcart');
    



      

//var hello=document.getElementById("hello").value="hello"
var temp=1;
  //get collection data
 
    
console.log(temp);
  
getDocs(colRef)
.then((snapshot)=>{
  console.log(snapshot.docs);
  let docid=[]  
  snapshot.docs.forEach((doc) => {
         // console.log(doc.data().id);
          docid.push(doc.data().id)});
      console.log(docid);
     
          for(let i=0;i<docid.length;i++){
              console.log(element_id,docid[i]);
              if(element_id==docid[i]){
                  temp=0;   
                       
              }
              else
                  console.log("alredy exist",temp);
          }
          console.log(temp);
      }
      
  )
.catch((err)=>{
    console.log(err.massage );
})



const cart=()=>{  
    console.log("cart fun runnig");
    console.log(temp);
    if(temp!=0){
    addDoc(colRef,{
        id:element_id,title:element_title,
        category:element_category,heading:element_heading,
        rating:element_rating,price:element_price,
        duration:element_duration
        })
        .then(()=>{
             console.log("hello");})
   
            console.log("element-id:",element_id,";","element-title:",element_title,";",
            "element_category:",element_category,";","element_heading:",element_heading,";" ,
            "element_rating:",element_rating,";","element_price:",element_price,";",
            "element_duration:",element_duration);
          
            alert(element_title+" "+"added to the cart");
            temp=0;
           // window.location.reload();   
        }
        else{alert(element_title+" "+"ALREADY in the cart");}

        }  
 
        
addtocart.addEventListener('click',cart);
//
/*
    */
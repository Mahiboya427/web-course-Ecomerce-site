   
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
    

    
    getDocs(colRef)
        .then((snapshot)=>{
            
            let courses=[]   

            snapshot.docs.forEach((doc) => {
               
                courses.push({ ...doc.data(),doc_id:doc.id})
            });
            console.log(courses);
            for(let i = 0; i<courses.length;i++){
//                console.log("hello");
              //  console.log(courses[i]);
            let newdiv=document.createElement('div');
            newdiv.classList.add('card');
            
            newdiv.innerHTML= `  
                        <label for="">course-id:</label><u><spam id="course-id${i}"></spam></u><br>
                        <label for="">course-title:</label><u><spam id="course-title${i}"></spam></u><br>
                        <label for="">course-category:</label><u><spam id="course-category${i}"></spam></u><br>
                        <label for="">course-heading:</label><u><spam id="course-heading${i}"></spam></u><br>
                        <label for="">course-rating:</label><u><spam id="course-rating${i}"></spam></u><br>
                        <label for="">course-price:</label><u><spam id="course-price${i}"></spam></u><br>
                        <label for="">course-duration:</label><u><spam id="course-duration${i}"></u></spam><br>
                        <spam class="docid" id="docid${i}"></spam> 
                        
            `   
            document.querySelector(".course-card").appendChild(newdiv)
            
 
            var course_id=document.getElementById("course-id"+i)
            var course_title=document.getElementById("course-title"+i)
            var course_category=document.getElementById("course-category"+i)
            var course_heading=document.getElementById("course-heading"+i)
            var course_rating=document.getElementById("course-rating"+i)
            var course_price=document.getElementById("course-price"+i)
            var course_duration=document.getElementById("course-duration"+i)
            var docid=document.getElementById('docid'+i)
            


            course_id.textContent=courses[i].id
            course_title.textContent=courses[i].title
            course_category.textContent=courses[i].category
            course_heading.textContent=courses[i].heading
            course_rating.textContent=courses[i].rating
            course_price.textContent=courses[i].price
            course_duration.textContent=courses[i].duration
            docid.textContent=courses[i].doc_id


            

            
            }
        })
        .catch((err)=>{
            console.log(err.massage);
        })



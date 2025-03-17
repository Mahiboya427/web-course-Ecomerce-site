
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

//    import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
const db = getFirestore();
//collection reference
const colRef = collection(db, 'courses')
//get collection data
/*
const reply_click=(e)=>{
    e.preventDefault();
    console.log("hello");
}
*/
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the current user's email (used as the key)
    const contactid = localStorage.getItem("currentuser");
    console.log("contactid:", contactid);

    // Retrieve the stored object with course items
    const userData = JSON.parse(localStorage.getItem(contactid));
    // userData.courseitems is expected to be an array of course objects
    const courses = userData?.courseitems || [];
    console.log("Stored courses:", courses);

    // Convert the courses array to a JSON string for order submission if needed
    const itemsstring = JSON.stringify(courses);

    // Calculate the final price by summing the price from each course
    let finalprice = 0;
    courses.forEach(course => {
        // Remove any non-numeric characters (like "$") and convert to a number
        const priceNumber = Number(course.price.replace(/[^0-9.]/g, ''));
        finalprice += priceNumber;
    });
    console.log("Final price:", finalprice);

    // Update the price display on the page
    document.getElementById('price').textContent = '₹ ' + finalprice;
    document.getElementById('total-price').textContent = '₹ ' + (finalprice + 40);

    // --- Order Submission Function ---
    const addorder = () => {
        // Create an order object with form values and calculated price
        const orderData = {
            user: localStorage.getItem('currentuser'),
            email: document.getElementById('email').value,
            firstname: document.getElementById('first-name').value,
            lastname: document.getElementById('last-name').value,
            address: document.getElementById('address').value,
            landmark: document.getElementById('landmark').value,
            zipcode: document.getElementById('zip-code').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value,
            amount: document.getElementById('total-price').innerText,
            EL: itemsstring
        };

        // Save the order data to local storage under the key "order"
        localStorage.setItem("order", JSON.stringify(orderData));
        console.log("Order Data:", orderData);
        localStorage.removeItem(contactid);
        window.location.assign('./final.html');
    };

    // Add event listener to the "Continue to Shipping" button
    const finalend = document.getElementById('end-flow');
    if (finalend) {
        finalend.addEventListener('click', addorder);
    } else {
        console.error("'end-flow' button not found");
    }
});


async function authenticateSalesforce() {
    const clientId = "3MVG9jSKmPAPVo2JJ106tjUnx2RDd1ioHJvwF_AsO83SOvOHs12FqX5gh3FzFlnznPxkFoRWewA.G8Ndv.XMN";
    const clientSecret = "27E5D743D4864F1E4009D6617DC2F7FE4A858CD7F1EE2612D5062F14BF6EE99B";
    const username = "dipanshu.diwakerdcdo@aethereus.com";
    const password = "Salesforce@00"; // Consider storing in environment variables

    const url = "https://login.salesforce.com/services/oauth2/token";

    const requestBody = JSON.stringify({
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        username: username,
        password: password
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Salesforce Auth Response:", data);
        return data; // Contains access_token, instance_url, etc.
    } catch (error) {
        console.error("Salesforce Authentication Error:", error);
    }
}

// Call the function
authenticateSalesforce();






















/*
let contactid=localStorage.getItem('currentuser');
console.log(contactid); 

let items=JSON.parse(localStorage.getItem(contactid));
console.log(items.courseitems);
let itemsstring=JSON.stringify(items.courseitems);
let finalprice=0;
getDocs(colRef)
    .then((snapshot)=>{
        let courses=[]   
        snapshot.docs.forEach((doc) => {
        courses.push({ ...doc.data(),doc_id:doc.id})    
        });
        console.log("all courses",courses);
        for(let i = 0; i<courses.length;i++){

            for(let l=0;l<items.courseitems.length;l++){
                 console.log(items.courseitems[l]);
                 if(items.courseitems[l]==courses[i].id){
                     console.log(courses[i]);
                

            
         
       finalprice=finalprice+Number(courses[i].price.slice(1,));
    }}
        
        
        
        }
        console.log(finalprice);
        document.getElementById('price').textContent='₹ '+finalprice;
        document.getElementById('total-price').textContent='₹ '+(finalprice+40);
    })
    .catch((err)=>{
        console.log(err.massage);
    })

    
const col=collection(db,'orders')

const addorder=()=>{
 
addDoc(col,{
    user:localStorage.getItem('currentuser'),
    email:document.getElementById('email').value,
    firstname:document.getElementById('first-name').value,
    lastname:document.getElementById('last-name').value,
    address:document.getElementById('address').value,
    landmark:document.getElementById('landmark').value,
    zipcode:document.getElementById('zip-code').value,
    city:document.getElementById('city').value,
    state:document.getElementById('state').value,
    country:document.getElementById('country').value,
    phone:document.getElementById('phone').value,
    amount:document.getElementById('total-price').innerText,
    EL:itemsstring
    })
    .then(()=>{
        console.log(
            col
        );
         console.log("hello");
         window.location.assign('./final.html');
        
        })

    console.log("running addorders");
   console.log("helo",document.getElementById('email').value,document.getElementById('total-price').innerText,itemsstring);
   
    
}
    
const finalend=document.getElementById('end-flow');
finalend.addEventListener('click',addorder);
*/
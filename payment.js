/*
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
let userTransaction;
let orderItems;
let finalsendbody;

document.addEventListener("DOMContentLoaded", () => {
    const contactid = localStorage.getItem("currentuser");
    console.log("Contact ID:", contactid);

    const userData = JSON.parse(localStorage.getItem(contactid));
    const courses = userData?.courseitems || [];
    console.log("Stored Courses:", courses);

    let finalprice = 0;
    courses.forEach(course => {
        const priceNumber = Number(course.price.replace(/[^0-9.]/g, ''));
        finalprice += priceNumber;
    });

    console.log("Final Price:", finalprice + 40);
    document.getElementById('price').textContent = '₹ ' + finalprice;
    document.getElementById('total-price').textContent = '₹ ' + (finalprice + 40);

    // --- Order Submission Function ---
    const addorder = () => {
        const orderData = {
            user: contactid,
            email: document.getElementById('email').value,
            firstname: document.getElementById('first-name').value || "N/A",
            lastname: document.getElementById('last-name').value || "N/A",
            address: document.getElementById('address').value,
            landmark: document.getElementById('landmark').value || "N/A",
            zipcode: document.getElementById('zip-code').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value,
            amount: finalprice + 40,
            EL: JSON.stringify(courses) // Ensure it's stored as a valid string
        };

        localStorage.setItem("order", JSON.stringify(orderData));
        console.log("Order Data:", orderData);
        localStorage.removeItem(contactid);

        const rawData = orderData;
        console.log("Raw Data:", rawData);

        // Generate Unique IDs
        const generateUniqueKey = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const userTransactionKey = generateUniqueKey("USER_TRANSACTION");
        const currentDate = new Date().toISOString();

        userTransaction = {
            "data": [{
                id: userTransactionKey,
                user: rawData.user,
                email: rawData.email,
                firstname: rawData.firstname,
                lastname: rawData.lastname,
                phone: rawData.phone,
                address: rawData.address,
                landmark: rawData.landmark,
                city: rawData.city,
                state: rawData.state,
                country: rawData.country,
                zipcode: rawData.zipcode,
                amount: rawData.amount,
                eventdate: currentDate
            }]
        };

        let courseData = [];
        try {
            courseData = JSON.parse(rawData.EL);
        } catch (error) {
            console.error("Error parsing rawData.EL:", error);
        }

        orderItems = {
            "data": courseData.map(item => ({
                id: generateUniqueKey("ORDER"), // Unique ID for each order item
                TransactionKey: userTransactionKey,
                title: item.title || "N/A",
                category: item.category || "N/A",
                heading: item.heading || "N/A",
                rating: item.rating || "N/A",
                price: item.price || "N/A",
                duration: item.duration || "N/A",
                pic: item.pic || "",
                eventdate: currentDate
            }))
        };

        console.log("User Transaction Data:", userTransaction);
        console.log("Order Items:", orderItems);

        finalsendbody = {
            "userTransaction": userTransaction,
            "orderItems": orderItems
        };

        console.log("Final Send Body:", finalsendbody);
        postData();
    };

    // Add event listener to the button
    const finalend = document.getElementById('end-flow');
    if (finalend) {
        finalend.addEventListener('click', addorder);
    } else {
        console.error("'end-flow' button not found");
    }
});
async function postData() {
    try {
        if (!finalsendbody || typeof finalsendbody !== "object") {
            throw new Error("❌ Invalid request payload: finalsendbody is not an object.");
        }

        const jsonPayload = JSON.stringify(finalsendbody);
        console.log("📤 Sending JSON Payload:", jsonPayload);

        const authResponse = await fetch("https://mc654h8rl6ypfygmq-qvwq3yrjrq.pub.sfmc-content.com/i3fyupqnxuo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonPayload
        });

        // Ensure response is valid JSON
        const authData = await authResponse.json();
        console.log("✅ Server Response:", authData);

        if (authData.success) {
            console.log("🔑 Salesforce Access Token:", authData.salesforceAccessToken);
            console.log("🔑 A360 Access Token:", authData.a360AccessToken);
            console.log("🛒 Transaction Response:", authData.transactionResponse);
            console.log("📦 Order Response:", authData.orderResponse);
        } else {
            console.error("⚠️ API Error:", authData.message || "Unknown error");
        }
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}




/*
async function postData() {
    try {
        const response = await fetch("https://mc654h8rl6ypfygmq-qvwq3yrjrq.pub.sfmc-content.com/i3fyupqnxuo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "NAME": "MAHESH" }) // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // ✅ Log raw response before parsing
        const textResponse = await response.text();
        console.log("RAW RESPONSE:", textResponse);
a
        // ✅ Check if response is empty
        if (!textResponse || textResponse.trim() === "") {
            throw new Error("Empty response received from server.");
        }

        // ✅ Parse JSON safely
        const data = JSON.parse(textResponse);
        console.log("RESULT", data);
        return data; 

    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function
postData();












/*
async function authenticateSalesforce() {
    const url = "https://ae1709725408312.lightning.force.com/oauth2/token";

    const requestBody = {
        grant_type: "password",
        client_id: "3MVG9jSKmPAPVo2JJ106tjUnx2RDd1ioHJvwF_AsO83SOvOHs12FqX5gh3FzFlnznPxkFoRWewA.G8Ndv.XMN",
        client_secret: "27E5D743D4864F1E4009D6617DC2F7FE4A858CD7F1EE2612D5062F14BF6EE99B",
        username: "dipanshu.diwakerdcdo@aethereus.com",
        password: "Salesforce@00"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
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




*/










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
// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase Configuration
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
const db = getFirestore();

// Get Course Collection
const colRef = collection(db, "courses");

// Retrieve user cart data
const contactid = localStorage.getItem("currentuser");
let items = JSON.parse(localStorage.getItem(contactid));

if (!items || !items.courseitems || items.courseitems.length === 0) {
    document.getElementById("empty-cart-message").style.display = "block";
} else {
    getDocs(colRef)
        .then((snapshot) => {
            let courses = [];
            snapshot.docs.forEach((doc) => {
                courses.push({ ...doc.data(), doc_id: doc.id });
            });

            const courseContainer = document.querySelector(".course-card");
            courseContainer.innerHTML = ""; // Clear any existing data

            items.courseitems.forEach((courseId) => {
                let course = courses.find((c) => c.id === courseId);
                if (course) {
                    let newDiv = document.createElement("div");
                    newDiv.classList.add("card");
                    newDiv.innerHTML = `
                        <img class="course-pic" src="${course.pic}" alt="${course.title}">
                        <div class="cd-part1">
                            <p><strong>Course ID:</strong> <span>${course.id}</span></p>
                            <p><strong>Title:</strong> <span>${course.title}</span></p>
                            <p><strong>Category:</strong> <span>${course.category}</span></p>
                            <p><strong>Price:</strong> <span>$${course.price}</span></p>
                            <p><strong>Duration:</strong> <span>${course.duration}</span></p>
                            <button class="remove" data-id="${course.id}">Remove</button>
                        </div>
                    `;

                    // Append course card
                    courseContainer.appendChild(newDiv);
                }
            });

            // Add event listener for remove buttons
            document.querySelectorAll(".remove").forEach((button) => {
                button.addEventListener("click", (event) => {
                    let courseId = event.target.getAttribute("data-id");
                    removeCourse(courseId);
                });
            });
        })
        .catch((err) => {
            console.log("Error loading courses:", err.message);
        });
}

// Function to remove course from cart
function removeCourse(courseId) {
    let updatedItems = items.courseitems.filter((id) => id !== courseId);
    localStorage.setItem(contactid, JSON.stringify({ courseitems: updatedItems }));
    location.reload(); // Refresh to update UI
}

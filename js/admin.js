// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDdGYgCojY0CQMQugDl9RUmBrHRJjs56w",
  authDomain: "benco-c0122.firebaseapp.com",
  projectId: "benco-c0122",
  storageBucket: "benco-c0122.appspot.com",
  messagingSenderId: "117907511943",
  appId: "1:117907511943:web:aad979ca0b9bf067c37622",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Database
const db = getFirestore();

//Collection Ref Products
const colRef = collection(db, "products");


addProduct.addEventListener('submit', (event)=>{
    event.preventDefault();

    //Do validation
    let title = addProduct.productName.value;
    let price = addProduct.productPrice.value;
    let category = addProduct.productCategory.value;
    let description = addProduct.productDescription.value;
    let datePosted = new Date();
    let sponsored = false;

    addProduct.submitBTN.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    `;
    addDoc(colRef, {title, price, category, description, datePosted, sponsored})
    .then((result) => {
        addProduct.submitBTN.innerHTML = `submit`;
        addProduct.productName.value = '';
        addProduct.productPrice.value = '';
        addProduct.productCategory.value = '';
        addProduct.productDescription.value = '';    
        console.log('Product uploaded successfully');
    }).catch((err) => {
        console.error(err.message);
    });
})

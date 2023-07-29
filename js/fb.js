// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
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
//auth
const auth = getAuth();
//Google auth
const provider = new GoogleAuthProvider();

// declarations
const sponsAdDiv = document.querySelector(".sponsAd");
const allProdDiv = document.querySelector(".allProd");
const sponsProdList = [];
const allProdList = [];

// Display products
window.addEventListener("load", async () => {
  getDocs(colRef)
    .then((result) => {
      result.forEach((product) => {
        let id = product.id;
        if (product.data().sponsored) {
          sponsProdList.push({ id, ...product.data() });
        }
        allProdList.push({ id, ...product.data() });
      });
      try {
        spinner.classList.add('d-none');
        // Sponsored products
        sponsAdDiv.innerHTML = "";
        sponsAdTitle.classList.remove('d-none');
        sponsProdList.forEach((prod, index) => {
          if (index === 3 ) { //Only show 3 sponsored products
              return
          }
          sponsAdDiv.innerHTML += `
          <div class="col-12 col-md-4">
              <div class="card bg-light" style="max-width: 18rem;">
              <img src="${prod.imgURL}" class="card-img-top fixed-height-image" alt="${prod.title}-img">
              <div class="card-body">
                <h5 class="card-title">${prod.title}</h5>
                <p class="card-text">${prod.description.slice(0, 100)}...</p>
                <a href="#" class="btn btn-primary">Contact Vendor</a>
              </div>
            </div>
            <div>
  
              `;
        });
  
      } catch (error) {
        // console.error(error);
      }
      //   All Products
      try {
        allProdDiv.innerHTML = "";
        allPodTitle.classList.remove('d-none');
        allProdList.forEach((prod) => {
          allProdDiv.innerHTML += `
          <div class="col-12 col-md-4 mb-4">
          <div class="card bg-light">
              <img src="${prod.imgURL}" class="card-img-top fixed-height-image" alt="${prod.title}-img">
              <div class="card-body">
                  <h5 class="card-title">${prod.title}</h5>
                  <p class="card-text">${prod.description.slice(0, 100)}...</p>
                  <a href="#" class="btn btn-primary">Contact Vendor</a>
              </div>
          </div>
      </div>
              `;
        });
  
  
      } catch (error) {
        // console.error(error);
      }
    //   console.log(sponsProdList, "sponsored prods");
    //   console.log(allProdList, "all prods");
    })
    .catch((err) => {
      console.error(err.message, 'error message');
    });
});

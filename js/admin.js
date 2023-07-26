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
const colRefProd = collection(db, "products");
const colRefVend = collection(db, "vendors");

//Add product
addProductFormData.addEventListener('submit', (event)=>{
    event.preventDefault();

    //Do validation
    let title = addProductFormData.productName.value;
    let price = addProductFormData.productPrice.value;
    let category = addProductFormData.productCategory.value;
    let description = addProductFormData.productDescription.value;
    let datePosted = new Date();
    let sponsored = false;

    addProductFormData.submitBTN.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    `;
    addDoc(colRefProd, {title, price, category, description, datePosted, sponsored})
    .then((result) => {
        addProductFormData.submitBTN.innerHTML = `submit`;
        addProductFormData.productName.value = '';
        addProductFormData.productPrice.value = '';
        addProductFormData.productCategory.value = '';
        addProductFormData.productDescription.value = '';    
        console.log('Product uploaded successfully');
    }).catch((err) => {
        console.error(err.message);
    });
})


//Add vendor
addVendorFormData.addEventListener('submit', (event)=> {
    event.preventDefault();

    //Do validation
    let vendorName = addVendorFormData.vendorName.value;
    let vendorTelNo = addVendorFormData.vendorTel.value;
    let vendorDescription = addVendorFormData.vendorDescription.value;
    let vendorAddress = addVendorFormData.vendorAddress.value;
    let vendorEmail = addVendorFormData.vendorEmail.value;

    addVendorFormData.submitBTN.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    `;


   addDoc(colRefVend, {vendorName, vendorEmail, vendorTelNo, vendorAddress, vendorDescription})
   .then((result) => {
    console.log('Vendor has been uploaded successfully');
    addVendorFormData.submitBTN.innerHTML = `submit`;
    addVendorFormData.vendorName.value = '';
    addVendorFormData.vendorTel.value = '';
    addVendorFormData.vendorDescription.value = '';
    addVendorFormData.vendorAddress.value = '';
    addVendorFormData.vendorEmail.value = '';

   }).catch((err) => {
    console.error(err.message);
   });  
});

//Display vendors
async function displayVendors() {
    const res = await getDocs(colRefVend);
    let vendorList = [];
    res.forEach(vendor => {
       vendorList.push(vendor.data().vendorName); 
    });
    vendorList.forEach(vendor => {
        addProductFormData.productVendor.innerHTML += `
        <option value="${vendor}">${vendor}</option>
    
        `;
        
    });
}
displayVendors();
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const spinnerPL = `
<div class="spinnerDiv d-flex justify-content-center">
<div id="spinner" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
</div>
</div>

`;
// Display products
try {
  window.addEventListener("load", () => {
    getDocs(colRef)
      .then((result) => {
        result.forEach((product) => {
          let id = product.id;
          if (product.data().sponsored === true) {
            sponsProdList.push({ id, ...product.data() });
          }
          allProdList.push({ id, ...product.data() });
        });
        spinner.classList.add('d-none');
        // Sponsored products
        sponsAdDiv.innerHTML = "";
        sponsAdTitle.classList.remove('d-none');
        sponsProdList.forEach((prod, index) => {
          if (index === 3) { //Only show 3 sponsored products
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

        //   All Products
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


        //   console.log(sponsProdList, "sponsored prods");
        //   console.log(allProdList, "all prods");
      })
      .catch((err) => {
        console.error(err.message, 'error message');
      });
  });

} catch (error) {
  console.error(error);
}


//SignIn with Email and password
signInWithEmailAndPasswordBTN.addEventListener('click', (event) => {
  event.preventDefault();

  const email = signInFormData.email.value;
  const password = signInFormData.password.value;

  signInWithEmailAndPasswordBTN.innerHTML = `${spinnerPL}`

  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      signInWithEmailAndPasswordBTN.innerHTML = `Sign In`;
      setTimeout(() => {
        location.reload();
      }, 3000);
      console.log('User signed In');
    }).catch((err) => {
      signInWithEmailAndPasswordBTN.innerHTML = `Sign In`;
      console.error(err.message);
      console.error(err.code);
    });
})


//check if user is signed in
window.addEventListener('load', async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      signOutDiv.classList.toggle('d-none');
      signOutDiv.innerHTML = `
      <li class="nav-item me-2">Hi, ${user.displayName}</li>
      <li class="nav-item btn btn-dark">Sign Out</li>
      `;
      signInDiv.classList.toggle('d-none');
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
})

//SignInWithGoogle Module

signInWithGoogleBTN.addEventListener('click', async (event) => {
  event.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
})


//Sign up with email and password

signUpFormData.addEventListener('click', async (event) => {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON') {
    if (event.target.innerText === 'Sign Up') {

      event.target.innerHTML = `${spinnerPL}`;

      const username = signUpFormData.username.value;
      const email = signUpFormData.email.value;
      const password = signUpFormData.password.value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          event.target.innerHTML = `Sign Up`;
          console.log('User account created and user signed in');
          onAuthStateChanged(auth, (user) => {
            if (user) {
              updateProfile(auth.currentUser, {
                displayName: username
              })
                .then(() => {
                  // Profile updated!
                  console.log('Profile Updated');
                  setTimeout(() => {
                    location.reload();
                  }, 3000);
                  // ...
                }).catch((error) => {
                  // An error occurred
                  // ...
                  console.error(error);
                });
            }
            else {
              console.error('User is not signed in');
            }
          })
        }).catch((err) => {
          event.target.innerHTML = `Sign Up`;
          console.error(err.message);
        });
    }
  }
})


//Sign out User
signOutDiv.addEventListener('click', () => {
  signOutUser();
})

function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('User signed Out successfully');
      location.reload();
    }).catch((error) => {
      console.error(err.message);
      // An error happened.
    });

}

async function showCurrentUser() {

  onAuthStateChanged(auth, (user)=>{
    console.log('username:', user.displayName);
  })
  
}
showCurrentUser();
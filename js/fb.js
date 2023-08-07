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
  updateProfile,
  sendEmailVerification
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
const colRefVendor = collection(db, "vendors");

//auth
const auth = getAuth();

//Google auth
const provider = new GoogleAuthProvider();

// declarations
const sponsAdDiv = document.querySelector(".sponsAd");
const allProdDiv = document.querySelector(".allProd");
const errorSign = document.querySelector(".errorSign");
const sponsProdList = [];
const allProdList = [];
const vendorList = [];
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
    //get Vendors
    getDocs(colRefVendor)
      .then((result) => {
        result.forEach(vendor => {
          let vID = vendor.id;
          vendorList.push({ vID, ...vendor.data() });
        });
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
            spinner.classList.remove('h-75');
            // Sponsored products
            sponsAdDiv.innerHTML = "";
            sponsAdTitle.classList.remove('d-none');
            sponsProdList.forEach((prod, index) => {
              if (index === 3) { //Only show 3 sponsored products
                return;
              }
              sponsAdDiv.innerHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <div class="card bg-light" style="max-width: 18rem;">
                    <img src="${prod.imgURL}" class="card-img-top fixed-height-image" alt="${prod.title}-img">
                    <div class="card-body">
                      <h5 class="card-title">${prod.title}</h5>
                      <p class="card-text">${prod.description.slice(0, 100)}...</p>
                      <a href="#" class="btn btn-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                      Contact Vendor
                  </a>
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
                        <a href="#" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                          </svg>
                        Contact Vendor
                    </a>                
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
      }).catch((err) => {
        console.error(err);
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

  signInWithEmailAndPasswordBTN.innerHTML = `${spinnerPL}`;

  if (ValidateEmail(email)) {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        signInWithEmailAndPasswordBTN.innerHTML = `Sign In`;
        setTimeout(() => {
          location.reload();
        }, 2000);
        console.log('User signed In');
        errorSign.innerHTML = "";
      }).catch((err) => {
        signInWithEmailAndPasswordBTN.innerHTML = `Sign In`;
        console.error(err.message);
        if (err.code === 'auth/user-not-found') {
          errorSign.innerHTML = "*User not found";
        }
        if (err.code === 'auth/wrong-password') {
          errorSign.innerHTML = "*Wrong password";
        }
        console.error(err.code);
      });

  }
  else {
    //Invalid Email
    errorSign.innerHTML = '*Enter a Valid email address';
    event.target.innerHTML = `Sign Up`;

  }

});


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
});

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

      // console.log(errorCode, 'error code');
      // console.log(errorMessage, 'error message');
      // console.log(email, 'email');
      // console.log(credential, 'cred');
      // ...
    });
});

//Validate email
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  console.log("You have entered an invalid email address!");
  return (false);
}

//Validate Password
function CheckPassword(pwd) {
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
  if (passw.test(pwd)) {
    return true;
  }
  // console.log('Input Password and Submit [7 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]');
  return false;

}


//Sign up with email and password

signUpFormData.addEventListener('click', (event) => {
  event.preventDefault();

  const errorMessage = document.querySelector('.error');


  if (event.target.nodeName === 'BUTTON') {
    if (event.target.innerText === 'Sign Up') {

      event.target.innerHTML = `${spinnerPL}`;

      const username = signUpFormData.username.value;
      const email = signUpFormData.email.value;
      const password = signUpFormData.password.value;
      const confirmPwd = signUpFormData.confirmPwd.value;

      if (username) {
        if (ValidateEmail(email)) {
          if (password === confirmPwd) {
            if (CheckPassword(password)) {
              createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                  errorMessage.innerHTML = '';
                  signUPBTN.innerHTML = `Sign Up`;
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
                          //Send verification email
                          sendEmailVerification(auth.currentUser)
                            .then(() => {
                              // Email verification sent!
                              signUPBTN.innerHTML = `Verification email sent`;
                              // ...
                            });

                          // ...
                        }).catch((error) => {
                          // An error occurred
                          // ...
                          console.error(error);
                        });
                    }
                    else {
                      console.error('User was unable to sign in');
                    }
                  })
                }).catch((err) => {
                  // event.target.innerHTML = `Sign Up`;
                  if (err.code === 'auth/email-already-exists') {
                    errorMessage.innerHTML = `*email already exists`;
                  }
                  if (err.code === 'auth/session-cookie-expired') {
                    errorMessage.innerHTML = `session expired`;
                  }
                  if (err.code === 'auth/too-many-requests') {
                    errorMessage.innerHTML = `Too many requests. Try again later`;
                  }
                  console.error(err.message);
                });
            }
            else {
              //Password does not pass validation
              errorMessage.innerHTML = '*Input Password and Submit [7 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]';
              // event.target.innerHTML = `Sign Up`;

            }

          }
          else {
            //Password does not match
            errorMessage.innerHTML = '*Password does not match';
            // event.target.innerHTML = `Sign Up`;
            // console.log('Password does not match');
          }

        }
        else {
          //Invalid Email
          errorMessage.innerHTML = '*Enter a Valid email address';
          // event.target.innerHTML = `Sign Up`;

        }

      }
      else {
        //Invalid username
        errorMessage.innerHTML = '*Enter a Valid username';
        // event.target.innerHTML = `Sign Up`;

      }


    }
  }
  event.target.innerHTML = `Sign Up`;

})
//Sign up with google

regGoogle.addEventListener('click', (event) => {
  event.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
      console.error(err.message);
    });


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
    }).catch((err) => {
      console.error(err.message);
      // An error happened.
    });

}


  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('username:', user.displayName);
    }
  })

  //shifting between categories
  const categoryListSection = document.querySelector(".categoryList");
  const allProdSec = document.querySelector(".allProdSec");
  const spefCatSec = document.querySelector(".spefCatSec");
  const spefCat = document.querySelector(".spefCat");
  
  categoryListSection.addEventListener('click', (event)=>{
    event.preventDefault()

    if (event.target.nodeName === 'A') {
      // console.log(categories[event.target.innerHTML.toLowerCase()]);

      let getItemCat = event.target.innerHTML;
      spefCatTitle.innerHTML = `${getItemCat}`;
      allProdSec.classList.add('d-none');
      spinner.classList.remove('d-none');
      getDocs(colRef)
      .then((result) => {
        spefCatSec.classList.remove('d-none')
        spefCatTitle.classList.remove('d-none')
        const catList = [];
        result.forEach(product => {
          if (product.data().category === getItemCat) {
            let id = product.id;
            catList.push({...product.data(), id});
          }
        });
        // spefCatSec.innerHTML ='';
        if (catList.length == 0) {
          spefCat.innerHTML = `No product found`;
        }
        catList.forEach(prod => {
          spefCat.innerHTML += `
          <div class="col-12 col-md-4 mb-4">
          <div class="card bg-light">
              <img src="${prod.imgURL}" class="card-img-top fixed-height-image" alt="${prod.title}-img">
              <div class="card-body">
                  <h5 class="card-title">${prod.title}</h5>
                  <p class="card-text">${prod.description.slice(0, 100)}...</p>
                  <a href="#" class="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                  Contact Vendor
              </a>                
              </div>
          </div>
      </div>
    
          `;
        
        });
      spinner.classList.add('d-none');
      
      }).catch((err) => {
        console.error(err.message);
      });
    }
  })

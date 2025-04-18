
import {auth, db } from "./firebaseConfig.js"; 
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const returnBtn = document.getElementById('return');
    const googlebtn = document.querySelectorAll('.icons');
    const SignUpbtn = document.getElementById('SignUp btn');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });
    
    returnBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
    
    SignUpbtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default behavior (like refresh)
        const inputs = [
            document.getElementById('Name'),
            document.getElementById('E-mail'),
            document.getElementById('Password'),
            document.getElementById('PhoneNumber'),
            document.getElementById('Address')
        ];
    
        let hasEmptyField = false;
    
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.border = "2px solid red"; // Red border
                input.setAttribute('placeholder', "❌ Can't leave empty"); // Set placeholder message
                hasEmptyField = true;
    
                // Add an event listener to reset the placeholder when the user starts typing
                input.addEventListener('input', () => {
                    if (input.value.trim() !== "") {
                        input.style.border = ""; // Reset the border
                        input.setAttribute('placeholder', input.id.charAt(0).toUpperCase() + input.id.slice(1)); // Reset placeholder text
                    }
                });
            } else {
                input.style.border = ""; // Reset border if the field is not empty
                input.setAttribute('placeholder', input.id.charAt(0).toUpperCase() + input.id.slice(1)); // Reset placeholder text
            }
        });
    
        if (hasEmptyField) {
            return; // Stop here if any field is empty
        }

        const Email = document.getElementById('E-mail').value.trim();
        const PassWord = document.getElementById('Password').value.trim();
        const Name = document.getElementById('Name').value;
        const Phonenbr = document.getElementById('PhoneNumber').value;
        const Ads = document.getElementById('Address').value.trim();

        
        registerUser(Name, Email, PassWord, Phonenbr, Ads);

    });

    googlebtn.forEach(btn => {
        btn.addEventListener('click', () => {
    
            const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
          .then((result) => {
            // user signed in
            console.log("button clicked");
            console.log(result.user);
            
          })
          .catch((error) => {
            console.error(error);
          });
        
        });

        
    });

})

async function registerUser(name, email, password, phone, address) {
    const usersRef = collection(db, "Users");
  
    // Query for existing user
    const q = query(usersRef, 
      where("email", "==", email)
    );
  
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
        document.getElementById('E-mail').setCustomValidity("❌ Email already exists.");
        document.getElementById('E-mail').reportValidity();  // Trigger the display of the validation message
      return;
    }
  
    // If user not found, create Auth user
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        // Add to Firestore
        await addDoc(usersRef, {
          uid: user.uid,
          name,
          email,
          phone,
          address
        });
  
        console.log("User successfully registered and added to Firestore!");
      })
      .catch((error) => {
        console.error("Auth error:", error.message);
      });
  }

  
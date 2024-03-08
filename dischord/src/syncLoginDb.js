import { db } from "./firebase.js"
import { doc, setDoc } from "firebase/firestore";
import loginDb from "./loginDb.json"; 

// Loop through the validLogins array and upload each user to Firestore
export async function syncLoginDb() {

    // Loop through the validLogins array and upload each user to Firestore
    loginDb.validLogins.forEach(async (user) => {
        try {
            // Construct a document reference for each user
            const userDocRef = doc(db, "users", user.id);

            // Set the user document data in Firestore
            await setDoc(userDocRef, user);

            console.log(`User ${user.id} uploaded to Firestore successfully`);
        } catch (error) {
            console.error(`Error uploading user ${user.id} to Firestore:`, error);
        }
    });
}

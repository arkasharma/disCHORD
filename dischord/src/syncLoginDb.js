import { db } from "./firebase.js"
import { doc, setDoc, getDoc } from "firebase/firestore";
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

            // Set the userChats document data in Firestore
            const userChatDocRef = doc(db, "userChats", user.id);
            const userChatDocSnapshot = await getDoc(userChatDocRef);
            
            // If the userChat document doesn't exist, initialize it in the userChats collection
            if (!userChatDocSnapshot.exists()) {
                await setDoc(userChatDocRef, {});
            }
        } 
        
        catch (error) {
            console.error(`Error uploading user ${user.id} to Firestore:`, error);
        }
    });
}

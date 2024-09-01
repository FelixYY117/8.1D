import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, addDoc,setDoc, doc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { setLogLevel } from 'firebase/app';
setLogLevel('debug');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCURa_B74bRHNvOt35GTi5IwKxcVL-0F_E",
  authDomain: "dev-deakin-976d4.firebaseapp.com",
  projectId: "dev-deakin-976d4",
  storageBucket: "dev-deakin-976d4.appspot.com",
  messagingSenderId: "1081047137346",
  appId: "1:1081047137346:web:a9c65faecea2d92d4ac1db",
  measurementId: "G-8RT1VSZ4SR"
};

// Initialize Firebase
// 初始化 Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
// Enhanced Firestore connection test
const testFirestoreWrite = async () => {
  console.log("Starting Firestore write test...");
  try {
    console.log("Initializing Firestore...");
    const testCollection = collection(db, 'test');
    
    console.log("Preparing test document...");
    const testDoc = { 
      test: 'This is a test document',
      timestamp: new Date().toISOString()
    };
    console.log("Test document prepared:", testDoc);

    console.log("Attempting to write test document...");
    
    // Attempt 1: Using addDoc
    try {
      const docRef = await addDoc(testCollection, testDoc);
      console.log("Test document written successfully with ID:", docRef.id);
      return true;
    } catch (addDocError) {
      console.error("addDoc failed:", addDocError);
      
      // Attempt 2: Using setDoc with a specific document ID
      try {
        console.log("Attempting alternative write method...");
        const specificDocRef = doc(testCollection, 'test-document');
        await setDoc(specificDocRef, testDoc);
        console.log("Test document written successfully with ID: test-document");
        return true;
      } catch (setDocError) {
        console.error("setDoc also failed:", setDocError);
        throw setDocError;
      }
    }
  } catch (error) {
    console.error("Firestore write test failed");
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
    return false;
  }
};

// Run the test
testFirestoreWrite().then((success) => {
  if (success) {
    console.log("Firestore write test completed successfully.");
  } else {
    console.error("Firestore write test failed. Check the error logs above for details.");
  }
});

export default app;
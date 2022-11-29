import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDV10HGg0uVi9mhz5tnBN5OTMCB83tWwqY",
  authDomain: "itsshubhaofficial.firebaseapp.com",
  projectId: "itsshubhaofficial",
  storageBucket: "itsshubhaofficial.appspot.com",
  messagingSenderId: "281752140032",
  appId: "1:281752140032:web:8bb97b362e1dc4eaf31be5",
  measurementId: "G-02T83J281G",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage();

// Create a storage reference from our storage service
const peopleStorageRef = ref(storage, "people");
const productsStorageRef = ref(storage, "products");

export { peopleStorageRef, productsStorageRef };

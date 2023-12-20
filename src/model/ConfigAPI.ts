
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export class ConfigAPI {
  public static firebaseConfig = {
    apiKey: "AIzaSyBdqNtMqJ-zEViExssvrmRvkAzXtapVkX0",
    authDomain: "mandrei09-s-petshop.firebaseapp.com",
    projectId: "mandrei09-s-petshop",
    storageBucket: "mandrei09-s-petshop.appspot.com",
    messagingSenderId: "198900954573",
    appId: "1:198900954573:web:53617def179b59cd444084",
    measurementId: "G-5VB5KQJ3PN"
  };
  
  public static app = initializeApp(ConfigAPI.firebaseConfig);
  public static analytics = getAnalytics(ConfigAPI.app);
  public static db = getFirestore(ConfigAPI.app);
  
}

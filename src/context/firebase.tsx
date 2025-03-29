import React, { createContext, useContext, ReactNode } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjCUgDWs3Urw4VqXEXkGs1ONZup2qJhng",
    authDomain: "crane-9c602.firebaseapp.com",
    databaseURL: "https://crane-9c602-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "crane-9c602",
    storageBucket: "crane-9c602.firebasestorage.app",
    messagingSenderId: "751179238824",
    appId: "1:751179238824:web:baf538a9fdf1a028c1e19d"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

interface FirebaseContextProps {
    app: FirebaseApp;
    HelmetData: () => void;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

interface FirebaseProviderProps {
    children: ReactNode;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
    const HelmetData = async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db);

            const snapshot = await get(child(dbRef, "Helmet1"));

            if (snapshot.exists()) {
                console.log("Helmet1 Data:", snapshot.val());
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching Helmet1 data:", error);
        }
    };

    return (
        <FirebaseContext.Provider value={{ app, HelmetData }}>
            {children}
        </FirebaseContext.Provider>
    );
};


// Custom hook for easier consumption of the Firebase context
export const useFirebase = (): FirebaseContextProps => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return context;
};
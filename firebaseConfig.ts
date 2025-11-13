// @ts-nocheck

// PENTING: Ganti nilai-nilai di bawah ini dengan konfigurasi proyek Firebase Anda.
// Anda bisa mendapatkannya dari Firebase Console -> Project Settings -> General -> Your apps -> SDK setup and configuration.
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "nama-proyek-anda.firebaseapp.com",
  projectId: "nama-proyek-anda",
  storageBucket: "nama-proyek-anda.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};

// Inisialisasi Firebase
let db;
try {
  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(firebaseConfig);
  }
  db = window.firebase.firestore();
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Optional: Display a user-friendly message on the UI
  const root = document.getElementById('root');
  if (root) {
      root.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: white;">
              <h1>Error Konfigurasi Firebase</h1>
              <p>Pastikan Anda telah mengisi file <code>firebaseConfig.ts</code> dengan benar.</p>
              <p>Lihat konsol untuk detail error.</p>
          </div>
      `;
  }
}
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Izinkan semua orang untuk membaca dan menulis ke koleksi 'orders'
    // PENTING: Ini hanya untuk pengembangan. Amankan ini sebelum produksi!
    match /orders/{orderId} {
      allow read, write: if true;
    }
  }
}

export { db };

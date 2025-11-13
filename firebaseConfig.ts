// @ts-nocheck

// ====================================================================================
// PENTING: GANTI SEMUA NILAI DI BAWAH INI DENGAN KONFIGURASI PROYEK FIREBASE ANDA
// ====================================================================================
// Anda bisa mendapatkannya dari Firebase Console:
// 1. Buka proyek Firebase Anda
// 2. Klik ikon gerigi (⚙️) di samping 'Project Overview'
// 3. Pilih 'Project settings'
// 4. Di tab 'General', scroll ke bawah ke bagian 'Your apps'
// 5. Pilih aplikasi web Anda dan salin objek 'firebaseConfig' ke sini.
const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_ANDA",
  authDomain: "GANTI_DENGAN_AUTH_DOMAIN_ANDA",
  projectId: "GANTI_DENGAN_PROJECT_ID_ANDA",
  storageBucket: "GANTI_DENGAN_STORAGE_BUCKET_ANDA",
  messagingSenderId: "GANTI_DENGAN_MESSAGING_SENDER_ID_ANDA",
  appId: "GANTI_DENGAN_APP_ID_ANDA"
};

// --- Inisialisasi Firebase ---
// Tidak perlu mengubah kode di bawah ini.
let db;
try {
  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(firebaseConfig);
  }
  db = window.firebase.firestore();
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Menampilkan pesan error yang jelas jika konfigurasi salah
  const root = document.getElementById('root');
  if (root) {
      root.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: white; background-color: #1a202c; height: 100vh; display: flex; align-items: center; justify-content: center;">
              <div>
                  <h1 style="font-size: 1.5rem; font-weight: bold; color: #f56565;">Error Konfigurasi Firebase</h1>
                  <p style="margin-top: 1rem; color: #a0aec0;">Pastikan Anda telah mengisi file <code>firebaseConfig.ts</code> dengan benar menggunakan kredensial dari proyek Firebase Anda.</p>
                  <p style="margin-top: 0.5rem; color: #a0aec0;">Lihat konsol browser untuk detail error teknis.</p>
              </div>
          </div>
      `;
  }
}

// Aturan keamanan (security rules) TIDAK ditempatkan di sini.
// Aturan tersebut harus diatur di dalam dasbor Firebase Console Anda.
// Lihat file INSTRUCTIONS.md untuk panduan lengkap.

export { db };

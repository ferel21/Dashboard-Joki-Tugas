# 🚀 Panduan Penyiapan Firebase (Wajib Agar Aplikasi Berfungsi)

Ikuti 2 langkah mudah ini untuk menghubungkan aplikasi Anda ke database Firebase dan mengaktifkan fitur real-time. Proses ini hanya memakan waktu sekitar 2 menit.

---

### Langkah 1: Dapatkan Konfigurasi Proyek Firebase Anda

Anda perlu memberitahu aplikasi cara terhubung ke proyek Firebase Anda.

1.  **Buka Firebase Console**: Pergi ke [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  **Buat Proyek Baru**: Jika Anda belum punya, klik "Add project" dan ikuti petunjuknya (Anda bisa melewati Google Analytics).
3.  **Buat Aplikasi Web**:
    *   Di dasbor proyek Anda, klik ikon web `</>`.
    *   Beri nama aplikasi Anda (misal: "Dashboard Joki") dan klik "Register app".
4.  **Salin Konfigurasi**:
    *   Firebase akan menampilkan `firebaseConfig`. Ini terlihat seperti ini:
      ```javascript
      const firebaseConfig = {
        apiKey: "AIzaSy...",
        authDomain: "nama-proyek.firebaseapp.com",
        // ...dan seterusnya
      };
      ```
    *   Salin seluruh objek ini.
5.  **Tempel ke Kode**:
    *   Buka file `firebaseConfig.ts` di proyek Anda.
    *   Hapus objek `firebaseConfig` yang ada di sana dan ganti dengan yang baru saja Anda salin.

---

### Langkah 2: Atur Aturan Keamanan (Security Rules)

Secara default, database Anda terkunci. Anda perlu memberikan izin agar aplikasi bisa membaca dan menulis data.

1.  **Buka Firestore**:
    *   Di menu sebelah kiri Firebase Console, klik **Build > Firestore Database**.
    *   Klik **Create database**.
    *   Pilih **Start in test mode**. Ini akan mengizinkan akses baca/tulis selama 30 hari, cukup untuk pengembangan.
    *   Pilih lokasi server (pilih yang terdekat dengan Anda, misal `asia-southeast2` untuk Jakarta).
    *   Klik **Enable**.

2.  **(Opsional) Aturan Permanen untuk Pengembangan**: Aturan "test mode" akan kedaluwarsa. Untuk pengembangan jangka panjang, gunakan aturan berikut:
    *   Setelah database dibuat, klik tab **Rules** di bagian atas.
    *   Ganti editor teks dengan kode berikut:
      ```javascript
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
      ```
    *   Klik **Publish**.

---

**Selesai!** 🎉

Setelah menyelesaikan kedua langkah ini, refresh aplikasi Anda di browser. Dasbor Anda sekarang akan sepenuhnya terhubung ke Firebase dan semua pembaruan data akan terjadi secara real-time.

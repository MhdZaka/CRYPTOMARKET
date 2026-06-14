# Crypto Market (Ionic + Vue)

Aplikasi pemantau harga cryptocurrency secara real-time yang dibangun ulang menggunakan **Ionic Framework**, **Vue.js**, dan **TypeScript**. Data koin diambil secara *real-time* dari **CoinLore API**, dengan harga yang dikonversi ke kurs Rupiah menggunakan **ExchangeRate API**.

Mengusung desain antarmuka *dark mode* premium yang terinspirasi dari aplikasi pertukaran kripto terkemuka, dilengkapi dengan fitur pencarian dan penyortiran data yang dioptimalkan untuk pengalaman *mobile* maupun desktop.

---

## 🚀 Fitur Utama

- **Logo Koin Asli (*Real Coin Logo*)**: Memuat logo asli masing-masing aset kripto langsung dari CoinCap CDN. Dilengkapi dengan mekanisme *fallback image* otomatis berupa inisial berlatar emas elegan jika logo tidak ditemukan atau saat jaringan terputus.
- **Konversi Harga ke Rupiah (IDR)**: Harga USD dari API dikonversi secara *real-time* menggunakan kurs tukar terbaru. Menyesuaikan desimal pintar untuk koin micin. Jika API kurs *down*, akan menggunakan kurs cadangan (Rp16.300).
- **Indikator Metrik Pasar Kripto**:
  - **Kap Pasar (Market Cap)** dalam Rupiah yang diformat dengan singkatan standar lokal (Triliun, Miliar, Juta).
  - **Volume 24 Jam** dikonversi dalam Rupiah dengan struktur yang mudah dibaca.
  - **Tren 7 Hari & 24 Jam** beserta ikon panah indikator pergerakan harga (*badge* warna sukses/merah dinamis).
- **Fitur Pencarian (Search)**: Penyaringan koin secara langsung hanya dengan mengetikkan nama (contoh: *Bitcoin*) atau simbolnya (*BTC*).
- **Sortir Kustom Dinamis**: Opsi pengurutan data koin berdasarkan:
  - *Rank Tertinggi* (Urutan Popularitas)
  - *Harga Terbesar* (Top Price)
  - *Kap Pasar Terbesar* (Top Market Cap)
  - *Volume Perdagangan 24J Terbesar* (Most Traded)
- **Animasi UI Interaktif (*Touch Feedback*)**: Efek animasi mengecil secara elastis (*scale down*) dan pengurangan opasitas (*opacity*) yang sangat mulus ketika kartu disentuh/klik, mereplikasi pengalaman komponen native *TouchableOpacity*.

---

## 🛠️ Stack Teknologi

- **Frontend Framework:** Vue 3 (Composition API, `<script setup>`)
- **UI Toolkit:** Ionic Framework v8
- **Bahasa:** TypeScript
- **HTTP Client:** Axios
- **Build Tool:** Vite

*(Catatan: Versi React Native sebelumnya dari proyek ini telah disimpan dengan aman di `.gitignore` sebagai `react-native-backup` untuk keperluan referensi riwayat/legacy)*

---

## 💻 Cara Instalasi & Menjalankan

Pastikan komputer Anda sudah terinstal **Node.js**.

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/MhdZaka/CRYPTOMARKET.git
   cd CRYPTOMARKET
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan *Development Server*:**
   ```bash
   npm run dev
   ```
   Atau jika Anda menggunakan Ionic CLI:
   ```bash
   npx ionic serve
   ```

4. **Testing di Browser:**
   Aplikasi akan terbuka secara otomatis di browser (*default URL*: `http://localhost:8100`). **Tips Terbaik:** Tekan tombol **F12** di browser dan pilih ikon *Device Toolbar / Mobile Simulator* untuk menikmati *layout* dalam ukuran *smartphone*.

---

## 📂 Struktur Proyek Baru

```text
src/
├── components/
│   └── CryptoCard.vue       # Komponen Kartu Kripto (Desain UI, Animasi Interaktif, Format Rupiah)
├── interfaces/
│   └── Crypto.ts            # Tipe definisi data (Types/Interfaces) untuk Kripto
├── services/
│   └── cryptoService.ts     # Pusat pemanggilan Axios (Endpoint API Kripto & Nilai Tukar IDR)
├── theme/
│   └── variables.css        # Konfigurasi Token Desain (Variabel Warna Tema Dark Mode Premium)
├── views/
│   └── HomePage.vue         # Layar Utama (Bagian Header, Searchbar, Filter Sort, & Looping Data)
├── App.vue                  # Root Komponen Vue
└── main.ts                  # Entry Point Ionic Vue App
```

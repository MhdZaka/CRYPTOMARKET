# Crypto Market - Aplikasi Harga Cryptocurrency Real-Time

Aplikasi mobile berbasis **React Native** dengan **TypeScript** dan **Expo SDK** untuk menampilkan harga cryptocurrency terkini secara real-time yang bersumber dari [CoinLore API](https://api.coinlore.net/api/tickers/).

Desain antarmuka aplikasi ini mengadopsi tema gelap premium (*dark mode*) yang terinspirasi dari bursa aset kripto global terkemuka seperti Binance dan Tokocrypto, lengkap dengan statistik harga dinamis dalam mata uang **Rupiah (IDR)**.

---

## ✨ Fitur Utama

- 🪙 **Logo Koin Asli (Real Coin Icons)**: Menampilkan logo cryptocurrency resmi secara otomatis dari CoinCap CDN. Dilengkapi sistem *fallback* cerdas (inisial huruf berlatar emas) jika logo tidak ditemukan di CDN atau perangkat sedang luring.
- 🇮🇩 **Konversi Rupiah Real-Time**: Konversi harga USD ke Rupiah secara otomatis menggunakan data kurs dinamis dari *ExchangeRate API* (dengan batas waktu timeout dan *fallback* aman ke Rp16.300 jika koneksi terganggu).
- 📊 **Statistik Pasar Lengkap (dalam Rupiah)**:
  - **Kapitalisasi Pasar (Market Cap)**: Diformat dinamis menggunakan singkatan lokal (misal: **T** untuk Triliun, **M** untuk Miliar).
  - **Volume Perdagangan 24 Jam**: Volume transaksi harian dalam Rupiah.
  - **Tren Harga 7 Hari terakhir**: Indikator persentase tren naik (hijau) atau turun (merah).
- 📈 **Perubahan Harga 24 Jam**: Lencana persentase perubahan harga harian yang interaktif di sebelah simbol koin (warna hijau untuk naik, merah untuk turun).
- 🔍 **Pencarian Cepat**: Filter pencarian instan berdasarkan nama koin atau simbol secara *case-insensitive*.
- 🔄 **Pull to Refresh**: Geser ke bawah untuk menyegarkan data harga dan kurs mata uang terbaru.
- 📱 **Desain Premium & Animasi Halus**:
  - Animasi *fade-in* bertingkat (*staggered*) saat daftar dimuat menggunakan `react-native-reanimated`.
  - Efek tombol membal (*bounce scaling*) saat kartu ditekan.
  - Ikon aplikasi kustom dan *Splash Screen* gelap untuk menghindari layar putih yang berkedip saat memuat aplikasi.

---

## 🚀 Instalasi & Persiapan Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di komputer Anda dan aplikasi **Expo Go** pada ponsel Android/iOS Anda untuk pengujian.

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/MhdZaka/CRYPTOMARKET.git
   cd CRYPTOMARKET
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Project**:
   ```bash
   npm start
   ```

4. **Menjalankan di HP**:
   Buka aplikasi **Expo Go** di ponsel Anda, lalu pindai (*scan*) QR Code yang muncul di terminal VS Code Anda (pastikan ponsel dan komputer terhubung ke jaringan Wi-Fi yang sama).

---

## 📦 Cara Build Menjadi Aplikasi APK (Android)

Aplikasi ini dikonfigurasi menggunakan **EAS Build** agar proses build APK berjalan di server cloud Expo secara gratis.

1. Install EAS CLI di komputer Anda secara global:
   ```bash
   npm install -g eas-cli
   ```

2. Login ke akun Expo Anda:
   ```bash
   eas login
   ```

3. Jalankan proses pembuatan file APK:
   ```bash
   eas build --platform android --profile preview
   ```

Setelah proses build selesai, Anda akan diberikan tautan unduhan dan QR Code untuk mengunduh dan menginstal file APK tersebut langsung ke ponsel Android Anda.

---

## 📂 Struktur Folder Proyek

```text
src/
├── api/
│   └── coinloreApi.ts       # Konfigurasi instansiasi Axios untuk CoinLore API
├── components/
│   ├── CryptoCard.tsx       # Komponen kartu koin (animasi, logo koin, konversi IDR, detail stats)
│   ├── Header.tsx           # Header aplikasi dengan lencana kedipan "LIVE"
│   └── Loading.tsx          # Spinner pemuatan awal berwarna emas
├── interfaces/
│   └── Crypto.ts            # Tipe data TypeScript (Model koin & respons API)
├── navigation/
│   └── AppNavigator.tsx     # Konfigurasi tumpukan navigasi React Navigation
├── screens/
│   └── HomeScreen.tsx       # State manajemen (search, fetch data, refresh, load rate USD-IDR)
├── services/
│   └── cryptoService.ts     # Integrasi pemanggilan API CoinLore dan ExchangeRate
├── theme/
│   └── colors.ts            # Skema warna global (Binance theme)
└── App.tsx                  # Root entrypoint setup Provider & Navigator
```

---

## ⚙️ Skrip Pengujian

Untuk melakukan pemeriksaan tipe data TypeScript demi memastikan tidak ada error kode sebelum rilis:
```bash
npm run typecheck
```

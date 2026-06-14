# Crypto Market

Aplikasi mobile Android (React Native + TypeScript + Expo) buat mantau harga cryptocurrency secara real-time. Data koin diambil dari **CoinLore API**, dan kurs Rupiah diambil dari **ExchangeRate API**.

dengan tampilan dark mode agar nyaman dilihat.

---

## 🚀 Fitur Utama

- **Logo Koin Real**: Logo koin langsung muncul dari CoinCap CDN. Kalau pas offline atau logonya gak ada, otomatis bakal nampilin inisial koin sebagai cadangan.
- **Harga Rupiah (IDR) Real-time**: Konversi harga USD ke Rupiah secara otomatis pakai data kurs terbaru. Kalau API kurs bermasalah, ada fallback otomatis ke rate Rp16.300.
- **Statistik Lengkap**:
  - **Kap Pasar (Market Cap)** dalam Rupiah (dibuat ringkas pakai Miliar / Triliun).
  - **Volume 24 Jam** dalam Rupiah.
  - **Tren 7 Hari** terakhir (naik/turun).
- **Persentase Perubahan 24 Jam**: Ada badge hijau (kalau naik) atau merah (kalau turun) lengkap dengan ikon panah di sebelah simbol koin.
- **Fitur Pencarian**: Bisa cari koin berdasarkan nama atau simbolnya.
- **Tarik untuk Refresh (Pull-to-refresh)**: Tinggal tarik ke bawah buat update harga dan kurs terbaru.

---

## 🛠️ Cara Penggunaan

Pastiin komputer kamu udah keinstall **Node.js**, dan HP kamu udah keinstall aplikasi **Expo Go** (bisa download di Play Store/App Store).

1. Clone repo ini:
   ```bash
   git clone https://github.com/MhdZaka/CRYPTOMARKET.git
   cd CRYPTOMARKET
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm start
   ```

4. Buka di HP:
   Buka aplikasi **Expo Go** di HP kamu, lalu scan QR code yang muncul di terminal VS Code. (Pastiin HP dan laptop kamu terhubung ke Wi-Fi yang sama).

---

## 📂 Struktur Folder Proyek

```text
src/
├── api/
│   └── coinloreApi.ts       # Setup Axios buat CoinLore API
├── components/
│   ├── CryptoCard.tsx       # Kartu koin (animasi, logo koin, konversi IDR, detail statistik)
│   ├── Header.tsx           # Header atas aplikasi (ada badge kedip "LIVE")
│   └── Loading.tsx          # Tampilan loading pas awal buka aplikasi
├── interfaces/
│   └── Crypto.ts            # Tipe data TypeScript (Type untuk koin & respons API)
├── navigation/
│   └── AppNavigator.tsx     # Router / Navigasi aplikasi
├── screens/
│   └── HomeScreen.tsx       # Layar utama (pencarian, load data koin & kurs Rupiah)
├── services/
│   └── cryptoService.ts     # Service buat fetch data koin & kurs exchange rate
├── theme/
│   └── colors.ts            # Palette warna dark mode (Binance style)
└── App.tsx                  # Root file untuk setup provider & rute
```

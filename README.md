# Crypto Market

Aplikasi Android React Native + TypeScript untuk menampilkan harga cryptocurrency
dari [CoinLore API](https://api.coinlore.net/api/tickers/).

## Fitur

- Menampilkan `rank`, `name`, `symbol`, dan `price_usd`
- Pencarian berdasarkan nama atau simbol
- Pull to refresh menggunakan `RefreshControl`
- Loading, empty, dan error state dengan tombol Retry
- Tema gelap premium bergaya Binance/Tokocrypto
- Gradient card, shadow, fade-in, dan press animation

## Instalasi dan Menjalankan Aplikasi

Pastikan Node.js dan aplikasi Expo Go sudah tersedia.

```bash
npm install
npm run android
```

Untuk memeriksa TypeScript:

```bash
npm run typecheck
```

## Struktur Folder

```text
src/
├── api/
│   └── coinloreApi.ts
├── components/
│   ├── CryptoCard.tsx
│   ├── Header.tsx
│   └── Loading.tsx
├── interfaces/
│   └── Crypto.ts
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   └── HomeScreen.tsx
├── services/
│   └── cryptoService.ts
├── theme/
│   └── colors.ts
└── App.tsx
```

## Penjelasan File

- `App.tsx`: entry point Expo yang meneruskan aplikasi ke `src/App.tsx`.
- `src/App.tsx`: memasang Paper theme, NavigationContainer, status bar, dan navigator.
- `src/api/coinloreApi.ts`: instance Axios dengan base URL dan timeout.
- `src/services/cryptoService.ts`: service untuk mengambil data ticker dari CoinLore.
- `src/interfaces/Crypto.ts`: kontrak TypeScript untuk cryptocurrency dan response API.
- `src/navigation/AppNavigator.tsx`: konfigurasi React Navigation.
- `src/screens/HomeScreen.tsx`: state data, pencarian, refresh, loading, error, dan daftar.
- `src/components/CryptoCard.tsx`: kartu cryptocurrency dengan gradient dan animasi.
- `src/components/Header.tsx`: header premium dan indikator live.
- `src/components/Loading.tsx`: tampilan loading saat request pertama.
- `src/theme/colors.ts`: pusat warna agar styling konsisten dan reusable.

## Alur Data

`HomeScreen` memanggil `getCryptos()`. Service tersebut melakukan request melalui
instance Axios di `coinloreApi.ts`, lalu mengembalikan array `Crypto` kepada layar.
Data ditampilkan menggunakan `FlatList` agar daftar tetap efisien.

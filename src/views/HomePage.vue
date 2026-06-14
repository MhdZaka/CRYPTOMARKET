<template>
  <ion-page>
    <ion-content class="custom-content">
      <div class="desktop-wrapper">
        
        <div class="app-header">
          <div class="header-left">
            <div class="app-icon">
              <img src="/logo.png" class="app-logo" alt="Crypto Market Logo" />
            </div>
            <div class="header-text">
              <h1 class="header-title">Crypto Market</h1>
              <span class="header-subtitle">Realtime Cryptocurrency Prices</span>
            </div>
          </div>
          <div class="header-right">
            <div class="live-badge">
              <span class="live-dot"></span>
              LIVE
            </div>
          </div>
        </div>

        <div class="controls-container">
          <ion-searchbar 
            v-model="searchQuery" 
            placeholder="Search coin or symbol" 
            class="custom-searchbar"
            mode="md">
          </ion-searchbar>
          
          <div class="sort-wrapper">
            <ion-select v-model="sortBy" interface="popover" class="custom-select">
              <ion-select-option value="rank">Rank</ion-select-option>
              <ion-select-option value="price">Highest Price</ion-select-option>
              <ion-select-option value="market_cap">Highest Market Cap</ion-select-option>
              <ion-select-option value="volume">Highest Volume</ion-select-option>
            </ion-select>
          </div>
        </div>

        <div class="list-header">
          <div class="list-title-group">
            <h2 class="list-title">Top Assets</h2>
            <span class="list-subtitle">{{ filteredAndSortedCryptos.length }} cryptocurrencies</span>
          </div>
          <div class="list-label">PRICE</div>
        </div>

        <div v-if="loading" class="loading-container">
          <ion-spinner name="crescent" color="primary"></ion-spinner>
          <p>Memuat data pasar...</p>
        </div>

        <div v-else class="list-container">
          <CryptoCard
            v-for="crypto in filteredAndSortedCryptos"
            :key="crypto.id"
            :crypto="crypto"
            :usdToIdr="usdToIdr"
          />
          <div v-if="filteredAndSortedCryptos.length === 0" class="empty-state">
            <p>Koin tidak ditemukan.</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonContent, IonSpinner, IonSearchbar, IonSelect, IonSelectOption, IonIcon } from '@ionic/vue';
import { statsChart } from 'ionicons/icons';
import CryptoCard from '../components/CryptoCard.vue';
import { getCryptos, getUsdToIdrRate } from '../services/cryptoService';
import { Crypto } from '../interfaces/Crypto';

const cryptos = ref<Crypto[]>([]);
const usdToIdr = ref<number>(16300);
const loading = ref<boolean>(true);
const searchQuery = ref<string>('');
const sortBy = ref<string>('rank');

const loadData = async () => {
  loading.value = true;
  try {
    const [cryptoData, rateData] = await Promise.all([
      getCryptos(),
      getUsdToIdrRate()
    ]);
    cryptos.value = cryptoData;
    usdToIdr.value = rateData;
  } catch (error) {
    console.error("Error loading data", error);
  } finally {
    loading.value = false;
  }
};

const filteredAndSortedCryptos = computed(() => {
  let result = [...cryptos.value];

  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (c) => c.symbol.toLowerCase().includes(query) || c.name.toLowerCase().includes(query)
    );
  }

  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return parseFloat(b.price_usd) - parseFloat(a.price_usd);
      case 'market_cap':
        return parseFloat(b.market_cap_usd) - parseFloat(a.market_cap_usd);
      case 'volume':
        return b.volume24 - a.volume24;
      case 'rank':
      default:
        return a.rank - b.rank;
    }
  });

  return result;
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.desktop-wrapper {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  padding: 16px;
}

.custom-content {
  --background: var(--ion-background-color);
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.header-title {
  margin: 0;
  color: var(--ion-text-color);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.header-subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: 2px;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgba(14, 203, 129, 0.15);
  color: var(--ion-color-success);
  font-size: 11px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background-color: var(--ion-color-success);
  border-radius: 50%;
}

.controls-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .controls-container {
    flex-direction: row;
    align-items: center;
  }
  .custom-searchbar {
    flex: 1;
  }
  .sort-wrapper {
    min-width: 180px;
  }
}

.custom-searchbar {
  --background: var(--card-highlight);
  --color: var(--ion-text-color);
  --placeholder-color: var(--text-secondary);
  --icon-color: var(--text-secondary);
  --border-radius: 16px;
  --box-shadow: none;
  padding: 0;
}

.sort-wrapper {
  background-color: var(--card-highlight);
  border-radius: 16px;
  height: 42px; 
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.custom-select {
  width: 100%;
  --placeholder-color: var(--ion-text-color);
  color: var(--ion-text-color);
  font-size: 14px;
  font-weight: 500;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  padding: 0 4px;
}

.list-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list-title {
  margin: 0;
  color: var(--ion-text-color);
  font-size: 18px;
  font-weight: 700;
}

.list-subtitle {
  color: var(--text-secondary);
  font-size: 12px;
}

.list-label {
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.list-container {
  padding-bottom: 24px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

ion-spinner {
  margin-bottom: 16px;
  transform: scale(1.5);
}
</style>

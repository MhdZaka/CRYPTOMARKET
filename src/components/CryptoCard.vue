<template>
  <ion-card 
    class="crypto-card"
    :class="{ 'is-pressed': isPressed }"
    @touchstart="isPressed = true"
    @touchend="isPressed = false"
    @touchcancel="isPressed = false"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseleave="isPressed = false"
  >
    <div class="card-content">
      <div class="card-header">
        <div class="crypto-info">
          <div class="rank-badge">#{{ crypto.rank }}</div>
          <div class="logo-container">
            <img 
              v-if="!imageError" 
              :src="imageUrl" 
              @error="handleImageError" 
              class="crypto-logo" 
              :alt="crypto.symbol"
            />
            <div v-else class="fallback-logo">
              {{ crypto.symbol.substring(0, 1) }}
            </div>
          </div>
          <div class="name-container">
            <span class="name">{{ crypto.name }}</span>
            <div class="symbol-row">
              <span class="symbol">{{ crypto.symbol }}</span>
              <span class="badge" :class="isPositive24h ? 'badge-success' : 'badge-danger'">
                <ion-icon :icon="isPositive24h ? caretUp : caretDown"></ion-icon>
                {{ Math.abs(parseFloat(crypto.percent_change_24h)).toFixed(2) }}%
              </span>
            </div>
          </div>
        </div>

        <div class="price-container">
          <span class="price-idr">{{ formatIdr(priceIdr) }}</span>
          <span class="price-usd">${{ formatUsd(crypto.price_usd) }}</span>
        </div>
      </div>

      <div class="divider"></div>

      <div class="card-footer">
        <div class="stat-item">
          <span class="stat-label">KAP PASAR</span>
          <span class="stat-value">{{ formatAbbreviated(parseFloat(crypto.market_cap_usd) * usdToIdr) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">VOLUME (24J)</span>
          <span class="stat-value">{{ formatAbbreviated(crypto.volume24 * usdToIdr) }}</span>
        </div>
        <div class="stat-item align-end">
          <span class="stat-label">TREN (7H)</span>
          <span class="stat-value trend" :class="isPositive7d ? 'text-success' : 'text-danger'">
            <ion-icon :icon="isPositive7d ? trendingUp : trendingDown" class="trend-icon"></ion-icon>
            {{ Math.abs(parseFloat(crypto.percent_change_7d)).toFixed(2) }}%
          </span>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonCard, IonIcon } from '@ionic/vue';
import { caretUp, caretDown, trendingUp, trendingDown } from 'ionicons/icons';
import { Crypto } from '../interfaces/Crypto';

const props = defineProps<{
  crypto: Crypto;
  usdToIdr: number;
}>();

const imageError = ref(false);
const isPressed = ref(false);

const imageUrl = computed(() => {
  return `https://assets.coincap.io/assets/icons/${props.crypto.symbol.toLowerCase()}@2x.png`;
});

const handleImageError = () => {
  imageError.value = true;
};

const priceIdr = computed(() => parseFloat(props.crypto.price_usd) * props.usdToIdr);
const isPositive24h = computed(() => parseFloat(props.crypto.percent_change_24h) >= 0);
const isPositive7d = computed(() => parseFloat(props.crypto.percent_change_7d) >= 0);

const formatUsd = (value: string) => {
  const num = parseFloat(value);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatIdr = (value: number) => {
  if (value < 100) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format(value);
  }
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
};

const formatAbbreviated = (value: number) => {
  if (value >= 1e12) return `Rp ${(value / 1e12).toFixed(2)} T`;
  if (value >= 1e9) return `Rp ${(value / 1e9).toFixed(2)} M`;
  if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(2)} Jt`;
  return formatIdr(value);
};
</script>

<style scoped>
.crypto-card {
  background-color: var(--card-background);
  border-radius: 20px;
  margin: 0 0 16px 0;
  box-shadow: none;
  border: none;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.crypto-card.is-pressed {
  transform: scale(0.97);
  opacity: 0.8;
}

.card-content {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crypto-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-badge {
  background-color: rgba(240, 185, 11, 0.15);
  color: var(--ion-color-primary);
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
}

.logo-container {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  background-color: var(--card-highlight);
  display: flex;
  justify-content: center;
  align-items: center;
}

.crypto-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback-logo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-primary);
  color: var(--ion-color-primary-contrast);
  font-weight: bold;
  font-size: 18px;
}

.name-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  color: var(--ion-text-color);
  font-size: 16px;
  font-weight: bold;
}

.symbol-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.symbol {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
}

.badge {
  display: flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.badge ion-icon {
  margin-right: 2px;
}

.badge-success {
  background-color: rgba(14, 203, 129, 0.15);
  color: var(--ion-color-success);
}

.badge-danger {
  background-color: rgba(246, 70, 93, 0.15);
  color: var(--ion-color-danger);
}

.price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.price-idr {
  color: var(--ion-text-color);
  font-size: 16px;
  font-weight: bold;
}

.price-usd {
  color: var(--text-secondary);
  font-size: 13px;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 16px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.align-end {
  align-items: flex-end;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.stat-value {
  color: var(--ion-text-color);
  font-size: 13px;
  font-weight: 500;
}

.trend {
  display: flex;
  align-items: center;
}

.trend-icon {
  margin-right: 2px;
}

.text-success {
  color: var(--ion-color-success);
}

.text-danger {
  color: var(--ion-color-danger);
}
</style>

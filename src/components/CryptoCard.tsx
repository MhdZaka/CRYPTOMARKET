import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { Crypto } from '../interfaces/Crypto';
import { colors } from '../theme/colors';

interface CryptoCardProps {
  crypto: Crypto;
  index: number;
  usdToIdr: number;
}

const formatPrice = (price: string) => {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

const formatPriceIdr = (priceUsd: string, usdToIdrRate: number) => {
  const value = Number(priceUsd) * usdToIdrRate;

  if (!Number.isFinite(value)) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: value < 100 ? 2 : 0,
    maximumFractionDigits: value < 100 ? 4 : 0,
  }).format(value);
};

const formatLargeIdr = (valueUsd: string | number, usdToIdrRate: number) => {
  const usdVal = typeof valueUsd === 'string' ? Number(valueUsd) : valueUsd;
  const idrVal = usdVal * usdToIdrRate;

  if (!Number.isFinite(idrVal) || idrVal === 0) {
    return 'Rp 0';
  }

  if (idrVal >= 1e12) {
    return `Rp ${(idrVal / 1e12).toFixed(2)} T`;
  } else if (idrVal >= 1e9) {
    return `Rp ${(idrVal / 1e9).toFixed(2)} M`;
  } else if (idrVal >= 1e6) {
    return `Rp ${(idrVal / 1e6).toFixed(2)} Jt`;
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(idrVal);
};

export default function CryptoCard({ crypto, index, usdToIdr }: CryptoCardProps) {
  const scale = useSharedValue(1);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    scale.value = withSpring(1);
  }, [scale]);

  useEffect(() => {
    setImageError(false);
  }, [crypto.symbol]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const change24h = Number(crypto.percent_change_24h) || 0;
  const change7d = Number(crypto.percent_change_7d) || 0;
  const isPositive24h = change24h >= 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 10) * 55).springify()}
      style={[styles.shadow, animatedStyle]}
    >
      <Pressable
        accessibilityLabel={`${crypto.name}, rank ${crypto.rank}, harga rupiah ${formatPriceIdr(crypto.price_usd, usdToIdr)}, harga usd ${formatPrice(crypto.price_usd)}`}
        accessibilityRole="button"
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 18 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 14 });
        }}
      >
        <LinearGradient
          colors={[colors.cardHighlight, colors.card]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.card}
        >
          {/* Main Top Row */}
          <View style={styles.topRow}>
            <View style={styles.rankBadge}>
              <Text style={styles.rank}>#{crypto.rank}</Text>
            </View>

            <View style={[styles.coinIcon, !imageError && styles.coinIconActive]}>
              {!imageError ? (
                <Image
                  source={{
                    uri: `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`,
                  }}
                  style={styles.coinLogo}
                  onError={() => setImageError(true)}
                />
              ) : (
                <Text style={styles.coinInitial}>{crypto.symbol.charAt(0)}</Text>
              )}
            </View>

            <View style={styles.coinInfo}>
              <Text numberOfLines={1} style={styles.name}>
                {crypto.name}
              </Text>
              <View style={styles.symbolRow}>
                <Text style={styles.symbol}>{crypto.symbol}</Text>
                <View
                  style={[
                    styles.changeBadge,
                    isPositive24h ? styles.changeBadgeSuccess : styles.changeBadgeError,
                  ]}
                >
                  <MaterialCommunityIcons
                    color={isPositive24h ? colors.success : colors.error}
                    name={isPositive24h ? 'triangle' : 'triangle-down'}
                    size={8}
                  />
                  <Text
                    style={[
                      styles.changeText,
                      isPositive24h ? styles.changeTextSuccess : styles.changeTextError,
                    ]}
                  >
                    {Math.abs(change24h).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.priceIdr}>
                {formatPriceIdr(crypto.price_usd, usdToIdr)}
              </Text>
              <Text numberOfLines={1} style={styles.priceUsd}>
                {formatPrice(crypto.price_usd)}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Statistics Bottom Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>KAP PASAR</Text>
              <Text style={styles.statValue}>
                {formatLargeIdr(crypto.market_cap_usd, usdToIdr)}
              </Text>
            </View>
            <View style={styles.statItemCenter}>
              <Text style={styles.statLabel}>VOLUME (24J)</Text>
              <Text style={styles.statValue}>
                {formatLargeIdr(crypto.volume24, usdToIdr)}
              </Text>
            </View>
            <View style={styles.statItemRight}>
              <Text style={styles.statLabel}>TREN (7H)</Text>
              <View style={styles.trendContainer}>
                <MaterialCommunityIcons
                  color={change7d >= 0 ? colors.success : colors.error}
                  name={change7d >= 0 ? 'trending-up' : 'trending-down'}
                  size={12}
                />
                <Text
                  style={[
                    styles.statValue,
                    { marginLeft: 4 },
                    change7d >= 0 ? styles.textSuccess : styles.textError,
                  ]}
                >
                  {Math.abs(change7d).toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 20,
    elevation: 5,
    marginBottom: 13,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 14,
  },
  card: {
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rankBadge: {
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: 38,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  rank: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
  },
  coinIcon: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 12,
    width: 40,
  },
  coinIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  coinLogo: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  coinInitial: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '900',
  },
  coinInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    maxWidth: 120,
  },
  symbolRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  symbol: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  changeBadge: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  changeBadgeSuccess: {
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
  },
  changeBadgeError: {
    backgroundColor: 'rgba(246, 70, 93, 0.12)',
  },
  changeText: {
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 2,
  },
  changeTextSuccess: {
    color: colors.success,
  },
  changeTextError: {
    color: colors.error,
  },
  priceContainer: {
    alignItems: 'flex-end',
    maxWidth: '42%',
  },
  priceIdr: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  priceUsd: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'flex-start',
    flex: 1.1,
  },
  statItemCenter: {
    alignItems: 'center',
    flex: 1.1,
  },
  statItemRight: {
    alignItems: 'flex-end',
    flex: 0.9,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '800',
  },
  trendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textSuccess: {
    color: colors.success,
  },
  textError: {
    color: colors.error,
  },
});

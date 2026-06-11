import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CryptoCard from '../components/CryptoCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import type { Crypto } from '../interfaces/Crypto';
import { getCryptos, getUsdToIdrRate } from '../services/cryptoService';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [usdToIdr, setUsdToIdr] = useState<number>(16300);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadCryptos = useCallback(async (refreshing = false) => {
    refreshing ? setIsRefreshing(true) : setIsLoading(true);
    setError(false);

    try {
      const [data, rate] = await Promise.all([
        getCryptos(),
        getUsdToIdrRate(),
      ]);
      setCryptos(data);
      setUsdToIdr(rate);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadCryptos();
  }, [loadCryptos]);

  const filteredCryptos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return cryptos;
    }

    return cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(query) ||
        crypto.symbol.toLowerCase().includes(query),
    );
  }, [cryptos, searchQuery]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error && cryptos.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <MaterialCommunityIcons
              color={colors.error}
              name="wifi-alert"
              size={34}
            />
          </View>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.errorText}>
            Failed to load cryptocurrency data
          </Text>
          <Button
            buttonColor={colors.accent}
            labelStyle={styles.retryLabel}
            mode="contained"
            onPress={() => void loadCryptos()}
            style={styles.retryButton}
          >
            Retry
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={filteredCryptos}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              color={colors.textSecondary}
              name="magnify-close"
              size={40}
            />
            <Text style={styles.emptyTitle}>Coin not found</Text>
            <Text style={styles.emptyText}>
              Try another cryptocurrency name or symbol.
            </Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Header />
            <Searchbar
              iconColor={colors.textSecondary}
              inputStyle={styles.searchInput}
              onChangeText={setSearchQuery}
              placeholder="Search coin or symbol"
              placeholderTextColor={colors.textSecondary}
              style={styles.searchbar}
              value={searchQuery}
            />
            <View style={styles.listHeading}>
              <View>
                <Text style={styles.sectionTitle}>Top Assets</Text>
                <Text style={styles.resultText}>
                  {filteredCryptos.length} cryptocurrencies
                </Text>
              </View>
              <Text style={styles.priceLabel}>PRICE</Text>
            </View>
            {error ? (
              <Text style={styles.refreshError}>
                Could not refresh. Showing the latest available data.
              </Text>
            ) : null}
          </>
        }
        refreshControl={
          <RefreshControl
            colors={[colors.accent]}
            onRefresh={() => void loadCryptos(true)}
            progressBackgroundColor={colors.card}
            refreshing={isRefreshing}
            tintColor={colors.accent}
          />
        }
        renderItem={({ item, index }) => (
          <CryptoCard crypto={item} index={index} usdToIdr={usdToIdr} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 28,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  searchbar: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 0,
    height: 52,
  },
  searchInput: {
    color: colors.textPrimary,
    fontSize: 14,
    minHeight: 0,
  },
  listHeading: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
    paddingHorizontal: 2,
    paddingTop: 25,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  resultText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  priceLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  errorIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(246, 70, 93, 0.12)',
    borderRadius: 26,
    height: 84,
    justifyContent: 'center',
    width: 84,
  },
  errorTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '800',
    marginTop: 22,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 12,
    marginTop: 24,
    minWidth: 130,
  },
  retryLabel: {
    color: colors.background,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 14,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  refreshError: {
    color: colors.error,
    fontSize: 11,
    marginBottom: 12,
    textAlign: 'center',
  },
});

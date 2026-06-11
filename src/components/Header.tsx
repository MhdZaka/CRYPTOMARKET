import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="chart-line"
          size={27}
          color={colors.background}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Crypto Market</Text>
        <Text style={styles.subtitle}>Realtime Cryptocurrency Prices</Text>
      </View>

      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 22,
    paddingTop: 12,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    width: 52,
  },
  copy: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  liveBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  liveDot: {
    backgroundColor: colors.success,
    borderRadius: 4,
    height: 7,
    marginRight: 6,
    width: 7,
  },
  liveText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});

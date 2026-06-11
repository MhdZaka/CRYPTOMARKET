import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
      <Text style={styles.text}>Loading market data...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    height: 82,
    justifyContent: 'center',
    width: 82,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 18,
  },
});

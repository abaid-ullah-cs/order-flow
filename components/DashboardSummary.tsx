import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useModules } from '@/context/ModulesContext';

export default function DashboardSummary() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { activeModules } = useModules();
  
  if (activeModules.length === 0) return null;
  
  return (
    <View style={styles.container}>
      {activeModules.includes('orders') && (
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <Text style={[styles.summaryLabel, isDark && styles.textMutedDark]}>
            Today's Orders
          </Text>
          <Text style={[styles.summaryValue, isDark && styles.textDark]}>12</Text>
          <View style={styles.trendContainer}>
            <TrendingUp size={16} color="#22C55E" />
            <Text style={styles.trendPositiveText}>+8%</Text>
          </View>
        </View>
      )}
      
      {(activeModules.includes('milk') || activeModules.includes('lending')) && (
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <Text style={[styles.summaryLabel, isDark && styles.textMutedDark]}>
            Pending Dues
          </Text>
          <Text style={[styles.summaryValue, isDark && styles.textDark]}>₹8,540</Text>
          <View style={styles.trendContainer}>
            <TrendingDown size={16} color="#EF4444" />
            <Text style={styles.trendNegativeText}>+12%</Text>
          </View>
        </View>
      )}
      
      {activeModules.includes('inventory') && (
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <Text style={[styles.summaryLabel, isDark && styles.textMutedDark]}>
            Low Stock Items
          </Text>
          <Text style={[styles.summaryValue, isDark && styles.textDark]}>5</Text>
          <View style={styles.trendContainer}>
            <TrendingUp size={16} color="#EF4444" />
            <Text style={styles.trendNegativeText}>+2</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  summaryCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryCardDark: {
    backgroundColor: '#1F2937',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendPositiveText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22C55E',
    marginLeft: 4,
  },
  trendNegativeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 4,
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
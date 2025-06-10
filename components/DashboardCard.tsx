import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  count: number;
  onPress: () => void;
}

export default function DashboardCard({ 
  title, 
  subtitle, 
  icon, 
  count, 
  onPress 
}: DashboardCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <TouchableOpacity 
      style={[styles.card, isDark && styles.cardDark]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.title, isDark && styles.textDark]}>{title}</Text>
      <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>{subtitle}</Text>
      <View style={[styles.countBadge, isDark && styles.countBadgeDark]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  cardDark: {
    backgroundColor: '#1F2937',
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  countBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countBadgeDark: {
    backgroundColor: '#1E3A8A',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
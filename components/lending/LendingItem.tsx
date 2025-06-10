import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DollarSign, Calendar } from 'lucide-react-native';

interface LendingItemProps {
  item: {
    id: number;
    customerName: string;
    date: string;
    amount: number;
    dueDate: string;
    status: string;
    type?: string;
  };
  type: 'milk' | 'lending';
  onPress: () => void;
  isDark: boolean;
}

export default function LendingItem({ item, type, onPress, isDark }: LendingItemProps) {
  const { customerName, date, amount, dueDate, status } = item;
  
  return (
    <TouchableOpacity 
      style={[styles.container, isDark && styles.containerDark]} 
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.customerName, isDark && styles.textDark]}>
          {customerName}
        </Text>
        <View style={[
          styles.statusBadge,
          status === 'completed' ? styles.statusCompleted : styles.statusActive,
          isDark && (status === 'completed' ? styles.statusCompletedDark : styles.statusActiveDark)
        ]}>
          <Text style={[
            styles.statusText,
            status === 'completed' ? styles.statusCompletedText : styles.statusActiveText,
            isDark && (status === 'completed' ? styles.statusCompletedTextDark : styles.statusActiveTextDark)
          ]}>
            {status === 'completed' ? 'Completed' : 'Active'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>
            Started
          </Text>
          <View style={styles.infoValueContainer}>
            <Calendar size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text style={[styles.infoValue, isDark && styles.textMutedDark]}>
              {date}
            </Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>
            {type === 'milk' ? 'Monthly Dues' : 'Amount'}
          </Text>
          <View style={styles.infoValueContainer}>
            <DollarSign size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text style={[styles.infoValue, isDark && styles.textMutedDark]}>
              ₹{amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.dueLabel, isDark && styles.textMutedDark]}>
          {status === 'completed' ? 'Completed on:' : 'Due by:'}
        </Text>
        <Text style={[
          styles.dueDate, 
          status === 'active' && styles.activeDueDate,
          isDark && styles.textDark,
          isDark && status === 'active' && styles.activeDueDateDark
        ]}>
          {dueDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusCompletedDark: {
    backgroundColor: '#14532D',
  },
  statusActive: {
    backgroundColor: '#DBEAFE',
  },
  statusActiveDark: {
    backgroundColor: '#1E3A8A',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusCompletedText: {
    color: '#16A34A',
  },
  statusCompletedTextDark: {
    color: '#BBF7D0',
  },
  statusActiveText: {
    color: '#2563EB',
  },
  statusActiveTextDark: {
    color: '#93C5FD',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  dueDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  activeDueDate: {
    color: '#EF4444',
  },
  activeDueDateDark: {
    color: '#FCA5A5',
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
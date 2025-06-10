import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClipboardCheck, Clock } from 'lucide-react-native';

interface OrderItemProps {
  order: {
    id: number;
    customerName: string;
    date: string;
    items: number;
    total: number;
    status: string;
  };
  onPress: () => void;
  isDark: boolean;
}

export default function OrderItem({ order, onPress, isDark }: OrderItemProps) {
  const { customerName, date, items, total, status } = order;
  
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
          status === 'completed' ? styles.statusCompleted : styles.statusPending,
          isDark && (status === 'completed' ? styles.statusCompletedDark : styles.statusPendingDark)
        ]}>
          {status === 'completed' ? (
            <ClipboardCheck size={14} color={isDark ? '#BBF7D0' : '#22C55E'} />
          ) : (
            <Clock size={14} color={isDark ? '#FED7AA' : '#F97316'} />
          )}
          <Text style={[
            styles.statusText,
            status === 'completed' ? styles.statusCompletedText : styles.statusPendingText,
            isDark && (status === 'completed' ? styles.statusCompletedTextDark : styles.statusPendingTextDark)
          ]}>
            {status === 'completed' ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsRow}>
        <Text style={[styles.dateText, isDark && styles.textMutedDark]}>
          {date}
        </Text>
        <Text style={[styles.itemsText, isDark && styles.textMutedDark]}>
          {items} {items === 1 ? 'item' : 'items'}
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.totalLabel, isDark && styles.textMutedDark]}>Total:</Text>
        <Text style={[styles.totalValue, isDark && styles.textDark]}>₹{total.toFixed(2)}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusPendingDark: {
    backgroundColor: '#7C2D12',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  statusCompletedText: {
    color: '#22C55E',
  },
  statusCompletedTextDark: {
    color: '#BBF7D0',
  },
  statusPendingText: {
    color: '#F97316',
  },
  statusPendingTextDark: {
    color: '#FED7AA',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
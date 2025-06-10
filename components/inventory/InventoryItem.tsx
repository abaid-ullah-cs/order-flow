import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface InventoryItemProps {
  item: {
    id: number;
    name: string;
    category: string;
    quantity: number;
    minQuantity: number;
    price: number;
  };
  onPress: () => void;
  isDark: boolean;
}

export default function InventoryItem({ item, onPress, isDark }: InventoryItemProps) {
  const { name, category, quantity, minQuantity, price } = item;
  const isLowStock = quantity <= minQuantity;
  
  return (
    <TouchableOpacity 
      style={[styles.container, isDark && styles.containerDark]} 
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.name, isDark && styles.textDark]}>{name}</Text>
        <View style={[
          styles.categoryBadge,
          isDark && styles.categoryBadgeDark
        ]}>
          <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
            {category}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>
            In Stock
          </Text>
          <View style={styles.quantityContainer}>
            <Text style={[
              styles.quantityText,
              isLowStock && styles.lowStockText,
              isDark && styles.textDark,
              isDark && isLowStock && styles.lowStockTextDark
            ]}>
              {quantity}
            </Text>
            {isLowStock && (
              <AlertTriangle size={16} color={isDark ? '#FCA5A5' : '#EF4444'} style={styles.alertIcon} />
            )}
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>
            Unit Price
          </Text>
          <Text style={[styles.priceText, isDark && styles.textDark]}>
            ₹{price.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.valueLabel, isDark && styles.textMutedDark]}>
          Total Value:
        </Text>
        <Text style={[styles.valueText, isDark && styles.textDark]}>
          ₹{(price * quantity).toFixed(2)}
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeDark: {
    backgroundColor: '#374151',
  },
  categoryText: {
    fontSize: 12,
    color: '#4B5563',
  },
  categoryTextDark: {
    color: '#D1D5DB',
  },
  details: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  lowStockText: {
    color: '#EF4444',
  },
  lowStockTextDark: {
    color: '#FCA5A5',
  },
  alertIcon: {
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  valueLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  valueText: {
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
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useModules } from '@/context/ModulesContext';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { Plus, BarChart2, AlertTriangle } from 'lucide-react-native';
import InventoryItem from '@/components/inventory/InventoryItem';
import { mockInventory } from '@/data/mockData';

export default function InventoryScreen() {
  const { activeModules } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [filter, setFilter] = useState('all');

  if (!activeModules.includes('inventory')) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Header title="Inventory" />
        <View style={styles.moduleDisabled}>
          <Text style={[styles.moduleDisabledText, isDark && styles.textDark]}>
            The Inventory module is not enabled.
          </Text>
          <TouchableOpacity 
            style={styles.moduleEnableButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.moduleEnableButtonText}>Enable Module</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const lowStockItems = mockInventory.filter(item => item.quantity <= item.minQuantity);
  
  const filteredItems = filter === 'all' 
    ? mockInventory 
    : filter === 'low' 
      ? lowStockItems 
      : mockInventory.filter(item => item.category === filter);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Header 
        title="Inventory" 
        rightActions={[
          {
            icon: <Plus size={24} color={isDark ? '#F9FAFB' : '#111827'} />,
            onPress: () => router.push('/inventory/new'),
          },
        ]}
      />
      
      {lowStockItems.length > 0 && (
        <TouchableOpacity 
          style={[styles.alertBanner, isDark && styles.alertBannerDark]}
          onPress={() => setFilter('low')}
        >
          <AlertTriangle size={20} color="#DC2626" />
          <Text style={styles.alertBannerText}>
            {lowStockItems.length} {lowStockItems.length === 1 ? 'item' : 'items'} low in stock
          </Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'all' && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
              filter === 'all' && isDark && styles.filterButtonActiveDark,
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'all' && styles.filterButtonTextActive,
              isDark && styles.textDark,
              filter === 'all' && isDark && styles.filterButtonTextActiveDark,
            ]}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'low' && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
              filter === 'low' && isDark && styles.filterButtonActiveDark,
            ]}
            onPress={() => setFilter('low')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'low' && styles.filterButtonTextActive,
              isDark && styles.textDark,
              filter === 'low' && isDark && styles.filterButtonTextActiveDark,
            ]}>Low Stock</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'food' && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
              filter === 'food' && isDark && styles.filterButtonActiveDark,
            ]}
            onPress={() => setFilter('food')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'food' && styles.filterButtonTextActive,
              isDark && styles.textDark,
              filter === 'food' && isDark && styles.filterButtonTextActiveDark,
            ]}>Food</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'electronics' && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
              filter === 'electronics' && isDark && styles.filterButtonActiveDark,
            ]}
            onPress={() => setFilter('electronics')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'electronics' && styles.filterButtonTextActive,
              isDark && styles.textDark,
              filter === 'electronics' && isDark && styles.filterButtonTextActiveDark,
            ]}>Electronics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'clothing' && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
              filter === 'clothing' && isDark && styles.filterButtonActiveDark,
            ]}
            onPress={() => setFilter('clothing')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'clothing' && styles.filterButtonTextActive,
              isDark && styles.textDark,
              filter === 'clothing' && isDark && styles.filterButtonTextActiveDark,
            ]}>Clothing</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[
          styles.actionButton, 
          isDark && styles.actionButtonDark
        ]}>
          <BarChart2 size={20} color={isDark ? '#F9FAFB' : '#111827'} />
          <Text style={[styles.actionButtonText, isDark && styles.textDark]}>
            Sales Report
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InventoryItem 
            item={item}
            onPress={() => router.push(`/inventory/${item.id}`)}
            isDark={isDark}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDark && styles.textDark]}>
              No inventory items found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  alertBannerDark: {
    backgroundColor: '#7F1D1D',
  },
  alertBannerText: {
    color: '#B91C1C',
    marginLeft: 8,
    fontWeight: '500',
  },
  filterContainer: {
    paddingTop: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  filterButtonDark: {
    backgroundColor: '#1F2937',
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
  },
  filterButtonActiveDark: {
    backgroundColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  filterButtonTextActiveDark: {
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonDark: {
    backgroundColor: '#1F2937',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
  },
  moduleDisabled: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  moduleDisabledText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    textAlign: 'center',
  },
  moduleEnableButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  moduleEnableButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  textDark: {
    color: '#F9FAFB',
  },
});
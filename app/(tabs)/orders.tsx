import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useModules } from '@/context/ModulesContext';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { Plus, FileText, BarChart } from 'lucide-react-native';
import OrderItem from '@/components/orders/OrderItem';
import { mockOrders } from '@/data/mockData';

export default function OrdersScreen() {
  const { activeModules } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [filter, setFilter] = useState('all');

  if (!activeModules.includes('orders')) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Header title="Orders" />
        <View style={styles.moduleDisabled}>
          <Text style={[styles.moduleDisabledText, isDark && styles.textDark]}>
            The Orders module is not enabled.
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

  const filteredOrders = filter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filter);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Header 
        title="Orders" 
        rightActions={[
          {
            icon: <Plus size={24} color={isDark ? '#F9FAFB' : '#111827'} />,
            onPress: () => router.push('/orders/new'),
          },
        ]}
      />
      
      <View style={styles.filterContainer}>
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
            filter === 'pending' && styles.filterButtonActive,
            isDark && styles.filterButtonDark,
            filter === 'pending' && isDark && styles.filterButtonActiveDark,
          ]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[
            styles.filterButtonText,
            filter === 'pending' && styles.filterButtonTextActive,
            isDark && styles.textDark,
            filter === 'pending' && isDark && styles.filterButtonTextActiveDark,
          ]}>Pending</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter === 'completed' && styles.filterButtonActive,
            isDark && styles.filterButtonDark,
            filter === 'completed' && isDark && styles.filterButtonActiveDark,
          ]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[
            styles.filterButtonText,
            filter === 'completed' && styles.filterButtonTextActive,
            isDark && styles.textDark,
            filter === 'completed' && isDark && styles.filterButtonTextActiveDark,
          ]}>Completed</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[
          styles.actionButton, 
          isDark && styles.actionButtonDark
        ]}>
          <FileText size={20} color={isDark ? '#F9FAFB' : '#111827'} />
          <Text style={[styles.actionButtonText, isDark && styles.textDark]}>
            Daily Summary
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[
          styles.actionButton,
          isDark && styles.actionButtonDark
        ]}>
          <BarChart size={20} color={isDark ? '#F9FAFB' : '#111827'} />
          <Text style={[styles.actionButtonText, isDark && styles.textDark]}>
            Analytics
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem 
            order={item}
            onPress={() => router.push(`/orders/${item.id}`)}
            isDark={isDark}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDark && styles.textDark]}>
              No orders found
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
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
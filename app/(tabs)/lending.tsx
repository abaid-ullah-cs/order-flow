import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useSearchParams, router } from 'expo-router';
import { useModules } from '@/context/ModulesContext';
import Header from '@/components/Header';
import { Plus, Filter } from 'lucide-react-native';
import LendingItem from '@/components/lending/LendingItem';
import { mockLending, mockMilkLending } from '@/data/mockData';

export default function LendingScreen() {
  const { activeModules } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [filter, setFilter] = useState('all');
  const { type } = useSearchParams();
  
  const isMilkModule = type === 'milk';
  const moduleName = isMilkModule ? 'milk' : 'lending';
  const title = isMilkModule ? 'Milk Shop' : 'Lending';
  
  const isModuleActive = activeModules.includes(moduleName);

  if (!isModuleActive) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Header title={title} />
        <View style={styles.moduleDisabled}>
          <Text style={[styles.moduleDisabledText, isDark && styles.textDark]}>
            The {title} module is not enabled.
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

  const data = isMilkModule ? mockMilkLending : mockLending;
  const filteredData = filter === 'all' 
    ? data 
    : data.filter(item => item.status === filter);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Header 
        title={title} 
        rightActions={[
          {
            icon: <Filter size={24} color={isDark ? '#F9FAFB' : '#111827'} />,
            onPress: () => console.log('Filter'),
          },
          {
            icon: <Plus size={24} color={isDark ? '#F9FAFB' : '#111827'} />,
            onPress: () => router.push(`/lending/new?type=${isMilkModule ? 'milk' : 'lending'}`),
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
            filter === 'active' && styles.filterButtonActive,
            isDark && styles.filterButtonDark,
            filter === 'active' && isDark && styles.filterButtonActiveDark,
          ]}
          onPress={() => setFilter('active')}
        >
          <Text style={[
            styles.filterButtonText,
            filter === 'active' && styles.filterButtonTextActive,
            isDark && styles.textDark,
            filter === 'active' && isDark && styles.filterButtonTextActiveDark,
          ]}>Active</Text>
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
      
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LendingItem 
            item={item}
            type={isMilkModule ? 'milk' : 'lending'}
            onPress={() => router.push(`/lending/${item.id}?type=${isMilkModule ? 'milk' : 'lending'}`)}
            isDark={isDark}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDark && styles.textDark]}>
              No records found
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
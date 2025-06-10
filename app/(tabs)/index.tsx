import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useModules } from '@/context/ModulesContext';
import DashboardCard from '@/components/DashboardCard';
import DashboardSummary from '@/components/DashboardSummary';
import { ShoppingBag, Milk, DollarSign, Package } from 'lucide-react-native';

export default function HomeScreen() {
  const { activeModules } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>Dashboard</Text>
          <Text style={[styles.headerSubtitle, isDark && styles.textMutedDark]}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        
        <DashboardSummary />
        
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Your Modules</Text>
        
        <View style={styles.moduleGrid}>
          {activeModules.includes('orders') && (
            <DashboardCard 
              title="Orders"
              icon={<ShoppingBag size={24} color={isDark ? '#3B82F6' : '#2563EB'} />}
              subtitle="Manage daily orders"
              count={12}
              onPress={() => router.push('/orders')}
            />
          )}
          
          {activeModules.includes('milk') && (
            <DashboardCard 
              title="Milk Shop"
              icon={<Milk size={24} color={isDark ? '#3B82F6' : '#2563EB'} />}
              subtitle="Track lending"
              count={8}
              onPress={() => router.push('/lending?type=milk')}
            />
          )}
          
          {activeModules.includes('lending') && (
            <DashboardCard 
              title="Lending"
              icon={<DollarSign size={24} color={isDark ? '#3B82F6' : '#2563EB'} />}
              subtitle="Manage advances"
              count={5}
              onPress={() => router.push('/lending')}
            />
          )}
          
          {activeModules.includes('inventory') && (
            <DashboardCard 
              title="Inventory"
              icon={<Package size={24} color={isDark ? '#3B82F6' : '#2563EB'} />}
              subtitle="Track stock & sales"
              count={120}
              onPress={() => router.push('/inventory')}
            />
          )}
        </View>
        
        {activeModules.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDark && styles.textDark]}>
              You haven't selected any modules yet.
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => router.push('/settings')}
            >
              <Text style={styles.emptyStateButtonText}>Add Modules</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.spacer} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginTop: 44,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyStateButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  spacer: {
    height: 80,
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
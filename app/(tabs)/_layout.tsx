import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, ShoppingBag, DollarSign, Package, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const tabBarActiveTintColor = isDark ? '#3B82F6' : '#2563EB';
  const tabBarInactiveTintColor = isDark ? '#6B7280' : '#9CA3AF';
  const tabBarStyle = {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderTopColor: isDark ? '#374151' : '#E5E7EB',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lending"
        options={{
          title: 'Lending',
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

interface HeaderAction {
  icon: React.ReactNode;
  onPress: () => void;
}

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightActions?: HeaderAction[];
}

export default function Header({ title, showBackButton = true, rightActions = [] }: HeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={isDark ? '#F9FAFB' : '#111827'} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{title}</Text>
      </View>
      
      {rightActions.length > 0 && (
        <View style={styles.headerRight}>
          {rightActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.actionButton}
              onPress={action.onPress}
            >
              {action.icon}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerDark: {
    backgroundColor: '#111827',
    borderBottomColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  actionButton: {
    marginLeft: 16,
  },
  textDark: {
    color: '#F9FAFB',
  },
});
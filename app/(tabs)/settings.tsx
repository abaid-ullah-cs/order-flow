import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { useModules } from '@/context/ModulesContext';
import Header from '@/components/Header';
import { 
  ShoppingBag, 
  Milk, 
  DollarSign, 
  Package, 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Share2, 
  HelpCircle,
  Trash2,
  ChevronRight
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { activeModules, toggleModule } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const renderSectionHeader = (title) => (
    <Text style={[styles.sectionHeader, isDark && styles.textMutedDark]}>
      {title}
    </Text>
  );
  
  const renderSettingItem = (icon, title, value = null, onPress = null, rightComponent = null) => (
    <TouchableOpacity 
      style={[styles.settingItem, isDark && styles.settingItemDark]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        {icon}
        <Text style={[styles.settingItemTitle, isDark && styles.textDark]}>
          {title}
        </Text>
      </View>
      {value && <Text style={[styles.settingItemValue, isDark && styles.textMutedDark]}>{value}</Text>}
      {rightComponent}
      {onPress && <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={[styles.profileImageContainer, isDark && styles.profileImageContainerDark]}>
            <Text style={styles.profileImageText}>JS</Text>
          </View>
          <Text style={[styles.profileName, isDark && styles.textDark]}>John Smith</Text>
          <Text style={[styles.profileEmail, isDark && styles.textMutedDark]}>john.smith@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {renderSectionHeader('Modules')}
        
        {renderSettingItem(
          <ShoppingBag size={22} color={activeModules.includes('orders') ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280')} />,
          'Order Management',
          null,
          null,
          <Switch
            value={activeModules.includes('orders')}
            onValueChange={() => toggleModule('orders')}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={activeModules.includes('orders') ? '#2563EB' : '#F3F4F6'}
          />
        )}
        
        {renderSettingItem(
          <Milk size={22} color={activeModules.includes('milk') ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280')} />,
          'Milk Shop Lending',
          null,
          null,
          <Switch
            value={activeModules.includes('milk')}
            onValueChange={() => toggleModule('milk')}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={activeModules.includes('milk') ? '#2563EB' : '#F3F4F6'}
          />
        )}
        
        {renderSettingItem(
          <DollarSign size={22} color={activeModules.includes('lending') ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280')} />,
          'Lending & Advance',
          null,
          null,
          <Switch
            value={activeModules.includes('lending')}
            onValueChange={() => toggleModule('lending')}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={activeModules.includes('lending') ? '#2563EB' : '#F3F4F6'}
          />
        )}
        
        {renderSettingItem(
          <Package size={22} color={activeModules.includes('inventory') ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280')} />,
          'Inventory & Sales',
          null,
          null,
          <Switch
            value={activeModules.includes('inventory')}
            onValueChange={() => toggleModule('inventory')}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={activeModules.includes('inventory') ? '#2563EB' : '#F3F4F6'}
          />
        )}
        
        {renderSectionHeader('Preferences')}
        
        {renderSettingItem(
          isDark ? <Moon size={22} color="#9CA3AF" /> : <Sun size={22} color="#6B7280" />,
          'Theme',
          isDark ? 'Dark' : 'Light',
          () => console.log('Theme settings')
        )}
        
        {renderSettingItem(
          <User size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />,
          'Account',
          null,
          () => console.log('Account settings')
        )}
        
        {renderSectionHeader('Data')}
        
        {renderSettingItem(
          <Share2 size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />,
          'Export Data',
          null,
          () => console.log('Export data')
        )}
        
        {renderSettingItem(
          <Trash2 size={22} color="#EF4444" />,
          'Clear All Data',
          null,
          () => console.log('Clear data')
        )}
        
        {renderSectionHeader('Support')}
        
        {renderSettingItem(
          <HelpCircle size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />,
          'Help & Support',
          null,
          () => console.log('Help')
        )}
        
        <TouchableOpacity 
          style={[styles.logoutButton, isDark && styles.logoutButtonDark]}
          onPress={() => console.log('Logout')}
        >
          <LogOut size={20} color={isDark ? '#F9FAFB' : '#111827'} />
          <Text style={[styles.logoutButtonText, isDark && styles.textDark]}>
            Log Out
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, isDark && styles.textMutedDark]}>
            Version 1.0.0
          </Text>
        </View>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileImageContainerDark: {
    backgroundColor: '#3B82F6',
  },
  profileImageText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
  },
  editProfileButtonText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemDark: {
    backgroundColor: '#1F2937',
    borderBottomColor: '#374151',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemTitle: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  settingItemValue: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
  },
  logoutButtonDark: {
    backgroundColor: '#374151',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
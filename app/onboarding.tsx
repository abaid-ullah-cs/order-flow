import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView, Image } from 'react-native';
import { useModules } from '@/context/ModulesContext';
import { router } from 'expo-router';
import { Check, ChevronRight, ShoppingBag, Milk, DollarSign, Package } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const OnboardingStep = ({ children, visible }) => {
  if (!visible) return null;
  
  return (
    <Animated.View 
      style={styles.stepContainer}
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
    >
      {children}
    </Animated.View>
  );
};

const ModuleOption = ({ title, description, icon, selected, onPress, isDark }) => (
  <TouchableOpacity 
    style={[
      styles.moduleOption,
      selected && styles.moduleOptionSelected,
      isDark && styles.moduleOptionDark,
      selected && isDark && styles.moduleOptionSelectedDark
    ]}
    onPress={onPress}
  >
    <View style={styles.moduleOptionContent}>
      <View style={[
        styles.moduleIconContainer,
        isDark && styles.moduleIconContainerDark
      ]}>
        {icon}
      </View>
      <View style={styles.moduleTextContainer}>
        <Text style={[styles.moduleTitle, isDark && styles.textDark]}>
          {title}
        </Text>
        <Text style={[styles.moduleDescription, isDark && styles.textMutedDark]}>
          {description}
        </Text>
      </View>
    </View>
    <View style={[
      styles.moduleCheckbox,
      selected && styles.moduleCheckboxSelected,
      isDark && styles.moduleCheckboxDark,
      selected && isDark && styles.moduleCheckboxSelectedDark
    ]}>
      {selected && <Check size={16} color="#FFFFFF" />}
    </View>
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const { setActiveModules, setHasCompletedOnboarding } = useModules();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState([]);
  const [businessName, setBusinessName] = useState('');
  
  const toggleModule = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter(m => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };
  
  const handleNext = () => {
    if (step === 2) {
      // Complete onboarding
      setActiveModules(selectedModules);
      setHasCompletedOnboarding(true);
      router.replace('/');
    } else {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <OnboardingStep visible={step === 1}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, isDark && styles.textDark]}>Welcome!</Text>
          <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
            Let's set up your business app to suit your specific needs
          </Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg' }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <Text style={[styles.stepText, isDark && styles.textMutedDark]}>
          This app is designed to help small businesses manage different aspects of their operations.
          You can choose the modules that are relevant to your business.
        </Text>
      </OnboardingStep>
      
      <OnboardingStep visible={step === 2}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, isDark && styles.textDark]}>Select Modules</Text>
            <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
              Choose the modules you need for your business
            </Text>
          </View>
          
          <View style={styles.moduleOptionsContainer}>
            <ModuleOption 
              title="Order Management" 
              description="Log daily orders from shopkeepers and send summaries with analytics"
              icon={<ShoppingBag size={24} color={isDark ? '#FFFFFF' : '#111827'} />}
              selected={selectedModules.includes('orders')}
              onPress={() => toggleModule('orders')}
              isDark={isDark}
            />
            
            <ModuleOption 
              title="Milk Shop Lending" 
              description="Manage daily customer credit, payments, and monthly invoices"
              icon={<Milk size={24} color={isDark ? '#FFFFFF' : '#111827'} />}
              selected={selectedModules.includes('milk')}
              onPress={() => toggleModule('milk')}
              isDark={isDark}
            />
            
            <ModuleOption 
              title="Lending & Advance" 
              description="Record advances, calculate dues with interest, and track repayments"
              icon={<DollarSign size={24} color={isDark ? '#FFFFFF' : '#111827'} />}
              selected={selectedModules.includes('lending')}
              onPress={() => toggleModule('lending')}
              isDark={isDark}
            />
            
            <ModuleOption 
              title="Inventory & Sales" 
              description="Manage stock, record sales, generate slips, and monitor low-stock items"
              icon={<Package size={24} color={isDark ? '#FFFFFF' : '#111827'} />}
              selected={selectedModules.includes('inventory')}
              onPress={() => toggleModule('inventory')}
              isDark={isDark}
            />
          </View>
          
          <Text style={[styles.hintText, isDark && styles.textMutedDark]}>
            Don't worry, you can always change your selection later in Settings.
          </Text>
        </ScrollView>
      </OnboardingStep>
      
      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity 
            style={[styles.backButton, isDark && styles.backButtonDark]} 
            onPress={handleBack}
          >
            <Text style={[styles.backButtonText, isDark && styles.textDark]}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.nextButton, 
            step === 2 && selectedModules.length === 0 && styles.nextButtonDisabled
          ]} 
          onPress={handleNext}
          disabled={step === 2 && selectedModules.length === 0}
        >
          <Text style={styles.nextButtonText}>
            {step === 2 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  stepContainer: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  imageContainer: {
    height: 240,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  stepText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  moduleOptionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  moduleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  moduleOptionDark: {
    backgroundColor: '#1F2937',
  },
  moduleOptionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
    borderWidth: 1,
  },
  moduleOptionSelectedDark: {
    backgroundColor: '#1E3A8A',
    borderColor: '#3B82F6',
  },
  moduleOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moduleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  moduleIconContainerDark: {
    backgroundColor: '#374151',
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  moduleCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleCheckboxDark: {
    borderColor: '#4B5563',
  },
  moduleCheckboxSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  moduleCheckboxSelectedDark: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  hintText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    padding: 16,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  backButtonDark: {
    borderColor: '#4B5563',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginRight: 8,
  },
  textDark: {
    color: '#F9FAFB',
  },
  textMutedDark: {
    color: '#9CA3AF',
  },
});
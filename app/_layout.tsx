import { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, ActivityIndicator, View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ModulesProvider, useModules } from '@/context/ModulesContext';
import { ScrollView } from 'react-native-gesture-handler';

// Import polyfill for URL
import 'react-native-url-polyfill/auto';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { hasCompletedOnboarding, isLoading } = useModules();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={isDark ? '#3B82F6' : '#2563EB'} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ModulesProvider>
      <RootLayoutContent />
    </ModulesProvider>
  );
}
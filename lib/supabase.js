import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '../constants'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Test function to check Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase URL:', supabaseUrl);
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection test error:', error.message);
      return false;
    }
    console.log('Supabase connection successful!\n');
    return true;
  } catch (error) {
    console.error('Unexpected error testing Supabase connection:', error.message);
    return false;
  }
}

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
// Test Supabase configuration
export const testSupabaseConfig = () => {
  const url = 'https://fnwmvnewzirxagcyxwid.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud212bmV3emlyeGFnY3l4d2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDY5OTEsImV4cCI6MjA3Njk4Mjk5MX0.8-udxQ9Uwe55jXsyzxleXIc2e6Pif3tEFUYa9-pyU8w';
  
  console.log('Testing Supabase Configuration:');
  console.log('URL:', url);
  console.log('URL Type:', typeof url);
  console.log('URL Length:', url.length);
  console.log('Key Present:', key ? 'Yes' : 'No');
  console.log('Key Length:', key ? key.length : 0);
  
  // Test URL validation
  try {
    new URL(url);
    console.log('✅ URL is valid');
  } catch (error) {
    console.log('❌ URL is invalid:', error.message);
  }
  
  return { url, key };
};

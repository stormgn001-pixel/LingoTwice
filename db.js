import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_API_KEY || process.env.SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
if (supabaseUrl && supabaseKey) {
  supabase
    .from('documents')
    .select('*')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.warn('Supabase connection warning:', error.message);
      } else {
        console.log('Supabase connected successfully:', data);
      }
    })
    .catch((err) => {
      console.warn('Supabase connection error:', err.message);
    });
} else {
  console.log('Supabase credentials (SUPABASE_URL, SUPABASE_API_KEY) not provided in environment variables.');
}

export default supabase;

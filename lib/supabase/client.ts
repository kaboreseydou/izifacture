import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uyiilyjpmsctmydxruik.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aWlseWpwbXNjdG15ZHhydWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNDExMDgsImV4cCI6MjEwMDkxNzEwOH0.2lEkuc9OKljkeaaS5B48JuYNmKDlM_pLKKU4J9krgZA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

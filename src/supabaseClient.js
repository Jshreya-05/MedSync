import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wtsmiriykejwmpkiflmz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c21pcml5a2Vqd21wa2lmbG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MTUzODgsImV4cCI6MjA5NDQ5MTM4OH0.pu-MVBy8j225WDpI5XHUeblXvZekIwY-iYhyawm_Kf8"
);

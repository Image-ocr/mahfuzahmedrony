// Password-protected endpoint to list compliments.
// Uses service role (bypasses RLS) only after verifying the password.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PASSWORD = "6512";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { password } = await req.json().catch(() => ({ password: "" }));
    if (password !== PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("compliments")
      .select("id, name, rating, compliment, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    const avg =
      data && data.length > 0
        ? data.reduce((s, c) => s + c.rating, 0) / data.length
        : 0;

    return new Response(
      JSON.stringify({ compliments: data ?? [], average: avg, count: data?.length ?? 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

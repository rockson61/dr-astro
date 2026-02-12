import { d as defineMiddleware, s as sequence } from './chunks/index_CKcbdMDi.mjs';
import { c as createSupabaseServerClient } from './chunks/supabase_CFYPoMlB.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_01STVxf-.mjs';
import 'piccolore';
import './chunks/astro/server_DcquF9um.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseServerClient(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    if (context.url.pathname !== "/account-banned" && !context.url.pathname.startsWith("/api/")) {
      const { data: profile } = await supabase.from("profiles").select("account_status, role").eq("id", user.id).single();
      const isBanned = profile?.account_status === "suspended" || profile?.account_status === "banned";
      const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";
      if (isBanned && !isAdmin) {
        return context.redirect("/account-banned");
      }
    }
  }
  if (context.url.pathname === "/account-banned") {
    if (!user) {
      return context.redirect("/login");
    }
    const { data: profile } = await supabase.from("profiles").select("account_status").eq("id", user.id).single();
    const isBanned = profile?.account_status === "suspended" || profile?.account_status === "banned";
    if (!isBanned) {
      return context.redirect("/");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };

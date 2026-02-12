import { c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { Ban, AlertCircle, Mail } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$AccountBanned = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Account Restricted | DentalReach";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 py-8"> <div class="max-w-2xl w-full"> <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-200">  <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-center"> <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6"> ${renderComponent($$result2, "Ban", Ban, { "className": "h-10 w-10 text-red-600" })} </div> <h1 class="text-3xl font-bold text-white mb-2">
Account Restricted
</h1> <p class="text-red-100 text-lg">
Your account has been temporarily suspended
</p> </div>  <div class="px-8 py-10"> <div class="mb-8"> <div class="flex items-start gap-4 mb-6 p-4 bg-red-50 rounded-lg border border-red-200"> ${renderComponent($$result2, "AlertCircle", AlertCircle, { "className": "h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" })} <div> <h3 class="font-semibold text-red-900 mb-2">
Why is my account restricted?
</h3> <p class="text-red-800 text-sm leading-relaxed">
Your account has been restricted due to
                                    violations of our Terms of Service or
                                    Community Guidelines. This action was taken
                                    to maintain the safety and integrity of the
                                    DentalReach platform.
</p> </div> </div> <div class="space-y-4 mb-8"> <div> <h3 class="font-semibold text-gray-900 mb-3">
What does this mean?
</h3> <ul class="space-y-2 text-gray-700 text-sm"> <li class="flex items-start gap-2"> <span class="text-red-600 mt-1">•</span> <span>You cannot access your account or
                                            its features</span> </li> <li class="flex items-start gap-2"> <span class="text-red-600 mt-1">•</span> <span>Your published content may have
                                            been hidden or removed</span> </li> <li class="flex items-start gap-2"> <span class="text-red-600 mt-1">•</span> <span>You cannot interact with the
                                            community or post new content</span> </li> </ul> </div> <div> <h3 class="font-semibold text-gray-900 mb-3">
What can I do?
</h3> <p class="text-gray-700 text-sm leading-relaxed mb-4">
If you believe this restriction was made in
                                    error or would like to appeal this decision,
                                    please contact our support team. We review
                                    all appeals carefully and will respond
                                    within 2-3 business days.
</p> </div> </div>  <div class="bg-blue-50 border border-blue-200 rounded-xl p-6"> <div class="flex items-center gap-3 mb-4"> <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> ${renderComponent($$result2, "Mail", Mail, { "className": "h-6 w-6 text-blue-600" })} </div> <div> <h3 class="font-semibold text-blue-900">
Contact Support
</h3> <p class="text-blue-700 text-sm">
We're here to help resolve your account
                                        issue
</p> </div> </div> <div class="bg-white rounded-lg p-4 border border-blue-200"> <p class="text-sm text-gray-700 mb-3">
Email our support team with your account
                                    details and reason for appeal:
</p> <a href="mailto:support@dentalreach.co?subject=Account%20Ban%20Appeal&body=Please%20describe%20your%20situation%20and%20why%20you%20believe%20your%20account%20should%20be%20reinstated." class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full justify-center"> ${renderComponent($$result2, "Mail", Mail, { "className": "h-5 w-5" })}
support@dentalreach.co
</a> </div> </div> </div>  <div class="pt-6 border-t border-gray-200"> <button id="logout-btn" class="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center">
Logout
</button> </div> </div>  <div class="bg-gray-50 px-8 py-4 text-center border-t border-gray-200"> <p class="text-xs text-gray-600">
By using DentalReach, you agree to our${" "} <a href="/terms" class="text-blue-600 hover:text-blue-700 underline">Terms of Service</a> ${" "}and${" "} <a href="/privacy" class="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a> </p> </div> </div> </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/account-banned.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/account-banned.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/account-banned.astro";
const $$url = "/account-banned";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$AccountBanned,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

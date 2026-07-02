'use client'

import Script from 'next/script'

/** Cal.com scheduling link + namespace shared by every "book a call" CTA. */
export const CAL_NAMESPACE = 'discovery-call'
export const CAL_LINK = 'milena-gonzalez-oqdwif/discovery-call'

/**
 * Data attributes that wire a button to open the Cal.com popup on click.
 * Cal's embed.js listens via document-level delegation, so this works for
 * elements rendered dynamically by React.
 */
export const calTriggerProps = {
  'data-cal-namespace': CAL_NAMESPACE,
  'data-cal-link': CAL_LINK,
  'data-cal-config': '{"layout":"month_view"}',
} as const

/**
 * Loads the Cal.com embed and initialises the popup namespace. A persistent
 * floating button opens the scheduler, and element-click triggers (see
 * {@link calTriggerProps}) open the same scheduler as a modal from specific CTAs.
 * Both open the {@link CAL_LINK} event type.
 */
export default function CalScript() {
  return (
    <Script id="cal-embed-init" strategy="afterInteractive">
      {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "${CAL_NAMESPACE}", {origin:"https://app.cal.com"});
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["${CAL_NAMESPACE}"]("floatingButton", {"calLink":"${CAL_LINK}","config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}});
Cal.ns["${CAL_NAMESPACE}"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});`}
    </Script>
  )
}

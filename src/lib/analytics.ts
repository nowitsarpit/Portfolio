// Analytics abstraction layer
// Configure VITE_ANALYTICS_ID in .env to enable

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

const isEnabled = !!import.meta.env.VITE_ANALYTICS_ID;

export function trackPageView(path: string) {
  if (!isEnabled) return;
  // Integrate with Vercel Analytics, Plausible, or GA4 here
  console.debug('[Analytics] Page view:', path);
}

export function trackEvent({ name, properties }: AnalyticsEvent) {
  if (!isEnabled) return;
  console.debug('[Analytics] Event:', name, properties);
}

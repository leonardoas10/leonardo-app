/**
 * Tracks an event in Google Tag Manager
 * @param eventName The name of the event
 * @param eventData Additional data to send with the event
 */
export const trackEvent = (eventName: string, eventData: Record<string, unknown> = {}) => {
  // Defer execution to next tick to avoid blocking main thread
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
    }, 0);
  }
};
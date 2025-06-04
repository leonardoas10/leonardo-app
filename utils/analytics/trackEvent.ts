/**
 * Tracks an event in Google Tag Manager
 * @param eventName The name of the event
 * @param eventData Additional data to send with the event
 */
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
};
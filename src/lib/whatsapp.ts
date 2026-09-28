import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_PHONE } from './constants';

export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE, phone = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

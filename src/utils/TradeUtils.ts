import dayjs from 'dayjs';

export class TradeUtils {
  static getUrl(id: string) {
    return `https://trocador.app/en/checkout/${id}`;
  }

  static resolveExpiresAt(expiresAt: string) {
    return dayjs().isBefore(expiresAt) ? dayjs(expiresAt).fromNow() : undefined;
  }
}

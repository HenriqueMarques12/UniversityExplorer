import { getFlagEmoji } from '../helpers';

describe('getFlagEmoji function', () => {
  it('should return correct emoji for country code', () => {
    expect(getFlagEmoji('BR')).toBe('🇧🇷');
    expect(getFlagEmoji('US')).toBe('🇺🇸');
    expect(getFlagEmoji('JP')).toBe('🇯🇵');
  });

  it('should return globe emoji for empty input', () => {
    expect(getFlagEmoji('')).toBe('🌎');
    expect(getFlagEmoji(undefined as unknown as string)).toBe('🌎');
  });
});

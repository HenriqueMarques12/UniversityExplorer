import { COUNTRY_CODES } from '../constants/countries';

export const getFlagEmoji = (countryCodeOrName: string): string => {
  if (!countryCodeOrName) return '🌎';
  
  let countryCode = countryCodeOrName;
  
  if (countryCodeOrName.length > 2 && COUNTRY_CODES[countryCodeOrName]) {
    countryCode = COUNTRY_CODES[countryCodeOrName];
  } 
  else if (countryCodeOrName.length === 2) {
    countryCode = countryCodeOrName;
  }
  
  if (countryCode && countryCode.length === 2) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
  
  return '🌎'; 
};

export const openWebPage = async (url: string): Promise<boolean> => {
  const { Linking } = require('react-native');
  const canOpen = await Linking.canOpenURL(url);
  
  if (canOpen) {
    await Linking.openURL(url);
    return true;
  }
  return false;
};

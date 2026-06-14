import axios from 'axios';
import { Crypto } from '../interfaces/Crypto';

const COINLORE_API_URL = 'https://api.coinlore.net/api/tickers/';
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const getCryptos = async (start = 0, limit = 100): Promise<Crypto[]> => {
  try {
    const response = await axios.get(`${COINLORE_API_URL}?start=${start}&limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptos:', error);
    return [];
  }
};

export const getUsdToIdrRate = async (): Promise<number> => {
  try {
    const response = await axios.get(EXCHANGE_RATE_API_URL, { timeout: 5000 });
    return response.data.rates.IDR;
  } catch (error) {
    console.error('Error fetching exchange rate, falling back to 16300:', error);
    return 16300;
  }
};

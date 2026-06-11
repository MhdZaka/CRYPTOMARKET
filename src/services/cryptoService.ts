import axios from 'axios';
import { coinloreApi } from '../api/coinloreApi';
import type { CoinLoreResponse, Crypto } from '../interfaces/Crypto';

export const getCryptos = async (): Promise<Crypto[]> => {
  const response = await coinloreApi.get<CoinLoreResponse>('/tickers/');
  return response.data.data;
};

export const getUsdToIdrRate = async (): Promise<number> => {
  try {
    const response = await axios.get<{ rates: { IDR?: number } }>(
      'https://open.er-api.com/v6/latest/USD',
      { timeout: 5000 }
    );
    return response.data?.rates?.IDR ?? 16300;
  } catch {
    return 16300;
  }
};

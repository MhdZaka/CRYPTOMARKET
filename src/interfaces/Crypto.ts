export interface Crypto {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: number;
}

export interface CoinLoreResponse {
  data: Crypto[];
  info: {
    coins_num: number;
    time: number;
  };
}

export const ASSETS = {
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC-USD",
    symbol: "BTC",
    type: "crypto" as const,
    color: "#F7931A",
    colorRgb: "247, 147, 26",
    gradient: "linear-gradient(135deg, #F7931A 0%, #FFA94D 100%)",
    icon: "₿",
    decimals: 2,
  },
  gold: {
    id: "gold",
    name: "Gold",
    ticker: "GC=F",
    symbol: "XAU",
    type: "commodity_futures" as const,
    color: "#FFD700",
    colorRgb: "255, 215, 0",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFF176 100%)",
    icon: "Au",
    decimals: 2,
  },
  silver: {
    id: "silver",
    name: "Silver",
    ticker: "SI=F",
    symbol: "XAG",
    type: "commodity_futures" as const,
    color: "#C0C0C0",
    colorRgb: "192, 192, 192",
    gradient: "linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%)",
    icon: "Ag",
    decimals: 2,
  },
} as const;

export const ASSET_LIST = Object.values(ASSETS);
export const ASSET_IDS = Object.keys(ASSETS) as (keyof typeof ASSETS)[];

export type AssetId = keyof typeof ASSETS;
export type AssetConfig = (typeof ASSETS)[AssetId];

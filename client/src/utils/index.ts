import type { MarketplaceCartBagItemType } from "@/types";

export const shortenAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-4)}`;

export const isMarketItemFoundInCartBagItems = (
  token: {
    tokenId: number;
    tokenAddress: string;
  },
  marketplaceCartBagItems: MarketplaceCartBagItemType[]
): boolean => {
  const { tokenId, tokenAddress } = token;
  const isTruthy: boolean = marketplaceCartBagItems.some(
    (item: any) =>
      item.token_address == tokenAddress && item.token_id == tokenId
  );
  return isTruthy;
};

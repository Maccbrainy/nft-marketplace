import type { MarketplaceCartBagItemType } from "@/types";

import type { MarketplaceCartBagItemType } from "@/types";

export const shortenAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-4)}`;

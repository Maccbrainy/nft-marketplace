export type ProviderInjects = {
  teleportModalCallback: (name: string, open_modal: boolean) => void;
  teleportModalOpenMenuBar: boolean;
  teleportModalTableAssetsFilters: boolean;
  chooseHowToConnectWallet: (routeRedirect: string) => void;
};
export interface MarketplaceCartBagItemType {
  token_address: string;
  token_id: number;
  token_price: number;
  token_name: string;
}

export interface OptionType {
  id: string;
  name: string;
  icon?: any;
}

export interface OptionTypeMiscellenous {
  id: string;
  name: string;
  icon?: any;
  urlLink?: string;
}

export interface ChildrenLinksType {
  id: string;
  title: string;
  slug: string;
}
export interface ServiceDiscoveryAndDelivery {
  title?: string;
  description?: string;
  icon?: Object;
  isCoverImage?: boolean;
  isAvatarImage?: boolean;
  isVerifyUser?: boolean;
  saveUserProfileSettingsMethod?: boolean;
  closeButtonTitle?: string;
  isProcessing?: boolean;
  wallet?: string;
  blockchain?: string;
  coverImageUrl?: string,
  avatarImageUrl?: string,
}

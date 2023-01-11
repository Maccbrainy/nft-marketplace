export type ProviderInjects = {
  teleportModalCallback: (name: string, open_modal: boolean) => void;
  teleportModalOpenMenuBar: boolean;
  teleportModalTableAssetsFilters: boolean;
  chooseHowToConnectWallet: (routeRedirect: string) => void;
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
  urlLink?: string
}

export interface ChildrenLinksType {
  id: string;
  title: string;
}

import type { MarketplaceCartBagItemType } from "@/types";

export const shortenAddress = (address: string, addressLength: number) =>
  `${address.slice(0, addressLength)}...${address.slice(-4)}`;

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

export const useImageFileReader = async (event: {
  target: { files: any[] };
}) => {
  const file = event.target.files[0];
  let fileurl: string = "";
  const reader = (readFile: Blob) =>
    new Promise<string>((resolve, _reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });
  await reader(file).then((result: string) => (fileurl = result));
  return {
    fileurl,
    fileName: file.name,
  };
};

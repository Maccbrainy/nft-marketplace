import { ref } from "vue"
import axios from "axios"

export async function useCryptoCurrencyVsUSDCurrentPrice(
  isActiveTokenCurrency: string
) {
  const currentPrice = ref<number>(0);
  const errorFetch = ref({
    isError: false,
    description: "",
  });
  try {
    const response: any = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${isActiveTokenCurrency}`
    );
    currentPrice.value = response.data[0].current_price;
  } catch (error: any) {
    console.error(error);
    errorFetch.value.isError = true;
    errorFetch.value.description = error;
  }

  return { currentPrice, errorFetch };
}

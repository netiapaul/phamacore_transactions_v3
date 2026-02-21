import { parseApiError } from "../utils/api_error";
import * as url from "../helpers/stocks_inventory_url";
import { get } from "../helpers/axios";

let { bcode = 0 } = JSON.parse(localStorage.getItem("activeBranch") ?? `{}`);

export const inventoryListingApi = async () => {
  try {
    const response = await get(url.INVENTORY_LISTING, {
      params: {
        bcode: Number(bcode),
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

"use server";

import { getProducts, getAccounts } from "@/lib/api";

export async function getSearchData() {
    try {
        const [products, accounts] = await Promise.all([
            getProducts(),
            getAccounts(),
        ]);
        return { products, accounts };
    } catch (error) {
        console.error("Failed to fetch search data:", error);
        return { products: [], accounts: [] };
    }
}

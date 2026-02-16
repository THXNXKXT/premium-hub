import { Product, Account, ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`, {
        next: { revalidate: 60 },
    });
    const json: ApiResponse<Product[]> = await res.json();
    return json.data;
}

export async function getAccounts(): Promise<Account[]> {
    const res = await fetch(`${BASE_URL}/accounts/week`, {
        next: { revalidate: 60 },
    });
    const json: ApiResponse<Account[]> = await res.json();
    return json.data;
}

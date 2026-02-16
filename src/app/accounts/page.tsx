import { getProducts, getAccounts } from "@/lib/api";
import AccountsClient from "./AccountsClient";

export default async function AccountsPage() {
    const [products, accounts] = await Promise.all([
        getProducts(),
        getAccounts(),
    ]);

    return (
        <AccountsClient initialProducts={products} initialAccounts={accounts} />
    );
}

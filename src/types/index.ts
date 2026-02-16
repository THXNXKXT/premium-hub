export interface ProductType {
    dayType: number;
    cost: number;
    price: number;
    agentPrice: number;
    _id: string;
}

export interface Product {
    _id: string;
    id: string;
    name: string;
    type: ProductType[];
    screen: number;
    colorPrimary: string;
    logoImage: string;
    remark?: string;
    isActive: boolean;
    openPreOrder: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Account {
    _id: string;
    id: string;
    email?: string;
    password?: string;
    link?: string;
    dayType: number;
    platform: string;
    startDate: string;
    endDate: string;
    realStartDate: string;
    realEndDate: string;
    status: string;
    userId: string;
    userName: string;
    screenName?: string;
    amount: number;
    cost: number;
    couponId?: string;
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

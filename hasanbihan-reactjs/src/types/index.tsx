export type typeCategories = {
    id: string;
    name: string;
};

export type typeProduct = {
    id: number;
    name: string;
    avatar: string;
    price: number;
    description: string;
    category: string;
};

export type typeNewProduct = {
    name: string;
    price: number;
    category: string;
    description: string;
    avatar: string;
    developerEmail: string;
};
export type Category = {
    id: string;
    name: string;
};

export type Product = {
    id: number;
    name: string;
    avatar: string;
    price: number;
    description: string;
    category: string;
};

export type NewProduct = {
    name: string;
    price: number;
    category: string;
    description: string;
    avatar: string;
    developerEmail: string;
};
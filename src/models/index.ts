export interface IUser {
    _id?: string;
    id?: number;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProduct {
    _id?: string;
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserModel implements IUser {
    id?: number;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(name: string, email: string, password?: string, id?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class ProductModel implements IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(name: string, description: string, price: number, category: string, stock: number, id?: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
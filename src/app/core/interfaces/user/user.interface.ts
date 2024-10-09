import { Product } from "../product/product.interface"

export interface User {
    email: string,
    password: string,
    selectedProduct?: Product,
    basket?: Product[]
}
import {Product} from './product';

export class Review {
    id?: number;
    product?: Product;
    note?: string;

    constructor(
        id: number,
        product: Product,
        note: string
    ) {
        this.id = id;
        this.product = product;
        this.note = note;
    }
}

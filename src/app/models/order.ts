export class Order {
    _id: string;
    user: string;
    address: string;
    city: string;
    zip: number;
    phone: string;
    notes: string;
    date: Date;
    state: string;
    privatekey: string;
    orderList: {[key: string]: number} = {};
}

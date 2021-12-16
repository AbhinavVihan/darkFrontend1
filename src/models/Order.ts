import { Customer } from "./Customer";
import { Entity } from "./Entity";
import { Product } from "./Products";

export interface Order extends Entity {
  _id: string;
  product: Product;
  customer: Customer;
  createdAt: string;
  paid: boolean;
}

// [
//     {
//         "_id": "6192abf1826dc08cddd2166f",
//         "product": {
//             "_id": "617dfe3376f74b919b4be21b",
//             "productCategory": "617dfdf776f74b919b4be217",
//             "name": "lg tv",
//             "ratingsAverage": 4.5,
//             "ratingsQuantity": 0,
//             "price": 300,
//             "quantity": 1,
//             "description": "lg launched a perfect smart tv",
//             "slug": "lg-tv",
//             "__v": 0,
//             "imageCover": "product-617dfe3376f74b919b4be21b-1636620675000-cover.jpeg",
//             "imageFront": "product-617dfe3376f74b919b4be21b-1636620674953-front.jpeg",
//             "image1": "product-617dfe3376f74b919b4be21b-1636620675015-image1.jpeg",
//             "image2": "product-617dfe3376f74b919b4be21b-1636620675047-image2.jpeg",
//             "image3": "product-617dfe3376f74b919b4be21b-1636620675073-image3.jpeg",
//             "id": "617dfe3376f74b919b4be21b"
//         },
//         "customer": {
//             "_id": "61610126516f918c0be9b0e3",
//             "name": "Abi",
//             "email": "8273325389a@gmail.com",
//             "photo": "customer-61610126516f918c0be9b0e3-1636439865989.jpeg",
//             "address": "554, new sainik colony, kanker khera meerut, India",
//             "role": "customer",
//             "__v": 0
//         },
//         "createdAt": "2021-11-15T18:47:40.930Z",
//         "paid": true
//     },
//     {
//         "_id": "6192ac24826dc08cddd2168f",
//         "product": {
//             "quantity": 1,
//             "_id": "615eca69bfdd1aeda2101397",
//             "productCategory": "6151884f52834be384445dde",
//             "name": "nokia 6.1",
//             "ratingsAverage": 5,
//             "ratingsQuantity": 1,
//             "price": 2,
//             "description": "fantastic phonec",
//             "slug": "nokia-6.1",
//             "__v": 0,
//             "imageCover": "product-615eca69bfdd1aeda2101397-1636620632265-cover.jpeg",
//             "imageFront": "product-615eca69bfdd1aeda2101397-1636620632246-front.jpeg",
//             "image1": "product-615eca69bfdd1aeda2101397-1636620632274-image1.jpeg",
//             "image2": "product-615eca69bfdd1aeda2101397-1636620632284-image2.jpeg",
//             "image3": "product-615eca69bfdd1aeda2101397-1636620632296-image3.jpeg",
//             "id": "615eca69bfdd1aeda2101397"
//         },
//         "customer": {
//             "_id": "61610126516f918c0be9b0e3",
//             "name": "Abi",
//             "email": "8273325389a@gmail.com",
//             "photo": "customer-61610126516f918c0be9b0e3-1636439865989.jpeg",
//             "address": "554, new sainik colony, kanker khera meerut, India",
//             "role": "customer",
//             "__v": 0
//         },
//         "createdAt": "2021-11-15T18:47:40.930Z",
//         "paid": true
//     }
// ]

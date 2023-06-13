import {environment} from '../../environments/environment';

export const BASE_API = environment.production ? 'https://book101-cloud.uc.r.appspot.com/api/' : 'http://localhost:8080/api/';
export const AUTH_API = BASE_API + 'auth/';
export const PRODUCT_API = BASE_API + 'product/';
export const USER_API = BASE_API + 'user/';
export const CART_API = BASE_API + 'cart/';

export const REVIEW_API = BASE_API + 'review/';











export const ORDER_API = BASE_API + 'order/';



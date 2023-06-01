import {environment} from '../../environments/environment';

export const BASE_API = environment.production ? 'https://api.book101.com/' : 'https://book101-cloud.uc.r.appspot.com/api/';
export const AUTH_API = BASE_API + 'auth/';
export const PRODUCT_API = BASE_API + 'product/';
export const USER_API = BASE_API + 'user/';
export const CART_API = BASE_API + 'cart/';
export const ORDER_API = BASE_API + 'order/';



import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartService } from '../../shared/services/cart.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];
  displayedColumns: string[] = ['purchaseTime', 'orderStatus', 'orderItems','paymentMethod', 'totalAmount'];  
  
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getOrders().subscribe(orders => this.orders = orders);
  }

  convertBase64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'application/octet-stream' });
  }


  downloadBinaryFile(base64String: string, filename: string) {
    const blob = this.convertBase64ToBlob(base64String);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }


  downloadPdf(product: Product) {
    const base64String = product.pdf; // Sostituisci con il tuo effettivo file base64
    const filename = product.name + '.pdf'; // Sostituisci con il nome del file desiderato
    this.downloadBinaryFile(base64String, filename);
  }

}





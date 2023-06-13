import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartService } from '../../shared/services/cart.service';
import {Product} from '../../../models/product';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];
  displayedColumns: string[] = ['purchaseTime', 'orderStatus', 'orderItems','paymentMethod', 'totalAmount', 'downloadPDF'];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getOrders().subscribe(orders => this.orders = orders);
  }


  cleanBase64String(fullString: string): string {

    const commaIndex = fullString.indexOf(',');

    if (commaIndex !== -1) {

      return fullString.substr(commaIndex + 1);

    } else {

      return fullString;

    }

  }

  downloadPdf(product: Product) {

    const byteCharacters = atob(this.cleanBase64String(product.pdf));

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {

      byteNumbers[i] = byteCharacters.charCodeAt(i);

    }

    const byteArray = new Uint8Array(byteNumbers);

    const fileBlob = new Blob([byteArray], { type: 'application/octet-stream' });

    saveAs(fileBlob, product.name + '.pdf');

  }




/*
  downloadPdf(product: Product) {
    const base64String = product.pdf; // Sostituisci con il tuo effettivo file base64
    const filename = product.name + '.pdf'; // Sostituisci con il nome del file desiderato
    this.downloadBinaryFile(base64String, filename);
  }
*/
}





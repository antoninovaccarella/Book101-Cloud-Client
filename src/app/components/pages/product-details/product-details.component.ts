import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartService} from '../../shared/services/cart.service';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Review} from '../../../models/review';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReviewService} from '../../shared/services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  public quantity = 1;
  public recensioniForm: FormGroup;
  public listaRecensioni: Review[];

  constructor(private cartService: CartService, private productService: ProductService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private reviewService: ReviewService, private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
        const id = +params.id;
        this.productService.getProduct(id).subscribe(product => {
          this.product = product;
        });
      }
    );
  }

  ngOnInit(): void {
    this.recensioniForm = this.formBuilder.group({
      note: ['']
    });
    this.loadRecensioni();
  }

  // Add to cart
  public addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  }



  public sendRecensione(): void {
    if (this.recensioniForm.valid) {
      // invocare il servizio di recupero recensione con l'id del prodotto
      this.reviewService.addReview(this.recensioniForm.value, this.product.id).subscribe(
          data => {
            console.log('Success!', data);
            this.snackBar.open('Recensione inserita con successo.', 'X', { duration: 2000 });
            this.loadRecensioni();
          },
          error => {
            console.error('Error!', error);
            this.snackBar.open('Impossibile inserire la recensione.', 'X', { duration: 2000 });
          }
      );
    }
  }

  public loadRecensioni(): void{
    // invocare il servizio di recupero recensione con l'id del prodotto
    this.reviewService.getReviewsPagedByProduct(this.product.id).subscribe(
        data => {
          console.log('Success!', data);
          this.listaRecensioni = data;
        },
        error => {
          console.error('Error!', error);
        }
    );

  }


  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    this.quantity--;
  }
}

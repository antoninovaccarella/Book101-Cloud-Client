/*
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
    product: Product = new Product(); // Object to store the product data
    submissionStatus: string | null = null; // Variable to track the submission status

    // Form Controls for validation
    nameControl = new FormControl('', Validators.required);
    stockControl = new FormControl('', Validators.required);
    categoryControl = new FormControl('', Validators.required);
    shortDetailsControl = new FormControl('', Validators.required);
    descriptionControl = new FormControl('', Validators.required);
    priceControl = new FormControl('', Validators.required);

    // Image preview property
    imagePreview: string | ArrayBuffer | null = null;

    constructor(private http: HttpClient) {}
  submitForm() {
    this.submissionStatus = null; // Reset the submission status

    const newProduct: Product = {
      name: this.product.name,
      stock: this.product.stock,
      category: this.product.category,
      shortDetails: this.product.shortDetails,
      description: this.product.description,
      picture: this.product.picture,
      price: this.product.price
    };

    this.http.post<Product>('http://localhost:8080/api/product/add', newProduct)
      .subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.submissionStatus = 'success'; // Set the submission status to success
          this.resetForm(); // Clear the form upon successful submission
        },
        (error) => {
          console.error('Error adding product:', error);
          this.submissionStatus = 'error'; // Set the submission status to error
        }
      );
  }

}
onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
}
  resetForm() {
    this.product = new Product(); // Clear the form fields
  }
}


*/

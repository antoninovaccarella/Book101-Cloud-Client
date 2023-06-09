import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {NewProductService} from '../../shared/services/new-product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Product } from 'src/app/models/product';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileImg = '';
  filePdf = '';


  fileInfos: Observable<any>;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private uploadService: NewProductService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      stock: [''],
      category: [''],
      isbn: [''],
      description: [''],
      author: [''],
      language: [''],
      publisher: [''],
      picture: [''],
      price: [''],
      pdf: ['']
    });
    this.fileInfos = this.uploadService.getFiles();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
          data => {
            console.log('Success!', data);
            this.snackBar.open('Prodotto caricato con successo.', 'X', { duration: 2000 });
          },
          error => {
            console.error('Error!', error);
            this.snackBar.open('Impossibile caricare il prodotto.', 'X', { duration: 2000 });
          }
      );
    }
  }

  selectFileImg(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileImg = reader.result + '';
      this.productForm.value.picture = this.fileImg;
    };
  }

  selectFilePdf(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.filePdf = reader.result + '';
      this.productForm.value.pdf = this.filePdf;
    };
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
    );

    this.selectedFiles = undefined;
  }
}

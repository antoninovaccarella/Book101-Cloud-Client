import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {NewProductService} from '../../shared/services/new-product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Product } from 'src/app/models/product';

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
              private uploadService: NewProductService) {

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: [''],
      price: [''],
      salePrice: [''],
      discount: [''],
      picture: [''],
      small: this.formBuilder.array([]),
      shortDetails: [''],
      description: [''],
      stock: [''],
      state: [''],
      category: [''],
      pdf: ['']
    });
    this.fileInfos = this.uploadService.getFiles();
  }

  onSubmit() {
    debugger;
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
          data => {
            console.log('Success!', data);
          },
          error => {
            console.error('Error!', error);
          }
      );
    }
  } // This was missing

  selectFileImg(event): void {
    const file = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileImg = reader.result + '';
      this.productForm.value.picture = this.fileImg;
    };
  }

  selectFilePdf(event): void {
    const file = event.files[0];
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

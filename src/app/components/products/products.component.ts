import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { RouterEvent } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  display: boolean = false;
  actualPage = 0;
  search = new FormControl('');
  newProduct = {
    id: null,
    title: "",
    description: "",
    image: "",
    price: 0,
    available: false
  };

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProductsFromService();
  }

  getProductsFromService() {
    //this.actualPage ++;
    this.productsService.getProducts(this.actualPage).subscribe(data => {
      this.products = data;
    })
  }

  goToPage(pageNumber: number) {
    this.actualPage = pageNumber;
    this.productsService.getProducts(pageNumber).subscribe(data => {
      this.products = data;
    })
  }

  getPreviousPage() {
    this.actualPage --;
    this.productsService.getProducts(this.actualPage).subscribe(data => {
      this.products = data;
    })
  }

  delete(id: number) {
    this.productsService.deleteProduct(id).subscribe(data => "Produit bien supprimé");
    this.getProductsFromService();
    this.display = true;
  }

  changeAvailable(id: number, available: any) {
    this.productsService.updateProduct(id, available).subscribe(data => {
      this.goToPage(this.actualPage);
    })
  }

  getProductByPrice(filterForm: any) {
    const data = filterForm.value;
    this.productsService.filterProductByPrice(data).subscribe(data => {
      this.products = data;
    })
  }

  filterByKeyword() {
    this.productsService.getProductByKeyword(this.search.value).subscribe(data => {
      this.products = data;
    })
  }

  editProduct(product: any) {
    this.newProduct = {...product};
  }

  updateProductForm() {
    this.productsService.updateProductFinal(this.newProduct).subscribe(() => {
      this.goToPage(this.actualPage);
    })
  }
}

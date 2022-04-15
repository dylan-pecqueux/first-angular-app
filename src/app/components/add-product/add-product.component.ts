import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  // Enregistrement produits
  addProduct(product: any) {
    let data = product.value
    this.productsService.newProduct(data).subscribe((data) => {
      console.log(data)
    });
  }
}

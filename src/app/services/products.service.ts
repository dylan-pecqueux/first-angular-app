import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts (page: number = 0) {
    // return this.http.get(`http://localhost:3000/products?_page=${page}&_limit=3`)
    return this.http.get(`http://localhost:3000/products`)
  }

  deleteProduct (id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  newProduct(productForm: any) {
    return this.http.post('http://localhost:3000/products/', productForm)
  }

  updateProduct(id: number, available: any) {
    return this.http.patch(`http://localhost:3000/products/${id}`, {available: !available})
  }

  filterProductByPrice(data: any) {
    return this.http.get(`http://localhost:3000/products?price_gte=${data.min}&price_lte=${data.max}`)
  }

  getProductByKeyword(data: any) {
    return this.http.get(`http://localhost:3000/products?q=${data}`)
  }

  updateProductFinal(data: any) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data)
  }
}

import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ProductItem } from '../shared/type/productItem';
import { RouterOutlet } from '@angular/router';
import { ProductItemComponent } from '../shared/product-item/product-item/product-item.component';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ProductItemComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  isVisible = true;

  products: ProductItem[] = [
    {
      id: 1,
      name: 'Iphone 8 Plus',
      price: 1_100_000,
      image: 'assets/images/iphone.webp',
    },
    {
      id: 2,
      name: 'Iphone XS',
      price: 2_600_000,
      image: 'assets/images/iphone.webp',
    },
    {
      id: 3,
      name: 'Iphone 13 Plus',
      price: 4_900_000,
      image: 'assets/images/iphone.webp',
    },
    {
      id: 4,
      name: 'Iphone 4S',
      price: 2_300_000,
      image: 'assets/images/iphone.webp',
    },
    {
      id: 5,
      name: 'Iphone 4S',
      price: 2_300_000,
      image: 'assets/images/iphone.webp',
    },
    {
      id: 6,
      name: 'Iphone 4S',
      price: 2_300_000,
      image: 'assets/images/iphone.webp',
    },
  ];

  getBlogApi: Subscription = new Subscription();

  constructor(private blogService: BlogService) {
    this.getBlogApi = new Subscription();
  }

  // làm việc và tương tác với API
  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) => {
          return data.map((item: any) => {
            return {
              ...item,
              id: item.id,
              name: item.title,
              price: Number(item.body),
              image: 'assets/images/iphone.webp',
            };
          });
        }),
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
    }
    console.log('getBlogApi unsubscribed');
  }

  handleDelete = (id: number) => {
    console.log('clicked2');
    this.products = this.products.filter((p) => p.id !== id);
  };

  handleToggle() {
    this.isVisible = !this.isVisible;
  }
}

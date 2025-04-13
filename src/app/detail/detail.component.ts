import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../shared/type/productItem';
import { BlogService } from '../../services/BlogService';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  id = '';

  productItem: ProductItem = {
    id: 0,
    image: '',
    name: '',
    price: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {
    this.id = route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
  }

  ngOnInit(): void {
    this.blogService.getBlogById(+this.id).subscribe(({ data }: any) => {
      this.productItem.id = data.id;
      this.productItem.image = '/assets/images/iphone.webp';
      this.productItem.name = data.title;
      this.productItem.price = data.body;
    });
  }
}

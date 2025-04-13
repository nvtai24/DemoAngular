import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UpperCasePipe } from '../../pipes/UpperCasePipe.pipe';
import { CurrencyPipe } from '../../pipes/CurrencyPipe.pipe';
import { ProductItem } from '../../type/productItem';
import { BlogService } from '../../../../services/BlogService';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [FormsModule, NgFor, UpperCasePipe, CurrencyPipe, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnChanges, OnDestroy {
  @Input() products: ProductItem[] = [];

  @Output() dataEvent = new EventEmitter<number>();

  get totalPrice(): string {
    let sum = this.products.reduce((acc, cur) => acc + cur.price, 0);

    return `Total prices: ${sum}`;
  }

  /**
   *
   */
  constructor(
    private blogService: BlogService,
    private route: Router,
  ) {}

  handleDelete = (id: number) => {
    this.products = this.products.filter((item) => item.id !== id);
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == '1') {
        console.log('Delete success', id);
      }
    });
  };

  // ngOnChanges là lifecycle hook của Angular, nó sẽ được gọi khi có sự thay đổi trong input properties
  // của component. Trong trường hợp này, khi có sự thay đổi trong products, ngOnChanges sẽ được gọi.
  // Trong ngOnChanges, chúng ta có thể lấy ra các giá trị hiện tại và trước đó của products bằng cách sử dụng
  // changes['products'].currentValue và changes['products'].previousValue.
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes['products'].currentValue);
    console.log('ngOnChanges', changes['products'].previousValue);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy', this.products);
  }
}

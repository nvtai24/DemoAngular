import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currencyPipe', // tên để gọi pipe khi muốn sử dụng ***
    standalone: true, 
})

export class CurrencyPipe implements PipeTransform {
    transform(value: number) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
    }
}
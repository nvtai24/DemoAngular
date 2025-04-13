import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { ResponseData } from '../app/shared/type/responseData';
import { ProductItem } from '../app/shared/type/productItem';
import { Observable } from 'rxjs';
import { BlogItem } from '../app/shared/type/blogItem';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs(): Observable<ResponseData<ProductItem[]>> {
    return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
  }

  getBlogById(id: number): Observable<ResponseData<ProductItem>> {
    return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
  }

  postBlog(blogItem: BlogItem): Observable<ResponseData<ProductItem>> {
    return this.http.post<any>(
      `https://ninedev-api.vercel.app/blogs`,
      blogItem,
    );
  }

  deleteBlog(id: number): Observable<ResponseData<ProductItem>> {
    return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
  }
}

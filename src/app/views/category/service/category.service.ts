import {Injectable} from "@angular/core";
import {Category} from "./category.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  formData: Category;
  list: Category[];
  readonly rootUrl = environment.apiUrl + 'category';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  saveCategory(formData: Category): Observable<Category> {
    if (formData.id == null || formData.id.toString() == '') {
      return this.http.post<Category>(this.rootUrl, JSON.stringify(formData), this.httpOptions);
    } else {
      return this.http.put<Category>(this.rootUrl + '/' + formData.id, JSON.stringify(formData), this.httpOptions);
    }
  }

  deleteCategory(formData: Category): Observable<Category> {
    if (formData.id !== null && formData.id.toString() !== '') {
      const params = new HttpParams()
        .set('categoryId', formData.id.toString())
        .set('data', JSON.stringify(formData));
      return this.http.delete<Category>(this.rootUrl + '/' + formData.id, {params});
    }
  }

  async getList(): Promise<Category[]> {
    const res = await this.http.get(this.rootUrl).toPromise();
    return res as Category[];
  }

}

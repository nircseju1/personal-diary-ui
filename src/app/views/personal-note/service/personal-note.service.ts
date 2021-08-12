import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PersonalNote} from "./personal-note.model";
import {PersonalNoteListFilter} from "./personal-note-list-filter.model";

@Injectable({
  providedIn: 'root'
})

export class PersonalNoteService {
  formData: PersonalNote;
  list: PersonalNote[];
  readonly rootUrl = environment.apiUrl + 'personalNote';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  savePersonalNote(formData: PersonalNote): Observable<PersonalNote> {
    console.log(formData);
    if (formData.id == null || formData.id.toString() == '') {
      return this.http.post<PersonalNote>(this.rootUrl, JSON.stringify(formData), this.httpOptions);
    } else {
      return this.http.put<PersonalNote>(this.rootUrl + '/' + formData.id, JSON.stringify(formData), this.httpOptions);
    }
  }

  deletePersonalNote(formData: PersonalNote): Observable<PersonalNote> {
    console.log(formData);
    if (formData.id !== null && formData.id.toString() !== '') {
      const params = new HttpParams()
        .set('personalNoteId', formData.id.toString())
        .set('data', JSON.stringify(formData));
      return this.http.delete<PersonalNote>(this.rootUrl + '/' + formData.id, {params});
    }
  }

  async getList(): Promise<PersonalNote[]> {
    const res = await this.http.get(this.rootUrl).toPromise();
    return res as PersonalNote[];
  }

  getPersonalNoteDetailsFilterList(personalNoteListFilter: PersonalNoteListFilter): Observable<PersonalNote[]> {
    return this.http.post<PersonalNote[]>(this.rootUrl + '/getPersonalNoteList', JSON.stringify(personalNoteListFilter), this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class SearchFilterService {

  private subject = new BehaviorSubject<string>('');

  public get stream(): Observable<string> {
    return this.subject.asObservable().pipe(
      filter((searchValue) => searchValue.length > 2),
      debounceTime(500)
    )
  }

  public attemptSearch(value: string): void {
    this.subject.next(value);
  }

}

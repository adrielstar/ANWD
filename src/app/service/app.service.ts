import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs'
import {HttpClient} from "@angular/common/http";
import {Municipality} from "../model/Municipality";
import {Casualties} from "../model/Casualties";
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  showIncidents = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  getJoinedData(): Observable<any> {
    const casualtiesRes: Observable<any> = this.http.get('casualties').pipe(map(res => res));
    const municipalityRes: Observable<any> = this.http.get('municipality').pipe(map(res => res));

    const joinArrays = (dataM: Municipality[], dataC: Casualties[], i: number) =>
      dataM.map(result => Object.assign({}, result, {
        casualtiesData: findByCode(dataC, result.code, i),
        color: '#931a25',
      }));

    const findByCode = (casualties: Casualties[], code: string, index: number) =>
      casualties.filter(casualtiesData => casualtiesData.municipalityCode === code) || {municipalityData: ''};

    return forkJoin([casualtiesRes, municipalityRes]).pipe(
      map(([dataM, dataC], index) => joinArrays(dataM, dataC, index)),
      catchError(this.handleError<Casualties>('forkJoin'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to log infrastructure
      console.error(error);
      return of(result as T);
    };
  }

  toggle(toggleChange: boolean) {
    this.showIncidents.next(toggleChange);
  }
}

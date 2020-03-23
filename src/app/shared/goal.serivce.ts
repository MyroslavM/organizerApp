import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';



export interface Goal {
  id?: string
  title: string
  date?: string
}
interface CreateResponse {
  name: string
}
@Injectable({providedIn: 'root'})
export class GoalService {
  static url: 'https://goalapp-6ac75.firebaseio.com'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment): Observable<Goal[]> {
    return this.http
      .get<Goal[]>(`${GoalService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(goal => {
        if (!goal) {
          return []
        }
        return Object.keys(goal).map(key => ({...goal[key], id: key}))
      }))
  }
  create(goal: Goal): Observable<Goal> {
    return this.http
      .post<CreateResponse>(`${GoalService.url}/${goal.date}.json`, goal)
      .pipe(map(res => {
        return {...goal, id: res.name}
      }))
  }
  remove(goal: Goal): Observable<void> {
    return this.http
      .delete<void>(`${GoalService.url}/${goal.date}/${goal.id}.json`)
  }
}

import {Injectable} from "@angular/core";
import * as moment from "moment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public data: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())
}

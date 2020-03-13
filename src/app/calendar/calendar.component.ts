import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {DataService} from "../shared/data.service";

interface Day{
  select: boolean
  disabled: boolean
  active: boolean
  value: moment.Moment
}
interface Week {
  days: Day[]
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private dateService: DataService) { }

  ngOnInit() {
    this.dateService.data.subscribe(this.generate.bind(this))
  }
  generate(now: moment.Moment){
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')
    const calendar = []

    while (date.isBefore(endDay, 'day')){
      calendar.push({
        days: Array(7)
          .fill(0)
          .map( () => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, "date")
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'day')

            return{value, active, disabled, selected}
          })
      })
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment){
    this.dateService.changeDate(day)
  }
}

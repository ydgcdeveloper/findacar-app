import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/api/interfaces/service.interface';
import { getAvailability } from 'src/app/util/common';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service: Service = null;
  availability = null;

  ngOnInit() {
    this.setAvailability();
  }

  setAvailability() {
    // const currentDate = new Date();
    // const optionsDate: Intl.DateTimeFormatOptions = {
    //   weekday: 'short'
    // };
    // const locale = new Intl.Locale('en-US');
    // // eslint-disable-next-line @typescript-eslint/naming-convention
    // const { Days, Time } = JSON.parse(JSON.stringify(this.service.schedule));
    // const initialTime = set(new Date(), {
    //   hours: (Time as string).split('-')[0].split(':')[0],
    //   minutes: (Time as string).split('-')[0].split(':')[1],
    // });
    // const finalTime = set(new Date(), {
    //   hours: (Time as string).split('-')[1].split(':')[0],
    //   minutes: (Time as string).split('-')[1].split(':')[1],
    // });
    // this.availability = (Days as [string]).includes(currentDate.toLocaleString(locale, optionsDate))
    //   && (isAfter(new Date(), initialTime) && isBefore(new Date(), finalTime));
    this.availability = getAvailability(this.service);
  }

  yeah() {
    console.log(this.service);
  }
}

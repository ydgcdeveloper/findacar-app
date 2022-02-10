import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerColumn, PickerColumnOption, PickerController, PickerOptions } from '@ionic/angular';
import { add } from 'date-fns';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  private days: string[] = [];
  private hours: string[] = [];
  private minutes: string[] = [];
  private hour;
  private minute;
  private meridiam;

  gadgets: any[] = [
    this.days,
    this.hours,
    this.minutes,
    [
      "AM",
      "PM",
    ]
  ];

  constructor(private router: Router, private pickerController: PickerController) { }

  ngOnInit() {
    this.setPickerData();
    console.log(new Date(''))

  }

  goToHome() {
    this.router.navigate(['tabs/home'])
  }

  setPickerData() {
    for (let i = 1; i < 13; i++) {
      this.hours.push(i < 10 ? '0' + i : i + '');
    }

    for (let i = 0; i < 60; i += 5) {
      this.minutes.push(i < 10 ? '0' + i : i + '');
    }

    let options: Intl.DateTimeFormatOptions = {
      weekday: 'short', month: 'short', day: 'numeric',
    };

    this.days.push('hoy')
    for (let index = 1; index < 30; index++) {
      let day = add(new Date(), {
        days: index
      })
      this.days.push(new Intl.DateTimeFormat('es-Es', options).format(day))
    }
  }

  async showPicker() {
    this.setTime();

    let options: PickerOptions = {
      cssClass: 'date-picker',      
      buttons: [
        {
          text: 'Ahora',
          role: 'cancel',
          cssClass: 'rounded'
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            console.log(`Got Value ${JSON.stringify(value)}`);
          },
        },
      ],

      columns: this.getColumns(this.gadgets),
    };
    let picker = await this.pickerController.create(options);
    picker.onDidDismiss().then(() => {
      console.log('closed');
    })
    picker.present()
  }

  setTime() {
    let option: Intl.DateTimeFormatOptions = {
      hour12: false, hour: 'numeric',
    };
    let parse = parseInt(new Date(Date.now()).toLocaleString('es-Es', option));
    this.hour = parse == 12 ? 12 : parse % 12;

    option = {
      minute: 'numeric',
    };
    this.minute = new Date(Date.now()).toLocaleString('es-Es', option);

    this.meridiam = new Date().getHours() >= 12 ? "PM" : "AM";
  }

  getColumns(elements: any[]) {
    let columns: PickerColumn[] = [];
    for (let i = 0; i < elements.length; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, elements),
        selectedIndex: i == 1 || i == 2 || i == 3 ? this.checkSelected(i) : 0
      })
    }
    return columns;
  }

  getColumnOptions(columIndex: number, elements: any[]) {

    let options: PickerColumnOption[] = [];
    for (let i = 0; i < elements[columIndex].length; i++) {
      options.push({
        text: elements[columIndex][i],
        value: i,
      })
    }
    return options;
  }

  checkSelected(columIndex: number) {
    if (columIndex == 1) {
      return parseInt(this.hour) - 1
    } if (columIndex == 2) {
      if (this.minute > 54) {
        this.hour++;
        return 0;
      }
      return Math.ceil(parseInt(this.minute) / 5);
    } if (columIndex == 3) {
      return this.meridiam == 'AM' ? 0 : 1;
    }
    return 0;
  }

}

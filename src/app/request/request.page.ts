import { Address } from './../api/interfaces/address/address.interface';
import { AddressService } from './../api/services/address/address.service';
import { ToastColors, ToastService, ToastPositions } from './../api/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerColumn, PickerColumnOption, PickerController, PickerOptions, ViewWillEnter, AlertController, NavController } from '@ionic/angular';
import { add } from 'date-fns';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';



@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit, ViewWillEnter {

  private days: any[] = [];
  private hours: string[] = [];
  private minutes: string[] = [];
  private hour;
  private minute;
  private meridiam;
  private date;
  public timeText: string;
  public requestForm: FormGroup;
  public coins = Coins;
  public addresses: Address[]

  gadgets: any[] = [
    this.days,
    this.hours,
    this.minutes,
    [
      'AM',
      'PM',
    ]
  ];

  constructor(private router: Router,
    private pickerController: PickerController,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private alertController: AlertController,
    private navController: NavController,
  ) {
    this.getAddresses();
  }

  async ngOnInit() {
    if (this.addresses.length > 2) {
      this.setPickerData();
      this.timeText = 'Ahora';
      this.requestForm = this.formBuilder.group({
        tag: [`Solicitud-${this.makeid(6)}`, [Validators.required, Validators.maxLength(24), Validators.minLength(2)]],
        ableToPay: [0, [Validators.pattern('[0-9]*')]],
        coin: [this.coins[0]?.tag || 'CUP', [Validators.required]],
        sinceAddress: [this.addressService.getSelectedAddressId(), [Validators.required]],
        destinyAddress: [this.addresses[this.getRandomAddress()].id, [Validators.required]]
      }, { validators: checkSameAddressValidator });
    }
  }

  async ionViewWillEnter() {
    await this.getAddresses();
    if (this.addresses.length < 2) {
      await this.presentAlert();
    }
  }

  get tag() {
    return this.requestForm.get('tag');
  }
  get ableToPay() {
    return this.requestForm.get('ableToPay');
  }
  get coin() {
    return this.requestForm.get('coin');
  }
  get sinceAddress() {
    return this.requestForm.get('sinceAddress');
  }
  get destinyAddress() {
    return this.requestForm.get('destinyAddress');
  }

  async getAddresses() {
    this.addresses = this.addressService.getAllAddress();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      backdropDismiss: false,
      message: 'Debes primero tener al menos 2 direcciones en tu agenda',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: async () => {
            await this.navController.navigateRoot('tabs/home');
          },
        },
        {
          text: 'Añadir',
          role: 'confirm',
          handler: async () => {
            await this.navController.navigateRoot('addresses');
          },
        },
      ],
    });

    await alert.present();
  }

  createRequest() {

  }

  private getRandomAddress(min = 0, max = this.addresses.length - 1): number {
    if (this.addresses.length === 0) {
      return 0;
    }
    const selectedAddressId = this.addressService.getSelectedAddressId()
    let randomGenerated
    do {
      randomGenerated = (Math.random() * (max - min) + min).toFixed(0);
      console.log(randomGenerated)
    } while (selectedAddressId === this.addresses[randomGenerated].id)
    return randomGenerated;
  }

  goToHome() {
    this.router.navigate(['tabs/home']);
  }

  setPickerData() {
    for (let i = 1; i < 13; i++) {
      this.hours.push(i < 10 ? '0' + i : i + '');
    }

    for (let i = 0; i < 60; i += 5) {
      this.minutes.push(i < 10 ? '0' + i : i + '');
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', month: 'short', day: 'numeric',
    };

    this.days.push({
      realdate: new Date().toDateString(),
      dateview: 'Hoy'
    });
    for (let index = 1; index < 30; index++) {
      const day = add(new Date(), {
        days: index
      });

      const data = {
        realdate: day.toDateString(),
        dateview: new Intl.DateTimeFormat('es-Es', options).format(day)
      };
      this.days.push(data);
    }
  }

  makeid(length: number) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  async showPicker() {
    this.setTime();

    const options: PickerOptions = {
      cssClass: 'date-picker',
      buttons: [
        {
          text: 'Ahora',
          role: 'cancel',
          cssClass: 'rounded',
          handler: () => {
            this.date = new Date(Date.now());
            this.timeText = 'Ahora';
          },
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            const date = new Date(this.gadgets[0][parseInt(value.col0.value)].realdate);
            const hourVal = parseInt(this.gadgets[1][parseInt(value.col1.value)]);
            date.setHours(this.gadgets[3][parseInt(value.col3.value)] == 'AM' ? hourVal == 12 ? 0 : hourVal : hourVal == 12 ? 12 : hourVal + 12);
            date.setMinutes(this.gadgets[2][parseInt(value.col2.value)]);
            const dateNow = new Date(Date.now());
            if (+dateNow > +date) {
              this.date = dateNow;
              this.timeText = 'Ahora';
              this.toast.showToast({ header: 'INFO', message: 'Fecha anterior a la actual', color: ToastColors.WARNING, position: ToastPositions.TOP, icon: 'information-circle' });
            } else {
              const optionsDate: Intl.DateTimeFormatOptions = {
                weekday: 'long', month: 'short', day: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit'
              };
              this.timeText = new Intl.DateTimeFormat('es-Es', optionsDate).format(date);
              this.timeText = this.timeText.charAt(0).toUpperCase() + this.timeText.slice(1);
            }
          },
        },
      ],

      columns: this.getColumns(this.gadgets),
    };
    const picker = await this.pickerController.create(options);
    picker.present();
  }

  setTime() {
    let option: Intl.DateTimeFormatOptions = {
      hour12: false, hour: 'numeric',
    };
    const parse = parseInt(new Date(Date.now()).toLocaleString('es-Es', option));
    this.hour = parse == 12 ? 12 : parse % 12;

    option = {
      minute: 'numeric',
    };
    this.minute = new Date(Date.now()).toLocaleString('es-Es', option);

    this.meridiam = new Date().getHours() >= 12 ? 'PM' : 'AM';
  }

  getColumns(elements: any[]) {
    const columns: PickerColumn[] = [];
    for (let i = 0; i < elements.length; i++) {
      columns.push({
        name: `col${i}`,
        options: this.getColumnOptions(i, elements),
        selectedIndex: i == 1 || i == 2 || i == 3 ? this.checkSelected(i) : 0,
      });
    }
    return columns;
  }

  getColumnOptions(columIndex: number, elements: any[]) {

    const options: PickerColumnOption[] = [];
    for (let i = 0; i < elements[columIndex].length; i++) {
      options.push({
        text: columIndex == 0 ? elements[columIndex][i].dateview : elements[columIndex][i],
        value: i,
      });
    }
    return options;
  }

  checkSelected(columIndex: number) {
    if (columIndex == 1) {
      return parseInt(this.hour) - 1;
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

export const Coins = [
  { tag: 'CUP' },
  { tag: 'MLC' },
  { tag: 'USD' }
]

export const checkSameAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const sinceAddress = control.get('sinceAddress');
  const destinyAddress = control.get('destinyAddress');
  return sinceAddress && destinyAddress && sinceAddress.value === destinyAddress.value ? { sameAddress: true } : null;
};

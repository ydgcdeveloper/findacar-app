"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddAddressPage = void 0;
var core_1 = require("@angular/core");
var AddAddressPage = /** @class */ (function () {
    function AddAddressPage(activatedRoute, outlet, router, _service) {
        this.activatedRoute = activatedRoute;
        this.outlet = outlet;
        this.router = router;
        this._service = _service;
        this.name = '';
        this.details = '';
    }
    AddAddressPage.prototype.ngOnInit = function () {
        var id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        if (id) {
            this.address = this._service.getAddressById(id);
            if (this.address) {
                this.id = id;
                this.name = this.address.name;
                this.details = this.address.details;
            }
        }
        else {
            var address = localStorage.getItem('address');
            if (address) {
                this.address = JSON.parse(address);
                this.name = this.address.name;
                this.details = this.address.details;
            }
        }
    };
    AddAddressPage.prototype.navigate = function () {
        if (this.address) {
            localStorage.removeItem('address');
            localStorage.setItem('address', JSON.stringify(this.address));
            console.log('navigate in ', this.address);
        }
        this.router.navigate(['map']);
    };
    AddAddressPage.prototype.saveEditAddress = function () {
        //edit address case
        if (this.id) {
            console.log("edit");
        }
        //add address case
        else {
            console.log("new");
        }
        this.router.navigate(['/addresses']);
    };
    AddAddressPage = __decorate([
        core_1.Component({
            selector: 'app-add-address',
            templateUrl: './add-address.page.html',
            styleUrls: ['./add-address.page.scss']
        })
    ], AddAddressPage);
    return AddAddressPage;
}());
exports.AddAddressPage = AddAddressPage;

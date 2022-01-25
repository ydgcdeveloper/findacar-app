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
    function AddAddressPage(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.name = '';
        this.details = '';
    }
    AddAddressPage.prototype.ngOnInit = function () {
        this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.id);
    };
    AddAddressPage.prototype.navigate = function () {
        if (this.id) {
            var locationData = {
                name: 'Cuba, Holguin, Holguin',
                latitude: 23.5634826412,
                longitude: 78.2316094
            };
            var navigationExtras = {
                state: {
                    locationData: locationData
                }
            };
            this.router.navigate(['map'], navigationExtras);
        }
        else {
            this.router.navigate(['map']);
        }
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

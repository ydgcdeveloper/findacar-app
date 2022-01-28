"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MapPage = void 0;
var core_1 = require("@angular/core");
var Leaflet = require("leaflet");
var modal_places_component_1 = require("../component/modal-places/modal-places.component");
var MapPage = /** @class */ (function () {
    function MapPage(geolocation, nativeGeocoder, toastController, modalController, router, navCtrl, outlet) {
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.toastController = toastController;
        this.modalController = modalController;
        this.router = router;
        this.navCtrl = navCtrl;
        this.outlet = outlet;
        this.place = '';
        this.search = false;
        this.accessToken = "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTV3eTMwMWFiMnhwaDg4c29uY2dpIn0.yp2HiVFQOpP5sREO3rYgPg";
        this.showSaveButton = false;
        this.marker = null;
        this.places = [];
        this.placesData = [];
        this.showModalplaces = false;
        this.markerIcon = Leaflet.icon({
            iconUrl: 'marker-icon.png',
            shadowUrl: '../../assets/icon/marker-shadow.png',
            iconAnchor: [12, 41]
        });
        this.sample = [
            {
                latitude: 75.45,
                longitude: 59.2,
                name: "Holguin, Ahi, Ahi"
            },
            {
                latitude: 15.45,
                longitude: 56.2,
                name: "Holguin, Ahi, Ahi"
            },
            {
                latitude: 75.45,
                longitude: 16.2,
                name: "Holguin, Ahi, Ahi"
            },
            {
                latitude: 5.45,
                longitude: 66.2,
                name: "Holguin, Ahi, Ahi"
            },
        ];
        this.options = {
            useLocale: true,
            maxResults: 5
        };
    }
    MapPage.prototype.ngOnInit = function () {
        var address = localStorage.getItem('address');
        if (address) {
            this.address = JSON.parse(address);
        }
        console.log('init');
    };
    MapPage.prototype.placeMarker = function () {
        if (this.marker != null) {
            this.marker.remove();
        }
        ;
        console.log('place marker');
        this.marker = Leaflet.marker([this.address.locationData.latitude, this.address.locationData.longitude], {
            icon: this.markerIcon
        }).addTo(this.map).bindPopup(this.address.name).openPopup();
    };
    MapPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var address = localStorage.getItem('address');
        if (address) {
            this.address = JSON.parse(address);
        }
        console.log('did enter');
        if (!this.map) {
            this.leafletMap();
            this.map
                .on('click', function (e) {
                _this.search = false;
                if (_this.marker != null) {
                    _this.marker.remove();
                }
                ;
                _this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
                    icon: _this.markerIcon
                }).addTo(_this.map);
                _this.nativeGeocoder.reverseGeocode(e.latlng.lat, e.latlng.lng, _this.options)
                    .then(function (result) {
                    var res = result[0];
                    var phrase = '';
                    if (res.countryName) {
                        phrase += res.countryName;
                    }
                    if (res.administrativeArea) {
                        phrase += ", " + res.administrativeArea;
                    }
                    if (res.locality) {
                        phrase += ", " + res.locality;
                    }
                    _this.place = phrase;
                })["catch"](function (error) {
                    _this.presentToast('error click: ' + error);
                    _this.showSaveButton = false;
                });
                _this.showSaveButton = true;
                _this.markerLat = e.latlng.lat;
                _this.markerLon = e.latlng.lng;
                _this.markerName = _this.showSaveButton ? _this.place : 'Sin nombre';
                console.log(_this.markerLat + '  ' + _this.markerLon);
            }).on('locationfound', function (e) {
                var myIcon = Leaflet.icon({
                    iconUrl: '../../assets/icon/icons8-location-48.png',
                    iconAnchor: [21, 41]
                });
                _this.latitude = e.latlng.lat;
                _this.longitude = e.latlng.lng;
                Leaflet.marker([_this.latitude, _this.longitude], {
                    icon: myIcon
                }).addTo(_this.map).bindPopup('Estás aquí ahora').openPopup();
                _this.nativeGeocoder.reverseGeocode(_this.latitude, _this.longitude, _this.options)
                    .then(function (result) {
                    var res = result[0];
                    var phrase = '';
                    if (res.countryName) {
                        phrase += res.countryName;
                    }
                    if (res.administrativeArea) {
                        phrase += ", " + res.administrativeArea;
                    }
                    if (res.locality) {
                        phrase += ", " + res.locality;
                    }
                    _this.place = phrase;
                })["catch"](function (error) {
                    _this.presentToast('error found: ' + error);
                });
                _this.presentToast("Localización encontrada");
            });
        }
        //Colocar marcador en modo edición
        if (this.address) {
            this.placeMarker();
        }
    };
    // navigate to add-address
    MapPage.prototype.saveEdit = function () {
        var address = {
            id: this.address.id,
            name: this.address.name,
            details: this.address.details,
            locationData: {
                name: this.markerName,
                latitude: this.markerLat,
                longitude: this.markerLon
            }
        };
        localStorage.removeItem('address');
        localStorage.setItem('address', JSON.stringify(address));
        this.router.navigate(['add-address']);
    };
    MapPage.prototype.onClear = function () {
        this.search = true;
        this.dismiss();
        this.places = [];
        this.placesData = [];
        this.place = '';
    };
    MapPage.prototype.goBack = function () {
        this.router.navigate(['add-address']);
    };
    MapPage.prototype.dismiss = function () {
        if (this.modalPlaces) {
            this.modalPlaces.dismiss();
        }
    };
    MapPage.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dismiss();
                        _a = this;
                        return [4 /*yield*/, this.modalController.create({
                                component: modal_places_component_1.ModalPlacesComponent,
                                cssClass: 'modal-places',
                                keyboardClose: false,
                                componentProps: {
                                    places: this.placesData,
                                    map: this.map,
                                    modalPlaces: this.modalPlaces
                                }
                            })];
                    case 1:
                        _a.modalPlaces = _b.sent();
                        return [4 /*yield*/, this.modalPlaces.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MapPage.prototype.segmentChanged = function (e) {
        var _this = this;
        var place = e.detail.value;
        this.nativeGeocoder.forwardGeocode(place, this.options)
            .then(function (result) {
            _this.map.flyTo([result[0].latitude, result[0].longitude], 13);
            switch (place) {
                case 'Holguin':
                    _this.place = 'Cuba, Holguín, Holguín';
                    break;
                case 'Havana':
                    _this.place = 'Cuba, La Habana';
                    break;
                case 'Matanzas':
                    _this.place = 'Cuba, Matanzas, Cárdenas';
                    break;
                case 'Bayamo':
                    _this.place = 'Cuba, Granma, Bayamo';
                    break;
                case 'Las Tunas':
                    _this.place = 'Cuba, Las Tunas, Las Tunas';
                    break;
                default:
                    _this.place = 'Cuba, Holguín, Holguín';
                    break;
            }
        })["catch"](function (error) {
            _this.presentToast("Place Error with '" + place + "': " + error);
            _this.search = true;
        });
        this.search = false;
    };
    MapPage.prototype.findPlace = function (place) {
        var _this = this;
        if (place.length < 3 || !this.search) {
            this.dismiss();
            this.search = true;
            return;
        }
        this.nativeGeocoder.forwardGeocode(place, this.options)
            .then(function (result) {
            console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude);
            _this.places = [];
            for (var i = 0; i < result.length; i++) {
                _this.places.push(result[i]);
            }
            _this.presentToast('length: ' + result.length);
        }).then(function () {
            if (_this.places.length) {
                _this.placesData = [];
                var places_1 = _this.places;
                var _loop_1 = function (i) {
                    _this.nativeGeocoder.reverseGeocode(places_1[i].latitude, places_1[i].longitude, _this.options)
                        .then(function (result) {
                        var res = result[0];
                        var phrase = '';
                        if (res.countryName) {
                            phrase += res.countryName;
                        }
                        if (res.administrativeArea) {
                            phrase += ", " + res.administrativeArea;
                        }
                        if (res.locality) {
                            phrase += ", " + res.locality;
                        }
                        var data = {
                            latitude: places_1[i].latitude,
                            longitude: places_1[i].longitude,
                            name: phrase
                        };
                        _this.placesData.push(data);
                    })["catch"](function (error) {
                        _this.presentToast('error looking from there: ' + error);
                    });
                };
                for (var i = 0; i < places_1.length; i++) {
                    _loop_1(i);
                }
                _this.presentModal();
            }
        })["catch"](function (error) {
            _this.presentToast('Error: ' + error + ' ' + place);
        });
    };
    MapPage.prototype.presentToast = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 3000,
                            icon: "locate-outline",
                            color: 'dark'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MapPage.prototype.leafletMap = function () {
        this.map = Leaflet.map('mapId');
        Leaflet.tileLayer("https://api.mapbox.com/styles/v1/ydgcdeveloper/ckydhd4y52fln14nxce24lhao/tiles/{z}/{x}/{y}?access_token=" + this.accessToken, {
            attribution: 'Find a Car App',
            minZoom: 2
        }).addTo(this.map);
        this.map.locate({ setView: true, maxZoom: 17 });
        // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
        // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();
        // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
        //   { color: '#FF0000', weight: 5, opacity: 0.6 })
        //   .addTo(this.map);
    };
    MapPage.prototype.loadMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geolocation.getCurrentPosition().then(function (resp) {
                            _this.latitude = resp.coords.latitude;
                            _this.longitude = resp.coords.longitude;
                            console.log("Latitud: " + _this.latitude);
                            console.log("Longitud: " + _this.longitude);
                        })["catch"](function (error) {
                            console.log('Error getting location', error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MapPage = __decorate([
        core_1.Component({
            selector: 'app-map',
            templateUrl: './map.page.html',
            styleUrls: ['./map.page.scss']
        })
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;

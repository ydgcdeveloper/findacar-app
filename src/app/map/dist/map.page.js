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
var MapPage = /** @class */ (function () {
    function MapPage(geolocation, nativeGeocoder, toastController) {
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.toastController = toastController;
        this.place = '';
        this.accessToken = "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTV3eTMwMWFiMnhwaDg4c29uY2dpIn0.yp2HiVFQOpP5sREO3rYgPg";
        this.showSaveButton = false;
        this.marker = null;
        this.options = {
            useLocale: true,
            maxResults: 5
        };
    }
    MapPage.prototype.ngOnInit = function () {
        //this.loadMap()
    };
    MapPage.prototype.segmentChanged = function (e) {
        var _this = this;
        var place = e.detail.value;
        this.nativeGeocoder.forwardGeocode(place, this.options)
            .then(function (result) {
            console.log('Changed place to: ' + place);
            _this.map.locate([result[0].latitude, result[0].longitude], 10);
        })["catch"](function (error) { _this.presentToast('Place Error: ' + error); });
    };
    MapPage.prototype.findPlace = function (place) {
        var _this = this;
        console.log(place);
        this.nativeGeocoder.forwardGeocode(place, this.options)
            .then(function (result) {
            console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude);
            // this.place = 'The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude;
        })["catch"](function (error) { _this.presentToast('Error: ' + error); });
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
    MapPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.leafletMap();
        var myIcon = Leaflet.icon({
            iconUrl: 'marker-icon.png',
            iconAnchor: [12, 41]
        });
        this.map.on('click', function (e) {
            _this.map = _this.map;
            if (_this.marker != null) {
                _this.marker.remove();
            }
            ;
            _this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
                icon: myIcon
            }).addTo(_this.map);
            _this.showSaveButton = true;
            _this.markerLat = e.latlng.lat;
            _this.markerLon = e.latlng.lng;
        }).on('locationfound', function (e) {
            // var radius = e.accuracy;
            var myIcon = Leaflet.icon({
                iconUrl: 'marker-icon.png',
                iconAnchor: [12, 41]
            });
            _this.latitude = e.latlng.lat;
            _this.longitude = e.latlng.lng;
            Leaflet.marker([_this.latitude, _this.longitude], {
                icon: myIcon
            }).addTo(_this.map);
            _this.nativeGeocoder.reverseGeocode(_this.latitude, _this.longitude, _this.options)
                .then(function (result) {
                console.log(JSON.stringify(result[0]));
                _this.place = JSON.stringify(result[0]);
            })["catch"](function (error) { _this.presentToast('error: ' + error); });
            _this.presentToast("Localización encontrada");
        });
    };
    MapPage.prototype.leafletMap = function () {
        this.map = Leaflet.map('mapId');
        Leaflet.tileLayer("https://api.mapbox.com/styles/v1/ydgcdeveloper/ckydhd4y52fln14nxce24lhao/tiles/{z}/{x}/{y}?access_token=" + this.accessToken, {
            attribution: 'Find a Car App',
            minZoom: 2
        }).addTo(this.map);
        this.map.locate({ setView: true, maxZoom: 15 });
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

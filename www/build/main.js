webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_tag_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_number_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_expense_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(navCtrl, tagService, numberService, file, expense) {
        this.navCtrl = navCtrl;
        this.tagService = tagService;
        this.numberService = numberService;
        this.file = file;
        this.expense = expense;
        this.loadTags();
        this.loadNumbers();
        this.model = {
            reason: "",
            amount: "",
            description: "",
            time: ""
        };
    }
    HomePage.prototype.loadNumbers = function () {
        var _this = this;
        this.numberService.getNumberData().then(function (data) {
            _this.numberData = data;
        }, function () {
            alert("error occured");
        });
    };
    HomePage.prototype.loadTags = function () {
        var _this = this;
        this.tagService.getTagData().then(function (data) {
            _this.tagData = data;
        }, function () {
            alert("Error occured");
        });
    };
    HomePage.prototype.checkAndPrepareDescription = function () {
        if (this.model.reason !== "" && this.model.amount !== "") {
            var date = Date();
            this.model.description = "Spent Rs " + this.model.amount + " in " + this.model.reason + " on " + date;
            this.model.time = Date.now();
        }
    };
    HomePage.prototype.tagClicked = function (event) {
        __WEBPACK_IMPORTED_MODULE_2_jquery__("ion-item[data-item='tag']").removeClass('active');
        __WEBPACK_IMPORTED_MODULE_2_jquery__(event.currentTarget).addClass('active');
        this.model.reason = __WEBPACK_IMPORTED_MODULE_2_jquery__(event.currentTarget).text().trim();
        this.checkAndPrepareDescription();
    };
    HomePage.prototype.numberClicked = function () {
        if (this.model.amount === "") {
            this.model.amount = 0;
        }
        this.model.amount = (this.model.amount * 10) + parseInt(__WEBPACK_IMPORTED_MODULE_2_jquery__(event.currentTarget).text());
        this.checkAndPrepareDescription();
    };
    HomePage.prototype.resetInputs = function () {
        this.model.amount = "";
        __WEBPACK_IMPORTED_MODULE_2_jquery__("ion-item[data-item='tag']").removeClass('active');
        this.model.reason = "";
        this.model.description = "";
    };
    HomePage.prototype.getTodaysTotalExpense = function () {
        var _this = this;
        this.expense.getTodaysTotalExpense().then(function (response) {
            _this.model.todaysTotalExpense = response;
        }, function () {
            _this.model.todaysTotalExpense = 0;
        });
    };
    HomePage.prototype.submitInput = function () {
        var _this = this;
        if (this.model.description !== "") {
            this.file.writeFile(this.file.getCurrentDataFileName(), JSON.stringify(this.model), "data").then(function (res) {
                if (res) {
                    alert("Succesfully submitted data");
                    _this.resetInputs();
                    _this.getTodaysTotalExpense();
                }
                else {
                    alert("Data submit failed");
                }
            }, function () {
                alert("Data submit failed");
            });
        }
        else {
            alert("Nothing to submit");
        }
    };
    HomePage.prototype.ngAfterViewInit = function () {
        this.getTodaysTotalExpense();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar style="background-color: #2E7A3C">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <h3 id="home-heading1" style="color:#000000;">\n\n            Small Expense Tracker\n\n        </h3>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding id="page2" style="background-color:#2E7A3C;">\n\n\n\n\n\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            <strong>\n\n        Tap to select type of expense\n\n      </strong>\n\n        </p>\n\n    </div>\n\n\n\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            Today\'s expense &nbsp;\n\n            <strong style="color: red; font-size: 20px;">\n\n        {{model.todaysTotalExpense}}\n\n      </strong> rupees so far.\n\n        </p>\n\n    </div>\n\n    <ion-item (click)="tagClicked($event)" *ngFor="let tag of tagData" class="activity" color="positive" data-item="tag">\n\n        {{tag.name}}\n\n        <ion-icon name="{{tag.icon}}" item-right></ion-icon>\n\n    </ion-item>\n\n\n\n    <ion-item id="home-input1" class="homeInputStyle">\n\n        <ion-input type="text" onclick="return false;" [(ngModel)]="model.amount" readonly="true" placeholder="Enter amount"></ion-input>\n\n    </ion-item>\n\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin:0;">\n\n            <strong>\n\n        Tap number to enter amount\n\n      </strong>\n\n        </p>\n\n    </div>\n\n    <button *ngFor="let number of numberData" (click)="numberClicked($event)" class="btn_number" ion-button color="positive" data-item="number" block>\n\n      {{number.label}}\n\n    </button>\n\n\n\n    <ion-item id="home-textarea1">\n\n        <ion-textarea [(ngModel)]="model.description" placeholder="Enter description if you want"></ion-textarea>\n\n    </ion-item>\n\n    <button (click)="submitInput()" ion-button color="positive" block>\n\n      Tap me to submit\n\n    </button>\n\n    <button (click)="resetInputs()" ion-button color="assertive" block>\n\n      Tap me to reset\n\n    </button>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_tag_service__["a" /* TagService */], __WEBPACK_IMPORTED_MODULE_5__services_number_service__["a" /* NumberService */], __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_6__services_expense_service__["a" /* Expense */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_expense_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TodayPage = (function () {
    function TodayPage(navCtrl, file, common, expense) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.common = common;
        this.expense = expense;
        this.model = {};
        this.model.date = this.file.getCurrentDataFileName();
    }
    TodayPage.prototype.ngAfterViewInit = function () {
        this.getTotalExpenseOfToday();
        this.getTodaysData();
    };
    TodayPage.prototype.getTodaysData = function () {
        var _this = this;
        this.model.dataArray = [];
        this.file.readFile(this.file.getCurrentDataFileName()).then(function (res) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__("h4").hide();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("table").show();
            _this.model.dataArray = _this.common.prepareArrayFromRawData(res);
        }).catch(function () {
            _this.model.dataArray = [];
            __WEBPACK_IMPORTED_MODULE_5_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("table").hide();
        });
    };
    TodayPage.prototype.getTotalExpenseOfToday = function () {
        var _this = this;
        this.expense.getTodaysTotalExpense().then(function (reponse) {
            _this.model.todaysTotalExpense = reponse;
        }, function () {
            _this.model.todaysTotalExpense = 0;
        });
    };
    return TodayPage;
}());
TodayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-today',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\today\today.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Today ({{model.date}})\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Today\'s expense &nbsp;\n            <strong style="color: red; font-size: 20px;">\n        {{model.todaysTotalExpense}}\n      </strong> rupees so far.\n        </p>\n    </div>\n    <h1>Here are the list of today\'s expenses</h1>\n    <h4 style="display: none">No expenses found for today</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Time</th>\n            <th>Reason</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Action</th>\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:15%">{{data.time}}</td>\n            <td style="width:15%">{{data.reason}}</td>\n            <td style="width:15%">{{data.amount}}</td>\n            <td style="width:40%">{{data.description}}</td>\n            <td style="width:15%"></td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\today\today.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_expense_service__["a" /* Expense */]])
], TodayPage);

//# sourceMappingURL=today.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TagService = (function () {
    function TagService(http) {
        this.http = http;
    }
    TagService.prototype.getTagData = function () {
        var promise = this.http.get("data/tag.data.json").toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.errorHandler);
        return promise;
    };
    TagService.prototype.errorHandler = function (error) {
        return Promise.reject(error);
    };
    return TagService;
}());
TagService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
], TagService);

//# sourceMappingURL=tag.service.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NumberService = (function () {
    function NumberService(http) {
        this.http = http;
    }
    NumberService.prototype.getNumberData = function () {
        var promise = this.http.get("data/number.data.json").toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.errorHandler);
        return promise;
    };
    NumberService.prototype.errorHandler = function (error) {
        return Promise.reject(error);
    };
    return NumberService;
}());
NumberService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
], NumberService);

//# sourceMappingURL=number.service.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(navCtrl, file) {
        this.navCtrl = navCtrl;
        this.file = file;
    }
    SettingsPage.prototype.removeAllLocalFilesFolders = function () {
        var _this = this;
        this.file.removeFolderContents().then(function () {
            alert(" Folder deleted successfully");
            _this.file.createDataDirectory();
        }, function () {
            alert("Folder deletion failed");
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\settings\settings.html"*/'<ion-header>\n    <ion-navbar style="background-color: #2E7A3C">\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page5" style="background-color:#2E7A3C;">\n    <h1 id="settings-heading2" style="color:#000000;text-align:center;">\n        Settings\n    </h1>\n    <form id="settings-form2">\n        <button id="settings-button8" (click)="removeAllLocalFilesFolders()" ion-button color="assertive" block>\n      Remove all local data\n    </button>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__["a" /* FileHandeler */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YesterdayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { FileHandeler } from './../../services/filehandeler.service';



var YesterdayPage = (function () {
    function YesterdayPage(navCtrl, common, expense) {
        this.navCtrl = navCtrl;
        this.common = common;
        this.expense = expense;
        this.model = {};
        this.model.date = this.common.getYesterdaysDate();
    }
    YesterdayPage.prototype.ngAfterViewInit = function () {
        this.getTotalExpenseOfYesterday();
        this.getYesterdaysData();
    };
    YesterdayPage.prototype.getYesterdaysData = function () {
        var _this = this;
        this.expense.getExpensesByDate(this.model.date).then(function (response) {
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").hide();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("table").show();
            _this.model.dataArray = response;
        }, function () {
            _this.model.dataArray = [];
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
        });
    };
    YesterdayPage.prototype.getTotalExpenseOfYesterday = function () {
        var _this = this;
        this.expense.getTotalExpenseByDate(this.model.date).then(function (reponse) {
            _this.model.yesterdaysTotalExpense = reponse;
        }, function () {
            _this.model.yesterdaysTotalExpense = 0;
        });
    };
    return YesterdayPage;
}());
YesterdayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-yesterday',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\yesterday\yesterday.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Yesterday ({{model.date}})\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Yesterday\'s expense &nbsp;\n            <strong style="color: red; font-size: 20px;">\n        {{model.yesterdaysTotalExpense}}\n      </strong> rupees.\n        </p>\n    </div>\n    <h1>Here are the list of yesterday\'s expenses</h1>\n    <h4 style="display: none">No expenses found for yesterday</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Time</th>\n            <th>Reason</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Action</th>\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:15%">{{data.time}}</td>\n            <td style="width:15%">{{data.reason}}</td>\n            <td style="width:15%">{{data.amount}}</td>\n            <td style="width:40%">{{data.description}}</td>\n            <td style="width:15%"></td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\yesterday\yesterday.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_3__services_expense_service__["a" /* Expense */]])
], YesterdayPage);

//# sourceMappingURL=yesterday.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MonthPage = (function () {
    function MonthPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return MonthPage;
}());
MonthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-month',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\month\month.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Month\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page4" style="background-color:#2E7A3C;"></ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\month\month.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], MonthPage);

//# sourceMappingURL=month.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_today_today__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_yesterday_yesterday__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_month_month__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_controller_tabs_controller__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_tag_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_number_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_common_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_expense_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_month_month__["a" /* MonthPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_yesterday_yesterday__["a" /* YesterdayPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_16__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_month_month__["a" /* MonthPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_yesterday_yesterday__["a" /* YesterdayPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__["a" /* File */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__services_tag_service__["a" /* TagService */],
            __WEBPACK_IMPORTED_MODULE_10__services_number_service__["a" /* NumberService */],
            __WEBPACK_IMPORTED_MODULE_11__services_filehandeler_service__["a" /* FileHandeler */],
            __WEBPACK_IMPORTED_MODULE_17__services_common_service__["a" /* Common */],
            __WEBPACK_IMPORTED_MODULE_18__services_expense_service__["a" /* Expense */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_today_today__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.goToPage = function (pageName) {
        switch (pageName) {
            case 'settings':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */]);
                break;
            case 'today':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_today_today__["a" /* TodayPage */]);
                break;
            case 'yesterday':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__["a" /* YesterdayPage */]);
                break;
        }
        this.closeMenu();
    };
    MyApp.prototype.closeMenu = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__("#menu-button-close").trigger('click');
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/'<ion-menu [content]="mainContent">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>\n                Menu\n            </ion-title>\n        </ion-toolbar>\n    </ion-header>\n    <ion-content id="side-menu21">\n        <button style="display:none" ion-button id="menu-button-close" (click)="closeMenu()" menuClose="left">Close Menu</button>\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'today\')" ion-button color="positive" block icon-left>\n      <ion-icon name="clock"></ion-icon>\n      Today\'s Expenses\n    </button>\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'yesterday\')" ion-button color="positive" block icon-left>\n      <ion-icon name="clock"></ion-icon>\n      Yesterday\'s Expenses\n    </button>\n        <button class="menuButton" id="menu-button-settings" (click)="goToPage(\'settings\')" ion-button color="positive" block icon-left>\n      <ion-icon name="settings"></ion-icon>\n      Settings\n    </button>\n        <button class="menuButton" id="menu-button4" ion-button color="positive" block>\n      About\n    </button>\n        <button class="menuButton" id="menu-button5" ion-button color="positive" block>\n      About Me\n    </button>\n\n    </ion-content>\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__today_today__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__month_month__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsControllerPage = (function () {
    function TabsControllerPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__today_today__["a" /* TodayPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__month_month__["a" /* MonthPage */];
    }
    return TabsControllerPage;
}());
TabsControllerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs-controller',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tabs-controller\tabs-controller.html"*/'<ion-tabs id="tabsController-tabs1">\n  <ion-tab [root]="tab1Root" tabTitle="Camera Tab" tabIcon="home" id="tabsController-tab1"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Cart Tab" tabIcon="calendar" id="tabsController-tab2"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="" tabIcon="grid" id="tabsController-tab3"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tabs-controller\tabs-controller.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], TabsControllerPage);

//# sourceMappingURL=tabs-controller.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileHandeler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var rootFolderName = "SmallExpenseTracker";
var dataFolderName = "data";
var configFolderName = "config";
var FileHandeler = (function () {
    function FileHandeler(file) {
        this.file = file;
        this.checkAndCreateDirectory();
    }
    FileHandeler.prototype.checkAndCreateDirectory = function () {
        var _this = this;
        this.file.checkDir(this.file.dataDirectory, rootFolderName).then(function (res) {
            //alert("Directory exists");        
        }).catch(function () {
            _this.file.createDir(_this.file.dataDirectory, rootFolderName, false).then(function () {
                _this.file.createDir(_this.file.dataDirectory + "/" + rootFolderName, dataFolderName, false).then(function () {
                    //alert("data directory created");
                }).catch(function () {
                    //alert("Initial data directory building failed");    
                });
                _this.file.createDir(_this.file.dataDirectory + "/" + rootFolderName, configFolderName, false).then(function () {
                    //alert(" config directory created");
                }).catch(function () {
                    //alert("Initial config directory building failed");    
                });
            }, function () {
                //alert("Initial directory building failed");
            });
        });
    };
    // private checkIfDirectoryExists(directoryPath: string, directoryName: string): Promise<any> {
    //     return this.file.checkDir(directoryPath, directoryName);
    // }
    // private writeData(filePath: string, fileName: string, data: string): Promise<any> {
    //     return this.file.writeFile(filePath, fileName, data).then(() => {return true;}).catch(() => {return false;});
    // }
    FileHandeler.prototype.getCurrentDataFileName = function () {
        var today = new Date();
        var dateString;
        dateString = (today.getDate()).toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getFullYear().toString();
        return dateString;
    };
    FileHandeler.prototype.writeFile = function (fileName, data, type, directoryName) {
        var _this = this;
        if (type === "data") {
            return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, this.getCurrentDataFileName()).then(function (res) {
                //alert("file already exists, merging");
                var dataNew = JSON.parse(res);
                dataNew[Date.now()] = JSON.parse(data);
                //alert(data);
                //alert(JSON.stringify(dataNew));
                return _this.file.writeExistingFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, fileName, JSON.stringify(dataNew)).then(function () {
                    //alert("writing done "+fileName);
                    return true;
                }).catch(function () {
                    //alert("unable to write file "+fileName);
                    return false;
                });
            }).catch(function () {
                //alert("file not exists, creating");
                var dataNew = {};
                dataNew[Date.now()] = JSON.parse(data);
                //alert(JSON.stringify(dataNew));
                return _this.file.writeFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, fileName, JSON.stringify(dataNew)).then(function () {
                    //alert("writing done "+fileName);
                    return true;
                }).catch(function () {
                    //alert("unable to write file "+fileName);
                    return false;
                });
            });
        }
    };
    FileHandeler.prototype.createDataDirectory = function () {
        this.file.createDir(this.file.dataDirectory + "/" + rootFolderName, dataFolderName, false).then(function () {
            //alert("data directory created");
        }).catch(function () {
            //alert("Initial data directory building failed");    
        });
    };
    FileHandeler.prototype.removeFolderContents = function (folderName) {
        if (typeof folderName === "undefined") {
            folderName = dataFolderName;
        }
        return this.file.removeRecursively(this.file.dataDirectory + "/" + rootFolderName, folderName);
    };
    FileHandeler.prototype.getFolderContents = function (folderName) {
        if (typeof folderName === "undefined") {
            folderName = "data";
        }
        return this.file.resolveDirectoryUrl(this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName).then(function (res) {
            return res.getDirectory(folderName, { create: false });
        }).catch(function () {
            return false;
        });
    };
    FileHandeler.prototype.readFile = function (fileName) {
        return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, fileName);
    };
    return FileHandeler;
}());
FileHandeler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_file__["a" /* File */]])
], FileHandeler);

//# sourceMappingURL=filehandeler.service.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expense; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Expense = (function () {
    function Expense(file, common) {
        this.file = file;
        this.common = common;
    }
    Expense.prototype.getExpensesByDate = function (date) {
        var _this = this;
        var expense;
        var expenseFileName;
        expenseFileName = date;
        return new Promise(function (resolve, reject) {
            _this.file.readFile(expenseFileName).then(function (res) {
                var dataArray = _this.common.prepareArrayFromRawData(res);
                resolve(dataArray);
            }).catch(function () {
                reject([]);
            });
        });
    };
    Expense.prototype.getTotalExpenseByDate = function (date) {
        var _this = this;
        var expense;
        var expenseFileName;
        expenseFileName = date;
        return new Promise(function (resolve, reject) {
            _this.file.readFile(expenseFileName).then(function (res) {
                var dataArray = _this.common.prepareArrayFromRawData(res);
                expense = 0;
                for (var index in dataArray) {
                    expense += parseInt(dataArray[index].amount);
                }
                resolve(expense);
            }).catch(function () {
                reject(0);
            });
        });
    };
    Expense.prototype.getTodaysTotalExpense = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTotalExpenseByDate(_this.common.getTodaysDate()).then(function (response) {
                resolve(response);
            }, function () {
                reject(0);
            });
        });
    };
    return Expense;
}());
Expense = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_1__common_service__["a" /* Common */]])
], Expense);

//# sourceMappingURL=expense.service.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Common; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Common = (function () {
    function Common() {
    }
    Common.prototype.convertTimeStampToTime = function (timeStamp) {
        var date = new Date(parseInt(timeStamp));
        var hours = date.getHours();
        var hoursString;
        if (hours > 12) {
            hours = hours - 12;
            hoursString = " PM";
        }
        else {
            hoursString = " AM";
        }
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + hoursString;
        return formattedTime;
    };
    Common.prototype.prepareArrayFromRawData = function (rawData) {
        var data = JSON.parse(rawData);
        var keys = Object.keys(data);
        var dataArray = [];
        for (var index in keys) {
            data[keys[index]].time = this.convertTimeStampToTime(data[keys[index]].time);
            dataArray.push(data[keys[index]]);
        }
        return dataArray;
    };
    Common.prototype.getTodaysDate = function () {
        var today = new Date();
        var dateString;
        dateString = (today.getDate()).toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getFullYear().toString();
        return dateString;
    };
    Common.prototype.getYesterdaysDate = function () {
        var today = new Date();
        var yesterday = new Date(today);
        var dateString;
        yesterday.setDate(today.getDate() - 1);
        dateString = (yesterday.getDate()).toString() + '-' + (yesterday.getMonth() + 1).toString() + '-' + yesterday.getFullYear().toString();
        return dateString;
    };
    return Common;
}());
Common = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Common);

//# sourceMappingURL=common.service.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map
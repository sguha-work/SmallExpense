webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_tag_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_number_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_alert_service__ = __webpack_require__(106);
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
    function HomePage(navCtrl, tagService, numberService, file, expense, alertHandler, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.tagService = tagService;
        this.numberService = numberService;
        this.file = file;
        this.expense = expense;
        this.alertHandler = alertHandler;
        this.event = event;
        this.loadTags();
        this.loadNumbers();
        this.model = {
            reason: "",
            amount: "",
            description: "",
            time: ""
        };
        this.alert = {};
        this.alert.safeAmount = 0;
        this.event.subscribe('file:data:updated', function () {
            _this.refreshHomePageView();
        });
        this.event.subscribe('file:config:updated', function () {
            _this.refreshHomePageView();
        });
    }
    HomePage.prototype.refreshHomePageView = function () {
        this.getTodaysTotalExpense();
        this.checkIfAlertExistsAndMakechanges();
    };
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
                    _this.checkIfAlertExistsAndMakechanges();
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
    HomePage.prototype.checkIfAlertExistsAndMakechanges = function () {
        var _this = this;
        this.alertHandler.checkIfAlertFileExists().then(function (response) {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#div_alertDiv").show();
            _this.prepareAlertData(response);
        }, function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#div_alertDiv").hide();
        });
    };
    HomePage.prototype.prepareAlertData = function (textData) {
        var data = JSON.parse(textData);
        this.alert.alertAmount = parseInt(data.alertAmount);
        this.alert.safeAmount = parseInt(data.alertAmount) - parseInt(this.model.todaysTotalExpense);
        if (this.alert.safeAmount < 0) {
            this.alert.showAlert = true;
            this.alert.extraSpent = this.alert.safeAmount * (-1);
        }
        else {
            this.alert.showAlert = false;
            this.alert.extraSpent = 0;
        }
        if (isNaN(this.alert.safeAmount)) {
            this.alert.safeAmount = 0;
        }
    };
    HomePage.prototype.ngAfterViewInit = function () {
        this.getTodaysTotalExpense();
        this.checkIfAlertExistsAndMakechanges();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar style="background-color: #2E7A3C">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <h3 id="home-heading1" style="color:#000000;">\n\n            Small Expense Tracker\n\n        </h3>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding id="page2" style="background-color:#2E7A3C;">\n\n\n\n\n\n\n\n\n\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            Today\'s expense &nbsp;\n\n            <strong style="color: red; font-size: 20px;">\n\n        {{model.todaysTotalExpense}}\n\n      </strong> rupees so far.\n\n        </p>\n\n    </div>\n\n    <div id="div_alertDiv" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; padding: 0; margin-bottom: 2px;">\n\n            Daily expense limit is <strong style=" font-size: 20px;">{{alert.alertAmount}}</strong> rupees\n\n\n\n\n\n            <label *ngIf="!alert.showAlert" style="color:#000000; margin: 0; padding: 0;">\n\n            You can still spent <strong style=" font-size: 20px;">{{alert.safeAmount}}</strong> rupees\n\n\n\n            </label>\n\n            <label *ngIf="alert.showAlert" style="color:#000000; margin: 0; padding: 0;">\n\n                You spent <strong style="color: red; font-size: 20px;">{{alert.extraSpent}} </strong> rupees extra beyond limit\n\n\n\n            </label>\n\n        </p>\n\n    </div>\n\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            <strong>\n\n        Tap to select type of expense\n\n      </strong>\n\n        </p>\n\n    </div>\n\n    <ion-item (click)="tagClicked($event)" *ngFor="let tag of tagData" class="activity" color="positive" data-item="tag">\n\n        {{tag.name}}\n\n        <ion-icon name="{{tag.icon}}" item-right></ion-icon>\n\n    </ion-item>\n\n\n\n    <ion-item id="home-input1" class="homeInputStyle">\n\n        <ion-input type="text" onclick="return false;" [(ngModel)]="model.amount" readonly="true" placeholder="Tap number to enter amount"></ion-input>\n\n    </ion-item>\n\n    <button *ngFor="let number of numberData" (click)="numberClicked($event)" class="btn_number" ion-button color="positive" data-item="number" block>\n\n      {{number.label}}\n\n    </button>\n\n\n\n    <ion-item id="home-textarea1">\n\n        <ion-textarea [(ngModel)]="model.description" placeholder="Enter description if you want"></ion-textarea>\n\n    </ion-item>\n\n    <button (click)="submitInput()" ion-button color="positive" block>\n\n      Tap me to submit\n\n    </button>\n\n    <button (click)="resetInputs()" ion-button color="assertive" block>\n\n      Tap me to reset\n\n    </button>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_tag_service__["a" /* TagService */], __WEBPACK_IMPORTED_MODULE_5__services_number_service__["a" /* NumberService */], __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_6__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_7__services_alert_service__["a" /* Alert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(17);
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



var alertFileName = "alert";
var Alert = (function () {
    function Alert(file, common) {
        this.file = file;
        this.common = common;
    }
    Alert.prototype.setAlertData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.writeFile(alertFileName, _this.common.prepareAlertFileData(data), "config").then(function () {
                resolve();
            }).catch(function () {
                reject();
            });
        });
    };
    Alert.prototype.checkIfAlertFileExists = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.readFile(alertFileName, "config").then(function (res) {
                resolve(res);
            }).catch(function () {
                reject();
            });
        });
    };
    Alert.prototype.clearAlert = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.deleteFile(alertFileName, "config").then(function () {
                resolve();
            }).catch(function () {
                reject();
            });
        });
    };
    return Alert;
}());
Alert = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_1__common_service__["a" /* Common */]])
], Alert);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(23);
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
            if (_this.model.dataArray.length === 0) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__("h4").show();
                __WEBPACK_IMPORTED_MODULE_5_jquery__("table").hide();
            }
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
    TodayPage.prototype.deleteEntry = function (event, keyId, time) {
        var _this = this;
        if (confirm("Are you sure to delete entry of " + time + "?")) {
            this.expense.deleteEntryFromToday(keyId).then(function () {
                _this.getTodaysData();
                _this.getTotalExpenseOfToday();
                alert("Entry deleted.");
            }, function () {
                alert("Failed to delete entry");
            });
        }
    };
    return TodayPage;
}());
TodayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-today',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\today\today.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Today ({{model.date}})\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Today\'s expense &nbsp;\n            <strong style="color: red; font-size: 20px;">\n        {{model.todaysTotalExpense}}\n      </strong> rupees so far.\n        </p>\n    </div>\n    <h1>Here are the list of today\'s expenses</h1>\n    <h4 style="display: none">No expenses found for today</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Time</th>\n            <th>Reason</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Delete</th>\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:15%">{{data.time}}</td>\n            <td style="width:15%">{{data.reason}}</td>\n            <td style="width:15%">{{data.amount}}</td>\n            <td style="width:40%">{{data.description}}</td>\n            <td style="width:15%"><button (click)="deleteEntry($event, data.rawTime, data.time)" class="btn_action" ion-button color="positive" block>\n      X\n    </button></td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\today\today.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_expense_service__["a" /* Expense */]])
], TodayPage);

//# sourceMappingURL=today.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 17:
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
            data[keys[index]].rawTime = data[keys[index]].time;
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
    Common.prototype.prepareAlertFileData = function (amount) {
        var alertObject;
        alertObject = {};
        alertObject.alertAmount = amount;
        var data;
        data = JSON.stringify(alertObject);
        return data;
    };
    Common.prototype.getSupprtedDateFromDateString = function (date) {
        var supportedDate;
        var today = new Date(date);
        supportedDate = (today.getDate()).toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getFullYear().toString();
        return supportedDate;
    };
    Common.prototype.getLast7Dates = function () {
        var datesArray = [];
        for (var index = 0; index < 7; index++) {
            var date = new Date();
            var ts = date.getTime();
            var obtainedDay = ts - (index * 24 * 60 * 60 * 1000);
            date = new Date(obtainedDay);
            var dateString = this.getSupprtedDateFromDateString(date.toString());
            datesArray.push(dateString);
        }
        return datesArray;
    };
    Common.prototype.getLast30Dates = function () {
        var datesArray = [];
        for (var index = 0; index < 30; index++) {
            var date = new Date();
            var ts = date.getTime();
            var obtainedDay = ts - (index * 24 * 60 * 60 * 1000);
            date = new Date(obtainedDay);
            var dateString = this.getSupprtedDateFromDateString(date.toString());
            datesArray.push(dateString);
        }
        return datesArray;
    };
    Common.prototype.getCurrentMonthName = function () {
        var monthNames = ["January", "February", "March", "Aprill", "May", "Jun",
            "July", "August", "Septembar", "October", "November", "December"
        ];
        var date = new Date();
        return monthNames[date.getMonth()];
    };
    return Common;
}());
Common = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Common);

//# sourceMappingURL=common.service.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(202);
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
        var promise = this.http.get("assets/data/tag.data.json").toPromise()
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

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(202);
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
        var promise = this.http.get("assets/data/number.data.json").toPromise()
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

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alert_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(23);
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






var SettingsPage = (function () {
    function SettingsPage(navCtrl, file, common, alert) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.common = common;
        this.alert = alert;
        this.model = {};
    }
    SettingsPage.prototype.removeAllLocalFilesFolders = function () {
        var _this = this;
        if (confirm("Do you really want to remove all data?")) {
            this.file.removeFolderContents().then(function () {
                alert(" Folder deleted successfully");
                _this.file.createDataDirectory();
            }, function () {
                alert("Folder deletion failed");
            });
        }
    };
    SettingsPage.prototype.setAlert = function () {
        var _this = this;
        if (this.model.alertAmount) {
            var data_1;
            data_1 = this.model.alertAmount;
            this.alert.setAlertData(data_1).then(function () {
                alert("Successfully set the alert of " + data_1 + " rupees.");
                _this.checkIfAlertFileExistsAndMadeUICHanges();
            }, function () {
                alert("Setting alert failed");
            });
        }
        else {
            alert("Provide amount and then press the button");
        }
    };
    SettingsPage.prototype.ngAfterViewInit = function () {
        this.checkIfAlertFileExistsAndMadeUICHanges();
    };
    SettingsPage.prototype.checkIfAlertFileExistsAndMadeUICHanges = function () {
        var _this = this;
        this.alert.checkIfAlertFileExists().then(function (response) {
            // alert is set previously
            _this.model.alertAmount = JSON.parse(response).alertAmount;
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#btn_clearAlert").show();
        }, function () {
            // alert is not set
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#btn_clearAlert").hide();
        });
    };
    SettingsPage.prototype.clearAlert = function () {
        var _this = this;
        if (confirm("Do you really want to delete the alert?")) {
            this.alert.clearAlert().then(function () {
                alert("Alert removed. Close and reopen the app to get effect");
                _this.checkIfAlertFileExistsAndMadeUICHanges();
            }, function () {
                alert("Alert cannot be removed due to IO error");
            });
        }
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\settings\settings.html"*/'<ion-header>\n    <ion-navbar style="background-color: #2E7A3C">\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page5" style="background-color:#2E7A3C;">\n    <h1 id="settings-heading2" style="color:#000000;text-align:center;">\n        Settings\n    </h1>\n    <form id="settings-form2">\n        <button id="settings-button8" (click)="removeAllLocalFilesFolders()" ion-button color="assertive" block>\n      Remove all local data\n    </button>\n    </form>\n    <form id="settings-form3">\n        <div id="home-markdown1" class="show-list-numbers-and-dots">\n            <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n                Set alert for daily expense limit\n\n            </p>\n        </div>\n        <ion-item id="home-input1" class="homeInputStyle">\n            <ion-input type="text" name="alert" [(ngModel)]="model.alertAmount" placeholder="Enter amount"></ion-input>\n        </ion-item>\n        <button id="settings-button8" (click)="setAlert()" ion-button color="positive" block>\n      Set alert\n    </button>\n        <button (click)="clearAlert()" id="btn_clearAlert" ion-button color="assertive" style="display:none;background-color: #ef473a" block>\n      Tap me to clear alert\n    </button>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_alert_service__["a" /* Alert */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YesterdayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(23);
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
        selector: 'page-yesterday',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\yesterday\yesterday.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Yesterday ({{model.date}})\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Yesterday\'s expense &nbsp;\n            <strong style="color: red; font-size: 20px;">\n        {{model.yesterdaysTotalExpense}}\n      </strong> rupees.\n        </p>\n    </div>\n    <h1>Here are the list of yesterday\'s expenses</h1>\n    <h4 style="display: none">No expenses found for yesterday</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Time</th>\n            <th>Reason</th>\n            <th>Amount</th>\n            <th>Description</th>\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:10%">{{data.time}}</td>\n            <td style="width:10%">{{data.reason}}</td>\n            <td style="width:10%">{{data.amount}}</td>\n            <td style="width:60%">{{data.description}}</td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\yesterday\yesterday.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_3__services_expense_service__["a" /* Expense */]])
], YesterdayPage);

//# sourceMappingURL=yesterday.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage.prototype.ngAfterViewInit = function () {
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\about\about.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>\n\n            About\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n\n    \n\n  <div>\n\n    <img src="assets/img/life.png" style="display:block;width:100%;height:auto;margin-left:auto;margin-right:auto;" />\n\n  </div>\n\n<div id="home-markdown1" class="show-list-numbers-and-dots">\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            Hello, Its the first App from <strong>LIFE</strong> group. I know I design like SHIT, so please excuse me for that. Hopefully the features will not disappoint you.\n\n        </p>\n\n        <br>\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            Don\'t let your small expenses go beyond limit. This app is for keeping track of our daily small uses.\n\n        </p>\n\n        <br>\n\n        <p style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n\n            From the home page just select the type of expense, enter the amount and press submit.\n\n        </p>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(23);
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






var HistoryPage = (function () {
    function HistoryPage(navCtrl, common, expense, datePicker) {
        this.navCtrl = navCtrl;
        this.common = common;
        this.expense = expense;
        this.datePicker = datePicker;
        this.model = {};
    }
    HistoryPage.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__("#div_data").hide();
    };
    HistoryPage.prototype.populateTotalExpenseByDate = function (date) {
        var _this = this;
        this.expense.getTotalExpenseByDate(date).then(function (totalExpense) {
            _this.model.totalExpense = totalExpense;
        }, function () {
            _this.model.totalExpense = 0;
        });
    };
    HistoryPage.prototype.getDataByDate = function (date) {
        var _this = this;
        this.model.dataArray = [];
        this.expense.getExpensesByDate(date).then(function (response) {
            _this.model.dataArray = response;
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#div_data").show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("h4").hide();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("table").show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#p_totalExpense").show();
            _this.populateTotalExpenseByDate(date);
        }, function () {
            _this.model.dataArray = [];
            __WEBPACK_IMPORTED_MODULE_5_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("table").hide();
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#p_totalExpense").hide();
        });
    };
    HistoryPage.prototype.displayDatePicker = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            doneButtonLabel: "OK",
            cancelButtonLabel: "Cancel",
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        }).then(function (date) {
            _this.dateSelected(date);
        });
    };
    HistoryPage.prototype.dateSelected = function (date) {
        var supportedDate = this.common.getSupprtedDateFromDateString(date);
        this.model.selectedDate = supportedDate;
        this.getDataByDate(supportedDate);
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\history\history.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n         <ion-icon name="menu"></ion-icon>\n      </button>\n        <ion-title>\n            History\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <button class="menuButton" id="menu-button4" (click)="displayDatePicker()" ion-button color="positive" block>\n      Tap to select date and press OK\n      </button>\n    </div>\n    <div id="div_data">\n        <h1>Here are the list of expenses made on {{model.selectedDate}}</h1>\n        <h4 style="display: none">No expenses found for {{model.selectedDate}}</h4>\n        <p id="p_totalExpense" style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Total expense on {{model.selectedDate}} &nbsp;\n            <strong style="color: red; font-size: 20px;">\n         {{model.totalExpense}} &nbsp;\n         </strong> rupees\n        </p>\n        <table style="width:100%">\n            <tr>\n                <th>Time</th>\n                <th>Reason</th>\n                <th>Amount</th>\n                <th>Description</th>\n            </tr>\n            <tr *ngFor="let data of model.dataArray">\n                <td style="width:10%">{{data.time}}</td>\n                <td style="width:10%">{{data.reason}}</td>\n                <td style="width:10%">{{data.amount}}</td>\n                <td style="width:60%">{{data.description}}</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\history\history.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_3__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__["a" /* DatePicker */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(23);
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






var ChartPage = (function () {
    function ChartPage(navCtrl, expense, common) {
        this.navCtrl = navCtrl;
        this.expense = expense;
        this.common = common;
    }
    ChartPage.prototype.drawChart = function (container, data, title, labels) {
        __WEBPACK_IMPORTED_MODULE_5_jquery__("canvas").hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__(container).show();
        this.barChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](container, {
            type: 'bar',
            scaleFontColor: 'black',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Expense',
                        backgroundColor: "gray",
                        data: data
                    }]
            },
            options: {
                maintainAspectRatio: false,
                scaleFontColor: 'black',
                responsive: true,
                title: {
                    display: true,
                    text: title,
                    fontColor: "black"
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                fontColor: "black",
                            },
                        }],
                    yAxes: [{
                            ticks: {
                                fontColor: "black",
                            },
                        }],
                }
            }
        });
    };
    ChartPage.prototype.displayTagWeeklyChart = function () {
        var _this = this;
        var dates = this.common.getLast7Dates();
        this.expense.getTagWiseTotalExpenseOf7Days().then(function (response) {
            if (Object.keys(response).length === 0) {
                alert("No data found");
            }
            else {
                var keys = Object.keys(response);
                var labels = [];
                var data = [];
                for (var index = 0; index < keys.length; index++) {
                    labels.push(keys[index]);
                    data.push(parseInt(response[keys[index]]));
                }
                var title = "Last 7 days total expense chart from " + dates[0] + " to " + dates[6];
                _this.drawChart(__WEBPACK_IMPORTED_MODULE_5_jquery__("#chart2")[0], data, title, labels);
            }
        }, function () {
            alert("No data found");
        });
    };
    ChartPage.prototype.displayWeeklyChart = function () {
        var _this = this;
        var dates = this.common.getLast7Dates();
        this.expense.getTotalExpenseOfLast7DaysDatewise().then(function (response) {
            if (response.length !== 0) {
                var labels = [];
                var data = [];
                for (var index in response) {
                    labels.push(response[index].date);
                    data.push(parseInt(response[index].expense));
                }
                var title = "Last 7 days total expense chart from " + dates[0] + " to " + dates[6];
                _this.drawChart(__WEBPACK_IMPORTED_MODULE_5_jquery__("#chart1")[0], data, title, labels);
            }
            else {
                alert("No data to display chart");
            }
        }, function () {
            alert("get data error");
        });
    };
    return ChartPage;
}());
ChartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chart',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\chart\chart.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Chart\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page4" style="background-color:#2E7A3C;">\n    <button (click)="displayWeeklyChart()" ion-button color="positive" block>\n      Display daywise expense chart (7 days)\n    </button>\n    <ion-card-content>\n        <canvas id="chart1" #lineCanvas></canvas>\n    </ion-card-content>\n    <button (click)="displayTagWeeklyChart()" ion-button color="positive" block>\n      Display tagwise expense chart (7 days)\n    </button>\n    <ion-card-content>\n        <canvas id="chart2" #lineCanvas></canvas>\n    </ion-card-content>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\chart\chart.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */]])
], ChartPage);

//# sourceMappingURL=chart.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expense; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(17);
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
    Expense.prototype.getExpensesByDate = function (date, requiredRaw) {
        var _this = this;
        var expenseFileName;
        expenseFileName = date;
        return new Promise(function (resolve, reject) {
            _this.file.readFile(expenseFileName).then(function (res) {
                if (requiredRaw) {
                    resolve(res);
                }
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
    Expense.prototype.storeExpense = function (fileName, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.updateFile(fileName, data).then(function () {
                resolve();
            }, function () {
                reject();
            });
        });
    };
    Expense.prototype.deleteEntryFromToday = function (keyId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getExpensesByDate(_this.common.getTodaysDate(), true).then(function (response) {
                var data = JSON.parse(response);
                var keys = Object.keys(data);
                var newData = {};
                for (var index in keys) {
                    if (keys[index].toString() !== keyId.toString()) {
                        newData[keys[index]] = data[keys[index]];
                    }
                }
                _this.storeExpense(_this.common.getTodaysDate(), JSON.stringify(newData)).then(function () {
                    // data file updated
                    resolve();
                }, function () {
                    // unable to update data file
                    reject();
                });
            }, function () {
                // unable to get data
                reject();
            });
        });
    };
    Expense.prototype.getTotalExpenseOfLast7DaysDatewise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var datesArray = _this.common.getLast7Dates();
            var promiseArray = [];
            var expensesArray = [];
            var _loop_1 = function (index) {
                promiseArray.push(new Promise(function (res, rej) {
                    _this.getTotalExpenseByDate(datesArray[index]).then(function (data) {
                        // expenses found for the day
                        if (parseInt(data) !== 0) {
                            var exp = {
                                date: "",
                                expense: 0
                            };
                            exp.date = datesArray[index];
                            exp.expense = parseInt(data);
                            expensesArray.push(exp);
                        }
                        res();
                    }, function () {
                        ;
                        // expenses not found
                        res();
                    });
                }));
            };
            for (var index = 0; index < datesArray.length; index++) {
                _loop_1(index);
            }
            Promise.all(promiseArray).then(function () {
                resolve(expensesArray);
            }).catch(function () {
                reject();
            });
        });
    };
    Expense.prototype.getDaywiseTotalExpenseOfLast30Days = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dateArray = _this.common.getLast30Dates();
            var promiseArray = [];
            var finalArray = [];
            var _loop_2 = function (index) {
                promiseArray.push(new Promise(function (res, rej) {
                    _this.getTotalExpenseByDate(dateArray[index]).then(function (response) {
                        finalArray.push({
                            date: dateArray[index],
                            expense: response
                        });
                        res();
                    }, function () {
                        res();
                    });
                }));
            };
            for (var index = 0; index < dateArray.length; index++) {
                _loop_2(index);
            }
            Promise.all(promiseArray).then(function () {
                resolve(finalArray);
            }, function () {
                reject();
            });
        });
    };
    Expense.prototype.getTagWiseTotalExpense = function (dateArray) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            var tagBasedData = {};
            var _loop_3 = function (index) {
                promiseArray.push(new Promise(function (res, rej) {
                    _this.getExpensesByDate(dateArray[index]).then(function (response) {
                        for (var i = 0; i < response.length; i++) {
                            var tag = response[i].reason;
                            var amount = response[i].amount;
                            if (typeof tagBasedData[tag] === "undefined") {
                                tagBasedData[tag] = parseInt(amount);
                            }
                            else {
                                tagBasedData[tag] += parseInt(amount);
                            }
                        }
                        res();
                    }, function () {
                        res();
                    });
                }));
            };
            for (var index = 0; index < dateArray.length; index++) {
                _loop_3(index);
            }
            Promise.all(promiseArray).then(function () {
                resolve(tagBasedData);
            }, function () {
                reject();
            });
        });
    };
    Expense.prototype.getTagWiseTotalExpenseOf30Days = function () {
        var dateArray = this.common.getLast30Dates();
        return this.getTagWiseTotalExpense(dateArray);
    };
    Expense.prototype.getTagWiseTotalExpenseOf7Days = function () {
        var dateArray = this.common.getLast7Dates();
        return this.getTagWiseTotalExpense(dateArray);
    };
    return Expense;
}());
Expense = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_1__common_service__["a" /* Common */]])
], Expense);

//# sourceMappingURL=expense.service.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Last30Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(23);
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





var Last30Page = (function () {
    function Last30Page(navCtrl, expense, common) {
        this.navCtrl = navCtrl;
        this.expense = expense;
        this.common = common;
        this.model = {};
        this.model.dataArray = [];
        this.model.presentMont = this.common.getCurrentMonthName();
        this.model.totalExpense = 0;
    }
    Last30Page.prototype.ngAfterViewInit = function () {
        this.getDaywiseTotalExpenseOfLast30Days();
    };
    Last30Page.prototype.getTotalExpenseOfLast30Days = function (dataArray) {
        for (var index = 0; index < dataArray.length; index++) {
            this.model.totalExpense += parseInt(dataArray[index].expense);
        }
    };
    Last30Page.prototype.getDaywiseTotalExpenseOfLast30Days = function () {
        var _this = this;
        this.expense.getDaywiseTotalExpenseOfLast30Days().then(function (response) {
            if (!response.length) {
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
            }
            else {
                _this.getTotalExpenseOfLast30Days(response);
                _this.model.dataArray = response;
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").hide();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").show();
            }
        }, function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
        });
    };
    return Last30Page;
}());
Last30Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-last30',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\last30\last30.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Last 30 day\'s total expenses\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n    </div>\n    <h1>Here are the list of daywise total expenses</h1>\n    <h4 style="display: none">No data found</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Date </th>\n            <th>Total Expenses (Rupees)</th>\n\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:50%">{{data.date}}</td>\n            <td style="width:50%">{{data.expense}}</td>\n\n        </tr>\n    </table>\n    <br>\n    <br>\n    <table>\n        <tr>\n            <th>\n                Total Expense of last 30 days (Rupees)\n            </th>\n        </tr>\n        <tr>\n            <td>\n                {{model.totalExpense}}\n            </td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\last30\last30.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */]])
], Last30Page);

//# sourceMappingURL=last30.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagWisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(23);
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





var TagWisePage = (function () {
    function TagWisePage(navCtrl, expense, common) {
        this.navCtrl = navCtrl;
        this.expense = expense;
        this.common = common;
        this.model = {};
        this.model.dataArray = [];
        this.model.dataLength = 0;
        this.model.presentMont = this.common.getCurrentMonthName();
        this.model.totalExpense = 0;
    }
    TagWisePage.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").hide();
        __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
        __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").hide();
    };
    TagWisePage.prototype.tagWiseDisplay = function (noOfDays) {
        this.model.dataLength = noOfDays;
        if ((noOfDays).toString() === "7") {
            this.getTagWiseTotalExpenseOfLast7Days();
        }
        if ((noOfDays).toString() === "30") {
            this.getTagWiseTotalExpenseOfLast30Days();
        }
    };
    TagWisePage.prototype.getTagWiseTotalExpenseOfLast30Days = function () {
        var _this = this;
        this.expense.getTagWiseTotalExpenseOf30Days().then(function (response) {
            if (!Object.keys(response).length) {
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").hide();
            }
            else {
                var keys = Object.keys(response);
                var data = [];
                for (var index = 0; index < keys.length; index++) {
                    var obj = {
                        "tag": "",
                        "amount": 0
                    };
                    obj.tag = keys[index];
                    obj.amount = response[keys[index]];
                    data.push(obj);
                }
                _this.model.dataArray = data;
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").hide();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").show();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").show();
            }
        }, function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").hide();
        });
    };
    TagWisePage.prototype.getTagWiseTotalExpenseOfLast7Days = function () {
        var _this = this;
        this.expense.getTagWiseTotalExpenseOf7Days().then(function (response) {
            if (!Object.keys(response).length) {
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").hide();
            }
            else {
                var keys = Object.keys(response);
                var data = [];
                for (var index = 0; index < keys.length; index++) {
                    var obj = {
                        "tag": "",
                        "amount": 0
                    };
                    obj.tag = keys[index];
                    obj.amount = response[keys[index]];
                    data.push(obj);
                }
                _this.model.dataArray = data;
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").hide();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("table").show();
                __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").show();
            }
        }, function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h4").show();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("table").hide();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("h1").hide();
        });
    };
    return TagWisePage;
}());
TagWisePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tagwise',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tagwise\tagwise.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Tagwise total expenses\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n    </div>\n    <button id="menu-button4" (click)="tagWiseDisplay(7)" ion-button color="positive" block>\n      tagwisedisplay of 7 days\n      </button>\n    <button id="menu-button4" (click)="tagWiseDisplay(30)" ion-button color="positive" block>\n      tagwisedisplay of 30 days\n      </button>\n\n    <h4 style="display: none">No data found</h4>\n    <h1>Here are the list of tagwise total expenses(last {{model.dataLength}} days)</h1>\n    <table style="width:100%">\n        <tr>\n            <th>Tagname </th>\n            <th>Total Expenses</th>\n\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:50%">{{data.tag}}</td>\n            <td style="width:50%">{{data.amount}}</td>\n\n        </tr>\n    </table>\n    <br>\n    <br>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tagwise\tagwise.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */]])
], TagWisePage);

//# sourceMappingURL=tagwise.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileHandeler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
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
    function FileHandeler(file, event) {
        this.file = file;
        this.event = event;
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
    FileHandeler.prototype.getCurrentDataFileName = function () {
        var today = new Date();
        var dateString;
        dateString = (today.getDate()).toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getFullYear().toString();
        return dateString;
    };
    FileHandeler.prototype.updateFile = function (fileName, data, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof type === "undefined") {
                type = "data";
            }
            if (type === "data") {
                _this.file.writeExistingFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, fileName, data).then(function () {
                    _this.event.publish('file:data:updated');
                    resolve();
                }).catch(function () {
                    reject();
                });
            }
            else {
                reject();
            }
        });
    };
    FileHandeler.prototype.writeFile = function (fileName, data, type, directoryName) {
        var _this = this;
        if (type === "data") {
            return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + dataFolderName, this.getCurrentDataFileName()).then(function (res) {
                //alert("file already exists, merging");
                var dataNew = JSON.parse(res);
                var parsedData = JSON.parse(data);
                dataNew[parsedData.time] = parsedData;
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
                var parsedData = JSON.parse(data);
                dataNew[parsedData.time] = parsedData;
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
        if (type === "config") {
            return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName).then(function (res) {
                //file exists overwriting
                return _this.file.writeExistingFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName, data).then(function () {
                    //writing done
                    _this.event.publish('file:config:updated');
                    return true;
                }).catch(function () {
                    //unable to write
                    return false;
                });
            }).catch(function () {
                //file not exists, creating
                return _this.file.writeFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName, data).then(function () {
                    //writing done
                    _this.event.publish('file:config:updated');
                    return true;
                }).catch(function () {
                    //unable to write file
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
        var _this = this;
        if (typeof folderName === "undefined") {
            folderName = dataFolderName;
        }
        return new Promise(function (resolve, reject) {
            _this.file.removeRecursively(_this.file.dataDirectory + "/" + rootFolderName, folderName).then(function () {
                _this.event.publish('file:data:updated');
                resolve();
            }, function () {
                reject();
            });
        });
    };
    FileHandeler.prototype.getFolderContents = function (folderName) {
        var _this = this;
        if (typeof folderName === "undefined") {
            folderName = "data";
        }
        return new Promise(function (resolve, reject) {
            _this.file.listDir(_this.file.dataDirectory + "/" + rootFolderName + "/", folderName).then(function (response) {
                resolve(response);
            }).catch(function () {
                reject();
            });
        });
    };
    FileHandeler.prototype.readFile = function (fileName, directoryName) {
        if (typeof directoryName === "undefined") {
            directoryName = dataFolderName;
        }
        return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + directoryName, fileName);
    };
    FileHandeler.prototype.readFileContent = function (fileName, directoryName) {
        var _this = this;
        if (typeof directoryName === "undefined") {
            directoryName = dataFolderName;
        }
        return new Promise(function (resolve, reject) {
            _this.file.readAsText(_this.file.dataDirectory + "/" + rootFolderName + "/" + directoryName, fileName).then(function (dataFromFile) {
                resolve(dataFromFile);
            }).catch(function () {
                reject();
            });
        });
    };
    FileHandeler.prototype.deleteFile = function (fileName, directoryName) {
        if (typeof directoryName === "undefined") {
            directoryName = dataFolderName;
        }
        return this.file.removeFile(this.file.dataDirectory + "/" + rootFolderName + "/" + directoryName, fileName);
    };
    return FileHandeler;
}());
FileHandeler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Events */]])
], FileHandeler);

//# sourceMappingURL=filehandeler.service.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportExportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_importexport_service__ = __webpack_require__(331);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ImportExportPage = (function () {
    function ImportExportPage(navCtrl, expense, common, impexp) {
        this.navCtrl = navCtrl;
        this.expense = expense;
        this.common = common;
        this.impexp = impexp;
        this.model = {};
    }
    ImportExportPage.prototype.ngAfterViewInit = function () {
    };
    ImportExportPage.prototype.import = function () {
    };
    ImportExportPage.prototype.export = function () {
        this.impexp.export().then(function (response) {
            alert(response);
        }, function () {
            alert("Error");
        });
    };
    return ImportExportPage;
}());
ImportExportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-importexport',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\importexport\importexport.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Tagwise total expenses\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n    </div>\n    <button id="menu-button4" (click)="import()" ion-button color="positive" block>\n      Import from google drive\n      </button>\n    <button id="menu-button4" (click)="export()" ion-button color="positive" block>\n      Backup to google drive\n      </button>\n\n\n    <br>\n    <br>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\importexport\importexport.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_importexport_service__["a" /* ImportExport */]])
], ImportExportPage);

//# sourceMappingURL=importexport.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportExport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filehandeler_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImportExport = (function () {
    function ImportExport(http, file) {
        this.http = http;
        this.file = file;
        this.email = "sguha1988.life@gmail.com";
    }
    ImportExport.prototype.backUpToGoogleDrive = function (data, fileName) {
        return new Promise(function (resolve, reject) {
            resolve(data);
        });
    };
    ImportExport.prototype.export = function () {
        var _this = this;
        var exportObject;
        var data;
        exportObject = {};
        data = {};
        return new Promise(function (resolve, reject) {
            _this.file.getFolderContents().then(function (fileArray) {
                if (typeof fileArray === "undefined" || fileArray.length === 0) {
                    reject();
                }
                else {
                    var promiseArray = [];
                    var _loop_1 = function (index) {
                        promiseArray.push(new Promise(function (res, rej) {
                            _this.file.readFileContent(fileArray[index].name).then(function (dataFromFile) {
                                data[fileArray[index].name] = JSON.parse(dataFromFile);
                                res();
                            }, function () {
                                data[fileArray[index].name] = {};
                                res();
                            });
                        }));
                    };
                    for (var index = 0; index < fileArray.length; index++) {
                        _loop_1(index);
                    }
                    Promise.all(promiseArray).then(function () {
                        exportObject.data = data;
                        // backup logic to google drive goes here
                        _this.backUpToGoogleDrive(JSON.stringify(exportObject)).then(function (response) {
                            resolve(response);
                        }, function () {
                            reject();
                        });
                    }, function () { });
                }
            }, function () {
                reject();
            });
        });
    };
    return ImportExport;
}());
ImportExport = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__filehandeler_service__["a" /* FileHandeler */]])
], ImportExport);

//# sourceMappingURL=importexport.service.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(351);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_today_today__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chart_chart__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tagwise_tagwise__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_importexport_importexport__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tabs_controller_tabs_controller__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_tag_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_number_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_filehandeler_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_history_history__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_date_picker__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_email_composer__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_importexport_service__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_common_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_alert_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_expense_service__ = __webpack_require__(24);
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
            __WEBPACK_IMPORTED_MODULE_6__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chart_chart__["a" /* ChartPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__["a" /* Last30Page */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tagwise_tagwise__["a" /* TagWisePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_importexport_importexport__["a" /* ImportExportPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_21__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chart_chart__["a" /* ChartPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__["a" /* Last30Page */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tagwise_tagwise__["a" /* TagWisePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_importexport_importexport__["a" /* ImportExportPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_24__services_importexport_service__["a" /* ImportExport */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_13__services_tag_service__["a" /* TagService */],
            __WEBPACK_IMPORTED_MODULE_14__services_number_service__["a" /* NumberService */],
            __WEBPACK_IMPORTED_MODULE_15__services_filehandeler_service__["a" /* FileHandeler */],
            __WEBPACK_IMPORTED_MODULE_25__services_common_service__["a" /* Common */],
            __WEBPACK_IMPORTED_MODULE_27__services_expense_service__["a" /* Expense */],
            __WEBPACK_IMPORTED_MODULE_26__services_alert_service__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Events */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_today_today__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_history_history__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_chart_chart__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_last30_last30__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tagwise_tagwise__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_importexport_importexport__ = __webpack_require__(330);
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
    MyApp.prototype.ngAfterViewInit = function () {
    };
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
            case 'about':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */]);
                break;
            case 'history':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pages_history_history__["a" /* HistoryPage */]);
                break;
            case 'chart':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__pages_chart_chart__["a" /* ChartPage */]);
                break;
            case 'last30':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__pages_last30_last30__["a" /* Last30Page */]);
                break;
            case 'tagwise':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pages_tagwise_tagwise__["a" /* TagWisePage */]);
                break;
            case 'importexport':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__pages_importexport_importexport__["a" /* ImportExportPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/'<ion-menu [content]="mainContent">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>\n\n                Menu\n\n            </ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content id="side-menu21">\n\n        <button style="display:none" ion-button id="menu-button-close" (click)="closeMenu()" menuClose="left">Close Menu</button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'today\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Today\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'yesterday\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Yesterday\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'history\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         History\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'last30\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         Last 30 daily total expense \n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'tagwise\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         Tagwise total expense \n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'chart\')" ion-button color="positive" block icon-left>\n\n                Chart\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'importexport\')" ion-button color="positive" block icon-left>\n\n                Import / Export\n\n      </button>\n\n        <button class="menuButton" id="menu-button-settings" (click)="goToPage(\'settings\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="settings"></ion-icon>\n\n         Settings\n\n      </button>\n\n        <button class="menuButton" id="menu-button4" (click)="goToPage(\'about\')" ion-button color="positive" block>\n\n      About\n\n      </button>\n\n        <button class="menuButton" id="menu-button5" (click)="goToPage(\'aboutme\')" ion-button color="positive" block>\n\n      About Me\n\n      </button>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 213,
	"./af.js": 213,
	"./ar": 214,
	"./ar-dz": 215,
	"./ar-dz.js": 215,
	"./ar-kw": 216,
	"./ar-kw.js": 216,
	"./ar-ly": 217,
	"./ar-ly.js": 217,
	"./ar-ma": 218,
	"./ar-ma.js": 218,
	"./ar-sa": 219,
	"./ar-sa.js": 219,
	"./ar-tn": 220,
	"./ar-tn.js": 220,
	"./ar.js": 214,
	"./az": 221,
	"./az.js": 221,
	"./be": 222,
	"./be.js": 222,
	"./bg": 223,
	"./bg.js": 223,
	"./bn": 224,
	"./bn.js": 224,
	"./bo": 225,
	"./bo.js": 225,
	"./br": 226,
	"./br.js": 226,
	"./bs": 227,
	"./bs.js": 227,
	"./ca": 228,
	"./ca.js": 228,
	"./cs": 229,
	"./cs.js": 229,
	"./cv": 230,
	"./cv.js": 230,
	"./cy": 231,
	"./cy.js": 231,
	"./da": 232,
	"./da.js": 232,
	"./de": 233,
	"./de-at": 234,
	"./de-at.js": 234,
	"./de-ch": 235,
	"./de-ch.js": 235,
	"./de.js": 233,
	"./dv": 236,
	"./dv.js": 236,
	"./el": 237,
	"./el.js": 237,
	"./en-au": 238,
	"./en-au.js": 238,
	"./en-ca": 239,
	"./en-ca.js": 239,
	"./en-gb": 240,
	"./en-gb.js": 240,
	"./en-ie": 241,
	"./en-ie.js": 241,
	"./en-nz": 242,
	"./en-nz.js": 242,
	"./eo": 243,
	"./eo.js": 243,
	"./es": 244,
	"./es-do": 245,
	"./es-do.js": 245,
	"./es.js": 244,
	"./et": 246,
	"./et.js": 246,
	"./eu": 247,
	"./eu.js": 247,
	"./fa": 248,
	"./fa.js": 248,
	"./fi": 249,
	"./fi.js": 249,
	"./fo": 250,
	"./fo.js": 250,
	"./fr": 251,
	"./fr-ca": 252,
	"./fr-ca.js": 252,
	"./fr-ch": 253,
	"./fr-ch.js": 253,
	"./fr.js": 251,
	"./fy": 254,
	"./fy.js": 254,
	"./gd": 255,
	"./gd.js": 255,
	"./gl": 256,
	"./gl.js": 256,
	"./gom-latn": 257,
	"./gom-latn.js": 257,
	"./he": 258,
	"./he.js": 258,
	"./hi": 259,
	"./hi.js": 259,
	"./hr": 260,
	"./hr.js": 260,
	"./hu": 261,
	"./hu.js": 261,
	"./hy-am": 262,
	"./hy-am.js": 262,
	"./id": 263,
	"./id.js": 263,
	"./is": 264,
	"./is.js": 264,
	"./it": 265,
	"./it.js": 265,
	"./ja": 266,
	"./ja.js": 266,
	"./jv": 267,
	"./jv.js": 267,
	"./ka": 268,
	"./ka.js": 268,
	"./kk": 269,
	"./kk.js": 269,
	"./km": 270,
	"./km.js": 270,
	"./kn": 271,
	"./kn.js": 271,
	"./ko": 272,
	"./ko.js": 272,
	"./ky": 273,
	"./ky.js": 273,
	"./lb": 274,
	"./lb.js": 274,
	"./lo": 275,
	"./lo.js": 275,
	"./lt": 276,
	"./lt.js": 276,
	"./lv": 277,
	"./lv.js": 277,
	"./me": 278,
	"./me.js": 278,
	"./mi": 279,
	"./mi.js": 279,
	"./mk": 280,
	"./mk.js": 280,
	"./ml": 281,
	"./ml.js": 281,
	"./mr": 282,
	"./mr.js": 282,
	"./ms": 283,
	"./ms-my": 284,
	"./ms-my.js": 284,
	"./ms.js": 283,
	"./my": 285,
	"./my.js": 285,
	"./nb": 286,
	"./nb.js": 286,
	"./ne": 287,
	"./ne.js": 287,
	"./nl": 288,
	"./nl-be": 289,
	"./nl-be.js": 289,
	"./nl.js": 288,
	"./nn": 290,
	"./nn.js": 290,
	"./pa-in": 291,
	"./pa-in.js": 291,
	"./pl": 292,
	"./pl.js": 292,
	"./pt": 293,
	"./pt-br": 294,
	"./pt-br.js": 294,
	"./pt.js": 293,
	"./ro": 295,
	"./ro.js": 295,
	"./ru": 296,
	"./ru.js": 296,
	"./sd": 297,
	"./sd.js": 297,
	"./se": 298,
	"./se.js": 298,
	"./si": 299,
	"./si.js": 299,
	"./sk": 300,
	"./sk.js": 300,
	"./sl": 301,
	"./sl.js": 301,
	"./sq": 302,
	"./sq.js": 302,
	"./sr": 303,
	"./sr-cyrl": 304,
	"./sr-cyrl.js": 304,
	"./sr.js": 303,
	"./ss": 305,
	"./ss.js": 305,
	"./sv": 306,
	"./sv.js": 306,
	"./sw": 307,
	"./sw.js": 307,
	"./ta": 308,
	"./ta.js": 308,
	"./te": 309,
	"./te.js": 309,
	"./tet": 310,
	"./tet.js": 310,
	"./th": 311,
	"./th.js": 311,
	"./tl-ph": 312,
	"./tl-ph.js": 312,
	"./tlh": 313,
	"./tlh.js": 313,
	"./tr": 314,
	"./tr.js": 314,
	"./tzl": 315,
	"./tzl.js": 315,
	"./tzm": 316,
	"./tzm-latn": 317,
	"./tzm-latn.js": 317,
	"./tzm.js": 316,
	"./uk": 318,
	"./uk.js": 318,
	"./ur": 319,
	"./ur.js": 319,
	"./uz": 320,
	"./uz-latn": 321,
	"./uz-latn.js": 321,
	"./uz.js": 320,
	"./vi": 322,
	"./vi.js": 322,
	"./x-pseudo": 323,
	"./x-pseudo.js": 323,
	"./yo": 324,
	"./yo.js": 324,
	"./zh-cn": 325,
	"./zh-cn.js": 325,
	"./zh-hk": 326,
	"./zh-hk.js": 326,
	"./zh-tw": 327,
	"./zh-tw.js": 327
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 433;

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__today_today__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { MonthPage } from '../month/month';
var TabsControllerPage = (function () {
    function TabsControllerPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__today_today__["a" /* TodayPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__today_today__["a" /* TodayPage */];
    }
    return TabsControllerPage;
}());
TabsControllerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs-controller',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tabs-controller\tabs-controller.html"*/'<ion-tabs id="tabsController-tabs1">\n  <ion-tab [root]="tab1Root" tabTitle="Camera Tab" tabIcon="home" id="tabsController-tab1"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Cart Tab" tabIcon="calendar" id="tabsController-tab2"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="" tabIcon="grid" id="tabsController-tab3"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\tabs-controller\tabs-controller.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], TabsControllerPage);

//# sourceMappingURL=tabs-controller.js.map

/***/ })

},[332]);
//# sourceMappingURL=main.js.map
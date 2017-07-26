webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_tag_service__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_number_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_expense_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_alert_service__ = __webpack_require__(105);
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
    function HomePage(navCtrl, tagService, numberService, file, expense, alertHandler) {
        this.navCtrl = navCtrl;
        this.tagService = tagService;
        this.numberService = numberService;
        this.file = file;
        this.expense = expense;
        this.alertHandler = alertHandler;
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_tag_service__["a" /* TagService */], __WEBPACK_IMPORTED_MODULE_5__services_number_service__["a" /* NumberService */], __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_6__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_7__services_alert_service__["a" /* Alert */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(30);
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

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_expense_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(33);
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

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 156;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(201);
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

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(201);
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

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alert_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(33);
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
        if (confirm("")) {
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
                alert("Successfully set the alert of " + data_1 + " rupees.  Close and reopen the app to get effect");
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_alert_service__["a" /* Alert */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YesterdayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(33);
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

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(33);
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
        selector: 'page-history',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\history\history.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n         <ion-icon name="menu"></ion-icon>\n      </button>\n        <ion-title>\n            History\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n        <button class="menuButton" id="menu-button4" (click)="displayDatePicker()" ion-button color="positive" block>\n      Tap to select date and press OK\n      </button>\n    </div>\n    <div id="div_data">\n        <h1>Here are the list of expenses made on {{model.selectedDate}}</h1>\n        <h4 style="display: none">No expenses found for {{model.selectedDate}}</h4>\n        <p id="p_totalExpense" style="color:#000000; margin: 0; margin-bottom: 3px; padding: 0;">\n            Total expense on {{model.selectedDate}} &nbsp;\n            <strong style="color: red; font-size: 20px;">\n         {{model.totalExpense}} &nbsp; rupees\n         </strong>\n        </p>\n        <table style="width:100%">\n            <tr>\n                <th>Time</th>\n                <th>Reason</th>\n                <th>Amount</th>\n                <th>Description</th>\n            </tr>\n            <tr *ngFor="let data of model.dataArray">\n                <td style="width:10%">{{data.time}}</td>\n                <td style="width:10%">{{data.reason}}</td>\n                <td style="width:10%">{{data.amount}}</td>\n                <td style="width:60%">{{data.description}}</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\history\history.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* Common */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* Common */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_expense_service__["a" /* Expense */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_expense_service__["a" /* Expense */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__["a" /* DatePicker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__["a" /* DatePicker */]) === "function" && _d || Object])
], HistoryPage);

var _a, _b, _c, _d;
//# sourceMappingURL=history.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
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

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_today_today__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_yesterday_yesterday__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_month_month__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_controller_tabs_controller__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_tag_service__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_number_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_settings_settings__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_history_history__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_date_picker__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_common_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_alert_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_expense_service__ = __webpack_require__(42);
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
            __WEBPACK_IMPORTED_MODULE_8__pages_month_month__["a" /* MonthPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_history_history__["a" /* HistoryPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_18__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_month_month__["a" /* MonthPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_history_history__["a" /* HistoryPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_10__services_tag_service__["a" /* TagService */],
            __WEBPACK_IMPORTED_MODULE_11__services_number_service__["a" /* NumberService */],
            __WEBPACK_IMPORTED_MODULE_12__services_filehandeler_service__["a" /* FileHandeler */],
            __WEBPACK_IMPORTED_MODULE_20__services_common_service__["a" /* Common */],
            __WEBPACK_IMPORTED_MODULE_22__services_expense_service__["a" /* Expense */],
            __WEBPACK_IMPORTED_MODULE_21__services_alert_service__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_date_picker__["a" /* DatePicker */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_today_today__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_history_history__ = __webpack_require__(206);
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
            case 'about':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */]);
                break;
            case 'history':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pages_history_history__["a" /* HistoryPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/'<ion-menu [content]="mainContent">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>\n\n                Menu\n\n            </ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content id="side-menu21">\n\n        <button style="display:none" ion-button id="menu-button-close" (click)="closeMenu()" menuClose="left">Close Menu</button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'today\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Today\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'yesterday\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Yesterday\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'history\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         History\n\n      </button>\n\n        <button class="menuButton" id="menu-button-settings" (click)="goToPage(\'settings\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="settings"></ion-icon>\n\n         Settings\n\n      </button>\n\n        <button class="menuButton" id="menu-button4" (click)="goToPage(\'about\')" ion-button color="positive" block>\n\n      About\n\n      </button>\n\n        <button class="menuButton" id="menu-button5" (click)="goToPage(\'aboutme\')" ion-button color="positive" block>\n\n      About Me\n\n      </button>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__today_today__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__month_month__ = __webpack_require__(208);
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

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileHandeler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file__ = __webpack_require__(199);
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
        if (type === "config") {
            return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName).then(function (res) {
                //file exists overwriting
                return _this.file.writeExistingFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName, data).then(function () {
                    //writing done
                    return true;
                }).catch(function () {
                    //unable to write
                    return false;
                });
            }).catch(function () {
                //file not exists, creating
                return _this.file.writeFile(_this.file.dataDirectory + "/" + rootFolderName + "/" + configFolderName, fileName, data).then(function () {
                    //writing done
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
    FileHandeler.prototype.readFile = function (fileName, directoryName) {
        if (typeof directoryName === "undefined") {
            directoryName = dataFolderName;
        }
        return this.file.readAsText(this.file.dataDirectory + "/" + rootFolderName + "/" + directoryName, fileName);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_file__["a" /* File */]])
], FileHandeler);

//# sourceMappingURL=filehandeler.service.js.map

/***/ }),

/***/ 30:
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
    return Common;
}());
Common = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Common);

//# sourceMappingURL=common.service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expense; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(30);
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

/***/ })

},[209]);
//# sourceMappingURL=main.js.map
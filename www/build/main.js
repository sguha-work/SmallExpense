webpackJsonp([0],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_tag_service__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_number_service__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_alert_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_sim_service__ = __webpack_require__(138);
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
    function HomePage(navCtrl, tagService, numberService, file, expense, alertHandler, event, sim) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.tagService = tagService;
        this.numberService = numberService;
        this.file = file;
        this.expense = expense;
        this.alertHandler = alertHandler;
        this.event = event;
        this.sim = sim;
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
        this.checkAndCreateSimInfoFileIfNotExists();
    }
    HomePage.prototype.checkAndCreateSimInfoFileIfNotExists = function () {
        var _this = this;
        setTimeout(function () {
            _this.sim.checkAndPrepareSimInfoIfNotExists();
        }, 2000);
    };
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_tag_service__["a" /* TagService */], __WEBPACK_IMPORTED_MODULE_5__services_number_service__["a" /* NumberService */], __WEBPACK_IMPORTED_MODULE_3__services_filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_6__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_7__services_alert_service__["a" /* Alert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_8__services_sim_service__["a" /* SimService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(21);
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

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sim__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filehandeler_service__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SimService = (function () {
    function SimService(sim, file) {
        this.sim = sim;
        this.file = file;
    }
    SimService.prototype.getSimInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sim.getSimInfo().then(function (info) {
                if (info.phoneNumber.toString() === "") {
                    resolve(info.cards[0].phoneNumber);
                }
                else {
                    resolve(info.phoneNumber);
                }
            }, function (err) {
                reject();
            });
        });
    };
    SimService.prototype.checkAndPrepareSimInfoIfNotExists = function () {
        var _this = this;
        this.file.readFile("user", "config").then(function () {
            // good, user file exists
        }).catch(function () {
            _this.sim.requestReadPermission().then(function () {
                alert("We need to have sim1 phone number to backup your database. We will not disclose. Please allow permission");
                _this.getSimInfo().then(function (phoneNumber) {
                    var user = {};
                    user["phoneNumber"] = phoneNumber;
                    _this.file.writeFile("user", JSON.stringify(user), "config");
                }, function () {
                    alert("Permission denied. Import/export will not work");
                });
            }).catch(function () {
                alert("Permission denied. Import/export will not work");
            });
        });
    };
    SimService.prototype.getUserSIM1Number = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.readFile("user", "config").then(function (data) {
                var userData = JSON.parse(data);
                resolve(userData.phoneNumber);
            }).catch(function () {
                alert("cannot get user sim1 number. Import/export will not work");
                reject();
            });
        });
    };
    return SimService;
}());
SimService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_sim__["a" /* Sim */], __WEBPACK_IMPORTED_MODULE_2__filehandeler_service__["a" /* FileHandeler */]])
], SimService);

//# sourceMappingURL=sim.service.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(28);
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

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 21:
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

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(242);
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

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(242);
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

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alert_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(28);
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

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YesterdayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(28);
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

/***/ 247:
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(28);
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

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(28);
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

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expense; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_service__ = __webpack_require__(21);
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
    Expense.prototype.getDaywiseTotalExpenseOfLast7Days = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dateArray = _this.common.getLast7Dates();
            var promiseArray = [];
            var finalArray = [];
            var _loop_3 = function (index) {
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
                _loop_3(index);
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
            var _loop_4 = function (index) {
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
                _loop_4(index);
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

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Last30Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(28);
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

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Last7Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(28);
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





var Last7Page = (function () {
    function Last7Page(navCtrl, expense, common) {
        this.navCtrl = navCtrl;
        this.expense = expense;
        this.common = common;
        this.model = {};
        this.model.dataArray = [];
        this.model.presentMont = this.common.getCurrentMonthName();
        this.model.totalExpense = 0;
    }
    Last7Page.prototype.ngAfterViewInit = function () {
        this.getDaywiseTotalExpenseOfLast7Days();
    };
    Last7Page.prototype.getTotalExpenseOfLast30Days = function (dataArray) {
        for (var index = 0; index < dataArray.length; index++) {
            this.model.totalExpense += parseInt(dataArray[index].expense);
        }
    };
    Last7Page.prototype.getDaywiseTotalExpenseOfLast7Days = function () {
        var _this = this;
        this.expense.getDaywiseTotalExpenseOfLast7Days().then(function (response) {
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
    return Last7Page;
}());
Last7Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-last7',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\last7\last7.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Last 7 day\'s total expenses\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n    </div>\n    <h1>Here are the list of daywise total expenses</h1>\n    <h4 style="display: none">No data found</h4>\n    <table style="width:100%">\n        <tr>\n            <th>Date </th>\n            <th>Total Expenses (Rupees)</th>\n\n        </tr>\n        <tr *ngFor="let data of model.dataArray">\n            <td style="width:50%">{{data.date}}</td>\n            <td style="width:50%">{{data.expense}}</td>\n\n        </tr>\n    </table>\n    <br>\n    <br>\n    <table>\n        <tr>\n            <th>\n                Total Expense of last 7 days (Rupees)\n            </th>\n        </tr>\n        <tr>\n            <td>\n                {{model.totalExpense}}\n            </td>\n        </tr>\n    </table>\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\last7\last7.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */]])
], Last7Page);

//# sourceMappingURL=last7.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagWisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(28);
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

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportExportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_importexport_service__ = __webpack_require__(373);
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
    ImportExportPage.prototype.importFromDatabaseManually = function () {
        alert("Import functionality handle itself autometically");
        this.impexp.import().then(function () {
            alert("import done");
        }, function () {
            alert("import failed");
        });
    };
    ImportExportPage.prototype.export = function () {
        this.impexp.export().then(function (response) {
            alert("Backup done successfully");
        }, function () {
            alert("Error");
        });
    };
    return ImportExportPage;
}());
ImportExportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-importexport',template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\importexport\importexport.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            Tagwise total expenses\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding id="page3" style="background-color:#2E7A3C;">\n    <div id="home-markdown1" class="show-list-numbers-and-dots">\n\n    </div>\n    <button id="menu-button4" (click)="importFromDatabaseManually()" ion-button color="positive" block>\n      Import from database\n      </button>\n    <button id="menu-button4" (click)="export()" ion-button color="positive" block>\n      Backup to database\n      </button>\n\n\n    <br>\n    <br>\n\n</ion-content>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\pages\importexport\importexport.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* Expense */], __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* Common */], __WEBPACK_IMPORTED_MODULE_4__services_importexport_service__["a" /* ImportExport */]])
], ImportExportPage);

//# sourceMappingURL=importexport.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportExport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database_service__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sim_service__ = __webpack_require__(138);
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
    function ImportExport(http, file, email, db, sim) {
        this.http = http;
        this.file = file;
        this.email = email;
        this.db = db;
        this.sim = sim;
        this.emailId = "sguha1988.life@gmail.com";
    }
    ImportExport.prototype.sendDataAsEmail = function (data, email) {
        var emailObject = {
            to: (typeof email === "undefined") ? this.emailId : email,
            cc: '',
            bcc: [],
            attachments: [],
            subject: 'Backup data',
            body: data,
            isHtml: true
        };
        // Send a text message using default options
        this.email.open(emailObject);
    };
    ImportExport.prototype.backUpToDatabase = function (data, fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //this.sendDataAsEmail(data);    
            _this.sim.getUserSIM1Number().then(function (sim1Number) {
                _this.db.writeToDatabase(sim1Number, JSON.parse(data)).then(function () {
                    resolve();
                }, function () {
                    reject();
                });
            }, function () {
                reject();
            });
        });
    };
    ImportExport.prototype.prepareConfigObject = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            _this.file.getFolderContents("config").then(function (fileArray) {
                if (typeof fileArray === "undefined" || fileArray.length === 0) {
                    reject({});
                }
                else {
                    var promiseArray = [];
                    var dataObject_1 = {};
                    var _loop_1 = function (index) {
                        promiseArray.push(new Promise(function (res, rej) {
                            _this.file.readFileContent(fileArray[index].name, "config").then(function (dataFromFile) {
                                dataObject_1[fileArray[index].name] = JSON.parse(dataFromFile);
                                res();
                            }, function () {
                                dataObject_1[fileArray[index].name] = {};
                                res();
                            });
                        }));
                    };
                    for (var index = 0; index < fileArray.length; index++) {
                        _loop_1(index);
                    }
                    Promise.all(promiseArray).then(function () {
                        resolve(dataObject_1);
                    }, function () {
                        resolve(dataObject_1);
                    });
                }
            });
        }));
    };
    ImportExport.prototype.prepareDataObject = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            _this.file.getFolderContents().then(function (fileArray) {
                if (typeof fileArray === "undefined" || fileArray.length === 0) {
                    reject({});
                }
                else {
                    var promiseArray = [];
                    var dataObject_2 = {};
                    var _loop_2 = function (index) {
                        promiseArray.push(new Promise(function (res, rej) {
                            _this.file.readFileContent(fileArray[index].name).then(function (dataFromFile) {
                                dataObject_2[fileArray[index].name] = JSON.parse(dataFromFile);
                                res();
                            }, function () {
                                dataObject_2[fileArray[index].name] = {};
                                res();
                            });
                        }));
                    };
                    for (var index = 0; index < fileArray.length; index++) {
                        _loop_2(index);
                    }
                    Promise.all(promiseArray).then(function () {
                        resolve(dataObject_2);
                    }, function () {
                        resolve(dataObject_2);
                    });
                }
            });
        }));
    };
    ImportExport.prototype.prepareExportObject = function () {
        var _this = this;
        var exportObject = {
            data: {},
            config: {}
        };
        exportObject.data = {};
        return new Promise(function (resolve, reject) {
            _this.prepareDataObject().then(function (response) {
                exportObject.data = response;
                _this.prepareConfigObject().then(function (response) {
                    exportObject.config = response;
                    resolve(exportObject);
                }, function () {
                    exportObject.config = response;
                    resolve(exportObject);
                });
            }, function () {
                resolve(exportObject);
            });
        });
    };
    ImportExport.prototype.export = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.prepareExportObject().then(function (response) {
                _this.backUpToDatabase(JSON.stringify(response)).then(function () {
                    resolve();
                }, function () {
                    reject();
                });
            }, function (response) {
                _this.backUpToDatabase(JSON.stringify(response)).then(function () {
                    resolve(JSON.stringify(response));
                }, function () {
                    reject();
                });
            });
        });
    };
    ImportExport.prototype.writeConfigFiles = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            var keys = Object.keys(data);
            var _loop_3 = function (index) {
                if (keys[index] !== "user") {
                    var promise = void 0;
                    promise = new Promise(function (res, rej) {
                        _this.file.writeFile(keys[index], JSON.stringify(data[keys[index]]), "config").then(function () {
                            // file write success
                            res();
                        }).catch(function () {
                            // file write failed moving to next file
                            res();
                        });
                    });
                    promiseArray.push(promise);
                }
            };
            for (var index = 0; index < keys.length; index++) {
                _loop_3(index);
            }
            Promise.all(promiseArray).then(function () {
                // all config file write done
                resolve();
            }).catch(function () {
                // not all config file written, moving on to next
                resolve();
            });
        });
    };
    ImportExport.prototype.writeDataFiles = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            var keys = Object.keys(data);
            var _loop_4 = function (index) {
                var promise = void 0;
                promise = new Promise(function (res, rej) {
                    _this.file.writeFile(keys[index], JSON.stringify(data[keys[index]]), "data", "data", true).then(function () {
                        // file write success
                        alert(keys[index] + " ddone");
                        res();
                    }).catch(function () {
                        // file write failed moving to next file
                        alert(keys[index] + " dfailed");
                        res();
                    });
                });
                promiseArray.push(promise);
            };
            for (var index = 0; index < keys.length; index++) {
                _loop_4(index);
            }
            Promise.all(promiseArray).then(function () {
                // all data file write done
                resolve();
            }).catch(function () {
                // not all data file written, moving on to next
                resolve();
            });
        });
    };
    ImportExport.prototype.createLocalFilesFromData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var configData = data.config;
            var expenseData = data.data;
            _this.writeConfigFiles(configData).then(function () {
                _this.writeDataFiles(expenseData).then(function () {
                    resolve();
                }, function () {
                    // data file write failed
                    resolve();
                });
            }, function () {
                // config file write failed
                resolve();
            });
        });
    };
    ImportExport.prototype.import = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sim.getUserSIM1Number().then(function (sim1Number) {
                _this.db.getFromDatabase(sim1Number).then(function (response) {
                    _this.createLocalFilesFromData(response).then(function () {
                        // file creation done
                        resolve();
                    }, function () {
                        // file creation failed
                        reject();
                    });
                }, function (error) {
                    reject();
                });
            }, function () {
                reject();
            });
        });
    };
    return ImportExport;
}());
ImportExport = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__filehandeler_service__["a" /* FileHandeler */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_4__database_service__["a" /* Database */], __WEBPACK_IMPORTED_MODULE_5__sim_service__["a" /* SimService */]])
], ImportExport);

//# sourceMappingURL=importexport.service.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Database; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Database = (function () {
    function Database(db) {
        this.db = db;
    }
    Database.prototype.writeToDatabase = function (key, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.database.ref('/' + key).set(data).then(function () {
                resolve();
            }).catch(function (error) {
                reject();
            });
        });
    };
    Database.prototype.getFromDatabase = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.database.ref('/' + key).once('value').then(function (data) {
                resolve(data.val());
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    return Database;
}());
Database = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], Database);

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileHandeler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
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
    FileHandeler.prototype.createEmailFile = function () {
        this.readFile("user", "config").then(function () {
        }).catch(function () {
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
    FileHandeler.prototype.writeFile = function (fileName, data, type, directoryName, isImporting) {
        var _this = this;
        if (typeof isImporting === "undefined") {
            isImporting = false;
        }
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
                if (isImporting) {
                    dataNew = parsedData;
                }
                else {
                    dataNew[parsedData.time] = parsedData;
                }
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

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(432);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_today_today__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_last7_last7__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_yesterday_yesterday__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chart_chart__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tagwise_tagwise__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_importexport_importexport__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tabs_controller_tabs_controller__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_tag_service__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_number_service__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_filehandeler_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_history_history__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_sim__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_file__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_date_picker__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_email_composer__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_importexport_service__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_common_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_sim_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_database_service__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_alert_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_expense_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




































var firebaseConfig = {
    apiKey: "AIzaSyBZHzcC2PPcrtdaNa6kRoPiEfEAo0vQrKc",
    authDomain: "smallexpense.firebaseapp.com",
    databaseURL: "https://smallexpense.firebaseio.com",
    projectId: "smallexpense",
    storageBucket: "smallexpense.appspot.com",
    messagingSenderId: "961696648886"
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
            __WEBPACK_IMPORTED_MODULE_10__pages_chart_chart__["a" /* ChartPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__["a" /* Last30Page */],
            __WEBPACK_IMPORTED_MODULE_8__pages_last7_last7__["a" /* Last7Page */],
            __WEBPACK_IMPORTED_MODULE_11__pages_tagwise_tagwise__["a" /* TagWisePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_importexport_importexport__["a" /* ImportExportPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_26__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_19_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__["a" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__["b" /* AngularFireDatabaseModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_chart_chart__["a" /* ChartPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_tabs_controller_tabs_controller__["a" /* TabsControllerPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_yesterday_yesterday__["a" /* YesterdayPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_last30_last30__["a" /* Last30Page */],
            __WEBPACK_IMPORTED_MODULE_8__pages_last7_last7__["a" /* Last7Page */],
            __WEBPACK_IMPORTED_MODULE_11__pages_tagwise_tagwise__["a" /* TagWisePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_importexport_importexport__["a" /* ImportExportPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_29__services_importexport_service__["a" /* ImportExport */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_14__services_tag_service__["a" /* TagService */],
            __WEBPACK_IMPORTED_MODULE_15__services_number_service__["a" /* NumberService */],
            __WEBPACK_IMPORTED_MODULE_16__services_filehandeler_service__["a" /* FileHandeler */],
            __WEBPACK_IMPORTED_MODULE_30__services_common_service__["a" /* Common */],
            __WEBPACK_IMPORTED_MODULE_32__services_database_service__["a" /* Database */],
            __WEBPACK_IMPORTED_MODULE_34__services_expense_service__["a" /* Expense */],
            __WEBPACK_IMPORTED_MODULE_33__services_alert_service__["a" /* Alert */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Events */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_sim__["a" /* Sim */],
            __WEBPACK_IMPORTED_MODULE_31__services_sim_service__["a" /* SimService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_today_today__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_yesterday_yesterday__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_history_history__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_chart_chart__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_last30_last30__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_last7_last7__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_tagwise_tagwise__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_importexport_importexport__ = __webpack_require__(372);
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
            case 'last7':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pages_last7_last7__["a" /* Last7Page */]);
                break;
            case 'tagwise':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__pages_tagwise_tagwise__["a" /* TagWisePage */]);
                break;
            case 'importexport':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__pages_importexport_importexport__["a" /* ImportExportPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/'<ion-menu [content]="mainContent">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>\n\n                Menu\n\n            </ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content id="side-menu21">\n\n        <button style="display:none" ion-button id="menu-button-close" (click)="closeMenu()" menuClose="left">Close Menu</button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'today\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Today\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'yesterday\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="clock"></ion-icon>\n\n         Yesterday\'s Expenses\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'history\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         History\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'last7\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         Last 7 daily total expense \n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'last30\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         Last 30 daily total expense \n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'tagwise\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="calendar"></ion-icon>\n\n         Tagwise total expense \n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'chart\')" ion-button color="positive" block icon-left>\n\n                Chart\n\n      </button>\n\n        <button class="menuButton" id="menu-button-today" (click)="goToPage(\'importexport\')" ion-button color="positive" block icon-left>\n\n                Import / Export\n\n      </button>\n\n        <button class="menuButton" id="menu-button-settings" (click)="goToPage(\'settings\')" ion-button color="positive" block icon-left>\n\n         <ion-icon name="settings"></ion-icon>\n\n         Settings\n\n      </button>\n\n        <button class="menuButton" id="menu-button4" (click)="goToPage(\'about\')" ion-button color="positive" block>\n\n      About\n\n      </button>\n\n        <button class="menuButton" id="menu-button5" (click)="goToPage(\'aboutme\')" ion-button color="positive" block>\n\n      About Me\n\n      </button>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\sahasrangshu\OTHERS\SmallExpense\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 254,
	"./af.js": 254,
	"./ar": 255,
	"./ar-dz": 256,
	"./ar-dz.js": 256,
	"./ar-kw": 257,
	"./ar-kw.js": 257,
	"./ar-ly": 258,
	"./ar-ly.js": 258,
	"./ar-ma": 259,
	"./ar-ma.js": 259,
	"./ar-sa": 260,
	"./ar-sa.js": 260,
	"./ar-tn": 261,
	"./ar-tn.js": 261,
	"./ar.js": 255,
	"./az": 262,
	"./az.js": 262,
	"./be": 263,
	"./be.js": 263,
	"./bg": 264,
	"./bg.js": 264,
	"./bn": 265,
	"./bn.js": 265,
	"./bo": 266,
	"./bo.js": 266,
	"./br": 267,
	"./br.js": 267,
	"./bs": 268,
	"./bs.js": 268,
	"./ca": 269,
	"./ca.js": 269,
	"./cs": 270,
	"./cs.js": 270,
	"./cv": 271,
	"./cv.js": 271,
	"./cy": 272,
	"./cy.js": 272,
	"./da": 273,
	"./da.js": 273,
	"./de": 274,
	"./de-at": 275,
	"./de-at.js": 275,
	"./de-ch": 276,
	"./de-ch.js": 276,
	"./de.js": 274,
	"./dv": 277,
	"./dv.js": 277,
	"./el": 278,
	"./el.js": 278,
	"./en-au": 279,
	"./en-au.js": 279,
	"./en-ca": 280,
	"./en-ca.js": 280,
	"./en-gb": 281,
	"./en-gb.js": 281,
	"./en-ie": 282,
	"./en-ie.js": 282,
	"./en-nz": 283,
	"./en-nz.js": 283,
	"./eo": 284,
	"./eo.js": 284,
	"./es": 285,
	"./es-do": 286,
	"./es-do.js": 286,
	"./es.js": 285,
	"./et": 287,
	"./et.js": 287,
	"./eu": 288,
	"./eu.js": 288,
	"./fa": 289,
	"./fa.js": 289,
	"./fi": 290,
	"./fi.js": 290,
	"./fo": 291,
	"./fo.js": 291,
	"./fr": 292,
	"./fr-ca": 293,
	"./fr-ca.js": 293,
	"./fr-ch": 294,
	"./fr-ch.js": 294,
	"./fr.js": 292,
	"./fy": 295,
	"./fy.js": 295,
	"./gd": 296,
	"./gd.js": 296,
	"./gl": 297,
	"./gl.js": 297,
	"./gom-latn": 298,
	"./gom-latn.js": 298,
	"./he": 299,
	"./he.js": 299,
	"./hi": 300,
	"./hi.js": 300,
	"./hr": 301,
	"./hr.js": 301,
	"./hu": 302,
	"./hu.js": 302,
	"./hy-am": 303,
	"./hy-am.js": 303,
	"./id": 304,
	"./id.js": 304,
	"./is": 305,
	"./is.js": 305,
	"./it": 306,
	"./it.js": 306,
	"./ja": 307,
	"./ja.js": 307,
	"./jv": 308,
	"./jv.js": 308,
	"./ka": 309,
	"./ka.js": 309,
	"./kk": 310,
	"./kk.js": 310,
	"./km": 311,
	"./km.js": 311,
	"./kn": 312,
	"./kn.js": 312,
	"./ko": 313,
	"./ko.js": 313,
	"./ky": 314,
	"./ky.js": 314,
	"./lb": 315,
	"./lb.js": 315,
	"./lo": 316,
	"./lo.js": 316,
	"./lt": 317,
	"./lt.js": 317,
	"./lv": 318,
	"./lv.js": 318,
	"./me": 319,
	"./me.js": 319,
	"./mi": 320,
	"./mi.js": 320,
	"./mk": 321,
	"./mk.js": 321,
	"./ml": 322,
	"./ml.js": 322,
	"./mr": 323,
	"./mr.js": 323,
	"./ms": 324,
	"./ms-my": 325,
	"./ms-my.js": 325,
	"./ms.js": 324,
	"./my": 326,
	"./my.js": 326,
	"./nb": 327,
	"./nb.js": 327,
	"./ne": 328,
	"./ne.js": 328,
	"./nl": 329,
	"./nl-be": 330,
	"./nl-be.js": 330,
	"./nl.js": 329,
	"./nn": 331,
	"./nn.js": 331,
	"./pa-in": 332,
	"./pa-in.js": 332,
	"./pl": 333,
	"./pl.js": 333,
	"./pt": 334,
	"./pt-br": 335,
	"./pt-br.js": 335,
	"./pt.js": 334,
	"./ro": 336,
	"./ro.js": 336,
	"./ru": 337,
	"./ru.js": 337,
	"./sd": 338,
	"./sd.js": 338,
	"./se": 339,
	"./se.js": 339,
	"./si": 340,
	"./si.js": 340,
	"./sk": 341,
	"./sk.js": 341,
	"./sl": 342,
	"./sl.js": 342,
	"./sq": 343,
	"./sq.js": 343,
	"./sr": 344,
	"./sr-cyrl": 345,
	"./sr-cyrl.js": 345,
	"./sr.js": 344,
	"./ss": 346,
	"./ss.js": 346,
	"./sv": 347,
	"./sv.js": 347,
	"./sw": 348,
	"./sw.js": 348,
	"./ta": 349,
	"./ta.js": 349,
	"./te": 350,
	"./te.js": 350,
	"./tet": 351,
	"./tet.js": 351,
	"./th": 352,
	"./th.js": 352,
	"./tl-ph": 353,
	"./tl-ph.js": 353,
	"./tlh": 354,
	"./tlh.js": 354,
	"./tr": 355,
	"./tr.js": 355,
	"./tzl": 356,
	"./tzl.js": 356,
	"./tzm": 357,
	"./tzm-latn": 358,
	"./tzm-latn.js": 358,
	"./tzm.js": 357,
	"./uk": 359,
	"./uk.js": 359,
	"./ur": 360,
	"./ur.js": 360,
	"./uz": 361,
	"./uz-latn": 362,
	"./uz-latn.js": 362,
	"./uz.js": 361,
	"./vi": 363,
	"./vi.js": 363,
	"./x-pseudo": 364,
	"./x-pseudo.js": 364,
	"./yo": 365,
	"./yo.js": 365,
	"./zh-cn": 366,
	"./zh-cn.js": 366,
	"./zh-hk": 367,
	"./zh-hk.js": 367,
	"./zh-tw": 368,
	"./zh-tw.js": 368
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
webpackContext.id = 513;

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__today_today__ = __webpack_require__(139);
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

},[415]);
//# sourceMappingURL=main.js.map
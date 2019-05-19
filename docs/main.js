(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n  <header class=\"header header-6\">\n  </header>\n  <nav class=\"subnav\">\n    <button (click)=\"debug()\">Debug</button>\n    <button (click)=\"addNode(SynthNode)\">Add Synth</button>\n    <div class=\"btn-group btn-primary\">\n      <button *ngFor=\"let name of nodeNames\" (click)=\"addNode(name)\">\n        {{name}}\n      </button>\n    </div>\n  </nav>\n  <div class=\"content-container\">\n    <div class=\"content-area\">\n    <app-keyboard [onTrigger]=\"triggerSynth\"></app-keyboard>\n    <div class=\"graph-container\">\n      <app-graph-node\n        *ngFor=\"let graphNode of graphNodes\"\n        [graphNode]=\"graphNode\"\n        [makeConnectionFrom]=\"makeConnectionFrom\"\n        [makeConnectionTo]=\"makeConnectionTo\"\n        cdkDrag>\n      </app-graph-node>\n      <app-graph-connections [connections]=\"connections\"></app-graph-connections>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".graph-container {\n  display: flex; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RpYm9yL1Byb2plY3RzL3ZpcnR1YXcvdmlydHVhdy13ZWIvc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JhcGgtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _midiNodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./midiNodes */ "./src/app/midiNodes.ts");



var keyboard = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["KeyboardNode"]();
var simpleSynth = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["SynthNode"]('Simple Synth');
var major = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["HarmonizeNode"]([0, 4, 7], 'Harmonize Major');
var minor = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["HarmonizeNode"]([0, 3, 7], 'Harmonize Minor');
var lydian = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["HarmonizeNode"]([0, 3, 7, 13], 'Minor 13th');
var arpeggiator = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["ArpeggiatorNode"](100, 5);
var envelope = new _midiNodes__WEBPACK_IMPORTED_MODULE_2__["EnvelopeNode"]();
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'virtuaw-web';
        this.graphNodes = [keyboard, major, minor, envelope, arpeggiator, simpleSynth];
        this.inputSlot = null;
        this.outputSlot = null;
        this.availableNodes = {
            Keyboard: _midiNodes__WEBPACK_IMPORTED_MODULE_2__["KeyboardNode"],
            'Simple Synth': _midiNodes__WEBPACK_IMPORTED_MODULE_2__["SynthNode"],
            Harmonize: _midiNodes__WEBPACK_IMPORTED_MODULE_2__["HarmonizeNode"],
            Arpeggiator: _midiNodes__WEBPACK_IMPORTED_MODULE_2__["ArpeggiatorNode"],
            Envelope: _midiNodes__WEBPACK_IMPORTED_MODULE_2__["EnvelopeNode"]
        };
        this.triggerSynth = function (value, active) { return keyboard.onTrigger(value, active); };
    }
    Object.defineProperty(AppComponent.prototype, "connections", {
        get: function () {
            return this.graphNodes.reduce(function (connections, node) {
                return [].concat(connections.concat.apply(connections, node.connections));
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "nodeNames", {
        get: function () {
            return Object.keys(this.availableNodes);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.addNode = function (name) {
        var node = new this.availableNodes[name]();
        this.graphNodes.push(node);
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/fesm5/clr-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _keyboard_keyboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyboard/keyboard.component */ "./src/app/keyboard/keyboard.component.ts");
/* harmony import */ var _graph_node_graph_node_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graph-node/graph-node.component */ "./src/app/graph-node/graph-node.component.ts");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var _graph_node_socket_socket_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./graph-node/socket/socket.component */ "./src/app/graph-node/socket/socket.component.ts");
/* harmony import */ var _graph_connections_graph_connections_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./graph-connections/graph-connections.component */ "./src/app/graph-connections/graph-connections.component.ts");
/* harmony import */ var _graph_connections_cable_cable_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./graph-connections/cable/cable.component */ "./src/app/graph-connections/cable/cable.component.ts");












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _keyboard_keyboard_component__WEBPACK_IMPORTED_MODULE_6__["KeyboardComponent"],
                _graph_node_graph_node_component__WEBPACK_IMPORTED_MODULE_7__["GraphNodeComponent"],
                _graph_node_socket_socket_component__WEBPACK_IMPORTED_MODULE_9__["SocketComponent"],
                _graph_connections_graph_connections_component__WEBPACK_IMPORTED_MODULE_10__["GraphConnectionsComponent"],
                _graph_connections_cable_cable_component__WEBPACK_IMPORTED_MODULE_11__["CableComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DragDropModule"],
                _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/graph-connections/cable/cable.component.html":
/*!**************************************************************!*\
  !*** ./src/app/graph-connections/cable/cable.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg:g>\n  <svg:path [attr.d]=\"pathString\" stroke=\"black\" fill=\"transparent\" stroke-width=\"3\" />\n</svg:g>\n"

/***/ }),

/***/ "./src/app/graph-connections/cable/cable.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/graph-connections/cable/cable.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dyYXBoLWNvbm5lY3Rpb25zL2NhYmxlL2NhYmxlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/graph-connections/cable/cable.component.ts":
/*!************************************************************!*\
  !*** ./src/app/graph-connections/cable/cable.component.ts ***!
  \************************************************************/
/*! exports provided: CableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CableComponent", function() { return CableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CableComponent = /** @class */ (function () {
    function CableComponent() {
        this.elasticity = 0.2;
    }
    Object.defineProperty(CableComponent.prototype, "qPos", {
        get: function () {
            var _a = this.startPos, sX = _a.x, sY = _a.y;
            var _b = this.endPos, eX = _b.x, eY = _b.y;
            var length = Math.sqrt(Math.pow((sX - eX), 2) + Math.pow((sY - eY), 2));
            var sag = length * this.elasticity;
            var center = {
                x: (sX + eX) / 2,
                y: (sY + eY) / 2
            };
            return { x: center.x, y: center.y + sag };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CableComponent.prototype, "pathString", {
        get: function () {
            var _a = this.startPos, sX = _a.x, sY = _a.y;
            var _b = this.endPos, eX = _b.x, eY = _b.y;
            var _c = this.qPos, qX = _c.x, qY = _c.y;
            return "M" + sX + " " + sY + " Q " + qX + " " + qY + " " + eX + " " + eY;
        },
        enumerable: true,
        configurable: true
    });
    CableComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CableComponent.prototype, "startPos", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CableComponent.prototype, "endPos", void 0);
    CableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: '[app-cable]',
            template: __webpack_require__(/*! ./cable.component.html */ "./src/app/graph-connections/cable/cable.component.html"),
            styles: [__webpack_require__(/*! ./cable.component.scss */ "./src/app/graph-connections/cable/cable.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CableComponent);
    return CableComponent;
}());



/***/ }),

/***/ "./src/app/graph-connections/graph-connections.component.html":
/*!********************************************************************!*\
  !*** ./src/app/graph-connections/graph-connections.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg width=\"100%\" height=\"100%\" [attr.viewBox]=\"viewBox\">\n  <svg:g app-cable *ngIf=\"service.isConnecting\" [startPos]=\"startPos\" [endPos]=\"mousePos\" />\n  <svg:g app-cable *ngFor=\"let conn of connections\" [startPos]=\"getOutput(conn)\" [endPos]=\"getInput(conn)\" />\n</svg>\n"

/***/ }),

/***/ "./src/app/graph-connections/graph-connections.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/graph-connections/graph-connections.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  pointer-events: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RpYm9yL1Byb2plY3RzL3ZpcnR1YXcvdmlydHVhdy13ZWIvc3JjL2FwcC9ncmFwaC1jb25uZWN0aW9ucy9ncmFwaC1jb25uZWN0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtFQUNOLFlBQVk7RUFDWixhQUFhO0VBQ2Isb0JBQW9CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ncmFwaC1jb25uZWN0aW9ucy9ncmFwaC1jb25uZWN0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/graph-connections/graph-connections.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/graph-connections/graph-connections.component.ts ***!
  \******************************************************************/
/*! exports provided: GraphConnectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphConnectionsComponent", function() { return GraphConnectionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_connector_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket-connector.service */ "./src/app/socket-connector.service.ts");



var GraphConnectionsComponent = /** @class */ (function () {
    function GraphConnectionsComponent(service) {
        this.service = service;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.service.connections = this.connections;
    }
    Object.defineProperty(GraphConnectionsComponent.prototype, "viewBox", {
        get: function () {
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            return "0 0 " + w + " " + h;
        },
        enumerable: true,
        configurable: true
    });
    GraphConnectionsComponent.prototype.onMouseMove = function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        this.mousePos.x = clientX;
        this.mousePos.y = clientY;
    };
    Object.defineProperty(GraphConnectionsComponent.prototype, "startPos", {
        get: function () {
            var _a = this.service.startElement.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
            return { x: left + width / 2, y: top + width / 2 };
        },
        enumerable: true,
        configurable: true
    });
    GraphConnectionsComponent.prototype.getOutput = function (connection) {
        var _a = document.querySelector("#output_" + connection.from.id).getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
        return { x: left + width / 2, y: top + width / 2 };
    };
    GraphConnectionsComponent.prototype.getInput = function (connection) {
        var _a = document.querySelector("#input_" + connection.to.id).getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
        return { x: left + width / 2, y: top + width / 2 };
    };
    GraphConnectionsComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GraphConnectionsComponent.prototype, "connections", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:mousemove', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], GraphConnectionsComponent.prototype, "onMouseMove", null);
    GraphConnectionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-graph-connections',
            template: __webpack_require__(/*! ./graph-connections.component.html */ "./src/app/graph-connections/graph-connections.component.html"),
            styles: [__webpack_require__(/*! ./graph-connections.component.scss */ "./src/app/graph-connections/graph-connections.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_socket_connector_service__WEBPACK_IMPORTED_MODULE_2__["SocketConnectorService"]])
    ], GraphConnectionsComponent);
    return GraphConnectionsComponent;
}());



/***/ }),

/***/ "./src/app/graph-node/graph-node.component.html":
/*!******************************************************!*\
  !*** ./src/app/graph-node/graph-node.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    {{graphNode.title}}\n  </div>\n  <div class=\"card-block\">\n\n    <div class=\"interface inputs\">\n      <div class=\"card-title\">Inputs</div>\n      <app-socket\n        *ngFor=\"let input of graphNode.inputs\"\n        class=\"input\" [socket]=\"input\"\n        ></app-socket>\n    </div>\n\n    <div class=\"interface outputs\">\n      <div class=\"card-title\">Outputs</div>\n      <app-socket\n        *ngFor=\"let output of graphNode.outputs\"\n        class=\"output\" [socket]=\"output\"\n        ></app-socket>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/graph-node/graph-node.component.scss":
/*!******************************************************!*\
  !*** ./src/app/graph-node/graph-node.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  margin: 0 30px;\n  width: 280px;\n  height: 300px;\n  flex: 0; }\n  .card .card-block {\n    display: flex;\n    justify-content: space-between; }\n  .card .card-block .interface {\n      display: flex;\n      flex-direction: column;\n      flex: 1;\n      align-content: end; }\n  .card .card-block .interface.outputs {\n        text-align: right;\n        float: right; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RpYm9yL1Byb2plY3RzL3ZpcnR1YXcvdmlydHVhdy13ZWIvc3JjL2FwcC9ncmFwaC1ub2RlL2dyYXBoLW5vZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGFBQWE7RUFDYixPQUFPLEVBQUE7RUFKVDtJQU9JLGFBQWE7SUFDYiw4QkFBOEIsRUFBQTtFQVJsQztNQVdNLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsT0FBTztNQUNQLGtCQUFrQixFQUFBO0VBZHhCO1FBaUJRLGlCQUFpQjtRQUNqQixZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ncmFwaC1ub2RlL2dyYXBoLW5vZGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZCB7XG4gIG1hcmdpbjogMCAzMHB4O1xuICB3aWR0aDogMjgwcHg7XG4gIGhlaWdodDogMzAwcHg7XG4gIGZsZXg6IDA7XG5cbiAgLmNhcmQtYmxvY2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG4gICAgLmludGVyZmFjZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBhbGlnbi1jb250ZW50OiBlbmQ7XG5cbiAgICAgICYub3V0cHV0cyB7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/graph-node/graph-node.component.ts":
/*!****************************************************!*\
  !*** ./src/app/graph-node/graph-node.component.ts ***!
  \****************************************************/
/*! exports provided: GraphNodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphNodeComponent", function() { return GraphNodeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var GraphNodeComponent = /** @class */ (function () {
    function GraphNodeComponent() {
    }
    GraphNodeComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GraphNodeComponent.prototype, "graphNode", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GraphNodeComponent.prototype, "makeConnectionTo", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GraphNodeComponent.prototype, "makeConnectionFrom", void 0);
    GraphNodeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-graph-node',
            template: __webpack_require__(/*! ./graph-node.component.html */ "./src/app/graph-node/graph-node.component.html"),
            styles: [__webpack_require__(/*! ./graph-node.component.scss */ "./src/app/graph-node/graph-node.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], GraphNodeComponent);
    return GraphNodeComponent;
}());



/***/ }),

/***/ "./src/app/graph-node/socket/socket.component.html":
/*!*********************************************************!*\
  !*** ./src/app/graph-node/socket/socket.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"socket\"\n     [attr.id]=\"socket.socketType+'_'+socket.id\"\n     [attr.title]=\"socket.title\"\n     (mousedown)=\"onMousedown($event)\"\n     (click)=\"onClick($event)\">\n</div>\n<input *ngIf=\"socket.allowInput\" (keyup)=\"onKey($event)\" placeholder=\"My input\" name=\"input\" [(ngModel)]=\"socket.value\" />\n<span class=\"socket-title\">{{socket.title}}</span>\n"

/***/ }),

/***/ "./src/app/graph-node/socket/socket.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/graph-node/socket/socket.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  padding: none;\n  position: flex;\n  align-items: flex-start;\n  justify-items: center; }\n  :host .socket {\n    position: absolute;\n    margin-top: 4px;\n    width: 18px;\n    height: 18px;\n    cursor: pointer;\n    border-radius: 50%;\n    background-color: #8080a4;\n    box-shadow: inset 0 0 4px #000;\n    -webkit-filter: none;\n            filter: none;\n    transition: all 0.2s ease; }\n  :host .socket:hover {\n    -webkit-filter: drop-shadow(0 0 2px rgba(164, 164, 178, 0.8)) drop-shadow(0 0 4px rgba(128, 128, 200, 0.2)) drop-shadow(0 0 24px rgba(128, 128, 226, 0.2));\n            filter: drop-shadow(0 0 2px rgba(164, 164, 178, 0.8)) drop-shadow(0 0 4px rgba(128, 128, 200, 0.2)) drop-shadow(0 0 24px rgba(128, 128, 226, 0.2));\n    background-color: #c8c8e4;\n    box-shadow: inset 0 0 8px rgba(164, 164, 226, 0.6); }\n  :host .socket-title {\n    font-size: 10px;\n    display: inline-block; }\n  :host input {\n    font-size: 10px;\n    margin-left: 12px;\n    background-color: #DDDDDD;\n    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.6);\n    border: none;\n    color: #333333;\n    height: 18px;\n    width: 50px;\n    transition: all 0.2s ease;\n    padding: 4px; }\n  :host input:hover, :host input:focus, :host input:active {\n    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.6);\n    background-color: #EEEEEE; }\n  :host input:focus, :host input:active {\n    background-color: #FFFFFF; }\n  :host.input {\n    align-items: flex-end; }\n  :host.input .socket {\n      left: 5px; }\n  :host.input .socket-title {\n      margin-left: 12px; }\n  :host.output .socket {\n    right: 5px; }\n  :host.output .socket-title {\n    margin-right: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RpYm9yL1Byb2plY3RzL3ZpcnR1YXcvdmlydHVhdy13ZWIvc3JjL2FwcC9ncmFwaC1ub2RlL3NvY2tldC9zb2NrZXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixxQkFBcUIsRUFBQTtFQUp2QjtJQU9JLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLHlCQUFrQztJQUNsQyw4QkFBOEI7SUFDOUIsb0JBQVk7WUFBWixZQUFZO0lBQ1oseUJBQXlCLEVBQUE7RUFoQjdCO0lBb0JJLDBKQUdnRDtZQUhoRCxrSkFHZ0Q7SUFDaEQseUJBQW9DO0lBQ3BDLGtEQUFrRCxFQUFBO0VBekJ0RDtJQTZCSSxlQUFlO0lBQ2YscUJBQXFCLEVBQUE7RUE5QnpCO0lBaUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGdEQUE2QztJQUM3QyxZQUFZO0lBQ1osY0FBYztJQUNkLFlBQVk7SUFDWixXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLFlBQVksRUFBQTtFQTFDaEI7SUE4Q0ksZ0RBQTZDO0lBQzdDLHlCQUF5QixFQUFBO0VBL0M3QjtJQW1ESSx5QkFBeUIsRUFBQTtFQW5EN0I7SUF1REkscUJBQXFCLEVBQUE7RUF2RHpCO01BeURNLFNBQVMsRUFBQTtFQXpEZjtNQTRETSxpQkFBaUIsRUFBQTtFQTVEdkI7SUFpRU0sVUFBVSxFQUFBO0VBakVoQjtJQW9FTSxrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2dyYXBoLW5vZGUvc29ja2V0L3NvY2tldC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgcGFkZGluZzogbm9uZTtcbiAgcG9zaXRpb246IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG5cbiAgLnNvY2tldCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTI4LDEyOCwxNjQpO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA0cHggIzAwMDtcbiAgICBmaWx0ZXI6IG5vbmU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgfVxuXG4gIC5zb2NrZXQ6aG92ZXIge1xuICAgIGZpbHRlcjpcbiAgICAgIGRyb3Atc2hhZG93KDAgMCAycHggcmdiYSgxNjQsIDE2NCwgMTc4LCAwLjgpKVxuICAgICAgZHJvcC1zaGFkb3coMCAwIDRweCByZ2JhKDEyOCwgMTI4LCAyMDAsIDAuMikpXG4gICAgICBkcm9wLXNoYWRvdygwIDAgMjRweCByZ2JhKDEyOCwgMTI4LCAyMjYsIDAuMikpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMDAsIDIwMCwgMjI4KTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgOHB4IHJnYmEoMTY0LCAxNjQsIDIyNiwgMC42KTtcbiAgfVxuXG4gIC5zb2NrZXQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbiAgaW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREREREREO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNHB4IHJnYmEoMCwwLDAsMC42KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6ICMzMzMzMzM7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgcGFkZGluZzogNHB4O1xuICB9XG5cbiAgaW5wdXQ6aG92ZXIsIGlucHV0OmZvY3VzLCBpbnB1dDphY3RpdmUge1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMnB4IHJnYmEoMCwwLDAsMC42KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFO1xuICB9XG5cbiAgaW5wdXQ6Zm9jdXMsIGlucHV0OmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgfVxuXG4gICYuaW5wdXQge1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAuc29ja2V0IHtcbiAgICAgIGxlZnQ6IDVweDtcbiAgICB9XG4gICAgLnNvY2tldC10aXRsZSB7XG4gICAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICB9XG4gIH1cbiAgJi5vdXRwdXQge1xuICAgIC5zb2NrZXQge1xuICAgICAgcmlnaHQ6IDVweDtcbiAgICB9XG4gICAgLnNvY2tldC10aXRsZSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgfVxuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/graph-node/socket/socket.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/graph-node/socket/socket.component.ts ***!
  \*******************************************************/
/*! exports provided: SocketComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketComponent", function() { return SocketComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_connector_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket-connector.service */ "./src/app/socket-connector.service.ts");



var SocketComponent = /** @class */ (function () {
    function SocketComponent(service, elementRef) {
        this.service = service;
        this.elementRef = elementRef;
        this.isConnecting = false;
    }
    SocketComponent.prototype.onClick = function (event) {
        console.log(event);
        event.stopPropagation();
        this.socket.disconnect();
    };
    SocketComponent.prototype.onMousedown = function (event) {
        event.stopPropagation();
        this.service.startConnection(this.socket, event.target);
    };
    SocketComponent.prototype.onKey = function (event) {
        this.socket.setValue(event.target.value, true);
    };
    SocketComponent.prototype.onMouseup = function (event) {
        this.service.attemptConnection(this.socket);
        event.preventDefault();
        event.stopPropagation();
    };
    SocketComponent.prototype.documentMouseUp = function (event) {
        this.service.cleanup();
        event.preventDefault();
        event.stopPropagation();
    };
    SocketComponent.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.elementRef.nativeElement;
        this.position = {
            x: element.offsetLeft + element.offsetWidth / 2,
            y: element.offsetTop + element.offsetTop / 2
        };
        if (this.socket.constructor.name === 'InputNode') {
            this.service.connections.find(function (connection) { return connection === _this.socket.connection; }).endPos = this.position;
        }
        if (this.socket.connections) {
            this.socket.connections
                .map(function (socketConnection) { return _this.service.connections.find(function (connection) { return connection === socketConnection; }).startPos = _this.position; });
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SocketComponent.prototype, "socket", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mouseup', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], SocketComponent.prototype, "onMouseup", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:mouseup', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], SocketComponent.prototype, "documentMouseUp", null);
    SocketComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-socket',
            template: __webpack_require__(/*! ./socket.component.html */ "./src/app/graph-node/socket/socket.component.html"),
            styles: [__webpack_require__(/*! ./socket.component.scss */ "./src/app/graph-node/socket/socket.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_socket_connector_service__WEBPACK_IMPORTED_MODULE_2__["SocketConnectorService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], SocketComponent);
    return SocketComponent;
}());



/***/ }),

/***/ "./src/app/graphNodes.ts":
/*!*******************************!*\
  !*** ./src/app/graphNodes.ts ***!
  \*******************************/
/*! exports provided: NodeInput, NodeOutput, NodeConnection, BaseNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeInput", function() { return NodeInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeOutput", function() { return NodeOutput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeConnection", function() { return NodeConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseNode", function() { return BaseNode; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var NodeInput = /** @class */ (function () {
    function NodeInput(title, node, updateOutputs, defaultValue, allowInput) {
        if (title === void 0) { title = 'Input'; }
        if (defaultValue === void 0) { defaultValue = null; }
        if (allowInput === void 0) { allowInput = false; }
        this.title = title;
        this.node = node;
        this.updateOutputs = updateOutputs;
        this.defaultValue = defaultValue;
        this.allowInput = allowInput;
        this.socketType = 'input';
        this.connections = [];
        this.id = Math.random().toString(36).substr(2, 9);
        this.value = defaultValue;
    }
    NodeInput.prototype.setValue = function (value, active) {
        this.value = value;
        this.active = active;
        if (this.value && active) {
            this.updateOutputs(this);
        }
    };
    NodeInput.prototype.disconnect = function () {
        var _this = this;
        this.connections.map(function (conn) {
            _this.node.onDisconnect(conn);
            conn.from.disconnectInput(_this);
        });
        this.connections = [];
    };
    return NodeInput;
}());

var NodeOutput = /** @class */ (function () {
    function NodeOutput(title, node, processInputs) {
        if (title === void 0) { title = 'Output'; }
        if (processInputs === void 0) { processInputs = function () { return null; }; }
        this.title = title;
        this.node = node;
        this.processInputs = processInputs;
        this.socketType = 'output';
        this.connections = [];
        this.id = Math.random().toString(36).substr(2, 9);
    }
    NodeOutput.prototype.connectTo = function (target) {
        var connection = new NodeConnection(this, target);
        this.connections.push(connection);
        target.connections.push(connection);
        this.node.onConnect(this);
        target.node.onConnect(this);
        return this;
    };
    NodeOutput.prototype.trigger = function (value, active) {
        this.connections.map(function (conn) { return conn.to.setValue(value, active); });
    };
    NodeOutput.prototype.disconnect = function () {
        this.connections.map(function (conn) { return conn.to.disconnect(); });
    };
    NodeOutput.prototype.disconnectInput = function (input) {
        this.node.onDisconnect(input);
        this.connections = this.connections.filter(function (conn) { return conn.to !== input; });
    };
    return NodeOutput;
}());

var NodeConnection = /** @class */ (function () {
    function NodeConnection(from, to) {
        this.from = from;
        this.to = to;
    }
    return NodeConnection;
}());

/**
 * Node base class
 *
 * @param title: The Node's display title.
 */
var BaseNode = /** @class */ (function () {
    function BaseNode() {
        this.inputs = [];
        this.outputs = [];
    }
    BaseNode.prototype.processInputs = function () {
        var values = this.inputs.map(function (input) { return input.value; });
        return this.handleInputValues(values);
    };
    BaseNode.prototype.handleInputValues = function (values) {
        return values;
    };
    Object.defineProperty(BaseNode.prototype, "connections", {
        get: function () {
            var inputConnections = this.inputs.filter(function (input) { return input.connection; }).map(function (input) { return input.connection; });
            var outputConnections = this.outputs.reduce(function (connections, output) {
                return connections.concat(output.connections);
            }, []);
            return inputConnections.concat(outputConnections);
        },
        enumerable: true,
        configurable: true
    });
    BaseNode.prototype.updateOutputs = function (input) {
        var _this = this;
        this.outputs.map(function (output) {
            var value = output.processInputs(_this.inputs);
            output.trigger(value, true);
        });
        this.onUpdate();
    };
    BaseNode.prototype.onUpdate = function () {
        return;
    };
    BaseNode.prototype.addInput = function (_a) {
        var node = _a.node, _b = _a.updateOutputs, updateOutputs = _b === void 0 ? this.updateOutputs.bind(this) : _b, _c = _a.title, title = _c === void 0 ? 'Input' : _c, _d = _a.defaultValue, defaultValue = _d === void 0 ? null : _d, _e = _a.allowInput, allowInput = _e === void 0 ? false : _e;
        this.inputs.push(new NodeInput(title, node, updateOutputs, defaultValue, allowInput));
    };
    BaseNode.prototype.addOutput = function (_a) {
        var node = _a.node, _b = _a.processInputs, processInputs = _b === void 0 ? this.processInputs.bind(this) : _b, _c = _a.title, title = _c === void 0 ? 'Output' : _c;
        this.outputs.push(new NodeOutput(title, node, processInputs));
    };
    BaseNode.prototype.onConnect = function (socket) {
        return;
    };
    BaseNode.prototype.onDisconnect = function (socket) {
        return;
    };
    return BaseNode;
}());

var ConstNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ConstNode, _super);
    function ConstNode(title, outputCount) {
        if (title === void 0) { title = 'Constant'; }
        if (outputCount === void 0) { outputCount = 1; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.outputCount = outputCount;
        Array.from(new Array(_this.outputCount)).map(function (_) { return _this.addOutput({
            node: _this, processInputs: _this.processInputs.bind(_this)
        }); });
        return _this;
    }
    return ConstNode;
}(BaseNode));


/***/ }),

/***/ "./src/app/keyboard/keyboard.component.html":
/*!**************************************************!*\
  !*** ./src/app/keyboard/keyboard.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let note of notes\"\n  class=\"key\"\n  [ngClass]=\"classNames(note)\"\n  [attr.data-note]=\"'' + note\"\n  (mousedown)=\"onMousedown(note, $event)\"\n  (mouseleave)=\"onMouseleave(note, $event)\"\n  (mouseenter)=\"onMouseenter(note, $event)\"\n>\n</div>\n"

/***/ }),

/***/ "./src/app/keyboard/keyboard.component.scss":
/*!**************************************************!*\
  !*** ./src/app/keyboard/keyboard.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: flex;\n  height: 100px;\n  position: relative; }\n  :host .key {\n    border-radius: 2px;\n    background: var(--bg-color);\n    -webkit-filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5));\n            filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5));\n    box-shadow: inset 0px 0px 0px -2px rgba(0, 0, 0, 0);\n    transition: all 0.15s ease-out; }\n  :host .key.black {\n      width: 20px;\n      margin-bottom: 20px;\n      margin-left: -10px;\n      margin-right: -10px;\n      z-index: 1;\n      --bg-color: #222222;\n      --bg-color-hover: #444444; }\n  :host .key.white {\n      width: 28px;\n      bottom: 0;\n      z-index: 0;\n      --bg-color: #CCCCCC;\n      --bg-color-hover: #DDDDDD; }\n  :host .key:hover {\n      background-color: var(--bg-color-hover); }\n  :host .key:focus, :host .key:active, :host .key.active {\n      background-color: #ABEEAA;\n      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);\n      -webkit-filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0px 0px 2px rgba(200, 255, 200, 0.8)) drop-shadow(0px 0px 10px rgba(200, 255, 200, 0.8)) drop-shadow(0px 0px 20px rgba(200, 255, 200, 0.6)) blur(0.2px);\n              filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0px 0px 2px rgba(200, 255, 200, 0.8)) drop-shadow(0px 0px 10px rgba(200, 255, 200, 0.8)) drop-shadow(0px 0px 20px rgba(200, 255, 200, 0.6)) blur(0.2px); }\n  :host .key:focus.white, :host .key:active.white, :host .key.active.white {\n        box-shadow: inset 0px 0px 4px -2px rgba(0, 0, 0, 0.5); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RpYm9yL1Byb2plY3RzL3ZpcnR1YXcvdmlydHVhdy13ZWIvc3JjL2FwcC9rZXlib2FyZC9rZXlib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBRWIsa0JBQWtCLEVBQUE7RUFKcEI7SUEyQ0ksa0JBQWtCO0lBQ2xCLDJCQUEyQjtJQUMzQiwyREFBZ0Q7WUFBaEQsbURBQWdEO0lBQ2hELG1EQUFrRDtJQUNsRCw4QkFBOEIsRUFBQTtFQS9DbEM7TUFPTSxXQUFXO01BQ1gsbUJBQW1CO01BQ25CLGtCQUFrQjtNQUNsQixtQkFBbUI7TUFDbkIsVUFBVTtNQUVWLG1CQUFXO01BQ1gseUJBQWlCLEVBQUE7RUFkdkI7TUFpQk0sV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BRVYsbUJBQVc7TUFDWCx5QkFBaUIsRUFBQTtFQXRCdkI7TUEwQk0sdUNBQXVDLEVBQUE7RUExQjdDO01BOEJNLHlCQUF5QjtNQUN6QiwwQ0FBdUM7TUFDdkMsK05BSW1CO2NBSm5CLHVOQUltQixFQUFBO0VBcEN6QjtRQXVDUSxxREFBa0QsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2tleWJvYXJkL2tleWJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMHB4O1xuXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLmtleSB7XG4gICAgJi5ibGFjayB7XG4gICAgICB3aWR0aDogMjBweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICBtYXJnaW4tbGVmdDogLTEwcHg7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xuICAgICAgei1pbmRleDogMTtcblxuICAgICAgLS1iZy1jb2xvcjogIzIyMjIyMjtcbiAgICAgIC0tYmctY29sb3ItaG92ZXI6ICM0NDQ0NDQ7XG4gICAgfVxuICAgICYud2hpdGUge1xuICAgICAgd2lkdGg6IDI4cHg7XG4gICAgICBib3R0b206IDA7XG4gICAgICB6LWluZGV4OiAwO1xuXG4gICAgICAtLWJnLWNvbG9yOiAjQ0NDQ0NDO1xuICAgICAgLS1iZy1jb2xvci1ob3ZlcjogI0RERERERDtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNvbG9yLWhvdmVyKTtcbiAgICB9XG5cbiAgICAmOmZvY3VzLCAmOmFjdGl2ZSwgJi5hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0FCRUVBQTtcbiAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMnB4IHJnYmEoMCwwLDAsMC4yKTtcbiAgICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjUpKVxuICAgICAgICAgICAgICBkcm9wLXNoYWRvdygwcHggMHB4IDJweCByZ2JhKDIwMCwyNTYsMjAwLDAuOCkpXG4gICAgICAgICAgICAgIGRyb3Atc2hhZG93KDBweCAwcHggMTBweCByZ2JhKDIwMCwyNTYsMjAwLDAuOCkpXG4gICAgICAgICAgICAgIGRyb3Atc2hhZG93KDBweCAwcHggMjBweCByZ2JhKDIwMCwyNTYsMjAwLDAuNikpXG4gICAgICAgICAgICAgIGJsdXIoMC4ycHgpO1xuXG4gICAgICAmLndoaXRlIHtcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA0cHggLTJweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLWNvbG9yKTtcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDRweCA0cHggNHB4IHJnYmEoMCwwLDAsMC41KSk7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAwcHggLTJweCByZ2JhKDAsMCwwLDAuMCk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2Utb3V0O1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/keyboard/keyboard.component.ts":
/*!************************************************!*\
  !*** ./src/app/keyboard/keyboard.component.ts ***!
  \************************************************/
/*! exports provided: KeyboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardComponent", function() { return KeyboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var KeyboardComponent = /** @class */ (function () {
    function KeyboardComponent() {
        /**
         * MIDI value of start note, default is 36 (C2)
         */
        this.startNote = 24;
        /**
         * MIDI value of end note, default is 36 (C5)
         */
        this.endNote = 112;
        /**
         * Trigger function
         */
        this.onTrigger = function (value, active) { return null; };
        /**
         * Currently active notes
         */
        this.activeNotes = new Set();
    }
    Object.defineProperty(KeyboardComponent.prototype, "notes", {
        /**
         * Array of 36 MIDI notes from start to end note (default C2 to C5)
         */
        get: function () {
            var _a = this, startNote = _a.startNote, endNote = _a.endNote;
            var range = endNote - startNote;
            return Array.from(Array(range)).map(function (_, note) { return note + startNote; });
        },
        enumerable: true,
        configurable: true
    });
    KeyboardComponent.prototype.onMousedown = function (note, event) {
        this.trigger(note, true, event);
        event.preventDefault();
        event.stopPropagation();
    };
    KeyboardComponent.prototype.onMouseleave = function (note, event) {
        this.trigger(note, false, event);
    };
    KeyboardComponent.prototype.onMouseenter = function (note, event) {
        if (event.buttons === 1) {
            this.trigger(note, true, event);
        }
    };
    KeyboardComponent.prototype.onMouseup = function (event) {
        var _this = this;
        this.activeNotes.forEach(function (value) { return _this.trigger(value, false, event); });
    };
    /**
     * Event callback
     */
    KeyboardComponent.prototype.trigger = function (value, active, event) {
        if (active) {
            this.onTrigger(value, active);
            this.activeNotes.add(value);
        }
        else {
            this.activeNotes.delete(value);
        }
    };
    /**
     * Returns key type based on MIDI base note.
     */
    KeyboardComponent.prototype.keyType = function (note) {
        var blackNotes = [1, 3, 6, 8, 10];
        return blackNotes.includes(note % 12) ? 'black' : 'white';
    };
    KeyboardComponent.prototype.classNames = function (note) {
        return this.keyType(note) + (this.activeNotes.has(note) ? ' active' : '');
    };
    KeyboardComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], KeyboardComponent.prototype, "startNote", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], KeyboardComponent.prototype, "endNote", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], KeyboardComponent.prototype, "onTrigger", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:mouseup', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], KeyboardComponent.prototype, "onMouseup", null);
    KeyboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-keyboard',
            template: __webpack_require__(/*! ./keyboard.component.html */ "./src/app/keyboard/keyboard.component.html"),
            styles: [__webpack_require__(/*! ./keyboard.component.scss */ "./src/app/keyboard/keyboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], KeyboardComponent);
    return KeyboardComponent;
}());



/***/ }),

/***/ "./src/app/midiNodes.ts":
/*!******************************!*\
  !*** ./src/app/midiNodes.ts ***!
  \******************************/
/*! exports provided: MidiNode, HarmonizeNode, AddIntervalsNode, ArpeggiatorNode, SynthNode, KeyboardNode, EnvelopeNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MidiNode", function() { return MidiNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HarmonizeNode", function() { return HarmonizeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddIntervalsNode", function() { return AddIntervalsNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArpeggiatorNode", function() { return ArpeggiatorNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SynthNode", function() { return SynthNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardNode", function() { return KeyboardNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvelopeNode", function() { return EnvelopeNode; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphNodes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphNodes */ "./src/app/graphNodes.ts");
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tone */ "./node_modules/tone/build/Tone.js");
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tone__WEBPACK_IMPORTED_MODULE_2__);



var MidiNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MidiNode, _super);
    function MidiNode(title) {
        if (title === void 0) { title = 'Node'; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.addInput({
            node: _this,
            updateOutputs: _this.updateOutputs.bind(_this),
            title: 'Input Notes'
        });
        _this.addOutput({
            node: _this,
            processInputs: _this.processInputs.bind(_this),
            title: 'Output Notes'
        });
        return _this;
    }
    MidiNode.prototype.addInput = function (_a) {
        var node = _a.node, _b = _a.updateOutputs, updateOutputs = _b === void 0 ? this.updateOutputs.bind(this) : _b, _c = _a.title, title = _c === void 0 ? 'Input Notes' : _c, _d = _a.defaultValue, defaultValue = _d === void 0 ? null : _d, _e = _a.allowInput, allowInput = _e === void 0 ? false : _e;
        this.inputs.push(new _graphNodes__WEBPACK_IMPORTED_MODULE_1__["NodeInput"](title, node, updateOutputs, defaultValue, allowInput));
    };
    MidiNode.prototype.addOutput = function (_a) {
        var node = _a.node, _b = _a.processInputs, processInputs = _b === void 0 ? this.processInputs.bind(this) : _b, _c = _a.title, title = _c === void 0 ? 'Output Notes' : _c;
        this.outputs.push(new _graphNodes__WEBPACK_IMPORTED_MODULE_1__["NodeOutput"](title, node, processInputs));
    };
    MidiNode.prototype.handleInputValues = function (values) {
        console.log('handling');
        var notes = values[0];
        return this.processAllNotes(notes);
    };
    MidiNode.prototype.processAllNotes = function (notes) {
        var _this = this;
        return notes.map(function (note) { return _this.processSingleNote(note); }).flat(Infinity);
    };
    MidiNode.prototype.processSingleNote = function (note) {
        return note;
    };
    return MidiNode;
}(_graphNodes__WEBPACK_IMPORTED_MODULE_1__["BaseNode"]));

/**
 * Harmonize Node.
 * Takes array of interval half-steps and outputs the transposed input note(s)
 *
 * @param intervals: The harmonization intervals in half-steps
 */
var HarmonizeNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HarmonizeNode, _super);
    function HarmonizeNode(intervals, title) {
        if (intervals === void 0) { intervals = [0, 4, 7]; }
        if (title === void 0) { title = 'Harmonize Node'; }
        var _this = _super.call(this) || this;
        _this.intervals = intervals;
        _this.title = title;
        return _this;
    }
    /**
     * Uses Tone.js for harmonization.
     */
    HarmonizeNode.prototype.processSingleNote = function (note) {
        var harmony = tone__WEBPACK_IMPORTED_MODULE_2___default.a.Midi(note).harmonize(this.intervals);
        return harmony;
    };
    return HarmonizeNode;
}(MidiNode));

/**
 * Add Intervals Node.
 * Takes array of intervals and outputs the input note(s) as well as all transpositions
 *
 * @param intervals: The intervals to transpose the note(s) in half-steps
 */
var AddIntervalsNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AddIntervalsNode, _super);
    function AddIntervalsNode(intervals, title) {
        if (intervals === void 0) { intervals = [12]; }
        if (title === void 0) { title = 'Add Intervals Node'; }
        var _this = _super.call(this) || this;
        _this.intervals = intervals;
        _this.title = title;
        return _this;
    }
    AddIntervalsNode.prototype.processSingleNote = function (note) {
        var _a;
        var transposed = this.intervals.map(function (i) { return note.transpose(i); });
        return (_a = [note]).concat.apply(_a, transposed);
    };
    return AddIntervalsNode;
}(MidiNode));

var ArpeggiatorNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ArpeggiatorNode, _super);
    function ArpeggiatorNode(duration, repeats, direction, shuffle, title) {
        if (duration === void 0) { duration = 100; }
        if (repeats === void 0) { repeats = 1; }
        if (direction === void 0) { direction = 'up'; }
        if (shuffle === void 0) { shuffle = false; }
        if (title === void 0) { title = 'Arpeggiator Node'; }
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.repeats = repeats;
        _this.direction = direction;
        _this.shuffle = shuffle;
        _this.title = title;
        _this.addInput({
            node: _this,
            title: 'Duration',
            defaultValue: duration
        });
        _this.addInput({
            node: _this,
            title: 'Repeats',
            updateOutputs: _this.updateOutputs.bind(_this),
            defaultValue: repeats
        });
        return _this;
    }
    ArpeggiatorNode.prototype.handleInputValues = function (values) {
        var notes = values[0];
        this.processAllNotes(notes);
        var duration = values[1];
        this.duration = duration;
        var repeats = values[2];
        this.repeats = repeats;
    };
    ArpeggiatorNode.prototype.processAllNotes = function (notes) {
        this.arpeggiate(notes);
        if (this.direction === 'up') {
            notes.reverse();
        }
    };
    ArpeggiatorNode.prototype.arpeggiate = function (notes) {
        var _this = this;
        if (!notes || notes.length === 0) {
            return [];
        }
        var note = notes.pop();
        this.outputs[0].trigger([note], true);
        setTimeout(function () { return _this.arpeggiate(notes); }, this.duration);
        return [];
    };
    return ArpeggiatorNode;
}(MidiNode));

/**
 * Synth Node
 *
 * Outputs the input note(s) and triggers a synth attack as side-effect.
 */
var SynthNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SynthNode, _super);
    function SynthNode(title, synth) {
        if (title === void 0) { title = 'Synth Node'; }
        if (synth === void 0) { synth = new tone__WEBPACK_IMPORTED_MODULE_2___default.a.PolySynth().toMaster(); }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.synth = synth;
        _this.addInput({
            node: _this,
            title: 'Envelope'
        });
        return _this;
    }
    SynthNode.prototype.handleInputValues = function (values) {
        this.processAllNotes(values[0]);
        if (values[1]) {
            this.synth.set({
                envelope: values[1]
            });
        }
        return values[0];
    };
    SynthNode.prototype.processAllNotes = function (notes) {
        this.synth.triggerAttackRelease(notes, '4n');
        return notes;
    };
    return SynthNode;
}(MidiNode));

/**
 * Keyboard Node
 *
 * Outputs the trigger's input number as MIDI note.
 */
var KeyboardNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](KeyboardNode, _super);
    function KeyboardNode(title) {
        if (title === void 0) { title = 'Keyboard Node'; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.inputs = [];
        _this.addInput({
            node: _this,
            updateOutputs: _this.showNotes.bind(_this),
            title: 'Display Notes'
        });
        return _this;
    }
    KeyboardNode.prototype.showNotes = function () {
        this.inputs[0].value.map(function (note) {
            document.querySelectorAll(".key[data-note=\"" + note.toMidi() + "\"]").forEach(function (el) {
                el.classList.add('active');
                setTimeout(function () { return el.classList.remove('active'); }, 500);
            });
        });
    };
    KeyboardNode.prototype.onTrigger = function (value, active) {
        this.outputs[0].trigger([new tone__WEBPACK_IMPORTED_MODULE_2___default.a.Frequency(value, 'midi')], active);
    };
    return KeyboardNode;
}(MidiNode));

/**
 * Envelope Node
 *
 * Inputs: Attack, Sustain, Delay and Release as numbers
 * Outputs: Tone.js Envelope
 */
var EnvelopeNode = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnvelopeNode, _super);
    function EnvelopeNode(attack, decay, sustain, release, title) {
        if (attack === void 0) { attack = 0.2; }
        if (decay === void 0) { decay = 0.1; }
        if (sustain === void 0) { sustain = 0.5; }
        if (release === void 0) { release = 1; }
        if (title === void 0) { title = 'Envelope Node'; }
        var _this = _super.call(this) || this;
        _this.attack = attack;
        _this.decay = decay;
        _this.sustain = sustain;
        _this.release = release;
        _this.title = title;
        _this.addInput({
            node: _this,
            title: 'Attack',
            defaultValue: attack,
            allowInput: true
        });
        _this.addInput({
            node: _this,
            title: 'Decay',
            defaultValue: decay,
            allowInput: true
        });
        _this.addInput({
            node: _this,
            title: 'Sustain',
            defaultValue: sustain,
            allowInput: true
        });
        _this.addInput({
            node: _this,
            title: 'Release',
            defaultValue: release,
            allowInput: true
        });
        _this.addOutput({
            node: _this,
            processInputs: _this.processInputs.bind(_this),
            title: 'Envelope'
        });
        _this.envelope = { attack: attack, decay: decay, sustain: sustain, release: release };
        _this.outputs[0].trigger(_this.envelope, true);
        return _this;
    }
    EnvelopeNode.prototype.handleInputValues = function (values) {
        this.envelope = {
            attack: values[0], decay: values[1], sustain: values[2], release: values[3]
        };
        this.outputs[0].trigger(this.envelope);
        return this.envelope;
    };
    EnvelopeNode.prototype.onConnect = function (socket) {
        if (socket.socketType === 'output') {
            this.outputs[0].trigger(this.envelope);
        }
    };
    return EnvelopeNode;
}(_graphNodes__WEBPACK_IMPORTED_MODULE_1__["BaseNode"]));



/***/ }),

/***/ "./src/app/socket-connector.service.ts":
/*!*********************************************!*\
  !*** ./src/app/socket-connector.service.ts ***!
  \*********************************************/
/*! exports provided: SocketConnectorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketConnectorService", function() { return SocketConnectorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SocketConnectorService = /** @class */ (function () {
    function SocketConnectorService() {
        this.isConnecting = false;
        this.connections = [];
        this.elementConnections = [];
    }
    SocketConnectorService.prototype.startConnection = function (startSocket, startElement) {
        if (startSocket.socketType === 'output') {
            this.outputTarget = startSocket;
        }
        else {
            this.inputTarget = startSocket;
        }
        this.startSocketType = startSocket.socketType;
        this.startElement = startElement;
        this.isConnecting = true;
    };
    SocketConnectorService.prototype.attemptConnection = function (endSocket) {
        if (this.isConnecting && endSocket.socketType !== this.startSocketType) {
            if (endSocket.socketType === 'output') {
                this.outputTarget = endSocket;
            }
            else {
                this.inputTarget = endSocket;
            }
            this.outputTarget.connectTo(this.inputTarget);
        }
        this.cleanup();
    };
    SocketConnectorService.prototype.cleanup = function () {
        this.isConnecting = false;
        delete this.startSocketType;
        delete this.inputTarget;
        delete this.outputTarget;
        // this.targets = {
        //   NodeInput: false,
        //   NodeOutput: false
        // };
    };
    SocketConnectorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SocketConnectorService);
    return SocketConnectorService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tibor/Projects/virtuaw/virtuaw-web/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
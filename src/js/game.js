/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_hud__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_items__ = __webpack_require__(2);



class Game {
    constructor($game) {
        this.$game = $game;
        this.$left = $game.find('#left');
        this.$right = $game.find('#right');
        this.$octopus = $game.find('#octopus');
        this.data = {
            highscore: 0,
            credits: 0,
        };
    }

    init() {
        let self = this;
        this.hud = new __WEBPACK_IMPORTED_MODULE_0__components_hud__["a" /* default */](this);
        this.hud.init();
        this.items = new __WEBPACK_IMPORTED_MODULE_1__components_items__["a" /* default */](this);
        this.items.init();

        this.$octopus.on('click', function() {
            self.addCredits(self.ppc());
            self.update();
        });

        this.interval = setInterval(function() {
            self.addCredits(self.pps());
            self.update();
        }, 1000);
    }

    update() {
        this.hud.update();
        this.items.update();
    }

    pps() {
        if(typeof this.items !== 'object') {
            return 0;
        }
        let pps = 0;
        $.each(this.items.items, function() {
            pps += this.pps();
        });
        return pps;
    }

    ppc() {
        return 1;
    }

    addCredits(amount) {
        this.data.highscore = Math.round((this.data.highscore + amount) * 10) / 10;
        this.data.credits = Math.round((this.data.credits + amount) * 10) / 10;
    }

    subCredits(amount) {
        this.data.credits = Math.round((this.data.credits - amount) * 10) / 10;
    }
}

$(window).on('load', function () {
    window.game = new Game($('#game'));
    window.game.init();
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HUD {
    constructor(game) {
        this.game = game;
        this.$elements = this.game.$game.find('[data-hud]');
    }

    init() {
        this.render();
    }

    update() {
        this.render();
    }

    render() {
        let self = this;
        this.$elements.each(function() {
            let $elem = $(this);
            let key = $elem.data('hud');
            let value = self.game.data[key];
            if(typeof self.game[key] === 'function') {
                value = self.game[key]();
            }
            $elem.text(value);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HUD;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_item__ = __webpack_require__(3);


class Items {
    constructor(game) {
        this.game = game;
        this.$itemWrapper = this.game.$right.find('.items');
        this.items = {
            keyboard: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Keyboard',
                15,
                0.1
            ),
            arduino: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Arduino',
                100,
                1
            ),
            raspberrypi: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Raspberry Pi',
                1100,
                8
            ),
        };
    }

    init() {
        let self = this;
        $.each(this.items, function(key, item) {
            self.$itemWrapper.append(
                '<a href="#" class="btn btn-dark disabled item d-block mb-3" data-key="'+key+'">'+
                self.itemButtonText(item)+
                '</a>'
            );
        });

        this.$itemWrapper.find('.item').on('click', function(e) {
            e.preventDefault();
            let $item = $(this);
            if(!$item.hasClass('disabled')) {
                let item = self.items[$item.data('key')];
                if(item.price() <= self.game.data.credits) {
                    self.game.subCredits(item.price());
                    item.incLevel();
                    self.game.update();
                }
            }
        });
    }

    update() {
        let self = this;
        this.$itemWrapper.find('.item').each(function() {
            let $item = $(this);
            let item = self.items[$item.data('key')];
            $item.addClass('disabled').addClass('btn-dark').removeClass('btn-success');
            $item.text(self.itemButtonText(item));
            if(item.price() <= self.game.data.credits) {
                $item.removeClass('disabled').removeClass('btn-dark').addClass('btn-success');
            }
        });
    }

    itemButtonText(item)
    {
        return item.name+'#'+item.level+' ('+item.price()+' DNA)';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Items;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Item {
    constructor(
        name,
        base_price,
        base_pps,
        level = 0
    ) {
        this._name = name;
        this._base_price = base_price;
        this._base_pps = base_pps;
        this._level = level;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get base_price() {
        return this._base_price;
    }

    set base_price(value) {
        this._base_price = value;
    }

    get base_pps() {
        return this._base_pps;
    }

    set base_pps(value) {
        this._base_pps = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    incLevel(amount = 1) {
        this._level += amount
    }

    price() {
        return Math.ceil(this.base_price * Math.pow(1.15, this.level))
    }

    pps() {
        return Math.floor((this.base_pps * this.level) * 100) / 100
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;


/***/ })
/******/ ]);
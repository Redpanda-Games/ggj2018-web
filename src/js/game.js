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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_upgrades__ = __webpack_require__(4);




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
        this.upgrades = new __WEBPACK_IMPORTED_MODULE_2__components_upgrades__["a" /* default */](this);
        this.upgrades.init();

        let scale = (512 / this.$octopus.height());
        let size = 512 / scale;
        this.$octopus.css('background-size', 'auto '+(size * 2)+'px');
        this.$octopus.animateSprite({
            width: size,
            height: size,
            offsetX: 0,
            fps: 5,
            columns: 23,
            loop: true,
            autoplay: true,
            animations: {
                idle_1: [23, 24, 25, 26, 27],
                idle_2: [0, 1, 2, 3, 4, 5, 6, 7],
                idle_3: [8, 9, 10, 11, 12, 13, 14, 15],
                idle_4: [16, 17, 18, 19, 20, 21, 22],
            },
        });
        this.$octopus.animateSprite('play', 'idle_1');

        this.$game.tooltip({
            selector: '[data-toggle=tooltip]'
        });

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
        this.upgrades.update();

        let state = 1;
        if(this.data.highscore > 1000) {
            state = 4;
        } else if(this.data.highscore > 100) {
            state = 3;
        } else if(this.data.highscore > 10) {
            state = 2;
        }

        let animation = 'idle_' + state;
        if(animation !== this.$octopus.data('animateSprite').currentAnimationName) {
            this.$octopus.animateSprite('play', 'idle_' + state);
        }
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
        if(typeof this.items !== 'object') {
            return 1;
        }
        let ppc = 0;
        $.each(this.items.items, function() {
            ppc += this.level;
        });
        return Math.max(1, ppc);
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
            $elem.text(numeral(value).format('0.0a'));
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
        this.$itemWrapper = this.game.$right.find('.items .row');
        this.items = {
            vacuumtube: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Vacuum Tube',
                'vacuumtube.jpg',
                'ä heater in a glass bulb',
                10,
                0.1
            ),
            transistor: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Transistor',
                'transistor.jpg',
                'fancy resistor the tiny transistor',
                100,
                1
            ),
            arduino: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Arduino',
                'arduino.jpg',
                'A computerr on the chip',
                800,
                8
            ),

            rasberrypi: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Rasberry Pi',
                'rasberrypi.jpg',
                'MHM... Pie!',
                4700,
                47
            ),
            octopodesbrains: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Octopodes Brain',
                'octopodesbrains.jpg',
                'Canis canem edit',
                26000,
                260
            ),
            computer: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Computer',
                'computer.jpg',
                'The big one! or not?',
                140000,
                1400
            ),
            graphiccard: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Graphic Card',
                'graphiccard.jpg',
                'PCMR',
                780000,
                7800
            ),
            serverrack: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Server Rack',
                'serverrack.jpg',
                'computer hoarding problems',
                4400000,
                44000
            ),
            supercomputer: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Super Computer',
                'supercomputer.jpg',
                'Some assembly required',
                26000000,
                260000
            ),
            quantumcomputer: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Quantum Computer',
                'quantumcomputer.jpg',
                'Spooky computing at a distance',
                160000000,
                1600000
            ),
            planetarycomputer: new __WEBPACK_IMPORTED_MODULE_0__data_item__["a" /* default */](
                'Planetary Computer',
                'planetarycomputer.jpg',
                'Yo mama so big...',
                10000000000,
                10000000
            ),
        };
    }

    init() {
        let self = this;
        $.each(this.items, function(key, item) {
            self.$itemWrapper.append(
                '<div class="col-6 col-md-3"><a href="#" class="btn btn-dark disabled item d-block mb-3 p-0" data-key="'+key+'" data-toggle="tooltip" data-html="true" title="' +
                self.buttonText(item)+
                '">'+
                '<span class="level">0</span>' +
                '<img src="img/'+item.image+'" class="img-fluid" />' +
                '</a></div>'
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
            $item.find('.level').text(item.level);
            if($item.attr('data-original-title') !== self.buttonText(item)) {
                $item.attr('data-original-title', self.buttonText(item)).tooltip('setContent');
            }
            if(item.price() <= self.game.data.credits) {
                $item.removeClass('disabled').removeClass('btn-dark').addClass('btn-success');
            }
        });
    }

    buttonText(item) {
        return '<strong style=\'font-size:1.25em;\'>'+item.name+'</strong>'+
            '<br/>'+
            '<em>'+item.description+'</em>'+
            '<br/>'+
            '<br/>'+
            '<span style=\'font-size:1.125em;\'>'+numeral(item.price()).format('0a')+' DNA</span>';
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
        image,
        description,
        base_price,
        base_pps,
        level = 0
    ) {
        this._name = name;
        this._image = image;
        this._description = description;
        this._base_price = base_price;
        this._base_pps = base_pps;
        this._level = level;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
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
        return Math.ceil(this.base_price * Math.pow(1.15, this.level));
    }

    pps() {
        return Math.floor((this.base_pps * this.level) * 10) / 10;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_upgrade__ = __webpack_require__(5);


class Upgrades {
    constructor(game) {
        this.game = game;
        this.$upgradeWrapper = this.game.$right.find('.upgrades');
        this.upgrades = {
            keyboard: new __WEBPACK_IMPORTED_MODULE_0__data_upgrade__["a" /* default */](
                'USB3',
                50,
                0.1
            ),
        };
    }

    init() {
        let self = this;
        $.each(this.upgrades, function(key, upgrade) {
            self.$upgradeWrapper.append(
                '<a href="#" class="btn btn-dark disabled upgrade d-block mb-3" data-key="'+key+'">'+
                self.buttonText(upgrade)+
                '</a>'
            );
        });

        this.$upgradeWrapper.find('.upgrade').on('click', function(e) {
            e.preventDefault();
            let $upgrade = $(this);
            if(!$upgrade.hasClass('disabled')) {
                let upgrade = self.upgrades[$upgrade.data('key')];
                if(upgrade.price() <= self.game.data.credits) {
                    self.game.subCredits(upgrade.price());
                    upgrade.incLevel();
                    self.game.update();
                }
            }
        });
    }

    update() {
        let self = this;
        this.$upgradeWrapper.find('.upgrade').each(function() {
            let $upgrade = $(this);
            let upgrade = self.upgrades[$upgrade.data('key')];
            $upgrade.addClass('disabled').addClass('btn-dark').removeClass('btn-success');
            $upgrade.text(self.buttonText(upgrade));
            if(upgrade.price() <= self.game.data.credits) {
                $upgrade.removeClass('disabled').removeClass('btn-dark').addClass('btn-success');
            }
        });
    }

    buttonText(upgrade)
    {
        return upgrade.name+'#'+upgrade.level+' ('+upgrade.price()+' DNA)';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Upgrades;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Upgrade {
    constructor(
        name,
        base_price,
        base_multi,
        level = 0
    ) {
        this._name = name;
        this._base_price = base_price;
        this._base_multi = base_multi;
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

    get base_multi() {
        return this._base_multi;
    }

    set base_multi(value) {
        this._base_multi = value;
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
        return Math.ceil(this.base_price * Math.pow(1.15, this.level));
    }

    multi() {
        return Math.floor((this.base_multi * this.level) * 10) / 10;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Upgrade;


/***/ })
/******/ ]);
export default class Upgrade {
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
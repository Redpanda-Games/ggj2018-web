export default class Item {
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
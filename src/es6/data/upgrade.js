export default class Upgrade {
    constructor(
        name,
        image,
        base_price,
        base_multi,
        owned = false
    ) {
        this._name = name;
        this._image = image;
        this._base_price = base_price;
        this._base_multi = base_multi;
        this._owned = owned;
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

    get base_multi() {
        return this._base_multi;
    }

    set base_multi(value) {
        this._base_multi = value;
    }

    get owned() {
        return this._owned;
    }

    set owned(value) {
        this._owned = value;
    }

    price() {
        return this.owned ? 0 : this.base_price;
    }

    multi() {
        return this.owned ? this.base_multi : 0;
    }
}
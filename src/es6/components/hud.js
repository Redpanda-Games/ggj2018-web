export default class HUD {
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
            $elem.text(numeral(value).format('0a'));
        });
    }
}
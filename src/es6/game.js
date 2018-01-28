import HUD from "./components/hud";
import Items from "./components/items";

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
        this.hud = new HUD(this);
        this.hud.init();
        this.items = new Items(this);
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
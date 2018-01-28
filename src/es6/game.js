import HUD from "./components/hud";
import Items from "./components/items";
import Upgrades from "./components/upgrades";

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
        this.upgrades = new Upgrades(this);
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
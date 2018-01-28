import Upgrade from "../data/upgrade";

export default class Upgrades {
    constructor(game) {
        this.game = game;
        this.$upgradeWrapper = this.game.$right.find('.upgrades');
        this.upgrades = {
            keyboard: new Upgrade(
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
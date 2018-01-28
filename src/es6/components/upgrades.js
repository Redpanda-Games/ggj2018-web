export default class Upgrades {
    constructor(game) {
        this.game = game;
        this.$upgradeWrapper = this.game.$right.find('.upgrades .row');
    }

    init() {
        let self = this;
        $.each(this.game.items.items, function(iKey, item) {
            $.each(item.upgrades, function(uKey, upgrade) {
                self.$upgradeWrapper.append(
                    '<div class="col-6 col-md-3"><a href="#" class="btn upgrade d-none mb-3 p-0 btn-dark disabled" data-ikey="'+iKey+'" data-ukey="'+uKey+'" data-toggle="tooltip" data-html="true" title="' +
                    self.buttonText(upgrade)+
                    '">'+
                    '<img src="img/'+upgrade.image+'" class="img-fluid" />' +
                    '</a></div>'
                );
            });
        });

        this.$upgradeWrapper.on('click', '.upgrade', function(e) {
            e.preventDefault();
            let $upgrade = $(this);
            if(!$upgrade.hasClass('disabled')) {
                let item = self.game.items.items[$upgrade.data('ikey')];
                let upgrade = item.upgrades[$upgrade.data('ukey')];
                if(upgrade.price() <= self.game.data.credits) {
                    self.game.subCredits(upgrade.price());
                    upgrade.owned = true;
                    self.game.update();
                }
            }
        });
    }

    update() {
        let self = this;
        this.$upgradeWrapper.find('.upgrade').each(function() {
            let $upgrade = $(this);
            let item = self.game.items.items[$upgrade.data('ikey')];
            let upgrade = item.upgrades[$upgrade.data('ukey')];

            $upgrade.addClass('disabled').addClass('btn-dark').addClass('d-none').removeClass('btn-success').removeClass('d-block');

            if(item.level > 0) {
                $upgrade.removeClass('d-none').addClass('d-block');

                if(upgrade.owned) {
                    $upgrade.removeClass('disabled').addClass('border-warning');
                } else if(upgrade.price() <= self.game.data.credits) {
                    $upgrade.removeClass('disabled').removeClass('btn-dark').addClass('btn-success');
                }
            }
            if($upgrade.attr('data-original-title') !== self.buttonText(upgrade)) {
                $upgrade.attr('data-original-title', self.buttonText(upgrade)).tooltip('setContent');
            }
        });
    }

    buttonText(upgrade) {
        return '<strong style=\'font-size:1.25em;\'>'+upgrade.name+'</strong>'+
            '<br/>'+
            '<br/>'+
            '<span style=\'font-size:1.125em;\'>'+(upgrade.owned ? 'owned' : numeral(upgrade.price()).format('0a')+' DNA')+'</span>';
    }
}
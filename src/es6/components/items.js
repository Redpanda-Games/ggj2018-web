import Item from "../data/item";

export default class Items {
    constructor(game) {
        this.game = game;
        this.$itemWrapper = this.game.$right.find('.items');
        this.items = {
            keyboard: new Item(
                'Keyboard',
                15,
                0.1
            ),
            arduino: new Item(
                'Arduino',
                100,
                1
            ),
            raspberrypi: new Item(
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
import Item from "../data/item";

export default class Items {
    constructor(game) {
        this.game = game;
        this.$itemWrapper = this.game.$right.find('.items .row');
        this.items = {
            vacuumtube: new Item(
                'Vacuum Tube',
                'vacuumtube.jpg',
                'ä heater in a glass bulb',
                10,
                0.1
            ),
            transistor: new Item(
                'Transistor',
                'transistor.jpg',
                'fancy resistor the tiny transistor',
                100,
                1
            ),
            arduino: new Item(
                'Arduino',
                'arduino.jpg',
                'A computerr on the chip',
                800,
                8
            ),

            rasberrypi: new Item(
                'Rasberry Pi',
                'rasberrypi.jpg',
                'MHM... Pie!',
                4700,
                47
            ),
            octopodesbrains: new Item(
                'Octopodes Brain',
                'octopodesbrains.jpg',
                'Canis canem edit',
                26000,
                260
            ),
            computer: new Item(
                'Computer',
                'computer.jpg',
                'The big one! or not?',
                140000,
                1400
            ),
            ethernet: new Item(
                'Ethernet',
                'ethernet.jpg',
                'Access the world of everything.',
                380000,
                3800
            ),
            graphiccard: new Item(
                'Graphic Card',
                'graphiccard.jpg',
                'PCMR',
                780000,
                7800
            ),
            serverrack: new Item(
                'Server Rack',
                'serverrack.jpg',
                'computer hoarding problems',
                4400000,
                44000
            ),
            supercomputer: new Item(
                'Super Computer',
                'supercomputer.jpg',
                'Some assembly required',
                26000000,
                260000
            ),
            quantumcomputer: new Item(
                'Quantum Computer',
                'quantumcomputer.jpg',
                'Spooky computing at a distance',
                160000000,
                1600000
            ),
            planetarycomputer: new Item(
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
            '<div class=\'clearfix\' style=\'font-size:1.125em;\'><span class=\'float-left\'>'+numeral(item.price()).format('0a')+' DNA</span><span class=\'float-right\'>'+numeral(item.pps()).format('0.0a')+' PpS</span></div>';
    }
}
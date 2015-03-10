$(document).ready(function() {
    $('#spec-gravity').noUiSlider({
        start: 1,
        step: 0.01,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 2
        }
    }).noUiSlider_pips({
        mode: 'range',
        density: 8
    }).Link('lower').to($('#sg'));

    $('#moist-content').noUiSlider({
        start: 19,
        step: 1,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 100
        }
    }).noUiSlider_pips({
        mode: 'positions',
        values: [0, 25, 50, 75, 100],
        density: 5
    }).Link('lower').to($('#mc'));

});

ko.validation.rules.pattern.message = 'Invalid.';
ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null,
    errorMessageClass: "error"
}, true);

function AppViewModel() {
    var self = this;
    $("#spec-gravity").on({
        slide: function() {
            self.specificGravity($("#spec-gravity").val());
        },
        set: function() {
                        self.specificGravity($("#spec-gravity").val());

        },
        change: function() {
                        self.specificGravity($("#spec-gravity").val());

        }
    });
    $("#moist-content").on({
        slide: function() {
            self.moistureContent($("#moist-content").val());
        },
        set: function() {
                        self.moistureContent($("#moist-content").val());

        },
        change: function() {
                        self.moistureContent($("#moist-content").val());

        }
    });
    self.errors = ko.validation.group(self);
    self.specificGravity = ko.observable(1).extend({
        number: {
            message: 'Specific gravity width must be a number between 0 and 2.'
        },
        required: {
            message: 'Specific gravity width must be a number between 0 and 2.'
        },
        min: 0,
        max: 2
    });
    self.moistureContent = ko.observable(19).extend({
        number: {
            message: 'Moisture Content must be a number between 0 and 100.'
        },
        min: 0,
        max: 100,
        required: {
            message: 'Moisture content must be a number between 0 and 100.'
        }
    });
    self.finishedWidth = ko.observable(1).extend({
        number: {
            message: 'Finished width must be a positive number.'
        },
        required: {
            message: 'Finished width must be a positive number.'
        },
        min: 0
    });
    self.finishedThickness = ko.observable(0.75).extend({
        number: true,
        required: true,
        min: 0
    });
    self.linealFeet = ko.observable(5).extend({
        number: true,
        required: true,
        min: 0
    });

    self.validate = function() {
        if (
            self.specificGravity.isValid() && self.moistureContent.isValid() && self.finishedWidth.isValid() && self.finishedThickness.isValid() && self.linealFeet.isValid()) {
            return true;
        } else {
            return false;
        }
    };

    self.weight = ko.computed(function() {
        if (self.validate()) {
            $(".field").css({
                "background": "none"
            });
            var n = Number(self.specificGravity()),
                e = Number(self.moistureContent() / 100),
                t = Number(self.finishedWidth()),
                i = Number(self.finishedThickness()),
                o = Number(self.linealFeet());
            var result = 62.4 * (n / (1 + 0.009 * n * e)) * (1 + e / 100) / 1728 * t * i * 12 * o;
            return Math.round(100 * result) / 100 + ' lbs.'
        } else {
            //self.setErrors();
            return 'ERR';
        }

    }, this);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
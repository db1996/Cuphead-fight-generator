function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe) {
    var prev = $('.' + cl + ':nth-child(' + prevElemCount + ')');
    var previmg = $('.' + cl + ':nth-child(' + prevElemCount + ') img');
    var next;
    if (elemCount == 1) {
        next = $('.' + cl + ':first-child');
    } else {
        next = $('.' + cl + ':nth-child(' + elemCount + ')');
    }
    var last = $('.' + cl + ':last-child()');
    var nextimg = $('.' + cl + ':nth-child(' + elemCount + ') img');
    var lastimg = $('.' + cl + ':last-child() img');
    var delay = Math.floor(1000 / (numoftimes - i));
    var toreplace = $('.js-' + cl + '-summary-text');
    var undef = 0;
    if (i == numoftimes + 1) {
        // What happens if the cycle is completed
        var name = $(next).data('name');
        if (typeof name == 'undefined') {
            name = $('.' + cl + ':last-child()').data('name');
            $('.' + cl).removeClass('--top');
            $(last).addClass('--top');
            undef = 1;
        }
        if (
            typeof checkdupe != 'undefined' &&
            typeof checkdupe != 'null' &&
            typeof checkdupe != 'object' &&
            checkdupe != ''
        ) {
            $('.' + checkdupe + '[data-name=' + name + ']')
                .removeClass(checkdupe)
                .addClass(checkdupe + '--dupe');
            $('.js-' + checkdupe + '-button').removeClass('button--disabled');
        }
        $(toreplace).html(name);
    }

    var name = $(next).data('name');
    if (undef == 0) {
        $(prev).removeClass('--top');
    }
    $(next).addClass('--top');
    if (elemCount < parseInt(numItems)) {
        elemCount++;
        prevElemCount = elemCount - 1;
    } else if (elemCount == parseInt(numItems)) {
        elemCount = 1;
        prevElemCount = numItems;
    }
    i++;

    if (i <= numoftimes - 9) {
        setTimeout(function() {
            GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe);
        }, delay);
    }
    if (i > numoftimes - 9 && i <= numoftimes + 1) {
        var ran = getRndInteger(100, 300);
        setTimeout(
            GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe),
            ran
        );
    }
}
$('.js-button').click(function() {
    if (!$(this).hasClass('button--disabled')) {
        var checkdupe = $(this).data('check');
        $('.' + checkdupe + '--dupe')
            .removeClass(checkdupe + '--dupe')
            .addClass(checkdupe);
        $('.js-' + checkdupe + '-button').addClass('button--disabled');
        var cl = $(this).data('class');
        var numItems;
        if ($('.' + cl + '--dupe').length > 0) {
            numItems = $('.' + cl + '').length + 1;
        } else {
            numItems = $('.' + cl + '').length;
        }

        var i = 1;
        var numoftimes = getRndInteger(10, 30);
        var elemCount = 1;
        var prevElemCount = numItems;
        GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe);
    }
});
$('.js-allowspecific').change(function() {
    var name = $(this).data('class');
    var tocheck = $(this).data('nametocheck');
    if ($(this).is(':checked')) {
        $('.' + name + '--not-allowed[data-name=' + tocheck + ']')
            .addClass(name)
            .removeClass(name + '--not-allowed');
    } else {
        $('.' + name + '[data-name=' + tocheck + ']')
            .removeClass(name)
            .addClass(name + '--not-allowed');
    }
});

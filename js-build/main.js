function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe) {
    var prev = $('.' + cl + ':nth-child(' + prevElemCount + ')');
    var previmg = $('.' + cl + ':nth-child(' + prevElemCount + ') img');
    var next = $('.' + cl + ':nth-child(' + elemCount + ')');
    var last = $('.' + cl + ':last-child()');
    var nextimg = $('.' + cl + ':nth-child(' + elemCount + ') img');
    var delay = Math.floor(1000 / (numoftimes - i));
    var undef = 0;
    if (i == numoftimes + 1) {
        var name = $(next).data('name');
        if (typeof name == 'undefined') {
            console.log('its actually undefined');
            name = $(last).data('name');
            $('.' + cl).removeClass('--top');
            $(last).addClass('--top');
            console.log($(last).attr('class'));
            undef = 1;
        }
        console.log(name);
        $('.' + checkdupe + '[data-name=' + name + ']')
            .removeClass(checkdupe)
            .addClass(checkdupe + '--dupe');
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
    var checkdupe = $(this).data('check');
    $('.' + checkdupe + '--dupe')
        .removeClass(checkdupe + '--dupe')
        .addClass(checkdupe);
    var cl = $(this).data('class');
    var numItems;
    if ($('.' + cl + '--dupe').length > 0) {
        numItems = $('.' + cl + '').length + 1;
    } else {
        numItems = $('.' + cl + '').length;
    }

    var i = 1;
    var numoftimes = getRndInteger(100, 300);
    var elemCount = 1;
    var prevElemCount = numItems;
    console.log('num:', numItems);
    GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe);
});
$('.js-allowempty').change(function() {
    var name = $(this).data('class');
    if ($(this).is(':checked')) {
        $('.' + name + '--not-allowed[data-name=Empty]')
            .addClass(name)
            .removeClass(name + '--not-allowed');

        console.log(name + ' is checked');
    } else {
        $('.' + name + '[data-name=Empty]')
            .removeClass(name)
            .addClass(name + '--not-allowed');
        console.log(name + ' is unchecked');
    }
});

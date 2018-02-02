function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function returnImgsource(num) {
    var ar = [
        'img/king-dice-icons/tipsy-troop.png',
        'img/king-dice-icons/chips-bettigan.png',
        'img/king-dice-icons/mr-wheezy.png',
        'img/king-dice-icons/pip-and-dot.png',
        'img/king-dice-icons/hopus-pocus.png',
        'img/king-dice-icons/phear-lap.png',
        'img/king-dice-icons/pirouletta.png',
        'img/king-dice-icons/mangosteen.png',
        'img/king-dice-icons/mr-chimes.png'
    ];
    return ar[num - 1];
}
function randomString2(len, beforestr = '', arraytocheck = null) {
    // Charset, every character in this string is an optional one it can use as a random character.
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        // creates a random number between 0 and the charSet length. Rounds it down to a whole number
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    // If an array is given it will check the array, and if the generated string exists in it it will create a new one until a unique one is found *WATCH OUT. If all available options are used it will cause a loop it cannot break out*
    if (arraytocheck == null) {
        return beforestr + randomString;
    } else {
        var isIn = $.inArray(beforestr + randomString, arraytocheck); // checks if the string is in the array, returns a position
        if (isIn > -1) {
            // if the position is not -1 (meaning, it is not in the array) it will start doing a loop
            var count = 0;
            do {
                randomString = '';
                for (var i = 0; i < len; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomString += charSet.substring(randomPoz, randomPoz + 1);
                }
                isIn = $.inArray(beforestr + randomString, arraytocheck);
                count++;
            } while (isIn > -1);
            console.log('it took ' + count + ' tries');
            return beforestr + randomString;
        } else {
            return beforestr + randomString;
        }
    }
}
function GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe, elem) {
    // Disables the button for the checked class.
    var currentElem = $('.' + cl + ':eq(' + (elemCount - 1) + ')');
    var nextElem = $('.' + cl + ':eq(' + elemCount + ')');
    var delay = Math.floor(500 / (numoftimes - count));
    var name = $(nextElem).data('name');
    $(currentElem).removeClass('--top');
    $(nextElem).addClass('--top');
    // Rotates between the elements
    if (elemCount < numItems) {
        elemCount++;
    } else if (elemCount == numItems) {
        elemCount = 0;
    }
    if (count < numoftimes) {
        // if the loop is not over it starts again, giving the updated data
        count++;
        setTimeout(function() {
            GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe, elem);
        }, delay);
    } else if (count == numoftimes) {
        // If the cycle is all done this happens
        // If there should be checked for duplicates it is done there
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
        // Adds the text to the summary
        $('.js-' + cl + '-summary-text').html(name);
        console.log(elem);
        $(elem).removeClass('button--disabled');
    }
}
function generateMiniBosses(numbers, count, delay) {
    var randomstr = randomString2(15);
    $('#js-toCopy')
        .clone()
        .appendTo('#js-toAppend')
        .attr('id', randomstr)
        .attr('src', returnImgsource(numbers[count]))
        .addClass('js-to-delete')
        .removeClass('king-dice-group__image--visible');
    setTimeout(function() {
        $('#' + randomstr).addClass('king-dice-group__image--visible');
    }, 10);
    if (count < numbers.length - 1) {
        count++;
        setTimeout(function() {
            generateMiniBosses(numbers, count, delay);
        }, delay);
    } else {
        $('.js-generate-kd').removeClass('button--disabled');
    }
}

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
function GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe) {
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
            GenerateRandom(
                cl,
                numItems,
                count,
                elemCount,
                numoftimes,
                checkdupe
            );
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

$('.js-button').click(function() {
    // If the button is disabled this does nothing
    if (!$(this).hasClass('button--disabled')) {
        // Gets the data attribute "check" to see which one needs to be checked for duplicates
        var checkdupe = $(this).data('check');
        $('.' + checkdupe + '--dupe')
            .removeClass(checkdupe + '--dupe')
            .addClass(checkdupe); // If one is already marked as a duplicate the mark is removed
        $('.js-' + checkdupe + '-button').addClass('button--disabled'); // Disables the button for the checked class.
        var cl = $(this).data('class'); // Gets the class
        var numItems = $('.' + cl + '').length - 1; // based on 0
        var count = 1;
        var elemCount = 0;
        var numoftimes = getRndInteger(100, 200); // Gets a random number between 2 numbers
        GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe);
    }
});
$('.js-allowspecific').change(function() {
    var name = $(this).data('class');
    // Checks what string should be in the "data-name" attr to not be allowed
    var tocheck = $(this).data('nametocheck');
    if ($(this).is(':checked')) {
        $('.' + name + '--not-allowed[data-name=' + tocheck + ']')
            .addClass(name)
            .removeClass(name + '--not-allowed');
    } else {
        var elem = $('.' + name + '[data-name=' + tocheck + ']');
        $(elem)
            .removeClass(name)
            .addClass(name + '--not-allowed');
        if ($(elem).hasClass('--top')) {
            $(elem).removeClass('--top');
            $('.' + name + ':eq(0)').addClass('--top');
        }
    }
});
$('.js-generate-kd').click(function() {
    if (!$(this).hasClass('button--disabled')) {
        $(this).addClass('button--disabled');
        // Creates a random value from 4-9
        var totalAmount = getRndInteger(4, 10);
        var numbersArray = [];
        // Creates 3 numbers first, because there needs to be one for each block
        var num = getRndInteger(1, 4);
        numbersArray.push(num);
        num = getRndInteger(4, 7);
        numbersArray.push(num);
        num = getRndInteger(7, 10);
        numbersArray.push(num);
        totalAmount = totalAmount - 3; // Deducts the total amount
        // Now it makes a new number between 1-9 for the remainder amount. Checking for doubles
        for (var i = 1; i <= totalAmount; i++) {
            var success = 0;
            var newnum;
            do {
                newnum = getRndInteger(1, 10);
                if ($.inArray(newnum, numbersArray) == -1) {
                    numbersArray.push(newnum);
                    success = 1;
                }
            } while (success == 0);
        }
        numbersArray.sort();

        var imgsource = returnImgsource(numbersArray[0]);
        var delay = 500;
        $('.js-to-delete').remove();
        $('#js-toCopy').attr('src', imgsource);
        setTimeout(function() {
            $('#js-toCopy').addClass('king-dice-group__image--visible');
        }, 10);
        setTimeout(function() {
            generateMiniBosses(numbersArray, 1, delay);
        }, delay);
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbGZ1bmN0aW9ucy5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Um5kSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5mdW5jdGlvbiByZXR1cm5JbWdzb3VyY2UobnVtKSB7XHJcbiAgICB2YXIgYXIgPSBbXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvdGlwc3ktdHJvb3AucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9jaGlwcy1iZXR0aWdhbi5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL21yLXdoZWV6eS5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL3BpcC1hbmQtZG90LnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvaG9wdXMtcG9jdXMucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9waGVhci1sYXAucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9waXJvdWxldHRhLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvbWFuZ29zdGVlbi5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL21yLWNoaW1lcy5wbmcnXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIGFyW251bSAtIDFdO1xyXG59XHJcbmZ1bmN0aW9uIHJhbmRvbVN0cmluZzIobGVuLCBiZWZvcmVzdHIgPSAnJywgYXJyYXl0b2NoZWNrID0gbnVsbCkge1xyXG4gICAgLy8gQ2hhcnNldCwgZXZlcnkgY2hhcmFjdGVyIGluIHRoaXMgc3RyaW5nIGlzIGFuIG9wdGlvbmFsIG9uZSBpdCBjYW4gdXNlIGFzIGEgcmFuZG9tIGNoYXJhY3Rlci5cclxuICAgIHZhciBjaGFyU2V0ID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xyXG4gICAgdmFyIHJhbmRvbVN0cmluZyA9ICcnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIC8vIGNyZWF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gMCBhbmQgdGhlIGNoYXJTZXQgbGVuZ3RoLiBSb3VuZHMgaXQgZG93biB0byBhIHdob2xlIG51bWJlclxyXG4gICAgICAgIHZhciByYW5kb21Qb3ogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyU2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgcmFuZG9tU3RyaW5nICs9IGNoYXJTZXQuc3Vic3RyaW5nKHJhbmRvbVBveiwgcmFuZG9tUG96ICsgMSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhbiBhcnJheSBpcyBnaXZlbiBpdCB3aWxsIGNoZWNrIHRoZSBhcnJheSwgYW5kIGlmIHRoZSBnZW5lcmF0ZWQgc3RyaW5nIGV4aXN0cyBpbiBpdCBpdCB3aWxsIGNyZWF0ZSBhIG5ldyBvbmUgdW50aWwgYSB1bmlxdWUgb25lIGlzIGZvdW5kICpXQVRDSCBPVVQuIElmIGFsbCBhdmFpbGFibGUgb3B0aW9ucyBhcmUgdXNlZCBpdCB3aWxsIGNhdXNlIGEgbG9vcCBpdCBjYW5ub3QgYnJlYWsgb3V0KlxyXG4gICAgaWYgKGFycmF5dG9jaGVjayA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGlzSW4gPSAkLmluQXJyYXkoYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nLCBhcnJheXRvY2hlY2spOyAvLyBjaGVja3MgaWYgdGhlIHN0cmluZyBpcyBpbiB0aGUgYXJyYXksIHJldHVybnMgYSBwb3NpdGlvblxyXG4gICAgICAgIGlmIChpc0luID4gLTEpIHtcclxuICAgICAgICAgICAgLy8gaWYgdGhlIHBvc2l0aW9uIGlzIG5vdCAtMSAobWVhbmluZywgaXQgaXMgbm90IGluIHRoZSBhcnJheSkgaXQgd2lsbCBzdGFydCBkb2luZyBhIGxvb3BcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tU3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmRvbVBveiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJTZXQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21TdHJpbmcgKz0gY2hhclNldC5zdWJzdHJpbmcocmFuZG9tUG96LCByYW5kb21Qb3ogKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzSW4gPSAkLmluQXJyYXkoYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nLCBhcnJheXRvY2hlY2spO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfSB3aGlsZSAoaXNJbiA+IC0xKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0IHRvb2sgJyArIGNvdW50ICsgJyB0cmllcycpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmVzdHIgKyByYW5kb21TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgY291bnQsIGVsZW1Db3VudCwgbnVtb2Z0aW1lcywgY2hlY2tkdXBlKSB7XHJcbiAgICAvLyBEaXNhYmxlcyB0aGUgYnV0dG9uIGZvciB0aGUgY2hlY2tlZCBjbGFzcy5cclxuICAgIHZhciBjdXJyZW50RWxlbSA9ICQoJy4nICsgY2wgKyAnOmVxKCcgKyAoZWxlbUNvdW50IC0gMSkgKyAnKScpO1xyXG4gICAgdmFyIG5leHRFbGVtID0gJCgnLicgKyBjbCArICc6ZXEoJyArIGVsZW1Db3VudCArICcpJyk7XHJcbiAgICB2YXIgZGVsYXkgPSBNYXRoLmZsb29yKDUwMCAvIChudW1vZnRpbWVzIC0gY291bnQpKTtcclxuICAgIHZhciBuYW1lID0gJChuZXh0RWxlbSkuZGF0YSgnbmFtZScpO1xyXG4gICAgJChjdXJyZW50RWxlbSkucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAkKG5leHRFbGVtKS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgIC8vIFJvdGF0ZXMgYmV0d2VlbiB0aGUgZWxlbWVudHNcclxuICAgIGlmIChlbGVtQ291bnQgPCBudW1JdGVtcykge1xyXG4gICAgICAgIGVsZW1Db3VudCsrO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtQ291bnQgPT0gbnVtSXRlbXMpIHtcclxuICAgICAgICBlbGVtQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3VudCA8IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBpZiB0aGUgbG9vcCBpcyBub3Qgb3ZlciBpdCBzdGFydHMgYWdhaW4sIGdpdmluZyB0aGUgdXBkYXRlZCBkYXRhXHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBHZW5lcmF0ZVJhbmRvbShcclxuICAgICAgICAgICAgICAgIGNsLFxyXG4gICAgICAgICAgICAgICAgbnVtSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBjb3VudCxcclxuICAgICAgICAgICAgICAgIGVsZW1Db3VudCxcclxuICAgICAgICAgICAgICAgIG51bW9mdGltZXMsXHJcbiAgICAgICAgICAgICAgICBjaGVja2R1cGVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50ID09IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBJZiB0aGUgY3ljbGUgaXMgYWxsIGRvbmUgdGhpcyBoYXBwZW5zXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIGNoZWNrZWQgZm9yIGR1cGxpY2F0ZXMgaXQgaXMgZG9uZSB0aGVyZVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdudWxsJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIGNoZWNrZHVwZSAhPSAnJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkKCcuJyArIGNoZWNrZHVwZSArICdbZGF0YS1uYW1lPScgKyBuYW1lICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy0nICsgY2hlY2tkdXBlICsgJy1idXR0b24nKS5yZW1vdmVDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGRzIHRoZSB0ZXh0IHRvIHRoZSBzdW1tYXJ5XHJcbiAgICAgICAgJCgnLmpzLScgKyBjbCArICctc3VtbWFyeS10ZXh0JykuaHRtbChuYW1lKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVycywgY291bnQsIGRlbGF5KSB7XHJcbiAgICB2YXIgcmFuZG9tc3RyID0gcmFuZG9tU3RyaW5nMigxNSk7XHJcbiAgICAkKCcjanMtdG9Db3B5JylcclxuICAgICAgICAuY2xvbmUoKVxyXG4gICAgICAgIC5hcHBlbmRUbygnI2pzLXRvQXBwZW5kJylcclxuICAgICAgICAuYXR0cignaWQnLCByYW5kb21zdHIpXHJcbiAgICAgICAgLmF0dHIoJ3NyYycsIHJldHVybkltZ3NvdXJjZShudW1iZXJzW2NvdW50XSkpXHJcbiAgICAgICAgLmFkZENsYXNzKCdqcy10by1kZWxldGUnKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygna2luZy1kaWNlLWdyb3VwX19pbWFnZS0tdmlzaWJsZScpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjJyArIHJhbmRvbXN0cikuYWRkQ2xhc3MoJ2tpbmctZGljZS1ncm91cF9faW1hZ2UtLXZpc2libGUnKTtcclxuICAgIH0sIDEwKTtcclxuICAgIGlmIChjb3VudCA8IG51bWJlcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVNaW5pQm9zc2VzKG51bWJlcnMsIGNvdW50LCBkZWxheSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuanMtZ2VuZXJhdGUta2QnKS5yZW1vdmVDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG59XHJcbiIsIiQoJy5qcy1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vIElmIHRoZSBidXR0b24gaXMgZGlzYWJsZWQgdGhpcyBkb2VzIG5vdGhpbmdcclxuICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgLy8gR2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGUgXCJjaGVja1wiIHRvIHNlZSB3aGljaCBvbmUgbmVlZHMgdG8gYmUgY2hlY2tlZCBmb3IgZHVwbGljYXRlc1xyXG4gICAgICAgIHZhciBjaGVja2R1cGUgPSAkKHRoaXMpLmRhdGEoJ2NoZWNrJyk7XHJcbiAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlKTsgLy8gSWYgb25lIGlzIGFscmVhZHkgbWFya2VkIGFzIGEgZHVwbGljYXRlIHRoZSBtYXJrIGlzIHJlbW92ZWRcclxuICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykuYWRkQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTsgLy8gRGlzYWJsZXMgdGhlIGJ1dHRvbiBmb3IgdGhlIGNoZWNrZWQgY2xhc3MuXHJcbiAgICAgICAgdmFyIGNsID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpOyAvLyBHZXRzIHRoZSBjbGFzc1xyXG4gICAgICAgIHZhciBudW1JdGVtcyA9ICQoJy4nICsgY2wgKyAnJykubGVuZ3RoIC0gMTsgLy8gYmFzZWQgb24gMFxyXG4gICAgICAgIHZhciBjb3VudCA9IDE7XHJcbiAgICAgICAgdmFyIGVsZW1Db3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG51bW9mdGltZXMgPSBnZXRSbmRJbnRlZ2VyKDEwMCwgMjAwKTsgLy8gR2V0cyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAyIG51bWJlcnNcclxuICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSk7XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcuanMtYWxsb3dzcGVjaWZpYycpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpO1xyXG4gICAgLy8gQ2hlY2tzIHdoYXQgc3RyaW5nIHNob3VsZCBiZSBpbiB0aGUgXCJkYXRhLW5hbWVcIiBhdHRyIHRvIG5vdCBiZSBhbGxvd2VkXHJcbiAgICB2YXIgdG9jaGVjayA9ICQodGhpcykuZGF0YSgnbmFtZXRvY2hlY2snKTtcclxuICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnLicgKyBuYW1lICsgJy0tbm90LWFsbG93ZWRbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZWxlbSA9ICQoJy4nICsgbmFtZSArICdbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKTtcclxuICAgICAgICAkKGVsZW0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICAgICAgaWYgKCQoZWxlbSkuaGFzQ2xhc3MoJy0tdG9wJykpIHtcclxuICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICAgICAgICAgJCgnLicgKyBuYW1lICsgJzplcSgwKScpLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiQoJy5qcy1nZW5lcmF0ZS1rZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdidXR0b24tLWRpc2FibGVkJykpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICAgICAgLy8gQ3JlYXRlcyBhIHJhbmRvbSB2YWx1ZSBmcm9tIDQtOVxyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudCA9IGdldFJuZEludGVnZXIoNCwgMTApO1xyXG4gICAgICAgIHZhciBudW1iZXJzQXJyYXkgPSBbXTtcclxuICAgICAgICAvLyBDcmVhdGVzIDMgbnVtYmVycyBmaXJzdCwgYmVjYXVzZSB0aGVyZSBuZWVkcyB0byBiZSBvbmUgZm9yIGVhY2ggYmxvY2tcclxuICAgICAgICB2YXIgbnVtID0gZ2V0Um5kSW50ZWdlcigxLCA0KTtcclxuICAgICAgICBudW1iZXJzQXJyYXkucHVzaChudW0pO1xyXG4gICAgICAgIG51bSA9IGdldFJuZEludGVnZXIoNCwgNyk7XHJcbiAgICAgICAgbnVtYmVyc0FycmF5LnB1c2gobnVtKTtcclxuICAgICAgICBudW0gPSBnZXRSbmRJbnRlZ2VyKDcsIDEwKTtcclxuICAgICAgICBudW1iZXJzQXJyYXkucHVzaChudW0pO1xyXG4gICAgICAgIHRvdGFsQW1vdW50ID0gdG90YWxBbW91bnQgLSAzOyAvLyBEZWR1Y3RzIHRoZSB0b3RhbCBhbW91bnRcclxuICAgICAgICAvLyBOb3cgaXQgbWFrZXMgYSBuZXcgbnVtYmVyIGJldHdlZW4gMS05IGZvciB0aGUgcmVtYWluZGVyIGFtb3VudC4gQ2hlY2tpbmcgZm9yIGRvdWJsZXNcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB0b3RhbEFtb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gMDtcclxuICAgICAgICAgICAgdmFyIG5ld251bTtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgbmV3bnVtID0gZ2V0Um5kSW50ZWdlcigxLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld251bSwgbnVtYmVyc0FycmF5KSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcnNBcnJheS5wdXNoKG5ld251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHN1Y2Nlc3MgPT0gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bWJlcnNBcnJheS5zb3J0KCk7XHJcblxyXG4gICAgICAgIHZhciBpbWdzb3VyY2UgPSByZXR1cm5JbWdzb3VyY2UobnVtYmVyc0FycmF5WzBdKTtcclxuICAgICAgICB2YXIgZGVsYXkgPSA1MDA7XHJcbiAgICAgICAgJCgnLmpzLXRvLWRlbGV0ZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJyNqcy10b0NvcHknKS5hdHRyKCdzcmMnLCBpbWdzb3VyY2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNqcy10b0NvcHknKS5hZGRDbGFzcygna2luZy1kaWNlLWdyb3VwX19pbWFnZS0tdmlzaWJsZScpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVyc0FycmF5LCAxLCBkZWxheSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG59KTtcclxuIl19

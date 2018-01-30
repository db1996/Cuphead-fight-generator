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
            GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe);
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbGZ1bmN0aW9ucy5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Um5kSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5mdW5jdGlvbiByZXR1cm5JbWdzb3VyY2UobnVtKSB7XHJcbiAgICB2YXIgYXIgPSBbXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvdGlwc3ktdHJvb3AucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9jaGlwcy1iZXR0aWdhbi5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL21yLXdoZWV6eS5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL3BpcC1hbmQtZG90LnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvaG9wdXMtcG9jdXMucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9waGVhci1sYXAucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9waXJvdWxldHRhLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvbWFuZ29zdGVlbi5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL21yLWNoaW1lcy5wbmcnXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIGFyW251bSAtIDFdO1xyXG59XHJcbmZ1bmN0aW9uIHJhbmRvbVN0cmluZzIobGVuLCBiZWZvcmVzdHIgPSAnJywgYXJyYXl0b2NoZWNrID0gbnVsbCkge1xyXG4gICAgLy8gQ2hhcnNldCwgZXZlcnkgY2hhcmFjdGVyIGluIHRoaXMgc3RyaW5nIGlzIGFuIG9wdGlvbmFsIG9uZSBpdCBjYW4gdXNlIGFzIGEgcmFuZG9tIGNoYXJhY3Rlci5cclxuICAgIHZhciBjaGFyU2V0ID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xyXG4gICAgdmFyIHJhbmRvbVN0cmluZyA9ICcnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIC8vIGNyZWF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gMCBhbmQgdGhlIGNoYXJTZXQgbGVuZ3RoLiBSb3VuZHMgaXQgZG93biB0byBhIHdob2xlIG51bWJlclxyXG4gICAgICAgIHZhciByYW5kb21Qb3ogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyU2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgcmFuZG9tU3RyaW5nICs9IGNoYXJTZXQuc3Vic3RyaW5nKHJhbmRvbVBveiwgcmFuZG9tUG96ICsgMSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhbiBhcnJheSBpcyBnaXZlbiBpdCB3aWxsIGNoZWNrIHRoZSBhcnJheSwgYW5kIGlmIHRoZSBnZW5lcmF0ZWQgc3RyaW5nIGV4aXN0cyBpbiBpdCBpdCB3aWxsIGNyZWF0ZSBhIG5ldyBvbmUgdW50aWwgYSB1bmlxdWUgb25lIGlzIGZvdW5kICpXQVRDSCBPVVQuIElmIGFsbCBhdmFpbGFibGUgb3B0aW9ucyBhcmUgdXNlZCBpdCB3aWxsIGNhdXNlIGEgbG9vcCBpdCBjYW5ub3QgYnJlYWsgb3V0KlxyXG4gICAgaWYgKGFycmF5dG9jaGVjayA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGlzSW4gPSAkLmluQXJyYXkoYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nLCBhcnJheXRvY2hlY2spOyAvLyBjaGVja3MgaWYgdGhlIHN0cmluZyBpcyBpbiB0aGUgYXJyYXksIHJldHVybnMgYSBwb3NpdGlvblxyXG4gICAgICAgIGlmIChpc0luID4gLTEpIHtcclxuICAgICAgICAgICAgLy8gaWYgdGhlIHBvc2l0aW9uIGlzIG5vdCAtMSAobWVhbmluZywgaXQgaXMgbm90IGluIHRoZSBhcnJheSkgaXQgd2lsbCBzdGFydCBkb2luZyBhIGxvb3BcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tU3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmRvbVBveiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJTZXQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21TdHJpbmcgKz0gY2hhclNldC5zdWJzdHJpbmcocmFuZG9tUG96LCByYW5kb21Qb3ogKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzSW4gPSAkLmluQXJyYXkoYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nLCBhcnJheXRvY2hlY2spO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfSB3aGlsZSAoaXNJbiA+IC0xKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0IHRvb2sgJyArIGNvdW50ICsgJyB0cmllcycpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmVzdHIgKyByYW5kb21TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgY291bnQsIGVsZW1Db3VudCwgbnVtb2Z0aW1lcywgY2hlY2tkdXBlKSB7XHJcbiAgICAvLyBEaXNhYmxlcyB0aGUgYnV0dG9uIGZvciB0aGUgY2hlY2tlZCBjbGFzcy5cclxuICAgIHZhciBjdXJyZW50RWxlbSA9ICQoJy4nICsgY2wgKyAnOmVxKCcgKyAoZWxlbUNvdW50IC0gMSkgKyAnKScpO1xyXG4gICAgdmFyIG5leHRFbGVtID0gJCgnLicgKyBjbCArICc6ZXEoJyArIGVsZW1Db3VudCArICcpJyk7XHJcbiAgICB2YXIgZGVsYXkgPSBNYXRoLmZsb29yKDUwMCAvIChudW1vZnRpbWVzIC0gY291bnQpKTtcclxuICAgIHZhciBuYW1lID0gJChuZXh0RWxlbSkuZGF0YSgnbmFtZScpO1xyXG4gICAgJChjdXJyZW50RWxlbSkucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAkKG5leHRFbGVtKS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgIC8vIFJvdGF0ZXMgYmV0d2VlbiB0aGUgZWxlbWVudHNcclxuICAgIGlmIChlbGVtQ291bnQgPCBudW1JdGVtcykge1xyXG4gICAgICAgIGVsZW1Db3VudCsrO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtQ291bnQgPT0gbnVtSXRlbXMpIHtcclxuICAgICAgICBlbGVtQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3VudCA8IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBpZiB0aGUgbG9vcCBpcyBub3Qgb3ZlciBpdCBzdGFydHMgYWdhaW4sIGdpdmluZyB0aGUgdXBkYXRlZCBkYXRhXHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VudCA9PSBudW1vZnRpbWVzKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGN5Y2xlIGlzIGFsbCBkb25lIHRoaXMgaGFwcGVuc1xyXG4gICAgICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBjaGVja2VkIGZvciBkdXBsaWNhdGVzIGl0IGlzIGRvbmUgdGhlcmVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHR5cGVvZiBjaGVja2R1cGUgIT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnbnVsbCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBjaGVja2R1cGUgIT0gJydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnW2RhdGEtbmFtZT0nICsgbmFtZSArICddJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlICsgJy0tZHVwZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkcyB0aGUgdGV4dCB0byB0aGUgc3VtbWFyeVxyXG4gICAgICAgICQoJy5qcy0nICsgY2wgKyAnLXN1bW1hcnktdGV4dCcpLmh0bWwobmFtZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVNaW5pQm9zc2VzKG51bWJlcnMsIGNvdW50LCBkZWxheSkge1xyXG4gICAgdmFyIHJhbmRvbXN0ciA9IHJhbmRvbVN0cmluZzIoMTUpO1xyXG4gICAgJCgnI2pzLXRvQ29weScpXHJcbiAgICAgICAgLmNsb25lKClcclxuICAgICAgICAuYXBwZW5kVG8oJyNqcy10b0FwcGVuZCcpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgcmFuZG9tc3RyKVxyXG4gICAgICAgIC5hdHRyKCdzcmMnLCByZXR1cm5JbWdzb3VyY2UobnVtYmVyc1tjb3VudF0pKVxyXG4gICAgICAgIC5hZGRDbGFzcygnanMtdG8tZGVsZXRlJylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2tpbmctZGljZS1ncm91cF9faW1hZ2UtLXZpc2libGUnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnIycgKyByYW5kb21zdHIpLmFkZENsYXNzKCdraW5nLWRpY2UtZ3JvdXBfX2ltYWdlLS12aXNpYmxlJyk7XHJcbiAgICB9LCAxMCk7XHJcbiAgICBpZiAoY291bnQgPCBudW1iZXJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlTWluaUJvc3NlcyhudW1iZXJzLCBjb3VudCwgZGVsYXkpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgIH1cclxufVxyXG4iLCIkKCcuanMtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGRpc2FibGVkIHRoaXMgZG9lcyBub3RoaW5nXHJcbiAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIC8vIEdldHMgdGhlIGRhdGEgYXR0cmlidXRlIFwiY2hlY2tcIiB0byBzZWUgd2hpY2ggb25lIG5lZWRzIHRvIGJlIGNoZWNrZWQgZm9yIGR1cGxpY2F0ZXNcclxuICAgICAgICB2YXIgY2hlY2tkdXBlID0gJCh0aGlzKS5kYXRhKCdjaGVjaycpO1xyXG4gICAgICAgICQoJy4nICsgY2hlY2tkdXBlICsgJy0tZHVwZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGNoZWNrZHVwZSk7IC8vIElmIG9uZSBpcyBhbHJlYWR5IG1hcmtlZCBhcyBhIGR1cGxpY2F0ZSB0aGUgbWFyayBpcyByZW1vdmVkXHJcbiAgICAgICAgJCgnLmpzLScgKyBjaGVja2R1cGUgKyAnLWJ1dHRvbicpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7IC8vIERpc2FibGVzIHRoZSBidXR0b24gZm9yIHRoZSBjaGVja2VkIGNsYXNzLlxyXG4gICAgICAgIHZhciBjbCA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTsgLy8gR2V0cyB0aGUgY2xhc3NcclxuICAgICAgICB2YXIgbnVtSXRlbXMgPSAkKCcuJyArIGNsICsgJycpLmxlbmd0aCAtIDE7IC8vIGJhc2VkIG9uIDBcclxuICAgICAgICB2YXIgY291bnQgPSAxO1xyXG4gICAgICAgIHZhciBlbGVtQ291bnQgPSAwO1xyXG4gICAgICAgIHZhciBudW1vZnRpbWVzID0gZ2V0Um5kSW50ZWdlcigxMDAsIDIwMCk7IC8vIEdldHMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gMiBudW1iZXJzXHJcbiAgICAgICAgR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBjb3VudCwgZWxlbUNvdW50LCBudW1vZnRpbWVzLCBjaGVja2R1cGUpO1xyXG4gICAgfVxyXG59KTtcclxuJCgnLmpzLWFsbG93c3BlY2lmaWMnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTtcclxuICAgIC8vIENoZWNrcyB3aGF0IHN0cmluZyBzaG91bGQgYmUgaW4gdGhlIFwiZGF0YS1uYW1lXCIgYXR0ciB0byBub3QgYmUgYWxsb3dlZFxyXG4gICAgdmFyIHRvY2hlY2sgPSAkKHRoaXMpLmRhdGEoJ25hbWV0b2NoZWNrJyk7XHJcbiAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICQoJy4nICsgbmFtZSArICctLW5vdC1hbGxvd2VkW2RhdGEtbmFtZT0nICsgdG9jaGVjayArICddJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKG5hbWUpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lICsgJy0tbm90LWFsbG93ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSAkKCcuJyArIG5hbWUgKyAnW2RhdGEtbmFtZT0nICsgdG9jaGVjayArICddJyk7XHJcbiAgICAgICAgJChlbGVtKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgICAgIGlmICgkKGVsZW0pLmhhc0NsYXNzKCctLXRvcCcpKSB7XHJcbiAgICAgICAgICAgICQoZWxlbSkucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAgICAgICAgICQoJy4nICsgbmFtZSArICc6ZXEoMCknKS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcuanMtZ2VuZXJhdGUta2QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vIENyZWF0ZXMgYSByYW5kb20gdmFsdWUgZnJvbSA0LTlcclxuICAgIHZhciB0b3RhbEFtb3VudCA9IGdldFJuZEludGVnZXIoNCwgMTApO1xyXG4gICAgdmFyIG51bWJlcnNBcnJheSA9IFtdO1xyXG4gICAgLy8gQ3JlYXRlcyAzIG51bWJlcnMgZmlyc3QsIGJlY2F1c2UgdGhlcmUgbmVlZHMgdG8gYmUgb25lIGZvciBlYWNoIGJsb2NrXHJcbiAgICB2YXIgbnVtID0gZ2V0Um5kSW50ZWdlcigxLCA0KTtcclxuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bSk7XHJcbiAgICBudW0gPSBnZXRSbmRJbnRlZ2VyKDQsIDcpO1xyXG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtKTtcclxuICAgIG51bSA9IGdldFJuZEludGVnZXIoNywgMTApO1xyXG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtKTtcclxuICAgIHRvdGFsQW1vdW50ID0gdG90YWxBbW91bnQgLSAzOyAvLyBEZWR1Y3RzIHRoZSB0b3RhbCBhbW91bnRcclxuICAgIC8vIE5vdyBpdCBtYWtlcyBhIG5ldyBudW1iZXIgYmV0d2VlbiAxLTkgZm9yIHRoZSByZW1haW5kZXIgYW1vdW50LiBDaGVja2luZyBmb3IgZG91Ymxlc1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gdG90YWxBbW91bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gMDtcclxuICAgICAgICB2YXIgbmV3bnVtO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbmV3bnVtID0gZ2V0Um5kSW50ZWdlcigxLCAxMCk7XHJcbiAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3bnVtLCBudW1iZXJzQXJyYXkpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJzQXJyYXkucHVzaChuZXdudW0pO1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlIChzdWNjZXNzID09IDApO1xyXG4gICAgfVxyXG4gICAgbnVtYmVyc0FycmF5LnNvcnQoKTtcclxuXHJcbiAgICB2YXIgaW1nc291cmNlID0gcmV0dXJuSW1nc291cmNlKG51bWJlcnNBcnJheVswXSk7XHJcbiAgICB2YXIgZGVsYXkgPSA1MDA7XHJcbiAgICAkKCcuanMtdG8tZGVsZXRlJykucmVtb3ZlKCk7XHJcbiAgICAkKCcjanMtdG9Db3B5JykuYXR0cignc3JjJywgaW1nc291cmNlKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI2pzLXRvQ29weScpLmFkZENsYXNzKCdraW5nLWRpY2UtZ3JvdXBfX2ltYWdlLS12aXNpYmxlJyk7XHJcbiAgICB9LCAxMCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGdlbmVyYXRlTWluaUJvc3NlcyhudW1iZXJzQXJyYXksIDEsIGRlbGF5KTtcclxuICAgIH0sIGRlbGF5KTtcclxufSk7XHJcbiJdfQ==

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

$('.js-button').click(function() {
    // If the button is disabled this does nothing
    if (!$(this).hasClass('button--disabled')) {
        $(this).addClass('button--disabled');
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
        GenerateRandom(cl, numItems, count, elemCount, numoftimes, checkdupe, $(this));
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
        for (var i = 3; i < 9; i++) {
            $('#js-toAppend').removeClass('king-dice-group--' + i + '-item');
        }
        $('#js-toAppend').addClass('king-dice-group--' + totalAmount + '-item');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbGZ1bmN0aW9ucy5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFJuZEludGVnZXIobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbn1cclxuZnVuY3Rpb24gcmV0dXJuSW1nc291cmNlKG51bSkge1xyXG4gICAgdmFyIGFyID0gW1xyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL3RpcHN5LXRyb29wLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvY2hpcHMtYmV0dGlnYW4ucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9tci13aGVlenkucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9waXAtYW5kLWRvdC5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL2hvcHVzLXBvY3VzLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvcGhlYXItbGFwLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvcGlyb3VsZXR0YS5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL21hbmdvc3RlZW4ucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9tci1jaGltZXMucG5nJ1xyXG4gICAgXTtcclxuICAgIHJldHVybiBhcltudW0gLSAxXTtcclxufVxyXG5mdW5jdGlvbiByYW5kb21TdHJpbmcyKGxlbiwgYmVmb3Jlc3RyID0gJycsIGFycmF5dG9jaGVjayA9IG51bGwpIHtcclxuICAgIC8vIENoYXJzZXQsIGV2ZXJ5IGNoYXJhY3RlciBpbiB0aGlzIHN0cmluZyBpcyBhbiBvcHRpb25hbCBvbmUgaXQgY2FuIHVzZSBhcyBhIHJhbmRvbSBjaGFyYWN0ZXIuXHJcbiAgICB2YXIgY2hhclNldCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcclxuICAgIHZhciByYW5kb21TdHJpbmcgPSAnJztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAvLyBjcmVhdGVzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIDAgYW5kIHRoZSBjaGFyU2V0IGxlbmd0aC4gUm91bmRzIGl0IGRvd24gdG8gYSB3aG9sZSBudW1iZXJcclxuICAgICAgICB2YXIgcmFuZG9tUG96ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhclNldC5sZW5ndGgpO1xyXG4gICAgICAgIHJhbmRvbVN0cmluZyArPSBjaGFyU2V0LnN1YnN0cmluZyhyYW5kb21Qb3osIHJhbmRvbVBveiArIDEpO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYW4gYXJyYXkgaXMgZ2l2ZW4gaXQgd2lsbCBjaGVjayB0aGUgYXJyYXksIGFuZCBpZiB0aGUgZ2VuZXJhdGVkIHN0cmluZyBleGlzdHMgaW4gaXQgaXQgd2lsbCBjcmVhdGUgYSBuZXcgb25lIHVudGlsIGEgdW5pcXVlIG9uZSBpcyBmb3VuZCAqV0FUQ0ggT1VULiBJZiBhbGwgYXZhaWxhYmxlIG9wdGlvbnMgYXJlIHVzZWQgaXQgd2lsbCBjYXVzZSBhIGxvb3AgaXQgY2Fubm90IGJyZWFrIG91dCpcclxuICAgIGlmIChhcnJheXRvY2hlY2sgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBiZWZvcmVzdHIgKyByYW5kb21TdHJpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBpc0luID0gJC5pbkFycmF5KGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZywgYXJyYXl0b2NoZWNrKTsgLy8gY2hlY2tzIGlmIHRoZSBzdHJpbmcgaXMgaW4gdGhlIGFycmF5LCByZXR1cm5zIGEgcG9zaXRpb25cclxuICAgICAgICBpZiAoaXNJbiA+IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBwb3NpdGlvbiBpcyBub3QgLTEgKG1lYW5pbmcsIGl0IGlzIG5vdCBpbiB0aGUgYXJyYXkpIGl0IHdpbGwgc3RhcnQgZG9pbmcgYSBsb29wXHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21Qb3ogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyU2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tU3RyaW5nICs9IGNoYXJTZXQuc3Vic3RyaW5nKHJhbmRvbVBveiwgcmFuZG9tUG96ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc0luID0gJC5pbkFycmF5KGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZywgYXJyYXl0b2NoZWNrKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGlzSW4gPiAtMSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdCB0b29rICcgKyBjb3VudCArICcgdHJpZXMnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSwgZWxlbSkge1xyXG4gICAgLy8gRGlzYWJsZXMgdGhlIGJ1dHRvbiBmb3IgdGhlIGNoZWNrZWQgY2xhc3MuXHJcbiAgICB2YXIgY3VycmVudEVsZW0gPSAkKCcuJyArIGNsICsgJzplcSgnICsgKGVsZW1Db3VudCAtIDEpICsgJyknKTtcclxuICAgIHZhciBuZXh0RWxlbSA9ICQoJy4nICsgY2wgKyAnOmVxKCcgKyBlbGVtQ291bnQgKyAnKScpO1xyXG4gICAgdmFyIGRlbGF5ID0gTWF0aC5mbG9vcig1MDAgLyAobnVtb2Z0aW1lcyAtIGNvdW50KSk7XHJcbiAgICB2YXIgbmFtZSA9ICQobmV4dEVsZW0pLmRhdGEoJ25hbWUnKTtcclxuICAgICQoY3VycmVudEVsZW0pLnJlbW92ZUNsYXNzKCctLXRvcCcpO1xyXG4gICAgJChuZXh0RWxlbSkuYWRkQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAvLyBSb3RhdGVzIGJldHdlZW4gdGhlIGVsZW1lbnRzXHJcbiAgICBpZiAoZWxlbUNvdW50IDwgbnVtSXRlbXMpIHtcclxuICAgICAgICBlbGVtQ291bnQrKztcclxuICAgIH0gZWxzZSBpZiAoZWxlbUNvdW50ID09IG51bUl0ZW1zKSB7XHJcbiAgICAgICAgZWxlbUNvdW50ID0gMDtcclxuICAgIH1cclxuICAgIGlmIChjb3VudCA8IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBpZiB0aGUgbG9vcCBpcyBub3Qgb3ZlciBpdCBzdGFydHMgYWdhaW4sIGdpdmluZyB0aGUgdXBkYXRlZCBkYXRhXHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSwgZWxlbSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VudCA9PSBudW1vZnRpbWVzKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGN5Y2xlIGlzIGFsbCBkb25lIHRoaXMgaGFwcGVuc1xyXG4gICAgICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBjaGVja2VkIGZvciBkdXBsaWNhdGVzIGl0IGlzIGRvbmUgdGhlcmVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHR5cGVvZiBjaGVja2R1cGUgIT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnbnVsbCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBjaGVja2R1cGUgIT0gJydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnW2RhdGEtbmFtZT0nICsgbmFtZSArICddJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlICsgJy0tZHVwZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkcyB0aGUgdGV4dCB0byB0aGUgc3VtbWFyeVxyXG4gICAgICAgICQoJy5qcy0nICsgY2wgKyAnLXN1bW1hcnktdGV4dCcpLmh0bWwobmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XHJcbiAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlTWluaUJvc3NlcyhudW1iZXJzLCBjb3VudCwgZGVsYXkpIHtcclxuICAgIHZhciByYW5kb21zdHIgPSByYW5kb21TdHJpbmcyKDE1KTtcclxuICAgICQoJyNqcy10b0NvcHknKVxyXG4gICAgICAgIC5jbG9uZSgpXHJcbiAgICAgICAgLmFwcGVuZFRvKCcjanMtdG9BcHBlbmQnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsIHJhbmRvbXN0cilcclxuICAgICAgICAuYXR0cignc3JjJywgcmV0dXJuSW1nc291cmNlKG51bWJlcnNbY291bnRdKSlcclxuICAgICAgICAuYWRkQ2xhc3MoJ2pzLXRvLWRlbGV0ZScpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdraW5nLWRpY2UtZ3JvdXBfX2ltYWdlLS12aXNpYmxlJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyMnICsgcmFuZG9tc3RyKS5hZGRDbGFzcygna2luZy1kaWNlLWdyb3VwX19pbWFnZS0tdmlzaWJsZScpO1xyXG4gICAgfSwgMTApO1xyXG4gICAgaWYgKGNvdW50IDwgbnVtYmVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVycywgY291bnQsIGRlbGF5KTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5qcy1nZW5lcmF0ZS1rZCcpLnJlbW92ZUNsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiJCgnLmpzLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGlzIGRvZXMgbm90aGluZ1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdidXR0b24tLWRpc2FibGVkJykpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICAgICAgLy8gR2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGUgXCJjaGVja1wiIHRvIHNlZSB3aGljaCBvbmUgbmVlZHMgdG8gYmUgY2hlY2tlZCBmb3IgZHVwbGljYXRlc1xyXG4gICAgICAgIHZhciBjaGVja2R1cGUgPSAkKHRoaXMpLmRhdGEoJ2NoZWNrJyk7XHJcbiAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlKTsgLy8gSWYgb25lIGlzIGFscmVhZHkgbWFya2VkIGFzIGEgZHVwbGljYXRlIHRoZSBtYXJrIGlzIHJlbW92ZWRcclxuICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykuYWRkQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTsgLy8gRGlzYWJsZXMgdGhlIGJ1dHRvbiBmb3IgdGhlIGNoZWNrZWQgY2xhc3MuXHJcbiAgICAgICAgdmFyIGNsID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpOyAvLyBHZXRzIHRoZSBjbGFzc1xyXG4gICAgICAgIHZhciBudW1JdGVtcyA9ICQoJy4nICsgY2wgKyAnJykubGVuZ3RoIC0gMTsgLy8gYmFzZWQgb24gMFxyXG4gICAgICAgIHZhciBjb3VudCA9IDE7XHJcbiAgICAgICAgdmFyIGVsZW1Db3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG51bW9mdGltZXMgPSBnZXRSbmRJbnRlZ2VyKDEwMCwgMjAwKTsgLy8gR2V0cyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAyIG51bWJlcnNcclxuICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSwgJCh0aGlzKSk7XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcuanMtYWxsb3dzcGVjaWZpYycpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpO1xyXG4gICAgLy8gQ2hlY2tzIHdoYXQgc3RyaW5nIHNob3VsZCBiZSBpbiB0aGUgXCJkYXRhLW5hbWVcIiBhdHRyIHRvIG5vdCBiZSBhbGxvd2VkXHJcbiAgICB2YXIgdG9jaGVjayA9ICQodGhpcykuZGF0YSgnbmFtZXRvY2hlY2snKTtcclxuICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnLicgKyBuYW1lICsgJy0tbm90LWFsbG93ZWRbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZWxlbSA9ICQoJy4nICsgbmFtZSArICdbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKTtcclxuICAgICAgICAkKGVsZW0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICAgICAgaWYgKCQoZWxlbSkuaGFzQ2xhc3MoJy0tdG9wJykpIHtcclxuICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICAgICAgICAgJCgnLicgKyBuYW1lICsgJzplcSgwKScpLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiQoJy5qcy1nZW5lcmF0ZS1rZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdidXR0b24tLWRpc2FibGVkJykpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICAgICAgLy8gQ3JlYXRlcyBhIHJhbmRvbSB2YWx1ZSBmcm9tIDQtOVxyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudCA9IGdldFJuZEludGVnZXIoNCwgMTApO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAzOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgICQoJyNqcy10b0FwcGVuZCcpLnJlbW92ZUNsYXNzKCdraW5nLWRpY2UtZ3JvdXAtLScgKyBpICsgJy1pdGVtJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNqcy10b0FwcGVuZCcpLmFkZENsYXNzKCdraW5nLWRpY2UtZ3JvdXAtLScgKyB0b3RhbEFtb3VudCArICctaXRlbScpO1xyXG4gICAgICAgIHZhciBudW1iZXJzQXJyYXkgPSBbXTtcclxuICAgICAgICAvLyBDcmVhdGVzIDMgbnVtYmVycyBmaXJzdCwgYmVjYXVzZSB0aGVyZSBuZWVkcyB0byBiZSBvbmUgZm9yIGVhY2ggYmxvY2tcclxuICAgICAgICB2YXIgbnVtID0gZ2V0Um5kSW50ZWdlcigxLCA0KTtcclxuICAgICAgICBudW1iZXJzQXJyYXkucHVzaChudW0pO1xyXG4gICAgICAgIG51bSA9IGdldFJuZEludGVnZXIoNCwgNyk7XHJcbiAgICAgICAgbnVtYmVyc0FycmF5LnB1c2gobnVtKTtcclxuICAgICAgICBudW0gPSBnZXRSbmRJbnRlZ2VyKDcsIDEwKTtcclxuICAgICAgICBudW1iZXJzQXJyYXkucHVzaChudW0pO1xyXG4gICAgICAgIHRvdGFsQW1vdW50ID0gdG90YWxBbW91bnQgLSAzOyAvLyBEZWR1Y3RzIHRoZSB0b3RhbCBhbW91bnRcclxuICAgICAgICAvLyBOb3cgaXQgbWFrZXMgYSBuZXcgbnVtYmVyIGJldHdlZW4gMS05IGZvciB0aGUgcmVtYWluZGVyIGFtb3VudC4gQ2hlY2tpbmcgZm9yIGRvdWJsZXNcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB0b3RhbEFtb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gMDtcclxuICAgICAgICAgICAgdmFyIG5ld251bTtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgbmV3bnVtID0gZ2V0Um5kSW50ZWdlcigxLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld251bSwgbnVtYmVyc0FycmF5KSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcnNBcnJheS5wdXNoKG5ld251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHN1Y2Nlc3MgPT0gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bWJlcnNBcnJheS5zb3J0KCk7XHJcblxyXG4gICAgICAgIHZhciBpbWdzb3VyY2UgPSByZXR1cm5JbWdzb3VyY2UobnVtYmVyc0FycmF5WzBdKTtcclxuICAgICAgICB2YXIgZGVsYXkgPSA1MDA7XHJcbiAgICAgICAgJCgnLmpzLXRvLWRlbGV0ZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJyNqcy10b0NvcHknKS5hdHRyKCdzcmMnLCBpbWdzb3VyY2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNqcy10b0NvcHknKS5hZGRDbGFzcygna2luZy1kaWNlLWdyb3VwX19pbWFnZS0tdmlzaWJsZScpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVyc0FycmF5LCAxLCBkZWxheSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG59KTtcclxuIl19

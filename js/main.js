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
    var delay = 1000;
    $('#js-toCopy').attr('src', imgsource);
    setTimeout(function() {
        $('#js-toCopy').addClass('king-dice-group__image--visible');
    }, 10);
    setTimeout(function() {
        generateMiniBosses(numbersArray, 1, delay);
    }, delay);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbGZ1bmN0aW9ucy5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRSbmRJbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG59XHJcbmZ1bmN0aW9uIHJldHVybkltZ3NvdXJjZShudW0pIHtcclxuICAgIHZhciBhciA9IFtcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy90aXBzeS10cm9vcC5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL2NoaXBzLWJldHRpZ2FuLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvbXItd2hlZXp5LnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvcGlwLWFuZC1kb3QucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9ob3B1cy1wb2N1cy5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL3BoZWFyLWxhcC5wbmcnLFxyXG4gICAgICAgICdpbWcva2luZy1kaWNlLWljb25zL3Bpcm91bGV0dGEucG5nJyxcclxuICAgICAgICAnaW1nL2tpbmctZGljZS1pY29ucy9tYW5nb3N0ZWVuLnBuZycsXHJcbiAgICAgICAgJ2ltZy9raW5nLWRpY2UtaWNvbnMvbXItY2hpbWVzLnBuZydcclxuICAgIF07XHJcbiAgICByZXR1cm4gYXJbbnVtIC0gMV07XHJcbn1cclxuZnVuY3Rpb24gcmFuZG9tU3RyaW5nMihsZW4sIGJlZm9yZXN0ciA9ICcnLCBhcnJheXRvY2hlY2sgPSBudWxsKSB7XHJcbiAgICAvLyBDaGFyc2V0LCBldmVyeSBjaGFyYWN0ZXIgaW4gdGhpcyBzdHJpbmcgaXMgYW4gb3B0aW9uYWwgb25lIGl0IGNhbiB1c2UgYXMgYSByYW5kb20gY2hhcmFjdGVyLlxyXG4gICAgdmFyIGNoYXJTZXQgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XHJcbiAgICB2YXIgcmFuZG9tU3RyaW5nID0gJyc7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlcyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAwIGFuZCB0aGUgY2hhclNldCBsZW5ndGguIFJvdW5kcyBpdCBkb3duIHRvIGEgd2hvbGUgbnVtYmVyXHJcbiAgICAgICAgdmFyIHJhbmRvbVBveiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJTZXQubGVuZ3RoKTtcclxuICAgICAgICByYW5kb21TdHJpbmcgKz0gY2hhclNldC5zdWJzdHJpbmcocmFuZG9tUG96LCByYW5kb21Qb3ogKyAxKTtcclxuICAgIH1cclxuICAgIC8vIElmIGFuIGFycmF5IGlzIGdpdmVuIGl0IHdpbGwgY2hlY2sgdGhlIGFycmF5LCBhbmQgaWYgdGhlIGdlbmVyYXRlZCBzdHJpbmcgZXhpc3RzIGluIGl0IGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9uZSB1bnRpbCBhIHVuaXF1ZSBvbmUgaXMgZm91bmQgKldBVENIIE9VVC4gSWYgYWxsIGF2YWlsYWJsZSBvcHRpb25zIGFyZSB1c2VkIGl0IHdpbGwgY2F1c2UgYSBsb29wIGl0IGNhbm5vdCBicmVhayBvdXQqXHJcbiAgICBpZiAoYXJyYXl0b2NoZWNrID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gYmVmb3Jlc3RyICsgcmFuZG9tU3RyaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaXNJbiA9ICQuaW5BcnJheShiZWZvcmVzdHIgKyByYW5kb21TdHJpbmcsIGFycmF5dG9jaGVjayk7IC8vIGNoZWNrcyBpZiB0aGUgc3RyaW5nIGlzIGluIHRoZSBhcnJheSwgcmV0dXJucyBhIHBvc2l0aW9uXHJcbiAgICAgICAgaWYgKGlzSW4gPiAtMSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUgcG9zaXRpb24gaXMgbm90IC0xIChtZWFuaW5nLCBpdCBpcyBub3QgaW4gdGhlIGFycmF5KSBpdCB3aWxsIHN0YXJ0IGRvaW5nIGEgbG9vcFxyXG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21TdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tUG96ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhclNldC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbVN0cmluZyArPSBjaGFyU2V0LnN1YnN0cmluZyhyYW5kb21Qb3osIHJhbmRvbVBveiArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNJbiA9ICQuaW5BcnJheShiZWZvcmVzdHIgKyByYW5kb21TdHJpbmcsIGFycmF5dG9jaGVjayk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChpc0luID4gLTEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaXQgdG9vayAnICsgY291bnQgKyAnIHRyaWVzJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmVzdHIgKyByYW5kb21TdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZXN0ciArIHJhbmRvbVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBjb3VudCwgZWxlbUNvdW50LCBudW1vZnRpbWVzLCBjaGVja2R1cGUpIHtcclxuICAgIC8vIERpc2FibGVzIHRoZSBidXR0b24gZm9yIHRoZSBjaGVja2VkIGNsYXNzLlxyXG4gICAgdmFyIGN1cnJlbnRFbGVtID0gJCgnLicgKyBjbCArICc6ZXEoJyArIChlbGVtQ291bnQgLSAxKSArICcpJyk7XHJcbiAgICB2YXIgbmV4dEVsZW0gPSAkKCcuJyArIGNsICsgJzplcSgnICsgZWxlbUNvdW50ICsgJyknKTtcclxuICAgIHZhciBkZWxheSA9IE1hdGguZmxvb3IoNTAwIC8gKG51bW9mdGltZXMgLSBjb3VudCkpO1xyXG4gICAgdmFyIG5hbWUgPSAkKG5leHRFbGVtKS5kYXRhKCduYW1lJyk7XHJcbiAgICAkKGN1cnJlbnRFbGVtKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICQobmV4dEVsZW0pLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgLy8gUm90YXRlcyBiZXR3ZWVuIHRoZSBlbGVtZW50c1xyXG4gICAgaWYgKGVsZW1Db3VudCA8IG51bUl0ZW1zKSB7XHJcbiAgICAgICAgZWxlbUNvdW50Kys7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1Db3VudCA9PSBudW1JdGVtcykge1xyXG4gICAgICAgIGVsZW1Db3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdW50IDwgbnVtb2Z0aW1lcykge1xyXG4gICAgICAgIC8vIGlmIHRoZSBsb29wIGlzIG5vdCBvdmVyIGl0IHN0YXJ0cyBhZ2FpbiwgZ2l2aW5nIHRoZSB1cGRhdGVkIGRhdGFcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgY291bnQsIGVsZW1Db3VudCwgbnVtb2Z0aW1lcywgY2hlY2tkdXBlKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50ID09IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBJZiB0aGUgY3ljbGUgaXMgYWxsIGRvbmUgdGhpcyBoYXBwZW5zXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIGNoZWNrZWQgZm9yIGR1cGxpY2F0ZXMgaXQgaXMgZG9uZSB0aGVyZVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdudWxsJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIGNoZWNrZHVwZSAhPSAnJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkKCcuJyArIGNoZWNrZHVwZSArICdbZGF0YS1uYW1lPScgKyBuYW1lICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy0nICsgY2hlY2tkdXBlICsgJy1idXR0b24nKS5yZW1vdmVDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGRzIHRoZSB0ZXh0IHRvIHRoZSBzdW1tYXJ5XHJcbiAgICAgICAgJCgnLmpzLScgKyBjbCArICctc3VtbWFyeS10ZXh0JykuaHRtbChuYW1lKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVycywgY291bnQsIGRlbGF5KSB7XHJcbiAgICB2YXIgcmFuZG9tc3RyID0gcmFuZG9tU3RyaW5nMigxNSk7XHJcbiAgICAkKCcjanMtdG9Db3B5JylcclxuICAgICAgICAuY2xvbmUoKVxyXG4gICAgICAgIC5hcHBlbmRUbygnI2pzLXRvQXBwZW5kJylcclxuICAgICAgICAuYXR0cignaWQnLCByYW5kb21zdHIpXHJcbiAgICAgICAgLmF0dHIoJ3NyYycsIHJldHVybkltZ3NvdXJjZShudW1iZXJzW2NvdW50XSkpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdraW5nLWRpY2UtZ3JvdXBfX2ltYWdlLS12aXNpYmxlJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyMnICsgcmFuZG9tc3RyKS5hZGRDbGFzcygna2luZy1kaWNlLWdyb3VwX19pbWFnZS0tdmlzaWJsZScpO1xyXG4gICAgfSwgMTApO1xyXG4gICAgaWYgKGNvdW50IDwgbnVtYmVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZU1pbmlCb3NzZXMobnVtYmVycywgY291bnQsIGRlbGF5KTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9XHJcbn1cclxuIiwiJCgnLmpzLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGlzIGRvZXMgbm90aGluZ1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdidXR0b24tLWRpc2FibGVkJykpIHtcclxuICAgICAgICAvLyBHZXRzIHRoZSBkYXRhIGF0dHJpYnV0ZSBcImNoZWNrXCIgdG8gc2VlIHdoaWNoIG9uZSBuZWVkcyB0byBiZSBjaGVja2VkIGZvciBkdXBsaWNhdGVzXHJcbiAgICAgICAgdmFyIGNoZWNrZHVwZSA9ICQodGhpcykuZGF0YSgnY2hlY2snKTtcclxuICAgICAgICAkKCcuJyArIGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoY2hlY2tkdXBlICsgJy0tZHVwZScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjaGVja2R1cGUpOyAvLyBJZiBvbmUgaXMgYWxyZWFkeSBtYXJrZWQgYXMgYSBkdXBsaWNhdGUgdGhlIG1hcmsgaXMgcmVtb3ZlZFxyXG4gICAgICAgICQoJy5qcy0nICsgY2hlY2tkdXBlICsgJy1idXR0b24nKS5hZGRDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpOyAvLyBEaXNhYmxlcyB0aGUgYnV0dG9uIGZvciB0aGUgY2hlY2tlZCBjbGFzcy5cclxuICAgICAgICB2YXIgY2wgPSAkKHRoaXMpLmRhdGEoJ2NsYXNzJyk7IC8vIEdldHMgdGhlIGNsYXNzXHJcbiAgICAgICAgdmFyIG51bUl0ZW1zID0gJCgnLicgKyBjbCArICcnKS5sZW5ndGggLSAxOyAvLyBiYXNlZCBvbiAwXHJcbiAgICAgICAgdmFyIGNvdW50ID0gMTtcclxuICAgICAgICB2YXIgZWxlbUNvdW50ID0gMDtcclxuICAgICAgICB2YXIgbnVtb2Z0aW1lcyA9IGdldFJuZEludGVnZXIoMTAwLCAyMDApOyAvLyBHZXRzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIDIgbnVtYmVyc1xyXG4gICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgY291bnQsIGVsZW1Db3VudCwgbnVtb2Z0aW1lcywgY2hlY2tkdXBlKTtcclxuICAgIH1cclxufSk7XHJcbiQoJy5qcy1hbGxvd3NwZWNpZmljJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ2NsYXNzJyk7XHJcbiAgICAvLyBDaGVja3Mgd2hhdCBzdHJpbmcgc2hvdWxkIGJlIGluIHRoZSBcImRhdGEtbmFtZVwiIGF0dHIgdG8gbm90IGJlIGFsbG93ZWRcclxuICAgIHZhciB0b2NoZWNrID0gJCh0aGlzKS5kYXRhKCduYW1ldG9jaGVjaycpO1xyXG4gICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAkKCcuJyArIG5hbWUgKyAnLS1ub3QtYWxsb3dlZFtkYXRhLW5hbWU9JyArIHRvY2hlY2sgKyAnXScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBlbGVtID0gJCgnLicgKyBuYW1lICsgJ1tkYXRhLW5hbWU9JyArIHRvY2hlY2sgKyAnXScpO1xyXG4gICAgICAgICQoZWxlbSlcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuYW1lICsgJy0tbm90LWFsbG93ZWQnKTtcclxuICAgICAgICBpZiAoJChlbGVtKS5oYXNDbGFzcygnLS10b3AnKSkge1xyXG4gICAgICAgICAgICAkKGVsZW0pLnJlbW92ZUNsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgICAgICAkKCcuJyArIG5hbWUgKyAnOmVxKDApJykuYWRkQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuJCgnLmpzLWdlbmVyYXRlLWtkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBDcmVhdGVzIGEgcmFuZG9tIHZhbHVlIGZyb20gNC05XHJcbiAgICB2YXIgdG90YWxBbW91bnQgPSBnZXRSbmRJbnRlZ2VyKDQsIDEwKTtcclxuICAgIHZhciBudW1iZXJzQXJyYXkgPSBbXTtcclxuICAgIC8vIENyZWF0ZXMgMyBudW1iZXJzIGZpcnN0LCBiZWNhdXNlIHRoZXJlIG5lZWRzIHRvIGJlIG9uZSBmb3IgZWFjaCBibG9ja1xyXG4gICAgdmFyIG51bSA9IGdldFJuZEludGVnZXIoMSwgNCk7XHJcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW0pO1xyXG4gICAgbnVtID0gZ2V0Um5kSW50ZWdlcig0LCA3KTtcclxuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bSk7XHJcbiAgICBudW0gPSBnZXRSbmRJbnRlZ2VyKDcsIDEwKTtcclxuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bSk7XHJcbiAgICB0b3RhbEFtb3VudCA9IHRvdGFsQW1vdW50IC0gMzsgLy8gRGVkdWN0cyB0aGUgdG90YWwgYW1vdW50XHJcbiAgICAvLyBOb3cgaXQgbWFrZXMgYSBuZXcgbnVtYmVyIGJldHdlZW4gMS05IGZvciB0aGUgcmVtYWluZGVyIGFtb3VudC4gQ2hlY2tpbmcgZm9yIGRvdWJsZXNcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHRvdGFsQW1vdW50OyBpKyspIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IDA7XHJcbiAgICAgICAgdmFyIG5ld251bTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG5ld251bSA9IGdldFJuZEludGVnZXIoMSwgMTApO1xyXG4gICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld251bSwgbnVtYmVyc0FycmF5KSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyc0FycmF5LnB1c2gobmV3bnVtKTtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoc3VjY2VzcyA9PSAwKTtcclxuICAgIH1cclxuICAgIG51bWJlcnNBcnJheS5zb3J0KCk7XHJcblxyXG4gICAgdmFyIGltZ3NvdXJjZSA9IHJldHVybkltZ3NvdXJjZShudW1iZXJzQXJyYXlbMF0pO1xyXG4gICAgdmFyIGRlbGF5ID0gMTAwMDtcclxuICAgICQoJyNqcy10b0NvcHknKS5hdHRyKCdzcmMnLCBpbWdzb3VyY2UpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjanMtdG9Db3B5JykuYWRkQ2xhc3MoJ2tpbmctZGljZS1ncm91cF9faW1hZ2UtLXZpc2libGUnKTtcclxuICAgIH0sIDEwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVNaW5pQm9zc2VzKG51bWJlcnNBcnJheSwgMSwgZGVsYXkpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG59KTtcclxuIl19

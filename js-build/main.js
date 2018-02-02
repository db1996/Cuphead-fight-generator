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

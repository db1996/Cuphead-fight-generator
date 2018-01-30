function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Um5kSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5mdW5jdGlvbiBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSkge1xyXG4gICAgLy8gRGlzYWJsZXMgdGhlIGJ1dHRvbiBmb3IgdGhlIGNoZWNrZWQgY2xhc3MuXHJcbiAgICB2YXIgY3VycmVudEVsZW0gPSAkKCcuJyArIGNsICsgJzplcSgnICsgKGVsZW1Db3VudCAtIDEpICsgJyknKTtcclxuICAgIHZhciBuZXh0RWxlbSA9ICQoJy4nICsgY2wgKyAnOmVxKCcgKyBlbGVtQ291bnQgKyAnKScpO1xyXG4gICAgdmFyIGRlbGF5ID0gTWF0aC5mbG9vcig1MDAgLyAobnVtb2Z0aW1lcyAtIGNvdW50KSk7XHJcbiAgICB2YXIgbmFtZSA9ICQobmV4dEVsZW0pLmRhdGEoJ25hbWUnKTtcclxuICAgICQoY3VycmVudEVsZW0pLnJlbW92ZUNsYXNzKCctLXRvcCcpO1xyXG4gICAgJChuZXh0RWxlbSkuYWRkQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAvLyBSb3RhdGVzIGJldHdlZW4gdGhlIGVsZW1lbnRzXHJcbiAgICBpZiAoZWxlbUNvdW50IDwgbnVtSXRlbXMpIHtcclxuICAgICAgICBlbGVtQ291bnQrKztcclxuICAgIH0gZWxzZSBpZiAoZWxlbUNvdW50ID09IG51bUl0ZW1zKSB7XHJcbiAgICAgICAgZWxlbUNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY291bnQgPCBudW1vZnRpbWVzKSB7XHJcbiAgICAgICAgLy8gaWYgdGhlIGxvb3AgaXMgbm90IG92ZXIgaXQgc3RhcnRzIGFnYWluLCBnaXZpbmcgdGhlIHVwZGF0ZWQgZGF0YVxyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBjb3VudCwgZWxlbUNvdW50LCBudW1vZnRpbWVzLCBjaGVja2R1cGUpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgIH0gZWxzZSBpZiAoY291bnQgPT0gbnVtb2Z0aW1lcykge1xyXG4gICAgICAgIC8vIElmIHRoZSBjeWNsZSBpcyBhbGwgZG9uZSB0aGlzIGhhcHBlbnNcclxuICAgICAgICAvLyBJZiB0aGVyZSBzaG91bGQgYmUgY2hlY2tlZCBmb3IgZHVwbGljYXRlcyBpdCBpcyBkb25lIHRoZXJlXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBjaGVja2R1cGUgIT0gJ251bGwnICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBjaGVja2R1cGUgIT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgY2hlY2tkdXBlICE9ICcnXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICQoJy4nICsgY2hlY2tkdXBlICsgJ1tkYXRhLW5hbWU9JyArIG5hbWUgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoY2hlY2tkdXBlKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLScgKyBjaGVja2R1cGUgKyAnLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiQoJy5qcy1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vIElmIHRoZSBidXR0b24gaXMgZGlzYWJsZWQgdGhpcyBkb2VzIG5vdGhpbmdcclxuICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgLy8gR2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGUgXCJjaGVja1wiIHRvIHNlZSB3aGljaCBvbmUgbmVlZHMgdG8gYmUgY2hlY2tlZCBmb3IgZHVwbGljYXRlc1xyXG4gICAgICAgIHZhciBjaGVja2R1cGUgPSAkKHRoaXMpLmRhdGEoJ2NoZWNrJyk7XHJcbiAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlKTsgLy8gSWYgb25lIGlzIGFscmVhZHkgbWFya2VkIGFzIGEgZHVwbGljYXRlIHRoZSBtYXJrIGlzIHJlbW92ZWRcclxuICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykuYWRkQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTsgLy8gRGlzYWJsZXMgdGhlIGJ1dHRvbiBmb3IgdGhlIGNoZWNrZWQgY2xhc3MuXHJcbiAgICAgICAgdmFyIGNsID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpOyAvLyBHZXRzIHRoZSBjbGFzc1xyXG4gICAgICAgIHZhciBudW1JdGVtcyA9ICQoJy4nICsgY2wgKyAnJykubGVuZ3RoIC0gMTsgLy8gYmFzZWQgb24gMFxyXG4gICAgICAgIHZhciBjb3VudCA9IDE7XHJcbiAgICAgICAgdmFyIGVsZW1Db3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG51bW9mdGltZXMgPSBnZXRSbmRJbnRlZ2VyKDEwMCwgMjAwKTsgLy8gR2V0cyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAyIG51bWJlcnNcclxuICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGNvdW50LCBlbGVtQ291bnQsIG51bW9mdGltZXMsIGNoZWNrZHVwZSk7XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcuanMtYWxsb3dzcGVjaWZpYycpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpO1xyXG4gICAgLy8gQ2hlY2tzIHdoYXQgc3RyaW5nIHNob3VsZCBiZSBpbiB0aGUgXCJkYXRhLW5hbWVcIiBhdHRyIHRvIG5vdCBiZSBhbGxvd2VkXHJcbiAgICB2YXIgdG9jaGVjayA9ICQodGhpcykuZGF0YSgnbmFtZXRvY2hlY2snKTtcclxuICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnLicgKyBuYW1lICsgJy0tbm90LWFsbG93ZWRbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZWxlbSA9ICQoJy4nICsgbmFtZSArICdbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKTtcclxuICAgICAgICAkKGVsZW0pXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICAgICAgaWYgKCQoZWxlbSkuaGFzQ2xhc3MoJy0tdG9wJykpIHtcclxuICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICAgICAgICAgJCgnLicgKyBuYW1lICsgJzplcSgwKScpLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==

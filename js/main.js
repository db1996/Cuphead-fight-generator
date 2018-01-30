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
        // Adds the text to the summary
        $('.js-' + cl + '-summary-text').html(name);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFJuZEludGVnZXIobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbn1cclxuZnVuY3Rpb24gR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBjb3VudCwgZWxlbUNvdW50LCBudW1vZnRpbWVzLCBjaGVja2R1cGUpIHtcclxuICAgIC8vIERpc2FibGVzIHRoZSBidXR0b24gZm9yIHRoZSBjaGVja2VkIGNsYXNzLlxyXG4gICAgdmFyIGN1cnJlbnRFbGVtID0gJCgnLicgKyBjbCArICc6ZXEoJyArIChlbGVtQ291bnQgLSAxKSArICcpJyk7XHJcbiAgICB2YXIgbmV4dEVsZW0gPSAkKCcuJyArIGNsICsgJzplcSgnICsgZWxlbUNvdW50ICsgJyknKTtcclxuICAgIHZhciBkZWxheSA9IE1hdGguZmxvb3IoNTAwIC8gKG51bW9mdGltZXMgLSBjb3VudCkpO1xyXG4gICAgdmFyIG5hbWUgPSAkKG5leHRFbGVtKS5kYXRhKCduYW1lJyk7XHJcbiAgICAkKGN1cnJlbnRFbGVtKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICQobmV4dEVsZW0pLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgLy8gUm90YXRlcyBiZXR3ZWVuIHRoZSBlbGVtZW50c1xyXG4gICAgaWYgKGVsZW1Db3VudCA8IG51bUl0ZW1zKSB7XHJcbiAgICAgICAgZWxlbUNvdW50Kys7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1Db3VudCA9PSBudW1JdGVtcykge1xyXG4gICAgICAgIGVsZW1Db3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdW50IDwgbnVtb2Z0aW1lcykge1xyXG4gICAgICAgIC8vIGlmIHRoZSBsb29wIGlzIG5vdCBvdmVyIGl0IHN0YXJ0cyBhZ2FpbiwgZ2l2aW5nIHRoZSB1cGRhdGVkIGRhdGFcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgY291bnQsIGVsZW1Db3VudCwgbnVtb2Z0aW1lcywgY2hlY2tkdXBlKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50ID09IG51bW9mdGltZXMpIHtcclxuICAgICAgICAvLyBJZiB0aGUgY3ljbGUgaXMgYWxsIGRvbmUgdGhpcyBoYXBwZW5zXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIGNoZWNrZWQgZm9yIGR1cGxpY2F0ZXMgaXQgaXMgZG9uZSB0aGVyZVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdudWxsJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgY2hlY2tkdXBlICE9ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIGNoZWNrZHVwZSAhPSAnJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkKCcuJyArIGNoZWNrZHVwZSArICdbZGF0YS1uYW1lPScgKyBuYW1lICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy0nICsgY2hlY2tkdXBlICsgJy1idXR0b24nKS5yZW1vdmVDbGFzcygnYnV0dG9uLS1kaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGRzIHRoZSB0ZXh0IHRvIHRoZSBzdW1tYXJ5XHJcbiAgICAgICAgJCgnLmpzLScgKyBjbCArICctc3VtbWFyeS10ZXh0JykuaHRtbChuYW1lKTtcclxuICAgIH1cclxufVxyXG4kKCcuanMtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGRpc2FibGVkIHRoaXMgZG9lcyBub3RoaW5nXHJcbiAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIC8vIEdldHMgdGhlIGRhdGEgYXR0cmlidXRlIFwiY2hlY2tcIiB0byBzZWUgd2hpY2ggb25lIG5lZWRzIHRvIGJlIGNoZWNrZWQgZm9yIGR1cGxpY2F0ZXNcclxuICAgICAgICB2YXIgY2hlY2tkdXBlID0gJCh0aGlzKS5kYXRhKCdjaGVjaycpO1xyXG4gICAgICAgICQoJy4nICsgY2hlY2tkdXBlICsgJy0tZHVwZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGNoZWNrZHVwZSk7IC8vIElmIG9uZSBpcyBhbHJlYWR5IG1hcmtlZCBhcyBhIGR1cGxpY2F0ZSB0aGUgbWFyayBpcyByZW1vdmVkXHJcbiAgICAgICAgJCgnLmpzLScgKyBjaGVja2R1cGUgKyAnLWJ1dHRvbicpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7IC8vIERpc2FibGVzIHRoZSBidXR0b24gZm9yIHRoZSBjaGVja2VkIGNsYXNzLlxyXG4gICAgICAgIHZhciBjbCA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTsgLy8gR2V0cyB0aGUgY2xhc3NcclxuICAgICAgICB2YXIgbnVtSXRlbXMgPSAkKCcuJyArIGNsICsgJycpLmxlbmd0aCAtIDE7IC8vIGJhc2VkIG9uIDBcclxuICAgICAgICB2YXIgY291bnQgPSAxO1xyXG4gICAgICAgIHZhciBlbGVtQ291bnQgPSAwO1xyXG4gICAgICAgIHZhciBudW1vZnRpbWVzID0gZ2V0Um5kSW50ZWdlcigxMDAsIDIwMCk7IC8vIEdldHMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gMiBudW1iZXJzXHJcbiAgICAgICAgR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBjb3VudCwgZWxlbUNvdW50LCBudW1vZnRpbWVzLCBjaGVja2R1cGUpO1xyXG4gICAgfVxyXG59KTtcclxuJCgnLmpzLWFsbG93c3BlY2lmaWMnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTtcclxuICAgIC8vIENoZWNrcyB3aGF0IHN0cmluZyBzaG91bGQgYmUgaW4gdGhlIFwiZGF0YS1uYW1lXCIgYXR0ciB0byBub3QgYmUgYWxsb3dlZFxyXG4gICAgdmFyIHRvY2hlY2sgPSAkKHRoaXMpLmRhdGEoJ25hbWV0b2NoZWNrJyk7XHJcbiAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICQoJy4nICsgbmFtZSArICctLW5vdC1hbGxvd2VkW2RhdGEtbmFtZT0nICsgdG9jaGVjayArICddJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKG5hbWUpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lICsgJy0tbm90LWFsbG93ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSAkKCcuJyArIG5hbWUgKyAnW2RhdGEtbmFtZT0nICsgdG9jaGVjayArICddJyk7XHJcbiAgICAgICAgJChlbGVtKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgICAgIGlmICgkKGVsZW0pLmhhc0NsYXNzKCctLXRvcCcpKSB7XHJcbiAgICAgICAgICAgICQoZWxlbSkucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAgICAgICAgICQoJy4nICsgbmFtZSArICc6ZXEoMCknKS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=

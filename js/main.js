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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Um5kSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5mdW5jdGlvbiBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGksIG51bW9mdGltZXMsIGVsZW1Db3VudCwgcHJldkVsZW1Db3VudCwgY2hlY2tkdXBlKSB7XHJcbiAgICB2YXIgcHJldiA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgcHJldkVsZW1Db3VudCArICcpJyk7XHJcbiAgICB2YXIgcHJldmltZyA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgcHJldkVsZW1Db3VudCArICcpIGltZycpO1xyXG4gICAgdmFyIG5leHQ7XHJcbiAgICBpZiAoZWxlbUNvdW50ID09IDEpIHtcclxuICAgICAgICBuZXh0ID0gJCgnLicgKyBjbCArICc6Zmlyc3QtY2hpbGQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dCA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgZWxlbUNvdW50ICsgJyknKTtcclxuICAgIH1cclxuICAgIHZhciBsYXN0ID0gJCgnLicgKyBjbCArICc6bGFzdC1jaGlsZCgpJyk7XHJcbiAgICB2YXIgbmV4dGltZyA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgZWxlbUNvdW50ICsgJykgaW1nJyk7XHJcbiAgICB2YXIgbGFzdGltZyA9ICQoJy4nICsgY2wgKyAnOmxhc3QtY2hpbGQoKSBpbWcnKTtcclxuICAgIHZhciBkZWxheSA9IE1hdGguZmxvb3IoMTAwMCAvIChudW1vZnRpbWVzIC0gaSkpO1xyXG4gICAgdmFyIHRvcmVwbGFjZSA9ICQoJy5qcy0nICsgY2wgKyAnLXN1bW1hcnktdGV4dCcpO1xyXG4gICAgdmFyIHVuZGVmID0gMDtcclxuICAgIGlmIChpID09IG51bW9mdGltZXMgKyAxKSB7XHJcbiAgICAgICAgLy8gV2hhdCBoYXBwZW5zIGlmIHRoZSBjeWNsZSBpcyBjb21wbGV0ZWRcclxuICAgICAgICB2YXIgbmFtZSA9ICQobmV4dCkuZGF0YSgnbmFtZScpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBuYW1lID0gJCgnLicgKyBjbCArICc6bGFzdC1jaGlsZCgpJykuZGF0YSgnbmFtZScpO1xyXG4gICAgICAgICAgICAkKCcuJyArIGNsKS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgICAgICAgICAgJChsYXN0KS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgICAgICAgICAgdW5kZWYgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHR5cGVvZiBjaGVja2R1cGUgIT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnbnVsbCcgJiZcclxuICAgICAgICAgICAgdHlwZW9mIGNoZWNrZHVwZSAhPSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBjaGVja2R1cGUgIT0gJydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnW2RhdGEtbmFtZT0nICsgbmFtZSArICddJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlICsgJy0tZHVwZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCh0b3JlcGxhY2UpLmh0bWwobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5hbWUgPSAkKG5leHQpLmRhdGEoJ25hbWUnKTtcclxuICAgIGlmICh1bmRlZiA9PSAwKSB7XHJcbiAgICAgICAgJChwcmV2KS5yZW1vdmVDbGFzcygnLS10b3AnKTtcclxuICAgIH1cclxuICAgICQobmV4dCkuYWRkQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICBpZiAoZWxlbUNvdW50IDwgcGFyc2VJbnQobnVtSXRlbXMpKSB7XHJcbiAgICAgICAgZWxlbUNvdW50Kys7XHJcbiAgICAgICAgcHJldkVsZW1Db3VudCA9IGVsZW1Db3VudCAtIDE7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1Db3VudCA9PSBwYXJzZUludChudW1JdGVtcykpIHtcclxuICAgICAgICBlbGVtQ291bnQgPSAxO1xyXG4gICAgICAgIHByZXZFbGVtQ291bnQgPSBudW1JdGVtcztcclxuICAgIH1cclxuICAgIGkrKztcclxuXHJcbiAgICBpZiAoaSA8PSBudW1vZnRpbWVzIC0gOSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgaSwgbnVtb2Z0aW1lcywgZWxlbUNvdW50LCBwcmV2RWxlbUNvdW50LCBjaGVja2R1cGUpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgIH1cclxuICAgIGlmIChpID4gbnVtb2Z0aW1lcyAtIDkgJiYgaSA8PSBudW1vZnRpbWVzICsgMSkge1xyXG4gICAgICAgIHZhciByYW4gPSBnZXRSbmRJbnRlZ2VyKDEwMCwgMzAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGksIG51bW9mdGltZXMsIGVsZW1Db3VudCwgcHJldkVsZW1Db3VudCwgY2hlY2tkdXBlKSxcclxuICAgICAgICAgICAgcmFuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4kKCcuanMtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIHZhciBjaGVja2R1cGUgPSAkKHRoaXMpLmRhdGEoJ2NoZWNrJyk7XHJcbiAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlKTtcclxuICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykuYWRkQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcclxuICAgICAgICB2YXIgY2wgPSAkKHRoaXMpLmRhdGEoJ2NsYXNzJyk7XHJcbiAgICAgICAgdmFyIG51bUl0ZW1zO1xyXG4gICAgICAgIGlmICgkKCcuJyArIGNsICsgJy0tZHVwZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbnVtSXRlbXMgPSAkKCcuJyArIGNsICsgJycpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtSXRlbXMgPSAkKCcuJyArIGNsICsgJycpLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpID0gMTtcclxuICAgICAgICB2YXIgbnVtb2Z0aW1lcyA9IGdldFJuZEludGVnZXIoMTAsIDMwKTtcclxuICAgICAgICB2YXIgZWxlbUNvdW50ID0gMTtcclxuICAgICAgICB2YXIgcHJldkVsZW1Db3VudCA9IG51bUl0ZW1zO1xyXG4gICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgaSwgbnVtb2Z0aW1lcywgZWxlbUNvdW50LCBwcmV2RWxlbUNvdW50LCBjaGVja2R1cGUpO1xyXG4gICAgfVxyXG59KTtcclxuJCgnLmpzLWFsbG93c3BlY2lmaWMnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTtcclxuICAgIHZhciB0b2NoZWNrID0gJCh0aGlzKS5kYXRhKCduYW1ldG9jaGVjaycpO1xyXG4gICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAkKCcuJyArIG5hbWUgKyAnLS1ub3QtYWxsb3dlZFtkYXRhLW5hbWU9JyArIHRvY2hlY2sgKyAnXScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy4nICsgbmFtZSArICdbZGF0YS1uYW1lPScgKyB0b2NoZWNrICsgJ10nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG4gICAgfVxyXG59KTtcclxuIl19

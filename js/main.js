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
        $('.js-' + checkdupe + '-button').removeClass('button--disabled');
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
        var numoftimes = getRndInteger(100, 300);
        var elemCount = 1;
        var prevElemCount = numItems;
        console.log('num:', numItems);
        GenerateRandom(cl, numItems, i, numoftimes, elemCount, prevElemCount, checkdupe);
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRSbmRJbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG59XHJcbmZ1bmN0aW9uIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgaSwgbnVtb2Z0aW1lcywgZWxlbUNvdW50LCBwcmV2RWxlbUNvdW50LCBjaGVja2R1cGUpIHtcclxuICAgIHZhciBwcmV2ID0gJCgnLicgKyBjbCArICc6bnRoLWNoaWxkKCcgKyBwcmV2RWxlbUNvdW50ICsgJyknKTtcclxuICAgIHZhciBwcmV2aW1nID0gJCgnLicgKyBjbCArICc6bnRoLWNoaWxkKCcgKyBwcmV2RWxlbUNvdW50ICsgJykgaW1nJyk7XHJcbiAgICB2YXIgbmV4dCA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgZWxlbUNvdW50ICsgJyknKTtcclxuICAgIHZhciBsYXN0ID0gJCgnLicgKyBjbCArICc6bGFzdC1jaGlsZCgpJyk7XHJcbiAgICB2YXIgbmV4dGltZyA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgZWxlbUNvdW50ICsgJykgaW1nJyk7XHJcbiAgICB2YXIgZGVsYXkgPSBNYXRoLmZsb29yKDEwMDAgLyAobnVtb2Z0aW1lcyAtIGkpKTtcclxuICAgIHZhciB1bmRlZiA9IDA7XHJcbiAgICBpZiAoaSA9PSBudW1vZnRpbWVzICsgMSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gJChuZXh0KS5kYXRhKCduYW1lJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdHMgYWN0dWFsbHkgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIG5hbWUgPSAkKGxhc3QpLmRhdGEoJ25hbWUnKTtcclxuICAgICAgICAgICAgJCgnLicgKyBjbCkucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAgICAgICAgICQobGFzdCkuYWRkQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQobGFzdCkuYXR0cignY2xhc3MnKSk7XHJcbiAgICAgICAgICAgIHVuZGVmID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XHJcbiAgICAgICAgJCgnLicgKyBjaGVja2R1cGUgKyAnW2RhdGEtbmFtZT0nICsgbmFtZSArICddJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNoZWNrZHVwZSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKGNoZWNrZHVwZSArICctLWR1cGUnKTtcclxuICAgICAgICAkKCcuanMtJyArIGNoZWNrZHVwZSArICctYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIHZhciBuYW1lID0gJChuZXh0KS5kYXRhKCduYW1lJyk7XHJcbiAgICBpZiAodW5kZWYgPT0gMCkge1xyXG4gICAgICAgICQocHJldikucmVtb3ZlQ2xhc3MoJy0tdG9wJyk7XHJcbiAgICB9XHJcbiAgICAkKG5leHQpLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgaWYgKGVsZW1Db3VudCA8IHBhcnNlSW50KG51bUl0ZW1zKSkge1xyXG4gICAgICAgIGVsZW1Db3VudCsrO1xyXG4gICAgICAgIHByZXZFbGVtQ291bnQgPSBlbGVtQ291bnQgLSAxO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtQ291bnQgPT0gcGFyc2VJbnQobnVtSXRlbXMpKSB7XHJcbiAgICAgICAgZWxlbUNvdW50ID0gMTtcclxuICAgICAgICBwcmV2RWxlbUNvdW50ID0gbnVtSXRlbXM7XHJcbiAgICB9XHJcbiAgICBpKys7XHJcblxyXG4gICAgaWYgKGkgPD0gbnVtb2Z0aW1lcyAtIDkpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGksIG51bW9mdGltZXMsIGVsZW1Db3VudCwgcHJldkVsZW1Db3VudCwgY2hlY2tkdXBlKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaSA+IG51bW9mdGltZXMgLSA5ICYmIGkgPD0gbnVtb2Z0aW1lcyArIDEpIHtcclxuICAgICAgICB2YXIgcmFuID0gZ2V0Um5kSW50ZWdlcigxMDAsIDMwMCk7XHJcbiAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBpLCBudW1vZnRpbWVzLCBlbGVtQ291bnQsIHByZXZFbGVtQ291bnQsIGNoZWNrZHVwZSksXHJcbiAgICAgICAgICAgIHJhblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuJCgnLmpzLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdidXR0b24tLWRpc2FibGVkJykpIHtcclxuICAgICAgICB2YXIgY2hlY2tkdXBlID0gJCh0aGlzKS5kYXRhKCdjaGVjaycpO1xyXG4gICAgICAgICQoJy4nICsgY2hlY2tkdXBlICsgJy0tZHVwZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGNoZWNrZHVwZSk7XHJcbiAgICAgICAgJCgnLmpzLScgKyBjaGVja2R1cGUgKyAnLWJ1dHRvbicpLmFkZENsYXNzKCdidXR0b24tLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdmFyIGNsID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpO1xyXG4gICAgICAgIHZhciBudW1JdGVtcztcclxuICAgICAgICBpZiAoJCgnLicgKyBjbCArICctLWR1cGUnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG51bUl0ZW1zID0gJCgnLicgKyBjbCArICcnKS5sZW5ndGggKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG51bUl0ZW1zID0gJCgnLicgKyBjbCArICcnKS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaSA9IDE7XHJcbiAgICAgICAgdmFyIG51bW9mdGltZXMgPSBnZXRSbmRJbnRlZ2VyKDEwMCwgMzAwKTtcclxuICAgICAgICB2YXIgZWxlbUNvdW50ID0gMTtcclxuICAgICAgICB2YXIgcHJldkVsZW1Db3VudCA9IG51bUl0ZW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdudW06JywgbnVtSXRlbXMpO1xyXG4gICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgaSwgbnVtb2Z0aW1lcywgZWxlbUNvdW50LCBwcmV2RWxlbUNvdW50LCBjaGVja2R1cGUpO1xyXG4gICAgfVxyXG59KTtcclxuJCgnLmpzLWFsbG93ZW1wdHknKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTtcclxuICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnLicgKyBuYW1lICsgJy0tbm90LWFsbG93ZWRbZGF0YS1uYW1lPUVtcHR5XScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWUgKyAnIGlzIGNoZWNrZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLicgKyBuYW1lICsgJ1tkYXRhLW5hbWU9RW1wdHldJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuYW1lICsgJy0tbm90LWFsbG93ZWQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lICsgJyBpcyB1bmNoZWNrZWQnKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==

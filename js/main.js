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
    var checkdupe = $(this).data('check');
    $('.' + checkdupe + '--dupe')
        .removeClass(checkdupe + '--dupe')
        .addClass(checkdupe);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Um5kSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5mdW5jdGlvbiBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGksIG51bW9mdGltZXMsIGVsZW1Db3VudCwgcHJldkVsZW1Db3VudCwgY2hlY2tkdXBlKSB7XHJcbiAgICB2YXIgcHJldiA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgcHJldkVsZW1Db3VudCArICcpJyk7XHJcbiAgICB2YXIgcHJldmltZyA9ICQoJy4nICsgY2wgKyAnOm50aC1jaGlsZCgnICsgcHJldkVsZW1Db3VudCArICcpIGltZycpO1xyXG4gICAgdmFyIG5leHQgPSAkKCcuJyArIGNsICsgJzpudGgtY2hpbGQoJyArIGVsZW1Db3VudCArICcpJyk7XHJcbiAgICB2YXIgbGFzdCA9ICQoJy4nICsgY2wgKyAnOmxhc3QtY2hpbGQoKScpO1xyXG4gICAgdmFyIG5leHRpbWcgPSAkKCcuJyArIGNsICsgJzpudGgtY2hpbGQoJyArIGVsZW1Db3VudCArICcpIGltZycpO1xyXG4gICAgdmFyIGRlbGF5ID0gTWF0aC5mbG9vcigxMDAwIC8gKG51bW9mdGltZXMgLSBpKSk7XHJcbiAgICB2YXIgdW5kZWYgPSAwO1xyXG4gICAgaWYgKGkgPT0gbnVtb2Z0aW1lcyArIDEpIHtcclxuICAgICAgICB2YXIgbmFtZSA9ICQobmV4dCkuZGF0YSgnbmFtZScpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaXRzIGFjdHVhbGx5IHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBuYW1lID0gJChsYXN0KS5kYXRhKCduYW1lJyk7XHJcbiAgICAgICAgICAgICQoJy4nICsgY2wpLnJlbW92ZUNsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgICAgICAkKGxhc3QpLmFkZENsYXNzKCctLXRvcCcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkKGxhc3QpLmF0dHIoJ2NsYXNzJykpO1xyXG4gICAgICAgICAgICB1bmRlZiA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xyXG4gICAgICAgICQoJy4nICsgY2hlY2tkdXBlICsgJ1tkYXRhLW5hbWU9JyArIG5hbWUgKyAnXScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgbmFtZSA9ICQobmV4dCkuZGF0YSgnbmFtZScpO1xyXG4gICAgaWYgKHVuZGVmID09IDApIHtcclxuICAgICAgICAkKHByZXYpLnJlbW92ZUNsYXNzKCctLXRvcCcpO1xyXG4gICAgfVxyXG4gICAgJChuZXh0KS5hZGRDbGFzcygnLS10b3AnKTtcclxuICAgIGlmIChlbGVtQ291bnQgPCBwYXJzZUludChudW1JdGVtcykpIHtcclxuICAgICAgICBlbGVtQ291bnQrKztcclxuICAgICAgICBwcmV2RWxlbUNvdW50ID0gZWxlbUNvdW50IC0gMTtcclxuICAgIH0gZWxzZSBpZiAoZWxlbUNvdW50ID09IHBhcnNlSW50KG51bUl0ZW1zKSkge1xyXG4gICAgICAgIGVsZW1Db3VudCA9IDE7XHJcbiAgICAgICAgcHJldkVsZW1Db3VudCA9IG51bUl0ZW1zO1xyXG4gICAgfVxyXG4gICAgaSsrO1xyXG5cclxuICAgIGlmIChpIDw9IG51bW9mdGltZXMgLSA5KSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgR2VuZXJhdGVSYW5kb20oY2wsIG51bUl0ZW1zLCBpLCBudW1vZnRpbWVzLCBlbGVtQ291bnQsIHByZXZFbGVtQ291bnQsIGNoZWNrZHVwZSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGkgPiBudW1vZnRpbWVzIC0gOSAmJiBpIDw9IG51bW9mdGltZXMgKyAxKSB7XHJcbiAgICAgICAgdmFyIHJhbiA9IGdldFJuZEludGVnZXIoMTAwLCAzMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIEdlbmVyYXRlUmFuZG9tKGNsLCBudW1JdGVtcywgaSwgbnVtb2Z0aW1lcywgZWxlbUNvdW50LCBwcmV2RWxlbUNvdW50LCBjaGVja2R1cGUpLFxyXG4gICAgICAgICAgICByYW5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiQoJy5qcy1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIHZhciBjaGVja2R1cGUgPSAkKHRoaXMpLmRhdGEoJ2NoZWNrJyk7XHJcbiAgICAkKCcuJyArIGNoZWNrZHVwZSArICctLWR1cGUnKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcyhjaGVja2R1cGUgKyAnLS1kdXBlJylcclxuICAgICAgICAuYWRkQ2xhc3MoY2hlY2tkdXBlKTtcclxuICAgIHZhciBjbCA9ICQodGhpcykuZGF0YSgnY2xhc3MnKTtcclxuICAgIHZhciBudW1JdGVtcztcclxuICAgIGlmICgkKCcuJyArIGNsICsgJy0tZHVwZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBudW1JdGVtcyA9ICQoJy4nICsgY2wgKyAnJykubGVuZ3RoICsgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtSXRlbXMgPSAkKCcuJyArIGNsICsgJycpLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaSA9IDE7XHJcbiAgICB2YXIgbnVtb2Z0aW1lcyA9IGdldFJuZEludGVnZXIoMTAwLCAzMDApO1xyXG4gICAgdmFyIGVsZW1Db3VudCA9IDE7XHJcbiAgICB2YXIgcHJldkVsZW1Db3VudCA9IG51bUl0ZW1zO1xyXG4gICAgY29uc29sZS5sb2coJ251bTonLCBudW1JdGVtcyk7XHJcbiAgICBHZW5lcmF0ZVJhbmRvbShjbCwgbnVtSXRlbXMsIGksIG51bW9mdGltZXMsIGVsZW1Db3VudCwgcHJldkVsZW1Db3VudCwgY2hlY2tkdXBlKTtcclxufSk7XHJcbiQoJy5qcy1hbGxvd2VtcHR5JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ2NsYXNzJyk7XHJcbiAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICQoJy4nICsgbmFtZSArICctLW5vdC1hbGxvd2VkW2RhdGEtbmFtZT1FbXB0eV0nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSlcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKG5hbWUgKyAnLS1ub3QtYWxsb3dlZCcpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lICsgJyBpcyBjaGVja2VkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy4nICsgbmFtZSArICdbZGF0YS1uYW1lPUVtcHR5XScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhuYW1lKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobmFtZSArICctLW5vdC1hbGxvd2VkJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmFtZSArICcgaXMgdW5jaGVja2VkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=

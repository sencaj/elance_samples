$(function () {
    var arr = {};
    for (var i = 0; i < 5; i++) {
        arr[i] = Math.round(Math.random() * 100);
        $($('.sequence li')[i]).find('h2').html(arr[i]);
    }

    var x;
    for (var i = 0; i < 5; i++) {
        for (var j = 5; j > i; --j) {
            if (arr[j] > arr[i]) {
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
        }
    }

    for (var i = 0; i < 5; i++) {
        $($('.results li')[i]).find('h2').html(arr[i]);
    }
});
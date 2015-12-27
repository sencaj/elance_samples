$(function () {
    $('#rating1').raty({
        click: function (score, evt) {
            alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
        }
    });

    $('#rating2').raty({
        number: 4,
        score: function () {
            return $(this).attr('data-score');
        },
        click: function (score, evt) {
            alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
        }
    });

    $('#rating3').raty({
        half: true,
        number: 7,
        click: function (score, evt) {
            alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
        }
    });
});
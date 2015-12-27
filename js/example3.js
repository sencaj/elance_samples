$(function () {
    
    $('#graph').svg();
    var svg = $('#graph').svg("get");
    var parentOffset, relX, relY;
    var stage = $('#graph');

    var chartAreas = [[0.1, 0.1, 0.95, 0.9], [0.2, 0.1, 0.95, 0.9],
        [0.1, 0.1, 0.8, 0.9], [0.1, 0.25, 0.9, 0.9], [0.1, 0.1, 0.9, 0.8]];
    var legendAreas = [[0.0, 0.0, 0.0, 0.0], [0.005, 0.1, 0.125, 0.5],
        [0.85, 0.1, 0.97, 0.5], [0.2, 0.1, 0.8, 0.2], [0.2, 0.9, 0.8, 0.995]];
    var fills = [['lightblue', 'url(#fadeBlue)'], ['pink', 'url(#fadeRed)'],
        ['lightgreen', 'url(#fadeGreen)']];

    var defs = svg.defs();

    svg.linearGradient(defs, 'fadeBlue',
            [[0, 'lightblue'], [1, 'blue']]);
    svg.linearGradient(defs, 'fadeRed', [[0, 'pink'], [1, 'red']]);
    svg.linearGradient(defs, 'fadeGreen',
            [[0, 'lightgreen'], [1, 'green']]);
    svg.graph.noDraw().title('Browser Usage', 'blue').
            addSeries('IE', [95.97, 35.39, 15.00],
                    'lightblue', 'blue', 3).
            addSeries('Netscape', [63.80, 42.83, 23.06],
                    'pink', 'red', 3).
            addSeries('Firefox', [76.16, 33.61, 13.13],
                    'lightgreen', 'green', 3).
            format('ivory', 'gray').
            gridlines({stroke: 'gray', strokeDashArray: '2,2'}, 'gray');
    svg.graph.xAxis.title('Year', 'green').scale(0, 3).
            ticks(1, 0).labels(['2002', '2004', '2005', '2006']);
    svg.graph.yAxis.title('Percentage').ticks(10, 5);
    svg.graph.legend.settings({fill: 'lightgoldenrodyellow',
        stroke: 'gray'});
    svg.graph.status(showGraphStatus);

    function showGraphStatus(label, value) {
        $('#graph').attr('title', (label ? label + ' ' + value : ''));
    }

    var chartType = "column";
    var chartLegend = parseInt(0, 10);
    var seriesFill = 0;
    var svg = $('#graph').svg('get');
    svg.graph.noDraw().
            legend.show(chartLegend).area(legendAreas[chartLegend]).end().
            series(0).format(fills[0][seriesFill]).end().
            series(1).format(fills[1][seriesFill]).end().
            series(2).format(fills[2][seriesFill]).end().
            area(chartAreas[chartLegend]).
            type(chartType, {explode: 2, explodeDist: 10}).redraw();
    chartType = $.svg.graphing.chartTypes()[chartType];
    $('#graphDesc').text(chartType.description());
    var options = '';
    for (var i = 0; i < chartType.options().length; i++) {
        options += '<li>' + chartType.options()[i] + '</li>';
    }
    $('#graphOptions').html(options || '<li>None</li>');
    // resetSize(svg);

    var $graphStage = $('#graph svg svg');
    var $rect = $('#graph rect');

    $graphStage.mousemove(function (e) {
        parentOffset = $(this).offset();
        relX = e.pageX - parentOffset.left - 100;
        relY = e.pageY - parentOffset.top;
        var rn = Math.abs(Math.floor(relX / (stage.width() / 4)));
        var sn = Math.abs(Math.floor(relX % (stage.width() / 4) / 50));

        updateRect(sn, rn);
    });

    $rect.mousedown(function () {
        alert("Rect height = " + Math.round($(this).attr('height') / (480 / 100)));
    });

    function updateRect(sn, rn) {
        var h = stage.height() - relY - 60;
        var o = (h % 48 > 24) ? (h % 48 + 24) : (h % 48);
        if (h < 480) {
            $(stage.find('.series' + sn).find('rect')[rn])
                    .attr("y", relY)
                    .attr("height", h);
        }
    };
});
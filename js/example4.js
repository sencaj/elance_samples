
$(function () {

    var chartAreas = [[0.1, 0.1, 0.95, 0.9], [0.2, 0.1, 0.95, 0.9],
        [0.1, 0.1, 0.8, 0.9], [0.1, 0.25, 0.9, 0.9], [0.1, 0.1, 0.9, 0.8]];
    var legendAreas = [[0.0, 0.0, 0.0, 0.0], [0.005, 0.1, 0.125, 0.5],
        [0.85, 0.1, 0.97, 0.5], [0.2, 0.1, 0.8, 0.2], [0.2, 0.9, 0.8, 0.995]];
    var fills = [['lightblue', 'url(#fadeBlue)'], ['pink', 'url(#fadeRed)'],
        ['lightgreen', 'url(#fadeGreen)']];
    
    var chartType = "column";
    var chartLegend = parseInt(0, 10);
    var seriesFill = 0;
    var svg = $('#plot').svg().svg('get');
    var chartType = "line";
    var sPoints = [[75, 500]];
    var dPoints = [];
    var column;
    
    svg.graph.noDraw().addSeries('IE', [], 'lightblue', 'blue', 3).
            addSeries('Netscape', [], 'pink', 'red', 3).
            addSeries('Firefox', [], 'lightgreen', 'green', 3).
            format('ivory', 'gray').
            gridlines({stroke: 'gray', strokeDashArray: '2,2'}, 'gray');
    svg.graph.xAxis.title('Year', 'green').scale(0, 3).
            ticks(0.5, 0).labels(['2002', '2004', '2005', '2006', '2007', '2008', '2009']);
    svg.graph.yAxis.title('Percentage').ticks(10, 5);
    svg.graph.noDraw().
            legend.show(chartLegend).area(legendAreas[chartLegend]).end().
            series(0).format(fills[0][seriesFill]).end().
            series(1).format(fills[1][seriesFill]).end().
            series(2).format(fills[2][seriesFill]).end().
            area(chartAreas[chartLegend]).
            type(chartType, {explode: 2, explodeDist: 10}).redraw();
    chartType = $.svg.graphing.chartTypes()[chartType];
    svg.circle(-100,500, 5, {fill: 'red', stroke: 'blue', strokeWidth: 2});
    
    var $plot = $("#plot");
    var $plotStage = $('#plot svg g.background');
    var $circle = $plot.find("circle");
    var $sPoly = $plot.find("polyline.solid");
    var $dPoly = $plot.find("polyline.dashed");
    
    $plotStage.mousemove(function (e) {
        
        $circle = $plot.find("circle");
        $sPoly = $plot.find("polyline.solid");
        $dPoly = $plot.find("polyline.dashed");
        
        parentOffset = $(this).offset();
        relX = e.pageX - parentOffset.left;
        relY = e.pageY - parentOffset.top;

        var mx = relX % 111;
        var my = relY % 48;

        relX = (mx > 55) ? relX + (111 - mx) : relX - mx;
        relY = (my > 24) ? relY + (48 - my) : relY - my;

        column = Math.round(relX / 111);
        if (sPoints.length >= column) {
            drawDashedPoly();
            drawCircle();
        }
    });

    $plotStage.mouseleave(function (e) {
        $circle.remove();
        $dPoly.remove();
    });

    $plotStage.mousedown(function (e) {
        if (sPoints.length >= column) {
            sPoints[column] = [relX + 75, relY + 60];
            drawSolidPoly();
        }
    });

    function drawCircle() {
        $circle.remove();
        svg.circle(relX + 75, relY + 60, 5, {fill: 'red', stroke: 'blue', strokeWidth: 2});
    };

    function drawSolidPoly() {
        $sPoly.remove();
        svg.polyline(sPoints, {fill: 'none', stroke: 'blue', strokeWidth: 5, class: 'solid'});
    };

    function drawDashedPoly() {
        $dPoly.remove();
        dPoints = sPoints.slice();
        dPoints[column] = [relX + 75, relY + 60];
        svg.polyline(dPoints, {class: "dashed", style: "fill:none;stroke:black;stroke-width:2;stroke-dasharray:5,5;d:M5 20 l215 0"});
        drawSolidPoly();
    };


});
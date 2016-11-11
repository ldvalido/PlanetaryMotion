type = ['', 'info', 'success', 'warning', 'danger'];


stats = {
    drawChart: function (stpQuantity, unknownQuantity, rainyQuantity, droughtQuantity) {

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
        var total = stpQuantity + unknownQuantity + rainyQuantity + droughtQuantity;
        var optionsPreferences = {
            donut: true,
            donutWidth: 200,
            startAngle: 0,
            total: total,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
            labels: [
                'STP (' + stpQuantity + ')',
                'Unknown (' + unknownQuantity + ')',
                'Rainy (' + rainyQuantity + ')',
                'Drought (' + droughtQuantity + ')'],
            series: [stpQuantity, unknownQuantity, rainyQuantity, droughtQuantity]
        });
    },
    showMaxTrianglePerimeter: function (maxTrianglePerimeter) {
        var formattedPerimeter = maxTrianglePerimeter.toFixed(2);
        $('#spanMaxPerimeter').html(formattedPerimeter);
    },
    initChartist: function(apiPrefix) {
        $.ajax(
        {
            url: apiPrefix+'/stats',
            crossDomain: true,
            type:'GET'
        }).done(function (data) {
            stats.drawChart(data.StpPeriods || 0, data.UnknownPeriods || 0 , data.RainyPeriods || 0, data.DroughtPeriods || 0);
            stats.showMaxTrianglePerimeter(data.MaxTrianglePerimter);
        }).fail(function () {
            alert('An error was ocurr');
        });
    },
    init: function (apiPrefix) {
        stats.initChartist(apiPrefix);

        $.notify({
            icon: 'pe-7s-gift',
            message: "Welcome to <b>Weather Stats Application</b> - a nice exercise for process weather events."

        }, {
            type: 'info',
            timer: 4000
        });
    }
}
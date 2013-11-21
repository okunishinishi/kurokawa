/**
 * public script for report
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *  Chart : Chart
 */
(function ($, l, hbs, Chart) {
    $.fn.extend({
        scoreTable: function (data) {
            var table = $(this),
                thead = $('thead', table),
                tbody = $('tbody', table);

            var tmpl = {
                bodyRow: hbs.templates['score-report-table-body-row']
            };
            var len = data.length;
            $('#score-table-count').text(['1-' + len, '/', len].join('')).hide();
            tbody.htmlHandlebars(tmpl.bodyRow, data);
            table.sortableTable();


            return table
        },
        scoreListSection: function (data) {
            var section = $(this),
                table = $('#score-table', section);

            data = data
                .sort(function (a, b) {
                    return Number(b.total) - Number(a.total);
                })
                .map(function (data, i) {
                    data['rank'] = (i + 1);
                    return data;
                });

            table
                .scoreTable(data)
                .trigger('resize-book');

            return section;
        },
        prepareDraw: function () {
            var canvas = $(this);
            canvas.removeAttr('style')
                .removeAttr('width')
                .removeAttr('height');
            var
                w = canvas.width(),
                h = canvas.height();
            canvas.attr({
                width: w,
                height: h
            });
            return canvas[0].getContext('2d');
        },
        top10ChartCanvas: function (data) {
            var canvas = $(this);

            data = data.slice(0, 10);
            canvas.data({
                labels: data.map(function (data) {
                    return $.trim(data.real_name) || data.username;
                }),
                values: data.map(function (data) {
                    return Number(data.total);
                })
            });

            canvas.draw = function (animation) {
                var ctx = canvas.prepareDraw();
                new Chart(ctx)
                    .Bar({
                        labels: canvas.data('labels'),
                        datasets: [
                            {
                                fillColor: canvas.data('fillcolor'),
                                strokeColor: canvas.data('strockcolor'),
                                data: canvas.data('values')
                            }
                        ]
                    }, {
                        animation: animation
                    });
            };
            return canvas;
        },
        teamCanvas: function (data) {
            var canvas = $(this);

            var tmpl = {
                labels: hbs.templates['pie-chart-labels']
            };

            var pointMap = {};
            data.forEach(function (data) {
                var team_name = data.team_name;
                pointMap[team_name] = (pointMap[team_name] || 0) + Number(data.total);
            });
            var teamNames = Object.keys(pointMap),
                colors = $.rainbowColor(canvas.data('basecolor'), teamNames.length + 1);
            colors.shift();
            var pieData = teamNames.map(function (team_name, i) {
                return {
                    label: team_name,
                    value: pointMap[team_name],
                    color: colors[i]
                }
            });

            canvas.after(tmpl.labels(pieData));
            var labels = canvas.next('.pie-chart-labels');


            canvas.data({
                pie: pieData
            });
            canvas.draw = function (animation) {
                var ctx = canvas.prepareDraw();
                new Chart(ctx).Pie(canvas.data('pie'), {
                    animation: animation,
                    animationEasing: "easeOutQuart"
                });
                labels.css({
                    left: canvas.width() / 2 + 180
                });
            };
            return canvas;
        },
        scoreChartSection: function (data) {
            var section = $(this),
                top10canvas = $('#top10-chart-canvas', section).top10ChartCanvas(data),
                teamCanvas = $('#team-chart-canvas', section).teamCanvas(data);


            section.draw = function (animation) {
                top10canvas.draw(animation);
                teamCanvas.draw(animation);
            };

            section.draw(true);
            return section;
        }
    })
    ;

    $(function () {
        var win = $(window),
            body = $(document.body);


        var data = d && d['report'];

        $('#score-list-section', body).scoreListSection(data['score'] || []);
        var scoreChartSection = $('#score-chart-section', body).scoreChartSection(data['score'] || []);


        win.resize(function () {
            scoreChartSection.draw(false);
        });

        $('#sub-nav', body).subNav('report');


    });
})
    (jQuery, window['l'], Handlebars, Chart);

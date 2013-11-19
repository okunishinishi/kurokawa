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
        chartCanvas: function () {
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
            return canvas;
        },
        top10ChartCanvas: function (animation) {
            var canvas = $(this).chartCanvas(),
                ctx = canvas[0].getContext('2d');
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
            return canvas;
        },
        scoreChartSection: function (data) {
            var section = $(this),
                form = $('#score-chart-condition-form', section),
                top10canvas = $('#top10-chart-canvas', section);


            var top10Data = data.slice(0, 10);
            top10canvas.data({
                labels: top10Data.map(function (data) {
                    return data.real_name;
                }),
                values: top10Data.map(function (data) {
                    return Number(data.total);
                })
            });

            section.draw = function (animation) {
                top10canvas.top10ChartCanvas(animation);
            };

            $(window).resize(function () {
                section.draw(false);
            });
            section.draw(true);
            return section;
        }
    })
    ;

    $(function () {
        var win = $(window),
            body = $(document.body);


        var data = d && d['report'];

        $('#score-list-section', body).scoreListSection(data['score']);
        $('#score-chart-section', body).scoreChartSection(data['score']);
        $('#sub-nav', body).subNav('report');


    });
})
    (jQuery, window['l'], Handlebars, Chart);

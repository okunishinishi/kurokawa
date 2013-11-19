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
        scoreChartCanvas: function (data) {
            var canvas = $(this),
                ctx = canvas[0].getContext('2d');

            console.log('data', data);
            new Chart(ctx)
                .Bar({
                    labels: data.map(function (data) {
                        return data.real_name;
                    }),
                    datasets: [
                        {
                            data:data.map(function (data) {
                                return Number(data.total);
                            })
                        }

                    ]
                });
            return canvas;
        },
        scoreChartSection: function (data) {
            var section = $(this);
            $('#score-chart-canvas', section).scoreChartCanvas(data);
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        var data = d && d['report'];


        $('#score-list-section', body).scoreListSection(data['score']);
        $('#score-chart-section', body).scoreChartSection(data['score']);
        $('#sub-nav', body).subNav('report');
    });
})(jQuery, window['l'], Handlebars, Chart);

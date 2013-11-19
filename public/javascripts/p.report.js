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
        scoreChartCanvas: function (data, animation) {
            var canvas = $(this),
                w = canvas.width(),
                h = canvas.height();
            canvas.attr({
                width: w,
                height: h
            });
            var
                ctx = canvas[0].getContext('2d');
            new Chart(ctx)
                .Bar({
                    labels: data.map(function (data) {
                        return data.real_name;
                    }),
                    datasets: [
                        {
                            fillColor: '#FFCC77',
                            strokeColor: '#efAe50',
                            data: data.map(function (data) {
                                return Number(data.total);
                            })
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
                canvas = $('#score-chart-canvas', section);

            form.data('chart', data);
            form.submit(function (e) {
                e.preventDefault();
                var data = form.data('chart'),
                    settings = form.getFormValue().toObj();
                data = data.slice(0, Number(settings.max_count || 10));
                canvas
                    .removeAttr('style')
                    .removeAttr('width')
                    .removeAttr('height')
                    .scoreChartCanvas(data, settings.animation);
            });

            $(window).resize(function () {
                form.submit();
            });
            form
                .submit()
                .findByName('animation').val('false');

            return section;
        }
    });

    $(function () {
        var win = $(window),
            body = $(document.body);


        var data = d && d['report'];

        $('#score-list-section', body).scoreListSection(data['score']);
        $('#score-chart-section', body).scoreChartSection(data['score']);
        $('#sub-nav', body).subNav('report');


    });
})(jQuery, window['l'], Handlebars, Chart);

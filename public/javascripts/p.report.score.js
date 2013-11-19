(function ($, d, hbs) {
    $.fn.extend({
        scoreReportTable: function (data) {
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
        scoreReportSection: function (data) {
            var section = $(this),
                table = $('#score-report-table', section);

            data = data
                .sort(function (a, b) {
                    return Number(b.total) - Number(a.total);
                })
                .map(function (data, i) {
                    data['rank'] = (i + 1);
                    return data;
                });

            table.scoreReportTable(data);

            return section;
        }
    });
    $(function () {
        var body = $(document.body);
        var data = d && d['report'];
        if (!data) {
            body.addClass('sorry-page')
                .html("Sorry! No report data found.");
            return;
        }

        $('#score-report-section', body).scoreReportSection(data['score']);
    });
})(jQuery, window['d'], Handlebars);
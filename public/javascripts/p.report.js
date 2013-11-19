/**
 * public script for report
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
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

            table
                .scoreReportTable(data)
                .trigger('resize-book');

            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        var data = d && d['report'];


        $('#score-report-section', body).scoreReportSection(data['score']);
        $('#sub-nav', body).subNav('report');
    });
})(jQuery, window['l'], Handlebars);

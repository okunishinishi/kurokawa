/**
 * public script for report
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['report-list-item']
    };
    $.fn.extend({
        reportSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        reportListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        reportList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .reportListItem();
            return ul;
        },
        reportListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.reportListItem();
            });
            searchForm.reportSearchForm(function (data) {
                ul.reportList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#report-list-section', body).reportListSection();

        $('#sub-nav', body).subNav('report');
    });
})(jQuery, window['l'], Handlebars);

/**
 * public script for master
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['master-list-item']
    };
    $.fn.extend({
        masterSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        masterListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        masterList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .masterListItem();
            return ul;
        },
        masterListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.masterListItem();
            });
            searchForm.masterSearchForm(function (data) {
                ul.masterList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#master-list-section', body).masterListSection();
    });
})(jQuery, window['l'], Handlebars);

/**
 * public script for person_update
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        li: hbs.templates['person_update-list-item']
    };
    $.fn.extend({
        personUpdateSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        personUpdateListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        personUpdateList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .personUpdateListItem();
            return ul;
        },
        personUpdateListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.personUpdateListItem();
            });
            searchForm.personUpdateSearchForm(function (data) {
                ul.personUpdateList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#person_update-list-section', body).personUpdateListSection();
    });
})(jQuery, window['l'], Handlebars);

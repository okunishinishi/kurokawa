/**
 * public script for person
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['person-list-item']
    };
    $.fn.extend({
        personSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        personListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        personList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .personListItem();
            return ul;
        },
        personListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.personListItem();
            });
            searchForm.personSearchForm(function (data) {
                ul.personList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#person-list-section', body).personListSection();
    });
})(jQuery, window['l'], Handlebars);

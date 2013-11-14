/**
 * public script for team
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['team-list-item']
    };
    $.fn.extend({
        teamSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        teamListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        teamList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .teamListItem();
            return ul;
        },
        teamListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.teamListItem();
            });
            searchForm.teamSearchForm(function (data) {
                ul.teamList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#team-list-section', body).teamListSection();
    });
})(jQuery, window['l'], Handlebars);

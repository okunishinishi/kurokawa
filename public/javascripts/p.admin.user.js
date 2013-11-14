/**
 * public script for user manage page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['user-list-item']
    };
    $.fn.extend({
        userSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        userListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        userList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .userListItem();
            return ul;
        },
        userListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.userListItem();
                section.trigger('resize-book');
            });
            searchForm.userSearchForm(function (data) {
                ul.userList(data);
                section.trigger('resize-book');
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#user-list-section', body).userListSection();
    });
})(jQuery, window['l'], Handlebars);

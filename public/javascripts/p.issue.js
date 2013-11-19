/**
 * public script for issue
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        li: hbs.templates['issue-list-item']
    };
    $.fn.extend({
        issueListItem: function () {
            return $(this).each(function () {
                var li = $(this);
                li
                    .destroyableListItem()
                    .editableListItem('dblclick');
                li
                    .find('select').each(function () {
                        var select = $(this),
                            value = select.data('value');
                        if (value) select.val(value);
                    });
                li
                    .find('textarea')
                    .blur(function () {
                    });

            });
        },
        issueList: function (data) {
            data = data && data.filter(function (data) {
                return !!data.title;
            });
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .issueListItem();
            return ul;
        },
        issueListSection: function (data) {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul');
            var firstUl = ul.first();
            firstUl
                .appendableList(tmpl.li, addBtn, function (li) {
                    li.issueListItem()
                        .find('textarea')
                        .focus()
                        .removeClass('editable-list-item-fixed');
                    li
                        .findByName('status')
                        .val(firstUl.data('status'));
                    firstUl.transferable('.issue-list-item');
                });

            ul
                .each(function () {
                    if(!data) return;
                    var ul = $(this),
                        status = ul.data('status');
                    ul.issueList(data && data.filter(function (data) {
                        return data.status == status;
                    }))
                })
                .on('tk-transfer', function (e, item) {
                    var status = $(this).data('status'),
                        statusInput = item.findByName('status');
                    var changed = statusInput.val() != status;
                    if (changed) {
                        statusInput.val(status);
                        statusInput.submit();
                    }
                })
                .transferable('.issue-list-item');

            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        var issueListSection = $('#issue-list-section', body);
        issueListSection.issueListSection(issueListSection.data('issues'));
    });
})(jQuery, window['l'], Handlebars);

/**
 * public script for all pages
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {
    hbs.registerHelper('l', function (name) {
        return name && eval(["window", "l"].concat(name).join('.'));
    });
    hbs.registerHelper('t', function () {
        return new Date().getTime();
    });
    hbs.registerHelper('ctx', function () {
        var ctx = window['ctx'];
        return ctx ? '/' + ctx : '';
    });

    $.confirmRemove = (function (confirmRemove) {
        return function () {
            return confirmRemove.apply(this, arguments);
        };
    })($.confirmRemove);
    $.extend({
    });
    $.fn.extend({
        /**
         * list with appendable items
         * @param tmpl
         * @param addBtn
         * @param callback
         * @returns {*|HTMLElement}
         */
        appendableList: function (tmpl, addBtn, callback) {
            var ul = $(this);
            addBtn.click(function () {
                var li = ul.appendHandlebars(tmpl, {})
                    .find('li')
                    .last();
                callback && callback(li);
            });
            return ul;
        },
        /**
         * list item which is editable
         * @returns {*}
         */
        editableListItem: function (trigger) {
            return this.each(function () {
                var li = $(this);
                var editableTxt = li.findByRole('editable-text')
                    .editableText(trigger)
                    .change(function () {
                        $(this).submit();
                    })
                    .first()
                    .focus();
                li.findByName('edit-form')
                    .ajaxForm(function (data) {
                        var form = $(this);
                        if (data.valid) {
                            form.setFormValue(data.model);
                            form.trigger('edit-done');
                        } else {
                            var errors = data['errors'];
                            if (errors && errors.length) {
                                alert(errors[0]); //TODO
                            }
                        }
                    });
                li.findByRole('edit-btn').off('click').click(function (e) {
                    var onEdit = editableTxt.filter(':visible');
                    if (onEdit.length) {
                        //noinspection JSCheckFunctionSignatures
                        editableTxt.trigger('tk-editable-text-edit');
                    } else {
                        //noinspection JSCheckFunctionSignatures
                        editableTxt.trigger('tk-editable-text-edit');
                    }
                    e.stopPropagation();
                });
            });
        },
        destroyableListItem: function (showDialog) {
            return this.each(function () {
                var li = $(this);
                li.findByName('destroy-form')
                    .ajaxForm(function () {
                        li.closeDown();
                    })
                    .findByRole('submit-btn')
                    .click(function () {
                        var btn = $(this);
                        if (showDialog) {
                            var name = li.findByName('name').val();
                            $.confirmRemove(name, function () {
                                btn.submit();
                            });
                        } else {
                            var sure = confirm(l.alt.sure);
                            if (sure) btn.submit();
                        }
                    });
            });
        },
        /**
         * form for searching
         * @param callback
         * @returns {*|HTMLElement}
         */
        searchForm: function (callback) {
            var form = $(this);
            form.ajaxForm(function (data) {
                callback && callback(data);
            });
            form.find('input[type="search"]').textchange(function () {
                form.submit();
            });
            $(':submit', form).hide();
            return form;
        },

        /**
         * form with validation
         * @param schema
         * @returns {*|HTMLElement}
         */
        validationForm: function (schema) {
            var form = $(this);
            if (!form.data('validation-form')) {
                form.data('validation-form', true);
                form.submit(function (e) {
                    var schema = form.data('schema');
                    if (!schema) return;
                    form.find('.err-input').removeClass('err');
                    var values = form.getFormValue().toObj();
                    var result = schema.validate(values);
                    if (!result.valid) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        form.errForm(result.errors);
                    }
                });
            }
            form.data('schema', schema);
            return form;
        },
        validatableAjaxForm: function (callback) {
            var form = $(this);
            return form.ajaxForm(function (data) {
                form.errForm(data.errors || []);
                callback.call(form, data);
            })
        },
        errForm: function (err) {
            var form = $(this);
            if (!err) return form;
            var tmpl = hbs.templates['input-err-msg'];
            form.find('.err-input').removeClass('err-input');
            form.find('.input-err-msg').remove();
            var joiner = ' '; //TODO when japanese, joiner should be empty
            err.forEach(function (err) {
                var input = form.findByName(err.property).addClass('err-input');
                var label = err.label || err.property,
                    msg = [
                        label,
                        err.message
                    ].join(joiner);
                input.parent()
                    .find('.input-err-msg').remove();
                input.before(tmpl(msg));
            });
            form.find('.err-input').first().focus();
            return form;
        },
        editableForm: function (mode) {
            var form = $(this);
            var editableText = form.findByRole('editable-text')
                .editableText('dblclick')
                .off('change');

            form.find('.checkable-label').each(function () {
                var label = $(this),
                    checkable = label.find(':checkbox,:radio');
                checkable.change(function () {
                    var checked = checkable.is(':checked');
                    label.addClass('checked')
                        .siblings('.checked')
                        .removeClass('checked');
                });
                var checked = checkable.is(':checked');
                if(checked) label.addClass('checked');
            });
            var $checkable = $('.checkable-label', form);
            switch (mode) {
                case 'view':
                    $checkable.each(function () {
                        var label = $(this),
                            input = $('#' + label.attr('for'));
                        if (!input.size()) return;
                        var checked = input.is(':checked');
                        if (checked) {
                            label.show();
                        } else {
                            label.hide();
                        }
                    });
                    editableText.trigger('tk-editable-text-fix');
                    $(':text,textarea', form).filter(':visible').hide();
                    break;
                case 'edit':
                    $checkable.show();
                    editableText.trigger('tk-editable-text-edit');
                    break;
            }

            form.attr('data-mode', mode);
        },
        detailForm: function (mode, saveBtn, editBtn) {
            var form = $(this).addClass('editable-form');

            form.ajaxForm(function () {
                editBtn.show();
                saveBtn.hide();
                form.editableForm('view');
            });
            editBtn.click(function () {
                form.editableForm('edit');
                editBtn.hide();
                saveBtn.show();
            });
            form
                .change(function () {
                    $.confirmLeave(l.msg.leave_with_unsaved);
                });
            form.find(':text')
                .keydown(function (e) {
                    switch (e.which) {
                        case $.ui.keyCode.ENTER:
                            e.preventDefault();
                            break;
                    }
                });
            form.editableForm(mode || 'view');

            switch (mode) {
                case 'edit':
                    editBtn.hide();
                    break;
                default:
                    saveBtn.hide();
                    break;
            }

            return form;
        },
        dropdownBtn: function () {
            return $(this).each(function () {
                var btn = $(this),
                    ul = $('#' + btn.attr('for'));
                btn.click(function () {
                    ul.show();
                });
            });
        },
        headNav: function () {
            var nav = $(this);
            nav.findByRole('dropdown-btn').dropdownBtn();
            return nav;
        },
        book: function () {
            var book = $(this),
                leftPage = $('#left-page', book),
                rightPage = $('#right-page', book),
                crossPage = $('#cross-page');
            if (!crossPage.is(':empty')) crossPage.show();
            var both = leftPage.is(':visible') && rightPage.is(':visible');
            if (both) {
                book.on('resize-book',function () {
                    var h1 = leftPage.height('auto').height(),
                        h2 = rightPage.height('auto').height();
                    var h = h1 && h2 && (h1 > h2 ? h1 : h2);
                    if (h) {
                        leftPage.height(h);
                        rightPage.height(h);
                    }
                }).trigger('resize-book');
            }
            return book;
        }
    });
    $(function () {

        var body = $(document.body);

        body.ajaxError(function (e, req, setting, err) {
            if (req.status) {
                var statusCode = req.statusCode();
//                alert(statusCode + 'something is wrong!');
                console.error('[ajax err]', statusCode, err);
            }
        });

        $('#nav', body).headNav();

        $('.alert-close-btn', body).click(function () {
            var alertDiv = $(this).parent('.alert');
            alertDiv.closeDown(function () {
                alertDiv.remove();
            });
        });

        $('#book').book();
    });
})(jQuery, window['l'], Handlebars);


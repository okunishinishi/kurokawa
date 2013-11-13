/**
 * public script for sign page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  v : validation
 *  hbs : handlebars
 *
 */
(function ($, l, v, hbs) {

    $.fn.extend({
        followLink: function () {
            var a = $(this);
            location.href = a.attr('href');
        },
        signinTabContent: function () {
            var tabContent = $(this),
                form = $('#signin-form', tabContent),
                errDiv = $('#signin-form-err-div', tabContent);
            form
                .validationForm(v.sign.signin)
                .validatableAjaxForm(function (data) {
                    var success = data.valid;
                    if (success) {
                        $('#signin-success-link', tabContent).followLink();
                    } else {
                        var err_alert = data.err_alert || '';
                        errDiv.text(err_alert);
                    }
                });
            return tabContent;
        },
        signupTabContent: function () {
            var tabContent = $(this),
                form = $('#signup-form', tabContent);

            var captchaRefreshBtn = $('#captcha-refresh-btn', form),
                captchaImg = $('#captcha-img', form);

            captchaImg.load(function () {
                captchaImg.parent().removeSpin();
            });
            captchaImg.refresh = function () {
                captchaImg.parent().showSpin();
                captchaImg.attr({
                    src: captchaImg.data('src')
                });
            };
            captchaRefreshBtn.click(function () {
                captchaImg.refresh();
                $('#captcha_text-input', tabContent).focus();
            });
            tabContent.on('tab-content-select', function () {
                captchaImg.refresh();
            });
            form
                .validationForm(v.sign.signup)
                .validatableAjaxForm(function (data) {
                    if (data.valid) {
                        $('#signup-success-link', tabContent).followLink();
                    } else {
                        captchaImg.refresh();
                    }
                });

            return tabContent;
        },
        signSection: function () {
            var section = $(this),
                tabs = $('#sign-tabs', section);
            var tab = tabs.find('.tab').click(function () {
                var tab = $(this).addClass('tab-selected');
                tab.siblings('.tab-selected').removeClass('tab-selected');
                var hash = '#' + tab.attr('for');
                location.href = hash;
                var tabContent = $(hash),
                    form = $('form', tabContent);
                var values = $('form:visible', section).first().getFormValue();
                form.setFormValue(values);
                tabContent
                    .show()
                    .trigger('tab-content-select')
                    .find(':text')
                    .first()
                    .focus();
                tabContent
                    .siblings('.tab-content').hide();
            });

            $('#signin-tab-content', section).signinTabContent();
            $('#signup-tab-content', section).signupTabContent();

            if (location.hash) {
                section.findByAttr('for', location.hash.replace('#', '')).click();
            } else {
                tab.first().click();
            }


            return  section;
        }
    });
    $(function () {
        var body = $(document.body);

        $('#sign-section', body).signSection();

        v.disableAllValidations(); //FIXME

    });
})(jQuery, window['l'], window['v'], Handlebars);


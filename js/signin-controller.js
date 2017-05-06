var BookIt = BookIt || {};

BookIt.SignInController = function () {

    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtEmailAddress = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

BookIt.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.mainMenuPageId = "#page-main-menu";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtEmailAddress = $("#txt-email", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

BookIt.SignInController.prototype.emailAddressIsValid = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

BookIt.SignInController.prototype.resetSignInForm = function () {

    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtEmailAddress.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtEmailAddress.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);
};

BookIt.SignInController.prototype.onSignInCommand = function () {

    var me = this,
        emailAddress = me.$txtEmailAddress.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtEmailAddress.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtEmailAddress.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!me.emailAddressIsValid(emailAddress)) {
        me.$ctnErr.html("<p>Please enter a valid email address.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtEmailAddress.addClass(invalidInputStyle);
        return;
    }

    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: BookIt.Settings.signInUrl,
        data: "email=" + emailAddress + "&password=" + password,
        cache: false,
        success: function (resp) {

            $.mobile.loading("hide");

            if (resp.status === "success") {
                // Create session.
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + BookIt.Settings.sessionTimeoutInMSec);

                BookIt.Session.getInstance().set({
                    userProfileModel: resp.session_email,
                    sessionId: resp.session_id,
                    first_name: resp.first_name,
                    last_name: resp.last_name,
                    role: resp.role,
                    expirationDate: expirationDate,
                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
                });

                if(resp.role === 'Admin')
                {
                    $.mobile.navigate("#page-admin");
                    return;
                } else {
                    $.mobile.navigate("#page-user");
                    return;
                }
            } else {
                me.$ctnErr.html("<p>"+resp.message+"</p>");
                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};
BookIt.forgotPasswordController = function () {
    //To forgot
    this.$forgotPassword = null;
    this.$btnForgot = null;
    this.$txtForgotEmail = null;
    this.$txtForgotDob = null;
    this.$ctnErrForgot = null;

    //To Reset
    this.$btnReset = null;
    this.$ctnErrReset = null;
    this.$txtReset = null;
    this.$txtUserId = null;
    this.$txtResetConfirm = null;
};

BookIt.forgotPasswordController.prototype.init = function () {
    this.$forgotPassword = $("#forgot-password");
    //forgot
    this.$btnForgot = $("#btn-forgot", this.$forgotPassword);
    this.$txtForgotEmail = $("#txt-forgot-email", this.$forgotPassword);
    this.$txtForgotDob = $("#txt-forgot-dob", this.$forgotPassword);
    this.$ctnErrForgot = $("#ctn-err-forgot", this.$forgotPassword);

    //reset
    this.$btnReset = $("#btn-reset", this.$forgotPassword);
    this.$txtReset = $("#txt-reset-password", this.$forgotPassword);
    this.$txtResetConfirm = $("#txt-reset-password-confirm", this.$forgotPassword);
    this.$txtUserId = $("#reset-user-id", this.$forgotPassword);
    this.$ctnErrReset = $("#ctn-err-reset", this.$forgotPassword);

};

BookIt.forgotPasswordController.prototype.emailAddressIsValid = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

BookIt.forgotPasswordController.prototype.passwordsMatch = function (password, passwordConfirm) {
    return password === passwordConfirm;
};

BookIt.forgotPasswordController.prototype.onForgotCommand = function () {

    var me = this,
        emailForgot = me.$txtForgotEmail.val().trim(),
        dobForgot = me.$txtForgotDob.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErrForgot.removeClass().addClass(invisibleStyle);
    me.$txtForgotEmail.removeClass(invalidInputStyle);
    me.$txtForgotDob.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailForgot.length === 0) {
        me.$txtForgotEmail.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (dobForgot.length === 0) {
        me.$txtForgotDob.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErrForgot.html("<p>Please enter all the required fields.</p>");
        me.$ctnErrForgot.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!me.emailAddressIsValid(emailForgot)) {
        me.$ctnErrForgot.html("<p>Please enter a valid email address.</p>");
        me.$ctnErrForgot.addClass("bi-ctn-err").slideDown();
        me.$txtForgotEmail.addClass(invalidInputStyle);
        return;
    }

    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: BookIt.Settings.forgot,
        data: "email=" + emailForgot + "&dob=" + dobForgot,
        cache:false,
        success: function (resp) {

            $.mobile.loading("hide");

            if (resp.status === "success") {
                $("#forgot-password-form").css("display", "none");
                $("#reset-form").css("display", "block");
                $("#reset-user-id").val(resp.user_id);
            } else {
                me.$ctnErrForgot.html("<p>"+resp.message+"</p>");
                me.$ctnErrForgot.addClass("bi-ctn-err").slideDown();
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErrForgot.html("<p>Oops! MCPA had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErrForgot.addClass("bi-ctn-err").slideDown();
        }
    });
};

BookIt.forgotPasswordController.prototype.onResetCommand = function () {
    var me = this,
        password = me.$txtReset.val().trim(),
        passwordConfirm = me.$txtResetConfirm.val().trim(),
        userId = me.$txtUserId.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErrReset.removeClass().addClass(invisibleStyle);
    me.$txtReset.removeClass(invalidInputStyle);
    me.$txtResetConfirm.removeClass(invalidInputStyle);

    if (password.length === 0) {
        me.$txtReset.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (passwordConfirm.length === 0) {
        me.$txtResetConfirm.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErrReset.html("<p>Please enter all the required fields.</p>");
        me.$ctnErrReset.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!me.passwordsMatch(password, passwordConfirm)) {
        me.$ctnErrReset.html("<p>Your passwords don't match.</p>");
        me.$ctnErrReset.addClass("bi-ctn-err").slideDown();
        me.$txtReset.addClass(invalidInputStyle);
        me.$txtResetConfirm.addClass(invalidInputStyle);
        return;
    }

    $.ajax({
        type: 'POST',
        url: BookIt.Settings.reset,
        data: "userid=" + userId + "&password=" + password + "&passwordConfirm=" + passwordConfirm,
        cache:false,
        success: function (resp) {

            $.mobile.loading("hide");

            if (resp.status === "success") {
                $.mobile.navigate("#page-password-succeeded");
                return;
            } else {
                me.$ctnErrReset.html("<p>"+resp.message+"</p>");
                me.$ctnErrReset.addClass("bi-ctn-err").slideDown();
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErrReset.html("<p>Oops! MCPA had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErrReset.addClass("bi-ctn-err").slideDown();
        }
    });
};



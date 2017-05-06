var BookIt = BookIt || {};

/*
 * 
 * After Login Menu Items
 * 
 */
BookIt.userMenuController = function () {
};

BookIt.userMenuController.prototype.init = function () {
	this.$loginName = $("#session_name");
    this.$logout = $("#logout");
};

BookIt.userMenuController.prototype.getMenuDetails = function () {
	this.$loginName.html("");
	var session = BookIt.Session.getInstance().get();
	if(session)
	{
		if(session.userProfileModel == '' && session.sessionId == '')
		{
			$.mobile.navigate("#page-signin");
			return;
		} else {
			this.$loginName.html("Welcome "+session.first_name+" "+session.last_name);	
		}
	} else {
		$.mobile.navigate("#page-signin");
		return;	
	}
};

/*
 * 
 * Logout 
 * 
 */
BookIt.userMenuController.prototype.logout = function () {
	var session = BookIt.Session.getInstance().remove(); 
	$.mobile.navigate("#page-signin");
};

/*
 * 
 * Account Details 
 * 
 */
BookIt.userDetailsController = function () {
};

BookIt.userDetailsController.prototype.init = function () {
	
	this.$editUserPage = $("#page-user-details");
    this.$btnEdit = $("#edit", this.$editUserPage);
    this.$ctnErr = $("#err", this.$editUserPage);
    this.$txtFirstName = $("#fname", this.$editUserPage);
    this.$txtLastName = $("#lname", this.$editUserPage);
    this.$txtEmailAddress = $("#emailAddress", this.$editUserPage);
    this.$txtAge = $("#age", this.$editUserPage);
    this.$txtDob = $("#dob", this.$editUserPage);
    
	var session = BookIt.Session.getInstance().get();
	if(session)
	{
		if(session.userProfileModel == '' && session.sessionId == '')
		{
			$.mobile.navigate("#page-signin");
			return;
		} 
	} else {
		$.mobile.navigate("#page-signin");
		return;	
	}
	
	$.ajax({
        type: 'GET',
        url: BookIt.Settings.userDetails+"?param="+session.sessionId,
        data: $(this).serialize(),
        success: function (resp) {
        	$("#fname").val(resp[0].first_name);
        	$("#lname").val(resp[0].last_name);
        	$("#emailAddress").val(resp[0].email);
        	$("#age").val(resp[0].age);
        	$("#dob").val(resp[0].dob);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

BookIt.userDetailsController.prototype.resetUserEditForm = function () {
   
};

/*
 * 
 * New Claim  
 * 
 */

BookIt.claimController = function () {

    this.$claimPage = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtMediCost = null;
    this.$txtSurgeryCost = null;
    this.$txtLabCost = null;
    this.$txtExtCost = null;
};

BookIt.claimController.prototype.init = function () {
    this.$claimPage = $("#page-claim");
    this.$btnSubmit = $("#btn-submit", this.$claimPage);
    this.$ctnErr = $("#ctn-err", this.$claimPage);
    this.$txtMediCost = $("#txt-medi-cost", this.$claimPage);
    this.$txtSurgeryCost = $("#txt-surgery-cost", this.$claimPage);
    this.$txtLabCost = $("#txt-lab-cost", this.$claimPage);
    this.$txtExtCost = $("#txt-ext-cost", this.$claimPage);
};


BookIt.claimController.prototype.resetClaimForm = function () {

    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtMediCost.removeClass(invalidInputStyle);
    this.$txtSurgeryCost.removeClass(invalidInputStyle);
    this.$txtLabCost.removeClass(invalidInputStyle);
    this.$txtExtCost.removeClass(invalidInputStyle);

    this.$txtMediCost.val("");
    this.$txtSurgeryCost.val("");
    this.$txtLabCost.val("");
    this.$txtExtCost.val("");
};

BookIt.claimController.prototype.onClaimCommand = function () {

    var me = this,
        mediCost = me.$txtMediCost.val().trim(),
        surgeryCost = me.$txtSurgeryCost.val().trim(),
        labCost = me.$txtLabCost.val().trim(),
        extCost = me.$txtExtCost.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtMediCost.removeClass(invalidInputStyle);
    me.$txtSurgeryCost.removeClass(invalidInputStyle);
    me.$txtLabCost.removeClass(invalidInputStyle);
    me.$txtExtCost.removeClass(invalidInputStyle);
 
    // Flag each invalid field.
    if (mediCost.length === 0) {
        me.$txtMediCost.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (surgeryCost.length === 0) {
        me.$txtSurgeryCost.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (labCost.length === 0) {
        me.$txtLabCost.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (extCost.length === 0) {
        me.$txtExtCost.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    var session = BookIt.Session.getInstance().get();
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.newClaim,
        data:"medi_cost=" + mediCost + "&surgery_cost=" + surgeryCost + "&lab_cost=" + labCost + "&extra_cost=" + extCost +"&user_id=" + session.sessionId ,
        success: function (resp) {

            if (resp.status === "success") {
            	$.mobile.navigate("#page-claim-succeeded");
                return;
            } else {
            	me.$ctnErr.html("<p>"+resp.message+"</p>");
                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            } 
        },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

/*
 * 
 * Pending Claims User Wise
 * 
 */

BookIt.pendignClaimController = function () {
};

BookIt.pendignClaimController.prototype.init = function () {
	
	this.$pendingClaimPage = $("#page-pending-claim");
    
	var session = BookIt.Session.getInstance().get();
	if(session)
	{
		if(session.userProfileModel == '' && session.sessionId == '')
		{
			$.mobile.navigate("#page-signin");
			return;
		} 
	} else {
		$.mobile.navigate("#page-signin");
		return;	
	}
	
	$.ajax({
        type: 'GET',
        url: BookIt.Settings.pendingClaim+"?param="+session.sessionId,
        data: $(this).serialize(),
        success: function (resp) {
    		$("#pendingClaims").html(resp);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};


/*
 * 
 * Completed Claims User wise
 * 
 * 
 */

BookIt.completedClaimController = function () {
};

BookIt.completedClaimController.prototype.init = function () {
	
	this.$completedClaimPage = $("#page-completed-claim");
    
	var session = BookIt.Session.getInstance().get();
	if(session)
	{
		if(session.userProfileModel == '' && session.sessionId == '')
		{
			$.mobile.navigate("#page-signin");
			return;
		} 
	} else {
		$.mobile.navigate("#page-signin");
		return;	
	}
	
	$.ajax({
        type: 'GET',
        url: BookIt.Settings.completedClaim+"?param="+session.sessionId,
        data: $(this).serialize(),
        success: function (resp) {
    		$("#completedClaims").html(resp);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};


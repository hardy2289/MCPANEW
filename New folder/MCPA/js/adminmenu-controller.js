var BookIt = BookIt || {};

/*
 * 
 * After Login Menu Items
 * 
 */
BookIt.adminMenuController = function () {
};

BookIt.adminMenuController.prototype.init = function () {
	this.$adminLoginName = $("#admin_session_name");
    this.$logoutAdmin = $("#logout-admin");
};

BookIt.adminMenuController.prototype.getMenuDetails = function () {
	this.$adminLoginName.html("");
	var session = BookIt.Session.getInstance().get();
	if(session)
	{
		if(session.userProfileModel == '' && session.sessionId == '')
		{
			$.mobile.navigate("#page-signin");
			return;
		} else {
			this.$adminLoginName.html("Welcome "+session.first_name+" "+session.last_name);	
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
BookIt.adminMenuController.prototype.logoutAdmin = function () {
	var session = BookIt.Session.getInstance().remove(); 
	$.mobile.navigate("#page-signin");
};

/*
 * 
 * Account Details 
 * 
 */
BookIt.adminDetailsController = function () {
};

BookIt.adminDetailsController.prototype.init = function () {
	
	this.$editUserPage = $("#page-admin-details");
    this.$btnEdit = $("#edit", this.$editUserPage);
    this.$ctnErr = $("#err", this.$editUserPage);
    this.$txtFirstName = $("#adminfname", this.$editUserPage);
    this.$txtLastName = $("#adminlname", this.$editUserPage);
    this.$txtEmailAddress = $("#adminemailAddress", this.$editUserPage);
    this.$txtAge = $("#adminage", this.$editUserPage);
    this.$txtDob = $("#admindob", this.$editUserPage);
    
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
        	$("#adminfname").val(resp[0].first_name);
        	$("#adminlname").val(resp[0].last_name);
        	$("#adminemailAddress").val(resp[0].email);
        	$("#adminage").val(resp[0].age);
        	$("#admindob").val(resp[0].dob);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

BookIt.adminDetailsController.prototype.resetUserEditForm = function () {
};

/*
 * 
 * Pending Claims User Wise
 * 
 */

BookIt.allPendignClaimController = function () {
};

BookIt.allPendignClaimController.prototype.init = function () {
	
	this.$pendingClaimPage = $("#page-all-pending-claim");
    
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
        url: BookIt.Settings.allPendingClaim,
        data: $(this).serialize(),
        success: function (resp) {
    		$("#allPendingClaims").html(resp);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

BookIt.allPendignClaimController.prototype.update = function (id,status) {
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.approveDecline,
        data:"claim_id=" + id + "&status=" + status,
        success: function (resp) {

            if (resp.status === "success") {
            	location.reload( true );
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
 * Completed Claims User wise
 * 
 * 
 */

BookIt.allCompletedClaimController = function () {
};

BookIt.allCompletedClaimController.prototype.init = function () {
	
	this.$completedClaimPage = $("#page-all-completed-claim");
    
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
        url: BookIt.Settings.allCompletedClaim,
        data: $(this).serialize(),
        success: function (resp) {
    		$("#allCompletedClaims").html(resp);
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
 * All User list 
 * 
 */
BookIt.allUsersController = function () {
};

BookIt.allUsersController.prototype.init = function () {
	
	this.$completedClaimPage = $("#page-all-users");
    
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
        url: BookIt.Settings.allUsers,
        data: $(this).serialize(),
        success: function (resp) {
    		$("#allUsers").html(resp);
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
 * Search Results 
 * 
 */
BookIt.searchController = function () {
};

BookIt.searchController.prototype.init = function () {
	
	this.$searchPage = $("#page-search");
    this.$btnSearch = $("#btn-search", this.$searchPage);
    this.$txtSearch = $("#txt-search", this.$searchPage);
    this.$ctnErr = $("#ctn-err-admin", this.$searchPage);
    
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
	
};

BookIt.searchController.prototype.find = function()
{
	$("#searchResult").html("");
    var me = this,
    search = me.$txtSearch.val().trim(),
    invalidInput = false,
    invisibleStyle = "bi-invisible",
    invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$txtSearch.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (search.length === 0) {
    	me.$txtSearch.addClass(invalidInputStyle);
    	invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    
	$.ajax({
        type: 'GET',
        url: BookIt.Settings.search,
        data: "param=" + search,
        success: function (resp) {
        	$("#result").css("display", "block");
    		$("#searchResult").html(resp);
         },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! MCPA had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });	
};

var BookIt = BookIt || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signupController = new BookIt.SignUpController();
app.adminSignupController = new BookIt.adminSignupController();
app.signInController = new BookIt.SignInController();

app.userMenuController = new BookIt.userMenuController();
app.userDetailsController = new BookIt.userDetailsController();
app.claimController = new BookIt.claimController(); //New Claim
app.pendignClaimController = new BookIt.pendignClaimController(); 
app.completedClaimController = new BookIt.completedClaimController(); // Pending Claim 

app.adminMenuController = new BookIt.adminMenuController();
app.adminDetailsController = new BookIt.adminDetailsController();
app.allPendignClaimController = new BookIt.allPendignClaimController(); 
app.allCompletedClaimController = new BookIt.allCompletedClaimController(); 
app.allUsersController = new BookIt.allUsersController();
app.searchController = new BookIt.searchController();

$(document).on("pagecontainerbeforechange", function (event, ui) {

    if (typeof ui.toPage !== "object") return;
    
    switch (ui.toPage.attr("id")) {
        case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = BookIt.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn) {
                	if(session.role === 'Admin')
                	{
                		ui.toPage = $("#page-admin");	
                	} else {
                		ui.toPage = $("#page-user");
                	}              
                }
            }
    }
});

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                app.signupController.resetSignUpForm();
                break;
            case "page-admin-signup":
                app.adminSignupController.resetSignUpForm();
                break;
            case "page-signin":
                app.signInController.resetSignInForm();
                break;
            case "page-user":
                app.userMenuController.getMenuDetails();
                break;
            case "page-user-details":
                break;
            case "page-claim":
            	app.claimController.resetClaimForm();
                break;
            case "page-pending-claim":
                break;
            case "page-completed-claim":
                break;
            case "page-admin":
                app.adminMenuController.getMenuDetails();
                break;
            case "page-admin-details":
                break;
            case "page-all-pending-claim":
                break;
            case "page-all-completed-claim":
                break;
            case "page-all-users":
                break;
            case "page-add-admin":
            	app.allCompletedClaimController.resetClaimForm();
                break;
            case "page-search":
                break;
        }
    }
});

$(document).delegate("#page-signin", "pagebeforecreate", function () {

    app.signInController.init();

    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

$(document).delegate("#page-signup", "pagebeforecreate", function () {

    app.signupController.init();

    app.signupController.$btnSubmit.off("tap").on("tap", function () {
        app.signupController.onSignupCommand();
    });

});

$(document).delegate("#page-admin-signup", "pagebeforecreate", function () {

    app.adminSignupController.init();

    app.adminSignupController.$btnAdminSubmit.off("tap").on("tap", function () {
        app.adminSignupController.onAdminSignupCommand();
    });

});

//
// Start Users Controller
//

$(document).delegate("#page-user", "pagebeforecreate", function () {
	app.userMenuController.init();
	app.userMenuController.$logout.off("tap").on("tap", function () {
		app.userMenuController.logout();
	});
});

$(document).delegate("#page-user-details", "pagebeforecreate", function () {
	app.userDetailsController.init();
	app.userDetailsController.$btnEdit.off("tap").on("tap", function () {
		app.userDetailsController.resetUserEditForm();
	});
});

$(document).delegate("#page-claim", "pagebeforecreate", function () {
    app.claimController.init();
    app.claimController.$btnSubmit.off("tap").on("tap", function () {
        app.claimController.onClaimCommand();
    });
});

$(document).delegate("#page-pending-claim", "pagebeforecreate", function () {
    app.pendignClaimController.init();
});

$(document).delegate("#page-completed-claim", "pagebeforecreate", function () {
    app.completedClaimController.init();
});

//
// Start Admin Controller
//

$(document).delegate("#page-admin", "pagebeforecreate", function () {
	app.adminMenuController.init();
	app.adminMenuController.$logoutAdmin.off("tap").on("tap", function () {
		app.adminMenuController.logoutAdmin();
	});
});

$(document).delegate("#page-admin-details", "pagebeforecreate", function () {
	app.adminDetailsController.init();
	app.adminDetailsController.$btnEdit.off("tap").on("tap", function () {
		app.adminDetailsController.resetUserEditForm();
	});
});

$(document).delegate("#page-all-pending-claim", "pagebeforecreate", function () {
    app.allPendignClaimController.init();
});

$(document).delegate("#page-all-completed-claim", "pagebeforecreate", function () {
    app.allCompletedClaimController.init();
});

//
// All User list 
//
$(document).delegate("#page-all-users", "pagebeforecreate", function () {
    app.allUsersController.init();
});

$(document).delegate("#page-search", "pagebeforecreate", function () {
    app.searchController.init();
	app.searchController.$btnSearch.off("tap").on("tap", function () {
		app.searchController.find();
	});
});

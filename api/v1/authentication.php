<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

/*
 *
 * Fetching Users Details 
 * 
 */
$app->get('/search', function() {
	$id = $_GET['param'];
	$db = new DbHandler();
	$details = $db->getRecord("select user_id, first_name, last_name, email, age, dob, role, job_title, departements, created_on  from users where user_id like '%$id%' OR email like '%$id%' OR first_name like '%$id%' OR last_name like '%$id%' OR job_title like '%$id%' OR departements like '%$id%' ");
	
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left;\">User Id:</span>
			<span>".$details[$k]['user_id']."</span>
			</div>
			<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Full Name :</span>
			<span>".$details[$k]['first_name']." ".$details[$k]['last_name']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Email Addres :</span>
			<span>".$details[$k]['email']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Age :</span>
			<span>".$details[$k]['age']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">DOB :</span>
			<span>".$details[$k]['dob']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Role :</span>
			<span>".$details[$k]['role']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Job Title :</span>
			<span>".$details[$k]['job_title']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Departements :</span>
			<span>".$details[$k]['departements']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Created On :</span>
			<span>".$details[$k]['created_on']."</span></div></div>";
		}
		echoResponse(200, $final);
	} else {
		$final[] = "No Result Found!";
		echoResponse(200, $final);
	}
});

/*
 * Amount Search 
 * 
 */

$app->get('/amount', function() {
	$minAmount = $_GET['minAmount'];
	$maxAmount = $_GET['maxAmount'];
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where total BETWEEN '$minAmount' AND '$maxAmount' AND status='Completed'");

	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$m = $details[$k]['medi_cost'];
			$s = $details[$k]['surgery_cost'];
			$l = $details[$k]['lab_cost'];
			$e = $details[$k]['extra_cost'];
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left;\">Claim Id :</span>
			<span>".$details[$k]['claim_id']."</span>
			</div>
			<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Medical Cost :</span>
			<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
			<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Lab Cost :</span>
			<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Extra Cost :</span>
			<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
			</div>
			<hr/>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
			<span>&#163 </span><span>".$sum."</span>
			</div>
	
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Date :</span>
			<span>".$details[$k]['claim_date']."</span>
			</div>
				
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Status :</span>
			<span style=\"font-weight:bold; color:green;\">".$details[$k]['status']."</span>
			</div>
			</div>";
		}
		echoResponse(200, $final);
	} else {
		$final[] = "No Pending  Claims in given Amount range!";
		echoResponse(200, $final);
	}
});
	
/*
 * Date search 
 * 
 */
 
$app->get('/date', function() {
	$startDate = $_GET['startDate'].' 00:00:01';
	$endDate = $_GET['endDate'].' 23:59:59';
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where claim_date between '$startDate' AND '$endDate' and status='Completed'");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$m = $details[$k]['medi_cost'];
			$s = $details[$k]['surgery_cost'];
			$l = $details[$k]['lab_cost'];
			$e = $details[$k]['extra_cost'];
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left;\">Claim Id :</span>
			<span>".$details[$k]['claim_id']."</span>
			</div>
			<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Medical Cost :</span>
			<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
			<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Lab Cost :</span>
			<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Extra Cost :</span>
			<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
			</div>
			<hr/>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
			<span>&#163 </span><span>".$sum."</span>
			</div>
	
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Date :</span>
			<span>".$details[$k]['claim_date']."</span>
			</div>
				
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Status :</span>
			<span style=\"font-weight:bold; color:green;\">".$details[$k]['status']."</span>
			</div>
			</div>";
		}
		echoResponse(200, $final);
	} else {
		$final[] = "No Pending  Claims in given date range!";
		echoResponse(200, $final);
	}
});			
	

/*
 * 
 *  Search Users
 * 
 */

$app->get('/details', function() {
	$id = $_GET['param'];
	$db = new DbHandler();
	$details = $db->getRecord("select user_id, first_name, last_name, email, age, dob from users where user_id='$id'");
	echoResponse(200, $details);
});

/*
 *
* Update Claim Details
*
*/
$app->post('/approveDecline', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
	$db = new DbHandler();
	$id = $r->claim_id;
	$status = $r->status;
	$table_name = 'claim_records';
	$column_names = 'status';
	$col_match = 'claim_id';
	$result = $db->update($id, $status, $column_names, $table_name, $col_match);
	if ($result != NULL) {
		$resp["status"] = "success";
		echoResponse(200, $resp);
	} else {
		$response["status"] = "error";
		$response["message"] = "Failed to create Claim! Please try again after some time";
		echoResponse(201, $response);
	}
});

/*
 * 
 * New claim Inserting Data
 * 
 */
$app->post('/newClaim', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
	$db = new DbHandler();
	$medi_cost = $r->medi_cost;
	$surgery_cost = $r->surgery_cost;
	$lab_cost = $r->lab_cost;
	$extra_cost = $r->extra_cost;
	$total = $r->total = $medi_cost+$surgery_cost+$lab_cost+$extra_cost;
	$user_id = $r->user_id;
	//$isUserExists = $db->getOneRecord("select 1 from users where  email='$email'");

	$table_name = 'claim_records';
	$column_names = array('medi_cost','surgery_cost', 'lab_cost','extra_cost','user_id','total');
	$result = $db->insertIntoTable($r, $column_names, $table_name);
	if ($result != NULL) {
		$resp["status"] = "success";
		echoResponse(200, $resp);
	} else {
		$response["status"] = "error";
		$response["message"] = "Failed to create Claim! Please try again after some time";
		echoResponse(201, $response);
	}
});

/*
 * 
 * Fetching pending claims userwise 
 * 
 */
$app->get('/pendingClaim', function() {
	$id = $_GET['param'];
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where user_id='$id' and status='Pending'");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
		
			$m = $details[$k]['medi_cost']; 
			$s = $details[$k]['surgery_cost']; 
			$l = $details[$k]['lab_cost']; 
			$e = $details[$k]['extra_cost']; 
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left;\">Claim Id :</span>
					<span>".$details[$k]['claim_id']."</span>
				</div>
				<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Medical Cost :</span>
					<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
					<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Lab Cost :</span>
					<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Extra Cost :</span>
					<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
				</div>
				<hr/>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
					<span>&#163 </span><span>".$sum."</span>
				</div>
				
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Date :</span>
					<span>".$details[$k]['claim_date']."</span>
				</div>
			
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Status :</span>
					<span style=\"font-weight:bold; color:red;\">".$details[$k]['status']."</span>
				</div> 
			</div>";
		}
		echoResponse(200, $final);
	} else {
		$final[] = "No Pending  Claims!";
		echoResponse(200, $final);
	}
});

/*
 *
 *  Fetching all pending claims Admin
 * 
 */

$app->get('/allPendingClaim', function() {
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where  status='Pending'");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$m = $details[$k]['medi_cost']; 
			$s = $details[$k]['surgery_cost']; 
			$l = $details[$k]['lab_cost']; 
			$e = $details[$k]['extra_cost'];
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left;\">Claim Id :</span>
					<span>".$details[$k]['claim_id']."</span>
				</div>
				<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Medical Cost :</span>
					<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
					<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Lab Cost :</span>
					<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Extra Cost :</span>
					<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
				</div>
				<hr/>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
					<span>&#163 </span><span>".$sum."</span>
				</div>
				
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Date :</span>
					<span>".$details[$k]['claim_date']."</span>
				</div>
			
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Status :</span>
					<span style=\"font-weight:bold; color:red;\">".$details[$k]['status']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">
						<button id=\"approve\" onclick=\"app.allPendignClaimController.update('".$details[$k]['claim_id']."', 'Completed');\" class=\"ui-btn ui-btn-b ui-corner-all mc-top-margin-1-5\">Approve</button>
					</span>
					<span style=\"min-width:120px;float:right;\">
						<button style=\"background:red;\" id=\"decline\" onclick=\"app.allPendignClaimController.update('".$details[$k]['claim_id']."', 'Rejected');\" class=\"ui-btn ui-btn-b ui-corner-all mc-top-margin-1-5\">Decline</button>
					</span>
				</div>
				<br/><br/><br/>
			</div>";
		}
		echoResponse(200, $final);
	}
	 else {
		$final[] = "No Pending Claims!";
		echoResponse(200, $final);
	}
});

/*
 * 
 * Fetching  Completed Claims Userwise  
 * 
 */
$app->get('/completedClaim', function() {
	$id = $_GET['param'];
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where user_id='$id' and status='Completed'");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$m = $details[$k]['medi_cost'];
			$s = $details[$k]['surgery_cost'];
			$l = $details[$k]['lab_cost'];
			$e = $details[$k]['extra_cost'];
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left;\">Claim Id :</span>
					<span>".$details[$k]['claim_id']."</span>
				</div>
				<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Medical Cost :</span>
					<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
					<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Lab Cost :</span>
					<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Extra Cost :</span>
					<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
				</div>
				<hr/>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
					<span>&#163 </span><span>".$sum."</span>
				</div>
				
				</div>
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Date :</span>
					<span>".$details[$k]['claim_date']."</span>
				</div>
			
				<div style=\"padding:5px;\">
					<span style=\"min-width:120px; float:left\">Claim Status :</span>
					<span style=\"font-weight:bold; color:green;\">".$details[$k]['status']."</span>
				</div> 
			</div>";
		}
		echoResponse(200, $final);		
	}
	 else {
		$final[] = "No Completed Claims!";
		echoResponse(200, $final);
	}
});

/*
 * 
 * Fetching All Completed Claims Admin
 * 
 */
$app->get('/allCompletedClaim', function() {
	$db = new DbHandler();
	$details = $db->getRecord("select * from claim_records where status='Completed'");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$m = $details[$k]['medi_cost'];
			$s = $details[$k]['surgery_cost'];
			$l = $details[$k]['lab_cost'];
			$e = $details[$k]['extra_cost'];
			$sum = $s+$m+$l+$e;
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left;\">Claim Id :</span>
			<span>".$details[$k]['claim_id']."</span>
			</div>
			<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Medical Cost :</span>
			<span>&#163 </span><span>".$details[$k]['medi_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Surgery Cost :</span>
			<span>&#163 </span><span>".$details[$k]['surgery_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Lab Cost :</span>
			<span>&#163 </span><span>".$details[$k]['lab_cost']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Extra Cost :</span>
			<span>&#163 </span><span>".$details[$k]['extra_cost']."</span>
			</div>
			<hr/>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\"><b>Total Cost :</b></span>
			<span>&#163 </span><span>".$sum."</span>
			</div>
			
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Date :</span>
			<span>".$details[$k]['claim_date']."</span>
			</div>
				
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Claim Status :</span>
			<span style=\"font-weight:bold; color:green;\">".$details[$k]['status']."</span>
			</div>
			</div>";
		}
		echoResponse(200, $final);
	}else {
		$final[] = "No Completed Claims!";
		echoResponse(200, $final);
	}
});

/*
 * 
 * 
 * 
 */
$app->get('/allUsers', function() {
	$db = new DbHandler();
	$details = $db->getRecord("select * from users");
	if($details != NULL) {
		foreach ($details as $k=>$v)
		{
			$final[] = "<div style=\"padding:20px; border:1px solid #c8c8c8; margin-bottom:20px\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left;\">User Id:</span>
			<span>".$details[$k]['user_id']."</span>
			</div>
			<div style=\"padding:20px;margin-top:20px;margin-bottom:20px; border:1px solid #c8c8c8;\">
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Full Name :</span>
			<span>".$details[$k]['first_name']." ".$details[$k]['last_name']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Email Addres :</span>
			<span>".$details[$k]['email']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Age :</span>
			<span>".$details[$k]['age']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">DOB :</span>
			<span>".$details[$k]['dob']."</span>
			</div>
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Role :</span>
			<span>".$details[$k]['role']."</span>
			</div>
			<div style=\"padding:5px;\">
            		<span style=\"min-width:120px; float:left\">Job Title :</span>
         		<span>".$details[$k]['job_title']."</span>
            		</div>
            		<div style=\"padding:5px;\">
           		<span style=\"min-width:120px; float:left\">Departements :</span>
          		<span>".$details[$k]['departements']."</span>
            		</div>			
			<div style=\"padding:5px;\">
			<span style=\"min-width:120px; float:left\">Created On :</span>
			<span>".$details[$k]['created_on']."</span>
			</div>
			</div>";
		}
		echoResponse(200, $final);
	}
	
});
/*
 * 
 * User Login 
 * 
 */
$app->post('/login', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
    require_once 'passwordHash.php';
    verifyRequiredParams(array('email', 'password'),$r);
    $db = new DbHandler();
    $email = $r->email;
    $password = $r->password;
    $user = $db->getOneRecord("select * from users where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $resp['status'] = "success";
        $resp['message'] = 'Logged in successfully.';
        $resp['session_id'] = $user['user_id'];
        $resp['session_email'] = $user['email'];
        $resp['first_name'] = $user['first_name'];
        $resp['last_name'] = $user['last_name'];
        $resp['role'] = $user['role'];
   		} else {
            $resp['status'] = "error";
            $resp['message'] = 'Invalid login. Please try again.';
        }
    }else {
            $resp['status'] = "error";
            $resp['message'] = 'Invalid login. Please try again.';
        }
    echoResponse(200, $resp);
});
$app->post('/signup', function() use ($app) {
	$_POST = json_encode($_POST);
    $response = array();
    $r = json_decode($_POST);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $email = $r->email;
    $first_name = $r->first_name;	
    $last_name = $r->last_name;
    $password = $r->passwordConfirm;
 	$age = $r->age;
 	$dob = $r->dob;
 	$job_title = $r->job_title;
 	$departements = $r->departements;
    $isUserExists = $db->getOneRecord("select 1 from users where  email='$email'");
    if(!$isUserExists){
        $r->password = passwordHash::hash($password);
        $table_name = 'users';
        $column_names = array('first_name','last_name', 'email','password','age','dob','job_title','departements');
        $result = $db->insertIntoTable($r, $column_names, $table_name);
        if ($result != NULL) {
            $resp["status"] = "success";
            $resp["message"] = "Your Registration has been successful.";
            echoResponse(200, $resp);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create Account. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "Email address already registered.";
        echoResponse(201, $response);
    }
});
$app->post('/signupAdmin', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
	require_once 'passwordHash.php';
	$db = new DbHandler();
	$email = $r->email;
	$first_name = $r->first_name;
	$last_name = $r->last_name;
	$password = $r->passwordConfirm;
	$age = $r->age;
	$dob = $r->dob;
	$role = $r->role = "Admin";
	$isUserExists = $db->getOneRecord("select 1 from users where  email='$email'");
	if(!$isUserExists){
		$r->password = passwordHash::hash($password);
		$table_name = 'users';
		$column_names = array('first_name','last_name', 'email','password','age','dob', 'role');
		$result = $db->insertIntoTable($r, $column_names, $table_name);
		if ($result != NULL) {
			$resp["status"] = "success";
			$resp["message"] = "Your Registration has been successful.";
			echoResponse(200, $resp);
		} else {
			$response["status"] = "error";
			$response["message"] = "Failed to create Account. Please try again";
			echoResponse(201, $response);
		}
	}else{
		$response["status"] = "error";
		$response["message"] = "Email address already registered.";
		echoResponse(201, $response);
	}
});

$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
$app->post('/forgot', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
	$db = new DbHandler();
	$email = $r->email;
	$dob = $r->dob;
	$isUserExists = $db->getOneRecord("select user_id from users where  email='$email' and dob='$dob'");
	if($isUserExists) {
		$resp["status"] = "success";
		$resp["user_id"] = 	$isUserExists['user_id'];
		echoResponse(200, $resp);
	} else {
		$response["status"] = "error";
		$response["message"] = "Incorrect Email and DOB!";
		echoResponse(201, $response);
	}
});
$app->post('/reset', function() use ($app) {
	$_POST = json_encode($_POST);
	$response = array();
	$r = json_decode($_POST);
	require_once 'passwordHash.php';
	$db = new DbHandler();
	$passwordConfirm = $r->passwordConfirm;
	$user_id = $r->userid;
	$password = passwordHash::hash($passwordConfirm);
	$table_name = 'users';
	$column_names = 'password';
	$col_match = 'user_id';
	$result = $db->update($user_id, $password, $column_names, $table_name, $col_match);
	if ($result != NULL) {
		$resp["status"] = "success";
		echoResponse(200, $resp);
	} else {
		$response["status"] = "error";
		$response["message"] = "Failed to reset password, Please try again after some time!";
		echoResponse(201, $response);
	}
});

?>
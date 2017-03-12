<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;
use App\User;

class AuthenticateController extends Controller
{
    //
    public function __construct(){
    	// Apply the jwt.auth middleware to all methods in this controller
    	//except for the authenticate method. We dont want to prevent the user
    	//from retreiving their token if they dont already have it
    	$this->middleware('jwt.auth',['except'=>['authenticate']]);
    }
    public function index(){
    	return User::all();
    }
    public function authenticate(Request $request){
    	$credentials = $request->only('email','password');
    	//return $credentials;
    	try{
    		//verify the credentials and create a token for the user
    		if(! $token = JWTAuth::attempt($credentials)){
    			return response()->json(['error'=>'invalid_credentals'],401);
    		}
    	}
    	catch(JWTException $e){
    		return response()->json(['error'=>'could_not_create_token'],500);
    	}
    	//print_r(Auth::user())
    	//if no errors are encountered we can return a JWT
    	return response()->json(['token'=>compact('token'),'user'=>Auth::user()]);
    }
    public function getAuthenticatedUser(){
    	try{
    		if(!$user = JWTAuth::parseToken()->authenticate()){
    			return response()->json(['user_not_found'],404);
    		}
    	}
    	catch(Tymon\JWTAuthExceptions\TokenExpiredException $e){
    		return response()->json(['token_invalid'],$e->getStatusCode());
    	}catch(Tymon\JWTAuthExceptions\JWTException $e){
    		return response()->json(['token_absent'],$e->getStatusCode());
    	}
    	//f the token is valid and we have found the user via the sub claim
    	return response()->json(compact('user'));
    }
}

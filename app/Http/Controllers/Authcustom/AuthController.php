<?php
namespace App\Http\Controllers\AuthCustom;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\OtpVerificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\SendOtpMail;

class AuthController extends Controller
{
    
    public function showLoginForm() {
        return view('auth.login');
    }

    // Login function
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'This email is not registered.']);
        }

       
        $otp = rand(100000, 999999); 
        $request->session()->put('otp', $otp); 
        $request->session()->put('email', $request->email); 

        
        Mail::to($request->email)->send(new SendOtpMail($otp));

     return redirect()->route('auth.show-verify-otp');
    }

    // Show registration form
    public function showRegisterForm() {
        return view('auth.register');
    }

    // Registration

public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|min:3',
        'email' => 'required|email|unique:users',
        'mobile' => 'required|digits:10|unique:users',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

   
    $otp = rand(100000, 999999); 
    $request->session()->put('otp', $otp); 
    $request->session()->put('email', $request->email); 

    
    Mail::to($request->email)->send(new SendOtpMail($otp));

 return redirect()->route('auth.show-verify-otp');
}

// show verify otp form
public function showverifyotpform() {
    return view('auth.verify-otp');
}
// otp verification
public function verifyOtp(Request $request) {
    // Validate the OTP input
    $validator = Validator::make($request->all(), [
        'otp' => 'required|digits:6',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Retrieve OTP and email from the session
    $sessionOtp = $request->session()->get('otp');
    $email = $request->session()->get('email');

    if (!$sessionOtp) {
        return back()->withErrors(['otp' => 'No OTP found in the session.']);
    }

    // Check if the entered OTP matches the session OTP
    if ($request->otp == $sessionOtp) {
        // Generate a JWT token for the user
        $token = JWTAuth::fromUser(User::where('email', $email)->first());

        // Clear the OTP session data
        $request->session()->forget(['otp', 'email']);
        
         // Redirect to the welcome page
         return redirect()->route('welcome')->with('success', 'OTP verified successfully. Welcome!');
        } else {
            return back()->withErrors(['otp' => 'Invalid OTP.']);
        }
}
    // Logout function
    public function logout(Request $request) {
        Auth::logout();
        return redirect('/');
    }

    // Delete account function
    public function delete(Request $request) {
        $user = Auth::user();

        if ($user) {
            Auth::logout();
            $user->delete(); 
            return redirect('/')->with('status', 'Account deleted successfully');
        }

        return redirect('/')->withErrors('No authenticated user to delete.');
    }
}

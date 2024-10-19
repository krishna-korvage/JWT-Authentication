<?php

namespace App\Http\Controllers\AuthCustom;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\SendOtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Show login form
    public function showLoginForm() {
        return Inertia::render('Auth/Login'); 
    }

    // Login
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email', 
            'otp' => 'nullable|string', 
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors()->first());
        }

        if ($request->filled('otp')) {
            return $this->verifyOtp($request);
        } else {
            return $this->sendOtp($request);
        }
    }

    private function sendOtp(Request $request) {
        $user = User::where('email', $request->email)->orWhere('mobile', $request->email)->first();
    
        if (!$user) {
            return Inertia::render('Auth/Login', [
                'errors' => ['User not found.'],
            ]);
        }
    
        $otp = rand(100000, 999999); 
        $user->otp = $otp; 
        $user->otp_expires_at = now()->addMinutes(10); 
        $user->save();
    
        Mail::to($user->email)->send(new SendOtpMail($otp)); 
    
        return Inertia::render('Auth/Login', [
            'flash' => [
                'success' => 'OTP sent successfully.',
            ],
        ]);
    }
    

    private function verifyOtp(Request $request) {
        $user = User::where('email', $request->email)->orWhere('mobile', $request->email)->first();

        if (!$user || $user->otp !== $request->otp || $user->otp_expires_at < now()) {
            return back()->withErrors('Invalid OTP or OTP expired.');
        }

        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        if (!$token = JWTAuth::fromUser($user)) {
            return back()->withErrors('Failed to create token.');
        }
        Auth::login($user);
        return redirect()->route('welcome')->with('token', $token);
    }

    // Show registration form
    public function showRegisterForm() {
        return Inertia::render('Auth/Register'); 
    }

    // Registration
    public function showRegistrationForm()
    {
        return Inertia::render('Auth/Register');
    }

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

        $request->session()->put('name', $request->name);
        $request->session()->put('email', $request->email);
        $request->session()->put('mobile', $request->mobile);

        $otp = rand(100000, 999999);
        $request->session()->put('otp', $otp);

        Mail::to($request->email)->send(new SendOtpMail($otp));

        return redirect()->route('auth.show-verify-otp-register')->with('success', 'OTP sent to your email. Please enter the OTP to continue.');
    }

    public function showVerifyOtpRegisterForm() 
    {
        return Inertia::render('Auth/verifyOtpRegister'); 
    }

    public function verifyOtpRegister(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $sessionOtp = $request->session()->get('otp');
        $name = $request->session()->get('name');
        $email = $request->session()->get('email');
        $mobile = $request->session()->get('mobile');

        if (!$sessionOtp || !$name || !$email || !$mobile) {
            return back()->withErrors(['otp' => 'Session data is missing. Please start the registration process again.']);
        }

        if ($request->otp == $sessionOtp) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'mobile' => $mobile,
            ]);

            // Generate a token if using JWT for authentication
            $token = JWTAuth::fromUser($user);

            // Forget the session data
            $request->session()->forget(['otp', 'email', 'mobile']);
            Auth::login($user);

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

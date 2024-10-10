<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthCustom\AuthController;

Route::get('/', function () {
    return view('auth.home');
})->name('home');

Route::get('/welcome', function () {
    return view('auth.welcome');
})->middleware('auth')->name('welcome');

// Login routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

// Registration routes
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

// OTP verification for registration 
Route::get('/verify-otp-register', [AuthController::class, 'showVerifyOtpRegisterForm'])->name('auth.show-verify-otp-register');
Route::post('/verify-otp-register', [AuthController::class, 'verifyOtpRegister'])->name('auth.verify-otp-register');

// Logout and account deletion routes
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
Route::post('/delete', [AuthController::class, 'delete'])->name('auth.delete');

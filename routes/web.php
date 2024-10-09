<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthCustom\AuthController;

Route::get('/', function () {
    return view('auth.home');
})->name('home');

Route::get('/welcome', function () {
    return view('auth.welcome');
})->middleware('auth')->name('welcome');

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

Route::get('/verify-otp', [AuthController::class, 'showVerifyOtpForm'])->name('auth.show-verify-otp');
Route::post('/verify-otp', [AuthController::class, 'verifyOtp'])->name('auth.verify-otp');

Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
Route::post('/delete', [AuthController::class, 'delete'])->name('auth.delete');


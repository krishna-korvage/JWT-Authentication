<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthCustom\AuthController;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SlotController;

// Home Route
Route::get('/', function () {
    return Inertia::render('Auth/Home');
})->name('home');
Route::get('/welcome', function () {
    return Inertia::render('Auth/welcome', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('welcome');
// Login Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

// Registration Routes
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

// OTP verification for registration
Route::get('/verify-otp-register', [AuthController::class, 'showVerifyOtpRegisterForm'])->name('auth.show-verify-otp-register');
Route::post('/verify-otp-register', [AuthController::class, 'verifyOtpRegister'])->name('auth.verify-otp-register');

// Logout and account deletion routes
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
Route::post('/delete', [AuthController::class, 'delete'])->name('auth.delete');



// Route for displaying the user index
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/users/create', [UserController::class, 'create'])->name('users.create');

Route::post('/slots/store', [SlotController::class, 'store']);
Route::get('/slots', [SlotController::class, 'showslots']);

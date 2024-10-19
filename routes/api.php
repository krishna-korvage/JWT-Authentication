<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SlotController;
use App\Models\Activity;
use App\Http\Controllers\ActivityController;

// Route::post('/register', [AuthController::class, 'register']);

// Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

// Route::post('/login', [AuthController::class, 'login']);

// Route::post('/logout', [AuthController::class, 'logout']);



// // Fetch users
// Route::get('/users', [UserController::class, 'index']);

// // Create a user
// Route::post('/users', [UserController::class, 'store']);

// // Update a user
// Route::put('/users/{id}', [UserController::class, 'update']);

// // Delete a user
// Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/activities', [ActivityController::class, 'index']);

// Fetch a specific activity
Route::get('/activities/{id}', [ActivityController::class, 'show']);

// Create a new activity
Route::post('/activities', [ActivityController::class, 'store']);

// Delete an activity
Route::delete('/activities/{id}', [ActivityController::class, 'destroy']);

Route::get('/activities/{id}/slots', [ActivityController::class, 'getSlots']);
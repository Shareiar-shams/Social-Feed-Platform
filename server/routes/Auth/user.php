<?php

use App\Http\Controllers\User\AuthController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->prefix('/auth/user')->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
});
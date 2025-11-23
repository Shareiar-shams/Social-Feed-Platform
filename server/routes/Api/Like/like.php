<?php

use App\Http\Controllers\Api\LikeController;
use Illuminate\Support\Facades\Route;

Route::post('/like/{type}/{id}', [LikeController::class, 'toggle']);
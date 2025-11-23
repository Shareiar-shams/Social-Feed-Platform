<?php

use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;

Route::controller(CommentController::class)->prefix('/post/comments')->name('comments')->group(function () {
    Route::post('/{post}', 'store')->name('store');
    Route::delete('/{comment}', 'destroy')->name('destroy');
});
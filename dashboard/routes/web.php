<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Restaurant\MenuCategoryController;
use App\Http\Controllers\Restaurant\MenuItemController;
use App\Http\Middleware\HasRestaurant;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('restaurant/setup', [App\Http\Controllers\Restaurant\SetupController::class, 'index'])
        ->name('restaurant.setup');

    Route::middleware(HasRestaurant::class)->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        
        // Menu Categories
        Route::resource('categories', MenuCategoryController::class)
            ->except(['show']);
        Route::post('categories/reorder', [MenuCategoryController::class, 'reorder'])
            ->name('categories.reorder');

        // Menu Items
        Route::resource('items', MenuItemController::class)
            ->except(['show']);

        // Profile routes
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';

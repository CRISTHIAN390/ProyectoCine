<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Membresia\MembresiasController;
use App\Http\Controllers\Membresia\UsersController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('admin')->group(function() {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');

        Route::group(['prefix' => 'admin/membresias'], function () {
            Route::get('/', [MembresiasController::class, 'index'])->name('admin.membresias');
            // Route::get('/{id}', [MembresiasController::class, 'show'])->name('admin.membresias.show');
            // Route::get('/{id}/edit', [MembresiasController::class, 'edit'])->name('admin.membresias.edit');
            // Route::put('/{id}', [MembresiasController::class, 'update'])->name('admin.membresias.update');
            // Route::delete('/{id}', [MembresiasController::class, 'destroy'])->name('admin.membresias.destroy');

            Route::group(['prefix' => 'users'], function () {
                Route::get('/', [UsersController::class, 'index'])->name('admin.membresias.users');
                Route::get('/{id}', [UsersController::class, 'edit'])->name('admin.membresias.users.edit');
                Route::patch('/{id}', [UsersController::class, 'update'])->name('admin.membresias.users.update');

            });

        });

    });
});


require __DIR__.'/auth.php';

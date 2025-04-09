<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home.index');

// Ruta about
Route::get('/about', function () {
    return view('about');
})->name('about');

// Rutas de autenticación
Auth::routes(['register' => true]); // Habilitar registro

// Rutas explícitas de autenticación
Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');


//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Rutas para administrador
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('servicios', App\Http\Controllers\Admin\ServicioController::class);
    Route::resource('tecnicos', App\Http\Controllers\Admin\TecnicoController::class);
    Route::resource('clientes', App\Http\Controllers\Admin\ClienteController::class);
});

// Rutas para técnico
Route::prefix('tecnico')->middleware(['auth', 'role:tecnico'])->group(function () {
    Route::get('/', [App\Http\Controllers\TecnicoController::class, 'index'])->name('tecnico.dashboard');
    Route::get('/servicios', [App\Http\Controllers\TecnicoController::class, 'servicios'])->name('tecnico.servicios');
    Route::put('/servicios/{servicio}', [App\Http\Controllers\TecnicoController::class, 'updateServicio'])->name('tecnico.servicios.update');
});

// Rutas para cliente
Route::prefix('cliente')->middleware(['auth', 'role:cliente'])->group(function () {
    Route::get('/', [App\Http\Controllers\ClienteController::class, 'index'])->name('cliente.dashboard');
    Route::resource('servicios', App\Http\Controllers\Cliente\ServicioController::class);
    Route::get('/servicios/solicitar', [App\Http\Controllers\Cliente\ServicioController::class, 'create'])
         ->name('cliente.servicios.create');
});
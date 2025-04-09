<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TecnicoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\Admin\ServicioController as AdminServicioController;
use App\Http\Controllers\Admin\TecnicoController as AdminTecnicoController;
use App\Http\Controllers\Admin\ClienteController as AdminClienteController;
use App\Http\Controllers\Cliente\ServicioController as ClienteServicioController;
use App\Http\Middleware\CheckRole;

Route::aliasMiddleware('checkrole', CheckRole::class);

Route::get('/', function () {
    return view('home');
})->name('home.index');

// Ruta about
Route::get('/about', function () {
    return view('about');
})->name('about');

// Rutas de autenticación
Auth::routes(['register' => true]); // Habilitar registro

// Rutas explícitas de autenticación (mejor práctica)
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Rutas para administrador
Route::prefix('admin')->middleware(['auth', 'checkrole:admin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('servicios', AdminServicioController::class);
    Route::resource('tecnicos', AdminTecnicoController::class);
    Route::resource('clientes', AdminClienteController::class);
});

// Rutas para técnico
Route::prefix('tecnico')->middleware(['auth', 'checkrole:tecnico'])->group(function () {
    Route::get('/', [TecnicoController::class, 'index'])->name('tecnico.dashboard');
    Route::get('/servicios', [TecnicoController::class, 'servicios'])->name('tecnico.servicios');
    Route::put('/servicios/{servicio}', [TecnicoController::class, 'updateServicio'])->name('tecnico.servicios.update');
});

// Rutas para cliente
Route::prefix('cliente')->middleware(['auth', 'checkrole:cliente'])->group(function () {
    Route::get('/', [ClienteController::class, 'index'])->name('cliente.dashboard');
    Route::resource('servicios', ClienteServicioController::class);
    Route::get('/servicios/solicitar', [ClienteServicioController::class, 'create'])
         ->name('cliente.servicios.create');
});
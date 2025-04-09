<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [App\Http\Controllers\Api\AuthController::class, 'user']);
    
    // Rutas de servicios
    Route::apiResource('servicios', App\Http\Controllers\Api\ServicioController::class);
    
    // Rutas de usuarios (solo admin)
    Route::apiResource('users', App\Http\Controllers\Api\UserController::class);
    
    // Rutas específicas para técnicos
    Route::prefix('tecnicos')->group(function () {
        Route::get('/{tecnico}/servicios', [App\Http\Controllers\Api\ServicioController::class, 'serviciosPorTecnico']);
    });
    
    // Rutas específicas para clientes
    Route::prefix('clientes')->group(function () {
        Route::get('/{cliente}/servicios', [App\Http\Controllers\Api\ServicioController::class, 'serviciosPorCliente']);
    });
});
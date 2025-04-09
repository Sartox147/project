<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function serviciosComoCliente()
    {
        return $this->hasMany(Servicio::class, 'user_id');
    }

    public function serviciosComoTecnico()
    {
        return $this->hasMany(Servicio::class, 'tecnico_id');
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isTecnico()
    {
        return $this->role === 'tecnico';
    }

    public function isCliente()
    {
        return $this->role === 'cliente';
    }
}
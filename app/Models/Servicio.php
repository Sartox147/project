<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tecnico_id',
        'tipo_equipo',
        'marca',
        'modelo',
        'descripcion_problema',
        'estado',
        'diagnostico',
        'costo'
    ];

    protected $casts = [
        'costo' => 'decimal:2',
    ];

    public function cliente()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tecnico()
    {
        return $this->belongsTo(User::class, 'tecnico_id');
    }
}
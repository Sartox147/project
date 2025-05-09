<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'tecnico_id',
        'fecha_asignacion',
        'tipo_equipo',
        'marca',
        'modelo',
        'descripcion_problema',
        'estado',
        'diagnostico',
        'solucion',
        'costo',
        'fecha_solicitud',
        'fecha_atendido',
        'fecha_completado'
    ];
    protected $dates = [
        'fecha_asignacion',
        'fecha_solicitud',
        'fecha_atendido',
        'fecha_completado'
    ];

    public function cliente()
    {
        return $this->belongsTo(User::class, 'cliente_id');
    }

    public function tecnico()
    {
        return $this->belongsTo(User::class, 'tecnico_id');
    }
}
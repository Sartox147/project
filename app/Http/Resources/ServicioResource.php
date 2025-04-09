<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServicioResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tipo_equipo' => $this->tipo_equipo,
            'marca' => $this->marca,
            'modelo' => $this->modelo,
            'descripcion_problema' => $this->descripcion_problema,
            'estado' => $this->estado,
            'diagnostico' => $this->diagnostico,
            'costo' => $this->costo,
            'fecha_creacion' => $this->created_at->format('d/m/Y H:i'),
            'fecha_actualizacion' => $this->updated_at->format('d/m/Y H:i'),
            'cliente' => $this->whenLoaded('cliente', function () {
                return [
                    'id' => $this->cliente->id,
                    'name' => $this->cliente->name,
                    'email' => $this->cliente->email,
                ];
            }),
            'tecnico' => $this->whenLoaded('tecnico', function () {
                return $this->tecnico ? [
                    'id' => $this->tecnico->id,
                    'name' => $this->tecnico->name,
                    'email' => $this->tecnico->email,
                ] : null;
            }),
        ];
    }
}
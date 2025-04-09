<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServicioResource;
use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $servicios = Servicio::with(['cliente', 'tecnico'])->get();
        } elseif ($user->isTecnico()) {
            $servicios = Servicio::with(['cliente'])
                ->where('tecnico_id', $user->id)
                ->get();
        } else {
            $servicios = Servicio::with(['tecnico'])
                ->where('user_id', $user->id)
                ->get();
        }
        
        return ServicioResource::collection($servicios);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->isCliente()) {
            return response()->json(['message' => 'Solo clientes pueden crear servicios'], 403);
        }
        
        $validated = $request->validate([
            'tipo_equipo' => 'required|in:lavadora,nevera,otro',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'descripcion_problema' => 'required|string',
        ]);
        
        $servicio = auth()->user()->serviciosComoCliente()->create($validated);
        
        return new ServicioResource($servicio->load('tecnico'));
    }

    public function show(Servicio $servicio)
    {
        $user = auth()->user();
        
        if ($user->isCliente() && $servicio->user_id !== $user->id) {
            abort(403, 'No tienes permiso para ver este servicio');
        }
        
        if ($user->isTecnico() && $servicio->tecnico_id !== $user->id) {
            abort(403, 'No tienes permiso para ver este servicio');
        }
        
        return new ServicioResource($servicio->load(['cliente', 'tecnico']));
    }

    public function update(Request $request, Servicio $servicio)
    {
        $user = auth()->user();
        $data = [];
        
        if ($user->isAdmin()) {
            $validated = $request->validate([
                'tecnico_id' => 'nullable|exists:users,id,role,tecnico',
                'estado' => 'sometimes|in:pendiente,en_proceso,completado,cancelado',
                'costo' => 'nullable|numeric|min:0',
                'diagnostico' => 'nullable|string',
            ]);
            
            $data = $validated;
        } elseif ($user->isTecnico()) {
            if ($servicio->tecnico_id !== $user->id) {
                abort(403, 'No tienes permiso para actualizar este servicio');
            }
            
            $validated = $request->validate([
                'estado' => 'sometimes|in:en_proceso,completado,cancelado',
                'diagnostico' => 'required_with:estado|string',
            ]);
            
            $data = $validated;
        } else {
            abort(403, 'No tienes permiso para actualizar servicios');
        }
        
        $servicio->update($data);
        
        return new ServicioResource($servicio->fresh(['cliente', 'tecnico']));
    }

    public function destroy(Servicio $servicio)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Solo administradores pueden eliminar servicios');
        }
        
        $servicio->delete();
        
        return response()->json(null, 204);
    }
}
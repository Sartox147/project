<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServicioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Servicio::query();

        // Carga relaciones según el rol
        if ($user->isAdmin()) {
            $query->with(['cliente', 'tecnico']);
        } elseif ($user->isTecnico()) {
            $query->where('tecnico_id', $user->id)
                ->with('cliente');
        } else { // Cliente
            $query->where('cliente_id', $user->id)
                ->with('tecnico');
        }

        // Filtros adicionales para todos los roles
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('tipo_equipo')) {
            $query->where('tipo_equipo', $request->tipo_equipo);
        }

        // Ordenamiento por defecto
        $query->orderBy('fecha_solicitud', 'desc');

        // Paginación (opcional)
        $servicios = $request->has('per_page')
            ? $query->paginate($request->per_page)
            : $query->get();

        return response()->json($servicios);
    }

public function store(Request $request)
    {
    $user = Auth::user();

    // Admin puede crear servicios para cualquier cliente
    if ($user->isAdmin()) {
        $request->validate([
            'cliente_id' => 'required|exists:users,id,role,cliente',
            'tipo_equipo' => 'required|in:lavadora,nevera',
            'marca' => 'required|string|max:100',
            'modelo' => 'required|string|max:100',
            'descripcion_problema' => 'required|string',
            'tecnico_id' => 'nullable|exists:users,id,role,tecnico',
            'costo' => 'nullable|numeric|min:0',
        ]);

        $servicio = Servicio::create([
            'cliente_id' => $request->cliente_id,
            'tipo_equipo' => $request->tipo_equipo,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'descripcion_problema' => $request->descripcion_problema,
            'fecha_solicitud' => now(),
            'tecnico_id' => $request->tecnico_id, // si viene vacío queda null
            'costo' => $request->costo, // si viene vacío queda null
        ]);

        return response()->json($servicio, 201);
    }

    // Si es cliente, solo puede crear su propio servicio
    if (!$user->isCliente()) {
        return response()->json(['message' => 'No autorizado'], 403);
    }

    $request->validate([
        'tipo_equipo' => 'required|in:lavadora,nevera',
        'marca' => 'required|string|max:100',
        'modelo' => 'required|string|max:100',
        'descripcion_problema' => 'required|string',
    ]);

    $servicio = Servicio::create([
        'cliente_id' => $user->id,
        'tipo_equipo' => $request->tipo_equipo,
        'marca' => $request->marca,
        'modelo' => $request->modelo,
        'descripcion_problema' => $request->descripcion_problema,
        'fecha_solicitud' => now(),
    ]);

    return response()->json($servicio, 201);
    }


    public function show(Servicio $servicio)
    {
        $user = Auth::user();

        if ($user->isAdmin() || $servicio->cliente_id == $user->id || $servicio->tecnico_id == $user->id) {
            return response()->json($servicio);
        }

        return response()->json(['message' => 'No autorizado'], 403);
    }

    public function update(Request $request, Servicio $servicio)
    {
        $user = Auth::user();

        if ($user->isAdmin()) {
            // Admin puede actualizar cualquier campo
            $validated = $request->validate([
                'tecnico_id' => 'nullable|exists:users,id',
                'estado' => 'in:pendiente,en_proceso,completado,cancelado',
                'diagnostico' => 'nullable|string',
                'solucion' => 'nullable|string',
                'costo' => 'nullable|numeric',
                'fecha_atendido' => 'nullable|date',
                'fecha_completado' => 'nullable|date',
            ]);

            $servicio->update($validated);
        } elseif ($user->isTecnico() && $servicio->tecnico_id == $user->id) {
            // Técnico solo puede actualizar ciertos campos
            $validated = $request->validate([
                'estado' => 'in:en_proceso,completado,cancelado',
                'diagnostico' => 'nullable|string',
                'solucion' => 'nullable|string',
                'costo' => 'nullable|numeric',
                'fecha_completado' => 'nullable|date',
            ]);

            if ($request->estado == 'en_proceso' && is_null($servicio->fecha_atendido)) {
                $validated['fecha_atendido'] = now();
            }

            $servicio->update($validated);
        } elseif ($user->isCliente() && $servicio->cliente_id == $user->id) {
            // Cliente solo puede cancelar
            if ($request->estado == 'cancelado' && $servicio->estado == 'pendiente') {
                $servicio->update(['estado' => 'cancelado']);
            } else {
                return response()->json(['message' => 'Solo puedes cancelar servicios pendientes'], 403);
            }
        } else {
            return response()->json(['message' => 'No autorizado, contacte al administrador'], 403);
        }

        return response()->json($servicio);
    }

    public function destroy(Servicio $servicio)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            return response()->json(['message' => 'Solo el admin puede eliminar servicios'], 403);
        }

        $servicio->delete();

        return response()->json(null, 204);
    }
    public function asignarTecnico(Request $request, Servicio $servicio)
    {
        $user = Auth::user();

        // Solo admin puede asignar técnicos
        if (!$user->isAdmin()) {
            return response()->json(['message' => 'Solo el administrador puede asignar técnicos'], 403);
        }

        $request->validate([
            'tecnico_id' => 'required|exists:users,id,role,tecnico' // Valida que sea un técnico
        ]);

        // Actualiza el técnico y cambia el estado
        $servicio->update([
            'tecnico_id' => $request->tecnico_id,
            'estado' => 'asignado',
            'fecha_asignacion' => now()
        ]);

        return response()->json([
            'message' => 'Técnico asignado correctamente',
            'servicio' => $servicio->load('tecnico')
        ]);
    }
    public function misServiciosTecnico(Request $request)
    {
    $tecnico = $request->user();

    if ($tecnico->role !== 'tecnico') {
        return response()->json(['error' => 'No autorizado'], 403);
    }

    $servicios = Servicio::where('tecnico_id', $tecnico->id)->get();

    return response()->json($servicios);
    }

}
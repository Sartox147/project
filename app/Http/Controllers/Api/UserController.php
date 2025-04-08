<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('role:admin')->except(['show']);
    }

    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in(['admin', 'tecnico', 'cliente'])],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return new UserResource($user);
    }

    public function show(User $user)
    {
        // Los usuarios solo pueden ver su propio perfil a menos que sean admin
        if (auth()->user()->isAdmin() || auth()->id() === $user->id) {
            return new UserResource($user);
        }

        abort(403, 'No tienes permiso para ver este usuario');
    }

    public function update(Request $request, User $user)
    {
        // Solo admin puede actualizar cualquier usuario
        // Los usuarios pueden actualizar solo su propio perfil
        if (!auth()->user()->isAdmin() && auth()->id() !== $user->id) {
            abort(403, 'No tienes permiso para actualizar este usuario');
        }

        $rules = [
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|string|min:8',
        ];

        if (auth()->user()->isAdmin()) {
            $rules['role'] = ['sometimes', Rule::in(['admin', 'tecnico', 'cliente'])];
        }

        $validated = $request->validate($rules);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Solo administradores pueden eliminar usuarios');
        }

        // No permitir eliminarse a sí mismo
        if (auth()->id() === $user->id) {
            abort(403, 'No puedes eliminarte a ti mismo');
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
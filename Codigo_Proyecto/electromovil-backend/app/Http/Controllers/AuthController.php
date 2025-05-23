<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:cliente,tecnico', // Solo permite registrar clientes o técnicos
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'address' => $request->address
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Te has registrado correctamente',
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        // Validar credenciales
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Intentar autenticar
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Obtener el usuario autenticado
        $user = Auth::user();

        // Crear el token
        $token = $user->createToken('api-token')->plainTextToken;

        // Retornar el token y el usuario si deseas
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
    public function indexByRole()
    {
        $fields = ['id', 'name', 'email', 'phone', 'created_at'];

        return response()->json([
            'clientes' => User::where('role', 'cliente')->select($fields)->get(),
            'tecnicos' => User::where('role', 'tecnico')->select($fields)->get()
        ]);
    }
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
    public function destroy(User $user)
    {
        // Solo admin puede eliminar usuarios
        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Acceso denegado, no eres administrador'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente.']);
    }
}
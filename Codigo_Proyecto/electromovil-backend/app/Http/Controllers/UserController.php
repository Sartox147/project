<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $user = Auth::user();

        if ($user->isAdmin()) {
            $users = User::all();
        } elseif ($user->isTecnico()) {
            $users = User::whereIn('role', ['cliente', 'tecnico'])->get();
        } else {
            $users = User::where('id', $user->id)->get();
        }

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,tecnico,cliente',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'address' => $request->address
        ]);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        $currentUser = Auth::user();

        if ($currentUser->isAdmin() || $currentUser->isTecnico() || $currentUser->id == $user->id) {
            return response()->json($user);
        }

        return response()->json(['message' => 'No autorizado'], 403);
    }

public function update(Request $request, User $user)
{
    $request->validate([
        'name' => 'sometimes|string|max:255',
        'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
        'password' => 'sometimes|string|min:8',
        'role' => 'sometimes|in:admin,tecnico,cliente',
        'phone' => 'sometimes|string|max:20',
        'address' => 'sometimes|string|max:255'
    ]);

    $data = $request->all();

    // Si se quiere cambiar el rol y el usuario autenticado NO es admin, se elimina ese campo
    if (isset($data['role']) && auth()->user()->role !== 'admin') {
        unset($data['role']);
    }

    if ($request->has('password')) {
        $data['password'] = bcrypt($request->password);
    }

    $user->update($data);

    return response()->json($user);
}


    public function destroy(User $user)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Acceso denegado, no eres administrador'], 403);
        }

        $user->delete();
        return response()->noContent();
    }
    public function indexByRole()
    {
        $fields = ['id', 'name', 'email', 'phone', 'created_at'];

        return response()->json([
            'clientes' => User::where('role', 'cliente')->select($fields)->get(),
            'tecnicos' => User::where('role', 'tecnico')->select($fields)->get()
        ]);
    }
    public function tecnicosDisponibles()
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json([
            'tecnicos' => User::where('role', 'tecnico')
                ->select('id', 'name', 'email')
                ->get()
        ]);
    }

}
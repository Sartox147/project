<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        $user = Auth::user();
        
        foreach ($roles as $role) {
            if ($user->role === $role) {
                return $next($request);
            }
        }

        abort(403, 'No tienes permiso para acceder a esta área');
    }
}
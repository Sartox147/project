<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;
    protected $redirectTo = '/home';
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        //$this->middleware('auth')->only('logout');
    }
    protected function authenticated(Request $request, $user)
    {
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === 'tecnico') {
            return redirect()->route('tecnico.dashboard');
        } elseif ($user->role === 'cliente') {
            return redirect()->route('cliente.dashboard');
        }
        return redirect($this->redirectTo);
        
    }
    protected function credentials(Request $request)
    {
        return [
            'email' => $request->email,
            'password' => $request->password,
        ];
    }
    public function showLoginForm()
    {
        return view('auth.login');
    }
}
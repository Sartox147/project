<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TecnicoController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:tecnico']);
    }
}

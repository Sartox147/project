@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Panel de Administración</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    Bienvenido al panel de administración de Electromovil!
                    
                    <div class="mt-4">
                        <h5>Estadísticas rápidas:</h5>
                        <ul>
                            <li>Servicios pendientes: {{ $serviciosPendientes }}</li>
                            <li>Técnicos activos: {{ $tecnicosActivos }}</li>
                            <li>Clientes registrados: {{ $clientesRegistrados }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
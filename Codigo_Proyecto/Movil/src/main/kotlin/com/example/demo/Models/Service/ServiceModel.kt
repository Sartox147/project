package com.example.demo.Models.Service

import java.util.Date


data class ServiceModel (
    var id: Int? = null,
    var cliente_id : Int? = null,
    var tecnico_id:Int? = null,
    var tipo_equipo  : String,
    var marca : String,
    var modelo : String,
    var descripcion_problema : String,
    var estado : String,
    var diagnostico: String,
    var solucion: String,
    var costo: Double,
    var fecha_solicitud: Date,
    var fecha_atendido: Date,
    var fecha_completado:Date,

)
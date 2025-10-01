package com.example.demo.Controllers

import com.example.demo.Services.ServiciosService
import com.example.demo.Models.ServiceModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class ServiciosController {

    @Autowired
    lateinit var serviciosService: ServiciosService

    // GET -> Listar todos los servicios
    @GetMapping("/servicios")
    fun Serviceservicios(): List<String> {
        return serviciosService.Servislist1()
    }

    // POST -> Crear un nuevo servicio
    @PostMapping("/servicios")
    fun Serviceservicio(@RequestBody servicio: ServiceModel): ServiceModel {
        return serviciosService.Servislist2(servicio)
    }



    // PUT -> Actualizar servicio por id
    @PutMapping("/servicios/{id}")
    fun Serviceupdate(@PathVariable id: Int, @RequestBody servicio: ServiceModel): ServiceModel {
        return serviciosService.Servislist4(id, servicio)
    }

    // DELETE -> Eliminar servicio por id
    @DeleteMapping("/servicios/{id}")
    fun Servicedelete(@PathVariable id: Int): String {
        return if (serviciosService.Servislist5(id)) {
            "Servicio con id $id eliminado correctamente"
        } else {
            "Servicio con id $id no encontrado"
        }
    }
}

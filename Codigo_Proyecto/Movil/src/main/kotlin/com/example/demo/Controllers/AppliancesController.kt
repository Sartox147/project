package com.example.demo.Controllers

import com.example.demo.Models.AppliancesModel
import com.example.demo.Services.AppliancesService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AppliancesController {

    @Autowired
    lateinit var AppliancesService: AppliancesService

    @GetMapping("/appliances")
    fun AppliancesSerch(): List<String> {
        return AppliancesService.Appliancelist1()
    }
    @GetMapping("/appliances/{id}")
    fun AppliancesSearchId(@PathVariable id: Int): List<String> {
        return AppliancesService.Appliancelist3(id)
    }

    @PostMapping("/appliances")
    fun Appliance(@RequestBody appliance: AppliancesModel): AppliancesModel {
        return AppliancesService.Appliancelist2(appliance)
    }
    @PutMapping("/appliances/{id}")
    fun Applianceupdate(@PathVariable id: Int, @RequestBody appliance: AppliancesModel): AppliancesModel {
        return AppliancesService.Appliancelist4(id, appliance)
    }
    @DeleteMapping("/appliances/{id}")
    fun Appliancedelete(@PathVariable id: Int): String {
        return if (AppliancesService.Appliancelist5(id)){
            "Electrodomestico eliminado $id correctamente "
        } else {
            "Electrodomestico con id $id no encontrado"
        }
    }
}
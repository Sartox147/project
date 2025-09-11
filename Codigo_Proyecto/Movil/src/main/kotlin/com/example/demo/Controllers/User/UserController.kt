package com.example.demo.Controllers.User

import com.example.demo.Models.User.UserModel
import com.example.demo.Services.User.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.ResponseEntity


@RestController
class UserController {

    @Autowired
    lateinit var UserService: UserService

    @GetMapping("/users")
    fun users(): List<String> {
        return UserService.list1()
    }

    @GetMapping("/users/{id}")
    fun search(@PathVariable id: Int): List<String> {
        return UserService.list3(id)
    }

    @PostMapping("/users")
    fun user(@RequestBody user: UserModel): UserModel {
        return UserService.list2(user)
    }
    @PutMapping("/users/{id}")
    fun update(@PathVariable id: Int, @RequestBody user: UserModel): ResponseEntity<Any> {
        val actualizado = UserService.list4(id, user)

        return if (actualizado != null) {
            ResponseEntity.ok(actualizado)
        } else {
            ResponseEntity.notFound().build()
        }
    }
    @DeleteMapping("/users/{id}")
    fun delete(@PathVariable id: Int): String {
        return if (UserService.list5(id)){
            "Usuario eliminado $id correctamente "
        } else {
            "Usuario con id $id no encontrado"
        }
    }
}
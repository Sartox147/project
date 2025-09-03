package com.example.demo.Controllers.Users

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

@RestController
class UserController {

    @Autowired
    lateinit var UserService: UserService

    @GetMapping("/users")
    fun users(): List<String> {
        return UserService.Userlist1()
    }

    @PostMapping("/users")
    fun user(@RequestBody user: UserModel): UserModel {
        return UserService.Userlist2(user)
    }

    @GetMapping("/users/{id}")
    fun Usersearch(@PathVariable id: Int): List<String> {
        return UserService.Userlist3(id)
    }
    @PutMapping("/users/{id}")
    fun Userupdate(@PathVariable id: Int, @RequestBody user: UserModel): UserModel {
        return UserService.Userlist4(id, user)
    }
    @DeleteMapping("/users/{id}")
    fun Userdelete(@PathVariable id: Int): String {
        return if (UserService.Userlist5(id)){
            "Usuario eliminado $id correctamente "
        } else {
            "Usuario con id $id no encontrado"
        }
    }
}
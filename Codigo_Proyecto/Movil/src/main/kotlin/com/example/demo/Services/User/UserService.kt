package com.example.demo.Services.User

import com.example.demo.Models.User.UserModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import kotlin.collections.joinToString
import kotlin.collections.toTypedArray

@Service
class UserService {



    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    fun Userlist1(): List<String> {
        val sql = "select * from users"
        return jdbcTemplate.query(sql, RowMapper<String> { rs, _ ->
            val nombre = rs.getString("name")
            val email = rs.getString("email")
            "nombre: $nombre email: $email "
        })
    }
    fun Userlist2(user: UserModel): UserModel {
        val sql = "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)"
        jdbcTemplate.update(sql, user.name,user.email, user.password,user.phone,user.address )
        return user
    }
    fun Userlist3(id: Int): List<String> {
        val sql1 = "SELECT * from users WHERE id = ?"
        return jdbcTemplate.query(sql1, arrayOf(id), RowMapper<String> { rs, _ ->
            val detalles =
                rs.getString("id") + " " + rs.getString("name")
            "$detalles"
        })
    }
    fun Userlist4(id: Int, User: UserModel): UserModel {
        val updates = mutableListOf<String>()
        val params = mutableListOf<Any>()

        if (User.name != null) {
            updates.add("name = ?")
            params.add(User.name!!)
        }
        if (User.email != null) {
            updates.add("email = ?")
            params.add(User.email!!)
        }
        if (User.password != null) {
            updates.add("password = ?")
            params.add(User.password!!)
        }
        if (User.phone != null) {
            updates.add("password = ?")
            params.add(User.phone!!)
        }
        if (User.address != null) {
            updates.add("address = ?")
            params.add(User.address!!)
        }

        // Si no hay campos para actualizar, retornamos igual
        if (updates.isEmpty()) return User

        val sql = "UPDATE Users SET ${updates.joinToString(", ")} WHERE id = ?"
        params.add(id)

        jdbcTemplate.update(sql, *params.toTypedArray())

        return User
    }

    fun Userlist5(id: Int): Boolean {
        val sql = "DELETE from users WHERE id = ?"
        val filas= jdbcTemplate.update (sql, id )
        return filas>0
    }
}
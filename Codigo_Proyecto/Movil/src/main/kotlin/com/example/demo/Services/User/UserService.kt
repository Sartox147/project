package com.example.demo.Services.User

import com.example.demo.Models.User.UserModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service

@Service
class UserService {



    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    fun list1(): List<String> {
        val sql = "select * from users"
        return jdbcTemplate.query(sql, RowMapper<String> { rs, _ ->
            val nombre = rs.getString("name")
            val email = rs.getString("email")
            "nombre: $nombre email: $email "
        })
    }
    fun list2(user: UserModel): UserModel {
        val sql = "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)"
        jdbcTemplate.update(sql, user.name,user.email, user.password,user.phone,user.address )
        return user
    }
    fun list3(id: Int): List<String> {
        val sql1 = "SELECT * from users WHERE id = ?"
        return jdbcTemplate.query(sql1, arrayOf(id), RowMapper<String> { rs, _ ->
            val detalles =
                rs.getString("id") + " " + rs.getString("name")
            "$detalles"
        })
    }
    fun list4(id: Int, user: UserModel): UserModel? {
        val updates = mutableListOf<String>()
        val params = mutableListOf<Any>()

        if (user.name != null) {
            updates.add("name = ?")
            params.add(user.name)
        }
        if (user.email != null) {
            updates.add("email = ?")
            params.add(user.email)
        }
        if (user.password != null) {
            updates.add("password = ?")
            params.add(user.password)
        }
        if (user.phone != null) {
            updates.add("phone = ?")
            params.add(user.phone)
        }
        if (user.address != null) {
            updates.add("address = ?")
            params.add(user.address)
        }

        if (updates.isEmpty()) return null // no se mandó nada

        val sql = "UPDATE users SET ${updates.joinToString(", ")} WHERE id = ?"
        params.add(id)

        val filas = jdbcTemplate.update(sql, *params.toTypedArray())

        return if (filas > 0) user.copy(id = id) else null
    }


    fun list5(id: Int): Boolean {
        val sql = "DELETE from users WHERE id = ?"
        val filas= jdbcTemplate.update (sql, id )
        return filas>0
    }
}
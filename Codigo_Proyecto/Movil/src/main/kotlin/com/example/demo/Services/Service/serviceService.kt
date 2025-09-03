package com.example.demo.Services

import com.example.demo.Models.Service.ServiceModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import java.sql.Date

@Service
class ServiciosService {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    // SELECT (traer todos los servicios)
    fun Servislist1(): List<String> {
        val sql = "SELECT * FROM servicios"
        return jdbcTemplate.query(sql, RowMapper<String> { rs, _ ->
            val id = rs.getInt("id")
            val cliente = rs.getInt("cliente_id")
            val tecnico = rs.getInt("tecnico_id")
            val tipo_equipo = rs.getString("tipo_equipo")
            val marca = rs.getString("marca")
            val modelo = rs.getString("modelo")
            val descripcion_problema=rs.getString("descripcion_problema")
            val estado = rs.getString("estado")
            val diagnostico = rs.getString("diagnostico")
            val solucion = rs.getString("solucion")
            val costo = rs.getDouble("costo")
            val fechaSolicitud = rs.getDate("fecha_solicitud")
            val fechaAtendido = rs.getDate("fecha_atendido")
            val fechaCompletado = rs.getDate("fecha_completado")

            "ID: $id | Cliente: $cliente | Técnico: $tecnico | Equipo: $tipo_equipo | Marca: $marca | Modelo: $modelo   | descripcion_problema: $descripcion_problema  | Estado: $estado | Diagnóstico: $diagnostico | Solución: $solucion | Costo: $costo | Solicitud: $fechaSolicitud | Atendido: $fechaAtendido | Completado: $fechaCompletado"
        })
    }

    // INSERT (crear un servicio)
    fun Servislist2(servicio: ServiceModel): ServiceModel {
        val sql = """
            INSERT INTO servicios (cliente_id, tecnico_id, tipo_equipo, marca, modelo,descripcion_problema, estado, diagnostico, solucion, costo, fecha_solicitud, fecha_atendido, fecha_completado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        """
        jdbcTemplate.update(
            sql,
            servicio.cliente_id,
            servicio.tecnico_id,
            servicio.tipo_equipo,
            servicio.marca,
            servicio.modelo,
            servicio.descripcion_problema,
            servicio.estado,
            servicio.diagnostico,
            servicio.solucion,
            servicio.costo,
            Date(servicio.fecha_solicitud.time),
            Date(servicio.fecha_atendido.time),
            Date(servicio.fecha_completado.time)
        )
        return servicio
    }



    // UPDATE (actualizar un servicio por id)
    fun Servislist4(id: Int, servicio: ServiceModel): ServiceModel {
        val sql = """
            UPDATE servicios 
            SET cliente_id = ?, tecnico_id = ?, tipo_equipo = ?, marca = ?, modelo = ?,descripcion_problema = ?, estado = ?, diagnostico = ?, solucion = ?, costo = ?, fecha_solicitud = ?, fecha_atendido = ?, fecha_completado = ?
            WHERE id = ?
        """
        jdbcTemplate.update(
            sql,
            servicio.cliente_id,
            servicio.tecnico_id,
            servicio.tipo_equipo,
            servicio.marca,
            servicio.modelo,
            servicio.descripcion_problema,
            servicio.estado,
            servicio.diagnostico,
            servicio.solucion,
            servicio.costo,
            Date(servicio.fecha_solicitud.time),
            Date(servicio.fecha_atendido.time),
            Date(servicio.fecha_completado.time),
            id
        )
        return servicio
    }

    // DELETE (eliminar un servicio por id)
    fun Servislist5(id: Int): Boolean {
        val sql = "DELETE FROM servicios WHERE id = ?"
        val filas = jdbcTemplate.update(sql, id)
        return filas > 0
    }
}

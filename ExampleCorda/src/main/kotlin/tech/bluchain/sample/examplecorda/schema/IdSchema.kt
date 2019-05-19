package tech.bluchain.sample.examplecorda.schema

import net.corda.core.schemas.MappedSchema
import net.corda.core.schemas.PersistentState
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Index
import javax.persistence.Table

/**
 * The family of schemas for IdState.
 */
object IdSchema

/**
 * An IdState schema.
 */
object IdSchemaV1 : MappedSchema(
    schemaFamily = IdSchema.javaClass,
    version = 1,
    mappedTypes = listOf(PersistentId::class.java)) {
    @Entity
    @Table(name = "id_states", indexes = [Index(name = "uid_idx", columnList="uid")])
    class PersistentId(

        @Column(name = "uid")
        var uid: String

    ) : PersistentState() {
        constructor(): this("")
    }

}
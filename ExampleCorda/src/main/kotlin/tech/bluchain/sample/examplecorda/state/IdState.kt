package tech.bluchain.sample.examplecorda.state

import net.corda.core.contracts.LinearState
import net.corda.core.contracts.UniqueIdentifier
import net.corda.core.identity.AbstractParty
import net.corda.core.schemas.MappedSchema
import net.corda.core.schemas.PersistentState
import net.corda.core.schemas.QueryableState
import tech.bluchain.sample.examplecorda.model.IdModel
import tech.bluchain.sample.examplecorda.schema.IdSchemaV1

//@BelongsToContract(IdContract::class)
data class IdState(val id: IdModel,
                   override val linearId: UniqueIdentifier = UniqueIdentifier()
) : LinearState, QueryableState {

    override val participants: List<AbstractParty> = listOf(id.org)

    override fun generateMappedObject(schema: MappedSchema): PersistentState {

        return when (schema) {
            is IdSchemaV1 -> IdSchemaV1.PersistentId(
                this.id.uid
            )
            else -> throw IllegalArgumentException("Unrecognised schema $schema")
        }

    }

    override fun supportedSchemas(): Iterable<MappedSchema> {
        return listOf(IdSchemaV1)
    }

}
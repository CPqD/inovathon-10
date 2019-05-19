package tech.bluchain.sample.examplecorda.api

import net.corda.core.messaging.CordaRPCOps
import net.corda.core.messaging.startTrackedFlow
import net.corda.core.messaging.vaultQueryBy
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.utilities.getOrThrow
import net.corda.core.utilities.loggerFor
import org.slf4j.Logger
import tech.bluchain.sample.examplecorda.flow.CreateId
import tech.bluchain.sample.examplecorda.flow.CreatePerson
import tech.bluchain.sample.examplecorda.model.CreateRequestModel
import tech.bluchain.sample.examplecorda.schema.IdSchemaV1
import tech.bluchain.sample.examplecorda.state.IdState
import net.corda.core.node.services.vault.Builder.equal
import tech.bluchain.sample.examplecorda.flow.DoCheck.CheckFlow
import tech.bluchain.sample.examplecorda.model.CheckIdModel
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path("id")
class IdApi(private val rpcOps: CordaRPCOps) {

    companion object {
        private val logger: Logger = loggerFor<PersonApi>()
    }

    @POST
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    fun getPeople(): Response {
        return Response.status(Response.Status.OK).entity(rpcOps.vaultQueryBy<IdState>().states).build()
    }

    //@CrossOrigin
    @POST
    @Path("create")
    @Produces(MediaType.APPLICATION_JSON)
    fun createId(data: CreateRequestModel): Response {

        val indexUid = IdSchemaV1.PersistentId::uid.equal(data.uid)
        val criteria = QueryCriteria.VaultCustomQueryCriteria(expression = indexUid)
        val states = rpcOps.vaultQueryBy<IdState>(criteria).states

        if (states.isNotEmpty()){
            return Response.status(Response.Status.BAD_REQUEST).entity("UID já existe nesta Org.\n").build()
        }

        return try {

            val signedTx = rpcOps.startTrackedFlow(CreateId::CreateIdFlow, data.uid, data.pubkey, data.name, data.age, data.message, data.signature).returnValue.getOrThrow()

            Response.status(Response.Status.CREATED).entity( signedTx.tx.outputs.single() ).build()

        } catch (ex: Throwable) {
            logger.error(ex.message, ex)
            logger.error(ex.toString())
            Response.status(Response.Status.BAD_REQUEST).entity(ex.message).build()
        }
    }

    @POST
    @Path("checkid")
    @Produces(MediaType.APPLICATION_JSON)
    fun paymentDebit(data: CheckIdModel): Response {

        val indexUid = IdSchemaV1.PersistentId::uid.equal(data.uid)
        val criteria = QueryCriteria.VaultCustomQueryCriteria(expression = indexUid)
        val states = rpcOps.vaultQueryBy<IdState>(criteria).states

        val matchingParties = rpcOps.partiesFromName(data.orgTo, false)
        if (matchingParties.size != 1) {
            throw IllegalArgumentException()
        }

        val orgTo = matchingParties.single()

        if (states.isEmpty()){
            return Response.status(Response.Status.BAD_REQUEST).entity("UID não existe nesta Org.").build()
        }

        return try {

            val signedTx = rpcOps.startTrackedFlow(::CheckFlow, orgTo, data.uid, data.message , data.signature).returnValue.getOrThrow()
            Response.status(Response.Status.CREATED).entity( signedTx.tx.outputs ).build()

        } catch (ex: Throwable) {
            logger.error(ex.message, ex)
            logger.error(ex.toString())
            Response.status(Response.Status.BAD_REQUEST).entity(ex.message).build()
        }
    }



}
package tech.bluchain.sample.examplecorda.flow

import co.paralleluniverse.fibers.Suspendable
import net.corda.core.contracts.Command
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.identity.Party
import net.corda.core.messaging.vaultQueryBy
import net.corda.core.node.services.Vault
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.Builder.equal
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.CordaSerializable
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import tech.bluchain.sample.examplecorda.contract.IdContract
import tech.bluchain.sample.examplecorda.schema.IdSchemaV1
import tech.bluchain.sample.examplecorda.state.IdState

object DoCheck {

    @InitiatingFlow
    @StartableByRPC
    @CordaSerializable
    class CheckFlow(
        private val orgTo: Party,
        private val uid: String,
        private val message: String,
        private val signature: String
    ) : FlowLogic<SignedTransaction>() {

        companion object {

            object INITIALISING : ProgressTracker.Step("Inicializando")
            object BUILDING : ProgressTracker.Step("Construindo")
            object SIGNING : ProgressTracker.Step("Assinando")
            object FINALISING : ProgressTracker.Step("Finalizando") {
                override fun childProgressTracker() = FinalityFlow.tracker()
            }

            fun tracker() = ProgressTracker(
                INITIALISING,
                BUILDING,
                SIGNING,
                FINALISING
            )
        }

        override val progressTracker = tracker()

        @Suspendable
        override fun call(): SignedTransaction {

            logger.error("FLOW 1")

// define progresso
            progressTracker.currentStep = INITIALISING

// criando uma sessao com o nó de destino
//val sessionTo = initiateFlow(orgTo)


// obtém a conta de origem para ser consumida
            val indexUid = IdSchemaV1.PersistentId::uid.equal(uid)
            val criteria = QueryCriteria.VaultCustomQueryCriteria(expression = indexUid)
            val oldIdStateAndRefList = serviceHub.vaultService.queryBy<IdState>(criteria = criteria).states

            if (oldIdStateAndRefList.isEmpty()) {
                throw Exception("Conta não encontrada")
            }


            val oldIdStateAndRef = oldIdStateAndRefList.single()
            val oldIdState = oldIdStateAndRef.state.data


// criando uma nova conta de débito
            val newId = oldIdState.id.copy(
                message = this.message,
                signature = this.signature

            )


// criando o novo state para conta
            val newIdState = oldIdState.copy(
                id = newId
            )

// criando o command para validação do contract
            val txCommandDoCheck = Command(
                IdContract.Commands.DoCheck(),
                newIdState.participants.map { it.owningKey }
            )


            val notary = serviceHub.networkMapCache.notaryIdentities.single()


// criando a transação e validando
            val txBuilder = TransactionBuilder(notary)
                .addCommand(txCommandDoCheck)
                .addInputState(oldIdStateAndRef)
                .addOutputState(newIdState, IdContract::class.java.canonicalName)

            txBuilder.verify(serviceHub)

            progressTracker.currentStep = SIGNING

// banco assinando a transação
            val signedTx = serviceHub.signInitialTransaction(txBuilder, ourIdentity.owningKey)

//sessionTo.sendAndReceive<SignedTransaction>(signedTx)

            progressTracker.currentStep = FINALISING

// finalizando
            return subFlow(FinalityFlow(signedTx, CreateId.CreateIdFlow.Companion.FINALISING.childProgressTracker()))


        }


    }
}
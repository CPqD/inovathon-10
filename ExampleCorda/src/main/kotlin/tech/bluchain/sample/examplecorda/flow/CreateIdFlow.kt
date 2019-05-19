package tech.bluchain.sample.examplecorda.flow

import co.paralleluniverse.fibers.Suspendable
import net.corda.core.contracts.Command
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import tech.bluchain.sample.examplecorda.contract.IdContract
import tech.bluchain.sample.examplecorda.model.DebitStatusEnum
import tech.bluchain.sample.examplecorda.model.IdModel
import tech.bluchain.sample.examplecorda.state.IdState
import java.time.Instant

/*
flow start CreateDebitFlow uid: uid1, pubkey: pubkey1, currency: brl1, hashProfile: hash1, balance: 1000

run vaultQuery contractStateType: tech.bluchain.blucard.state.IdState
* */

object CreateId {

    @InitiatingFlow
    @StartableByRPC
    class CreateIdFlow(
        private val uid : String,
        private val pubkey : String,
        private val name : String,
        private val age : String,
        private val message : String,
        private val signature : String

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

// define uma conta
            val identity = IdModel(uid = uid, createTime = Instant.now(), org = ourIdentity, pubkey = pubkey, message = message, signature = signature, name = name, age = age, status = DebitStatusEnum.ACTIVE)

// cria o state
            val idState = IdState(identity)

// criando o command para validação do contract
            val txCommand = Command(
                IdContract.Commands.CreateId(),
                idState.participants.map { it.owningKey }
            )

            progressTracker.currentStep = BUILDING

            val notary = serviceHub.networkMapCache.notaryIdentities.single()

// criando a transação e validando
            val txBuilder = TransactionBuilder(notary)
                .addCommand(txCommand)
                .addOutputState(idState, IdContract::class.java.canonicalName)

            txBuilder.verify(serviceHub)

            progressTracker.currentStep = SIGNING

// banco assinando a transação
            val signedTx = serviceHub.signInitialTransaction(txBuilder, ourIdentity.owningKey)

            progressTracker.currentStep = FINALISING

            // finalizando
            return subFlow(FinalityFlow(signedTx,FINALISING.childProgressTracker()))

        }

    }

}
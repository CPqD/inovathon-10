package tech.bluchain.sample.examplecorda.contract

import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.contracts.requireThat
import net.corda.core.crypto.Crypto
import net.corda.core.transactions.LedgerTransaction
import org.bouncycastle.util.encoders.Hex
import tech.bluchain.sample.examplecorda.state.IdState
import java.security.PublicKey
import java.util.*

class IdContract : Contract {

    override fun verify(tx: LedgerTransaction) {

        val command = tx.commandsOfType<Commands>().single()

        when (command.value) {
            is Commands.CreateId -> verifyCreateId(tx)
            is Commands.DoCheck -> verifyDoCheck(tx)
            else -> throw IllegalArgumentException("Command not found")
        }

    }

    private fun verifyCreateId(tx: LedgerTransaction){

        requireThat {
            // "Para criação de débito nenhum estado deve ser consumido" using (tx.inputs.isEmpty())
// "Apenas um débito deve ser criado" using (tx.outputs.size == 1)
        }

    }

    private fun verifyDoCheck(tx: LedgerTransaction){

        requireThat {

            val out = tx.outputsOfType<IdState>().single()
            val imp = tx.inputsOfType<IdState>().single()

// var encodedPubKey = request.publicKey.replace("\n", "").replace("\r", "")
// encodedPubKey = encodedPubKey.replace("-----BEGIN PUBLIC KEY-----", "")
// encodedPubKey = encodedPubKey.replace("-----END PUBLIC KEY-----", "")
// val pubKey = getKey(encodedPubKey.toByteArray())

 val pubKey = getKey(out.id.pubkey.toByteArray())
 val signature = Hex.decode(out.id.signature)

 val b = Crypto.doVerify(Crypto.RSA_SHA256, pubKey, signature , out.id.message.toByteArray())

 "Signature verification failed" using(b)
        }

    }


    fun getKey(publicKey: ByteArray): PublicKey {
        val publicBytes = Base64.getDecoder().decode(publicKey)
        return Crypto.decodePublicKey(Crypto.RSA_SHA256, publicBytes)
    }


    interface Commands : CommandData {
        class CreateId : Commands
        class DoCheck : Commands
    }

}
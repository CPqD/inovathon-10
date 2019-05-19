package tech.bluchain.sample.examplecorda.model

import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.time.Instant

@CordaSerializable
data class IdModel(
    val uid : String,
    val createTime : Instant,
    val org : Party,
    val pubkey : String,
    val message: String,
    val signature: String,
    val name : String,
    val age : String,
    val status : DebitStatusEnum
)

@CordaSerializable
enum class DebitStatusEnum {
    ACTIVE, INACTIVE
}
package tech.bluchain.sample.examplecorda.model

data class CreateRequestModel (
    val uid : String,
    val pubkey : String,
    val name : String,
    val age : String,
    val message: String,
    val signature: String
)
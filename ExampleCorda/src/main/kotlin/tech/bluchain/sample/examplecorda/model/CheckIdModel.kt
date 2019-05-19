package tech.bluchain.sample.examplecorda.model

data class CheckIdModel (
    val orgTo: String,
    val uid : String,
    val message: String,
    val signature: String
)
package tech.bluchain.sample.examplecorda.plugin

import net.corda.webserver.services.WebServerPluginRegistry
import tech.bluchain.sample.examplecorda.api.PersonApi
import java.util.function.Function

class PersonPlugin : WebServerPluginRegistry {

    /**
     * A list of classes that expose web APIs.
     */
    override val webApis = listOf(Function(::PersonApi))

    /**
     * A list of directories in the resources directory that will be served by Jetty under /web.
     */
    override val staticServeDirs = mapOf(
        // This will serve the accountWeb2 directory in resources to /web/example
        "person" to javaClass.classLoader.getResource("personWeb").toExternalForm()
    )

}
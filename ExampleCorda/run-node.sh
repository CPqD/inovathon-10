#!/bin/bash

# Esse script levanta o nó do corda
# Importante subir todos os nós configurados em deployNodes (Notary, NodeA, NodeB, etc)

cd build/nodes/$1

java -jar corda.jar

cd ../../../

clear


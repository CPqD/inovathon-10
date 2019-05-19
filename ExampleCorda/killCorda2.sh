#!/bin/bash

ps -ef |grep "java -Xmx2" |awk {'print $2'} | xargs kill

ps -ef |grep "/usr/bin/java -jar corda-webserver.jar" |awk {'print $2'} | xargs kill

clear

ps -ef |grep corda



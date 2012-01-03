#!/bin/sh

CWD=`pwd`

JSTESTDRIVER_BIN=${CWD}/bin/JsTestDriver-1.3.3d.jar
JSTESTDRIVER_CONF=${CWD}/jsTestDriver.conf

BROWSER=script/safari

(java -jar ${JSTESTDRIVER_BIN} \
    --port 4224 \
    --config ${JSTESTDRIVER_CONF} \
    --tests all \
    --browser ${BROWSER} \
    --verbose \
    --captureConsole
    )


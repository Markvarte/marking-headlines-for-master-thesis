#!/bin/bash

DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo $DIR

chmod -R 755 $DIR/marking-headlines-front/marking-headlines-front/dist/marking-headlines-front

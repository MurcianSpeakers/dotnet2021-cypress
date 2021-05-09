#!/bin/sh
set -eu
env | grep "^REACT_APP_*" | sed -E 's|^(.+)=(.*)$|window.\1="\2";|g'

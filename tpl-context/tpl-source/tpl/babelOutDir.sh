#!/bin/sh

#
# tpl supports dual cjs/esm builds which build to
# `cjs`/`lib` directories respectively. We also need
# to support legacy css builds which build to
# `legacy-cjs`/`legacy`.
#
# We build to the legacy directories only when NODE_ENV
# (in drone pipelines) and LEGACY_BUILD variables are set.
#
# We piggy-back off of the BABEL_MODULES variable which is
# set when targeting commonjs builds.
#
# We additionaly create the cjs directories with nested
# package.json's to indicate that the packages are of
# type commonjs.
#
DIR="lib"
LEGACY_DIR="legacy"

CJS_DIR="cjs"
LEGACY_CJS_DIR="legacy-cjs"

if [ "$BABEL_MODULES" ]; then
  if [ "$LEGACY" ] && [ "$NODE_ENV" ]; then
    echo "$LEGACY_CJS_DIR";
  else
    echo "$CJS_DIR";
  fi
else
  if [ "$LEGACY" ] && [ "$NODE_ENV" ]; then
    echo "$LEGACY_DIR";
  else
    echo "$DIR";
  fi
fi

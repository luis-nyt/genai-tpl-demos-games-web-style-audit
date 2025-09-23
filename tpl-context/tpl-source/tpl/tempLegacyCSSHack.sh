#!/bin/sh

#
# This file is cursed. Fortunately, it has an expiration date.
# It will only be used temporarily during our legacy CSS bundle
# testing.
#
# Since tpl uses a barrel file, we can't include modules with
# imports to CSS files because it may break downstream projects.
# This script will append the export statement to the barrel files
# in the legacy directories.
#
if [ -d legacy ]; then
    echo "\nexport * from './TestTPLCSS';" >> legacy/index.js
fi

if [ -d legacy-cjs ]; then
    echo '
      var _TestTPLCSS = require("./TestTPLCSS");
      Object.keys(_TestTPLCSS).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _TestTPLCSS[key]) return;
      Object.defineProperty(exports, key, {
          enumerable: true,
          get: function () {
          return _TestTPLCSS[key];
          }
      });
      });' >> legacy-cjs/index.js
fi

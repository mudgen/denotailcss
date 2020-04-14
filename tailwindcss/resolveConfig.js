//const resolveConfigObjects = require('./lib/util/resolveConfig').default
//const defaultConfig = require('./stubs/defaultConfig.stub.js')

import resolveConfigObjects from "./src/util/resolveConfig.js";
import defaultConfig from "./stubs/defaultConfig.stub.js";

export default function resolveConfig(...configs) {
  return resolveConfigObjects([...configs, defaultConfig]);
}

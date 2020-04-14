//const cloneDeep = require('lodash/cloneDeep')
import lodash from "../deps.js";
//const defaultConfig = require('./stubs/defaultConfig.stub.js')
import defaultConfig from "./stubs/defaultConfig.stub.js";
export default lodash.cloneDeep(defaultConfig.theme);

import { path, fs, lodash as _, postcss } from "../../deps.js";

import getModuleDependencies from "./lib/getModuleDependencies.js";
import registerConfigAsDependency from "./lib/registerConfigAsDependency.js";
import processTailwindFeatures from "./processTailwindFeatures.js";
import formatCSS from "./lib/formatCSS.js";
import resolveConfig from "./util/resolveConfig.js";
import { defaultConfigFile } from "./constants.js";

import defaultConfig from "../stubs/defaultConfig.stub.js";

function resolveConfigPath(filePath) {
  // require('tailwindcss')({ theme: ..., variants: ... })
  if (
    _.isObject(filePath) && !_.has(filePath, "config") && !_.isEmpty(filePath)
  ) {
    return undefined;
  }

  // require('tailwindcss')({ config: 'custom-config.js' })
  if (
    _.isObject(filePath) && _.has(filePath, "config") &&
    _.isString(filePath.config)
  ) {
    return path.resolve(filePath.config);
  }

  // require('tailwindcss')({ config: { theme: ..., variants: ... } })
  if (
    _.isObject(filePath) && _.has(filePath, "config") &&
    _.isObject(filePath.config)
  ) {
    undefined;
  }

  // require('tailwindcss')('custom-config.js')
  if (_.isString(filePath)) {
    return path.resolve(filePath);
  }

  // require('tailwindcss')
  try {
    const defaultConfigPath = path.resolve(defaultConfigFile);
    fs.accessSync(defaultConfigPath);
    return defaultConfigPath;
  } catch (err) {
    return undefined;
  }
}

const getConfigFunction = (config) =>
  async () => {
    if (_.isUndefined(config) && !_.isObject(config)) {
      return resolveConfig([defaultConfig]);
    }

    if (!_.isObject(config)) {
      getModuleDependencies(config).forEach((mdl) => {
        delete require.cache[path.resolve(mdl.file)];
      });
    }

    const configObject = _.isObject(config)
      ? _.get(config, "config", config)
      : (await import(config)).default;

    return resolveConfig([configObject, defaultConfig]);
  };

const plugin = postcss.plugin("tailwind", (config) => {
  const plugins = [];
  const resolvedConfigPath = resolveConfigPath(config);

  if (!_.isUndefined(resolvedConfigPath)) {
    plugins.push(registerConfigAsDependency(resolvedConfigPath));
  }

  return postcss([
    ...plugins,
    processTailwindFeatures(getConfigFunction(resolvedConfigPath || config)),
    formatCSS,
  ]);
});

export default plugin;

import { lodash as _, postcss } from "../../deps.js";

import substituteTailwindAtRules from "./lib/substituteTailwindAtRules.js";
import evaluateTailwindFunctions from "./lib/evaluateTailwindFunctions.js";
import substituteVariantsAtRules from "./lib/substituteVariantsAtRules.js";
import substituteResponsiveAtRules from "./lib/substituteResponsiveAtRules.js";
import substituteScreenAtRules from "./lib/substituteScreenAtRules.js";
import substituteClassApplyAtRules from "./lib/substituteClassApplyAtRules.js";

import corePlugins from "./corePlugins.js";
import processPlugins from "./util/processPlugins.js";

export default function (getConfig) {
  return function (css) {
    const config = getConfig();
    const processedPlugins = processPlugins(
      [...corePlugins(config), ...config.plugins],
      config,
    );

    return postcss([
      substituteTailwindAtRules(config, processedPlugins),
      evaluateTailwindFunctions(config),
      substituteVariantsAtRules(config, processedPlugins),
      substituteResponsiveAtRules(config),
      substituteScreenAtRules(config),
      substituteClassApplyAtRules(config, processedPlugins.utilities),
    ]).process(css, { from: _.get(css, "source.input.file") });
  };
}

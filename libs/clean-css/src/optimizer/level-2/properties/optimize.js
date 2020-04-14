import mergeIntoShorthands from './merge-into-shorthands.js';
import overrideProperties from './override-properties.js';
import populateComponents from './populate-components.js';
import restoreWithComponents from '../restore-with-components.js';
import { all as wrapForOptimizing } from '../../wrap-for-optimizing.js';
import removeUnused from '../../remove-unused.js';
import restoreFromOptimizing from '../../restore-from-optimizing.js';
import { OptimizationLevel } from '../../../options/optimization-level.js';

function optimizeProperties(properties, withOverriding, withMerging, context) {
  var levelOptions = context.options.level[OptimizationLevel.Two];
  var _properties = wrapForOptimizing(properties, false, levelOptions.skipProperties);
  var _property;
  var i, l;

  populateComponents(_properties, context.validator, context.warnings);

  for (i = 0, l = _properties.length; i < l; i++) {
    _property = _properties[i];
    if (_property.block) {
      optimizeProperties(_property.value[0][1], withOverriding, withMerging, context);
    }
  }

  if (withMerging && levelOptions.mergeIntoShorthands) {
    mergeIntoShorthands(_properties, context.validator);
  }

  if (withOverriding && levelOptions.overrideProperties) {
    overrideProperties(_properties, withMerging, context.options.compatibility, context.validator);
  }

  restoreFromOptimizing(_properties, restoreWithComponents);
  removeUnused(_properties);
}

export default optimizeProperties;

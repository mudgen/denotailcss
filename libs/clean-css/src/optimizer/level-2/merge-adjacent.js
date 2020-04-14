import isMergeable from './is-mergeable';
import optimizeProperties from './properties/optimize';
import sortSelectors from '../level-1/sort-selectors';
import tidyRules from '../level-1/tidy-rules';
import { OptimizationLevel } from '../../options/optimization-level';
import { body as serializeBody } from '../../writer/one-time';
import { rules as serializeRules } from '../../writer/one-time';
import Token from '../../tokenizer/token';

function mergeAdjacent(tokens, context) {
  var lastToken = [null, [], []];
  var options = context.options;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var selectorsSortingMethod = options.level[OptimizationLevel.One].selectorsSortingMethod;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var mergeLimit = options.compatibility.selectors.mergeLimit;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    if (token[0] != Token.RULE) {
      lastToken = [null, [], []];
      continue;
    }

    if (lastToken[0] == Token.RULE && serializeRules(token[1]) == serializeRules(lastToken[1])) {
      Array.prototype.push.apply(lastToken[2], token[2]);
      optimizeProperties(lastToken[2], true, true, context);
      token[2] = [];
    } else if (lastToken[0] == Token.RULE && serializeBody(token[2]) == serializeBody(lastToken[2]) &&
        isMergeable(serializeRules(token[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) &&
        isMergeable(serializeRules(lastToken[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) &&
        lastToken[1].length < mergeLimit) {
      lastToken[1] = tidyRules(lastToken[1].concat(token[1]), false, adjacentSpace, false, context.warnings);
      lastToken[1] = lastToken.length > 1 ? sortSelectors(lastToken[1], selectorsSortingMethod) : lastToken[1];
      token[2] = [];
    } else {
      lastToken = token;
    }
  }
}

export default mergeAdjacent;

import mergeAdjacent from './merge-adjacent';
import mergeMediaQueries from './merge-media-queries';
import mergeNonAdjacentByBody from './merge-non-adjacent-by-body';
import mergeNonAdjacentBySelector from './merge-non-adjacent-by-selector';
import reduceNonAdjacent from './reduce-non-adjacent';
import removeDuplicateFontAtRules from './remove-duplicate-font-at-rules';
import removeDuplicateMediaQueries from './remove-duplicate-media-queries';
import removeDuplicates from './remove-duplicates';
import removeUnusedAtRules from './remove-unused-at-rules';
import restructure from './restructure';
import optimizeProperties from './properties/optimize';
import { OptimizationLevel } from '../../options/optimization-level';
import Token from '../../tokenizer/token';

function removeEmpty(tokens) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];
    var isEmpty = false;

    switch (token[0]) {
      case Token.RULE:
        isEmpty = token[1].length === 0 || token[2].length === 0;
        break;
      case Token.NESTED_BLOCK:
        removeEmpty(token[2]);
        isEmpty = token[2].length === 0;
        break;
      case Token.AT_RULE:
        isEmpty = token[1].length === 0;
        break;
      case Token.AT_RULE_BLOCK:
        isEmpty = token[2].length === 0;
    }

    if (isEmpty) {
      tokens.splice(i, 1);
      i--;
      l--;
    }
  }
}

function recursivelyOptimizeBlocks(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    if (token[0] == Token.NESTED_BLOCK) {
      var isKeyframes = /@(-moz-|-o-|-webkit-)?keyframes/.test(token[1][0][1]);
      level2Optimize(token[2], context, !isKeyframes);
    }
  }
}

function recursivelyOptimizeProperties(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    switch (token[0]) {
      case Token.RULE:
        optimizeProperties(token[2], true, true, context);
        break;
      case Token.NESTED_BLOCK:
        recursivelyOptimizeProperties(token[2], context);
    }
  }
}

function level2Optimize(tokens, context, withRestructuring) {
  var levelOptions = context.options.level[OptimizationLevel.Two];
  var reduced;
  var i;

  recursivelyOptimizeBlocks(tokens, context);
  recursivelyOptimizeProperties(tokens, context);

  if (levelOptions.removeDuplicateRules) {
    removeDuplicates(tokens, context);
  }

  if (levelOptions.mergeAdjacentRules) {
    mergeAdjacent(tokens, context);
  }

  if (levelOptions.reduceNonAdjacentRules) {
    reduceNonAdjacent(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'body') {
    mergeNonAdjacentBySelector(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'selector') {
    mergeNonAdjacentByBody(tokens, context);
  }

  if (levelOptions.restructureRules && levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure(tokens, context);
    mergeAdjacent(tokens, context);
  }

  if (levelOptions.restructureRules && !levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure(tokens, context);
  }

  if (levelOptions.removeDuplicateFontRules) {
    removeDuplicateFontAtRules(tokens, context);
  }

  if (levelOptions.removeDuplicateMediaBlocks) {
    removeDuplicateMediaQueries(tokens, context);
  }

  if (levelOptions.removeUnusedAtRules) {
    removeUnusedAtRules(tokens, context);
  }

  if (levelOptions.mergeMedia) {
    reduced = mergeMediaQueries(tokens, context);
    for (i = reduced.length - 1; i >= 0; i--) {
      level2Optimize(reduced[i][2], context, false);
    }
  }

  if (levelOptions.removeEmpty) {
    removeEmpty(tokens);
  }

  return tokens;
}

export default level2Optimize;

import compactable from '../compactable';

function overridesNonComponentShorthand(property1, property2) {
  return property1.name in compactable &&
    'overridesShorthands' in compactable[property1.name] &&
    compactable[property1.name].overridesShorthands.indexOf(property2.name) > -1;
}

export default overridesNonComponentShorthand;

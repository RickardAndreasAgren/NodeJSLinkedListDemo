
const LinkedSearcher = {

  //{direction entry, id# targetId}, , listObject currentObject

  async find(connector, activeLink) {
    var compareList = [];
    var searchDirection = connector.entry;
    var targetId = connector.id;
    var currentObject = activeLink;
    var looking = true;


    while (looking) {

      if (currentObject.val == targetId) {
        // If any direction of found matches connector.entry
        if (currentObject) {

        }
        looking = false;
      }
    }
  },

  determineNextTarget(targetsList, target) {
    if (targetsList.length < 5) {
      // Recursively halve search field to narrow down best candidate
      var popCopy = [...targetsList];
    } else {
      var popCopy = [...targetsList];

    }
  },

  lessOrEqualDifference(va, vb, target) {
    let ta = target - va;
    let tb = target - vb;
    ta = ta < 0 ? 0 - ta : ta;
    tb = tb < 0 ? 0 - tb : tb;
    if (ta <= tb) {
      return ta;
    }
    return tb;
  },
}

module.exports = LinkedSearcher;

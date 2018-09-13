
const LinkedSearcher = {

  async find(connector, lList) {
    var searchDirection = connector.entry;
    var currentId = connector.id;
    var currentObject = iList.activeLink;
    var looking = true;


    while (looking) {


      if (currentObject.val == id) {
        looking = false;
      }
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

module.exports(LinkedSearcher);

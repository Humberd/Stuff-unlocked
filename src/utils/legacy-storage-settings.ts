function getStuffStorage() {
  return localStorage.getItem('stuff');
}

export const LegacyStorageSettings = {
  isImproveInventoryEnabled: () => {
    const stuff = getStuffStorage();
    if (!stuff) {
      return true;
    }
    const jsonStuff = JSON.parse(stuff);
    
    return !jsonStuff.improveInventory
  },
  isSideInventoryEnabled: () => {
    const stuff = getStuffStorage();
    if (!stuff) {
      return true;
    }
    const jsonStuff = JSON.parse(stuff);
    
    return !jsonStuff.displayStorage
  }
}
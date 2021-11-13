function getNewItemFromSuggestionList(userInput, selectedItem) {
  if (selectedItem) {
    return selectedItem;
  }
  if (userInput) {
    return { name: userInput };
  }
  return null;
}

export { getNewItemFromSuggestionList };

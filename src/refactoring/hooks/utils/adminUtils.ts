export const toggleAccordionItem = (
  set: Set<string>,
  itemId: string
): Set<string> => {
  const newSet = new Set(set);
  if (newSet.has(itemId)) {
    newSet.delete(itemId);
  } else {
    newSet.add(itemId);
  }
  return newSet;
};

export const isAccordionItemOpen = (
  set: Set<string>,
  itemId: string
): boolean => {
  return set.has(itemId);
};

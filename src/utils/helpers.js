export function removeKey(myObj, deleteKey) {
  return Object.assign(
    {},
    ...Object.entries(myObj)
      .filter(([k]) => k !== deleteKey)
      .map(([k, v]) => ({ [k]: v }))
  );
}

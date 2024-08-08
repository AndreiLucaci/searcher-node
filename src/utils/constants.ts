const knownFileTypes = [".ppt", ".pptx"];

export const Constants = {
  knownFileTypes,
  normalizedFileTypes: knownFileTypes.map((x) => x.replace(".", "")),
};

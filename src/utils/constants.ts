const knownFileTypes = [".ppt", ".pptx", ".ts"];

export const Constants = {
  knownFileTypes,
  normalizedFileTypes: knownFileTypes.map((x) => x.replace(".", "")),
};

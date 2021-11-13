const getButtonText = (flags, texts) => {
  if (flags[0]) {
    return flags[1] ? texts[0] : texts[1];
  }
  return flags[1] ? texts[2] : texts[3];
};

export { getButtonText };

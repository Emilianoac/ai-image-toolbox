function checkFileSize(file: Blob, mb: number) {
  mb = Math.round(mb);
  return file.size <= mb * 1024 * 1024;
}

function checkFileType(file: Blob, validTypes: string[]) {
  return validTypes.some((type) => file.type.includes(type));
}

export { checkFileSize, checkFileType };
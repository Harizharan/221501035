const usedShortCodes = new Set();

export function generateRandomShortCode(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

export function getUniqueShortCode(length = 6) {
  let code;
  do {
    code = generateRandomShortCode(length);
  } while (usedShortCodes.has(code));

  usedShortCodes.add(code);
  return code;
}

export function isValidCustomShortCode(code) {
  const regex = /^[a-zA-Z0-9]{1,10}$/;
  return regex.test(code) && !usedShortCodes.has(code);
}

export function reserveShortCode(code) {
  usedShortCodes.add(code);
}

export function formatPhoneNumber(phoneNumber: number) {
  const str = phoneNumber.toString();
  const cleaned = str.replace(/\D/g, "");
  const areaCode = cleaned.substring(0, 3);
  const firstPart = cleaned.substring(3, 6);
  const lastPart = cleaned.substring(6, 10);
  const formattedPhoneNumber =
    "(" + areaCode + ") " + firstPart + "-" + lastPart;
  return formattedPhoneNumber;
}

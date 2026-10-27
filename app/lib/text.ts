import { addressLine, type Settings } from "./settings-shared";

/** Fills {company}, {cvr}, {address}, {email} and {phone} so copy always matches the settings. */
export const fillTokens = (s: Settings) => (text: string) =>
  text
    .replaceAll("{company}", s.company)
    .replaceAll("{cvr}", s.cvr)
    .replaceAll("{address}", addressLine(s))
    .replaceAll("{email}", s.email)
    .replaceAll("{phone}", s.phone);

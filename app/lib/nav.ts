export const mainLinks = [
  { key: "cars", path: "/biler" },
  { key: "finance", path: "/finansiering" },
  { key: "sell", path: "/saelg-din-bil" },
] as const;

export const afterLinks = [
  { key: "about", path: "/om-os" },
  { key: "contact", path: "/kontakt" },
] as const;

export const infoLinks = [
  { key: "book", path: "/book-proevetur" },
  { key: "howToBuy", path: "/saadan-koeber-du" },
  { key: "warranty", path: "/garanti-og-service" },
  { key: "delivery", path: "/levering" },
  { key: "guides", path: "/guides" },
  { key: "faq", path: "/faq" },
  { key: "reviews", path: "/anmeldelser" },
  { key: "local", path: "/bilforhandler-horsens" },
] as const;

/** Every public page path (without language prefix), for the sitemap and llms.txt. */
export const legalPaths = ["/handelsbetingelser", "/reklamation-og-fortrydelse", "/privatlivspolitik", "/cookies"] as const;

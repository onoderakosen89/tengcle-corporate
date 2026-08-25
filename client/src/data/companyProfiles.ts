export interface PostalAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface CompanyProfile {
  legalName: string;
  established: string;
  representative: string;
  email: string;
  addresses: readonly PostalAddress[];
  registrationNumber?: string;
  capital?: string;
}

export const companyProfiles = {
  hk: {
    legalName: "Tengcle Limited",
    established: "2025-04-29",
    registrationNumber: "78077104",
    representative: "Kosen Onodera",
    email: "info@tengcle.com",
    addresses: [
      {
        street: "No. 5, 17/F, Strand 50, 50 Bonham Strand",
        city: "Sheung Wan",
        region: "Hong Kong",
        postalCode: "",
        country: "HK",
      },
    ],
  },
  jp: {
    legalName: "株式会社Tengcle",
    established: "2021-10-25",
    capital: "¥5,142,000",
    representative: "小野寺 紘宣",
    email: "info@tengcle.com",
    addresses: [
      {
        street: "2-19-20 Takanawa",
        city: "Minato-ku",
        region: "Tokyo",
        postalCode: "108-0074",
        country: "JP",
      },
      {
        street: "2-12-14 Tsukiji",
        city: "Chuo-ku",
        region: "Tokyo",
        postalCode: "104-0045",
        country: "JP",
      },
    ],
  },
  us: {
    legalName: "Tengcle Development LLC",
    established: "2026-01-05",
    representative: "Kosen Onodera",
    email: "us@tengcle.com",
    addresses: [
      {
        street: "17 Hamilton Ave",
        city: "Weehawken",
        region: "NJ",
        postalCode: "07086",
        country: "US",
      },
    ],
  },
} as const satisfies Record<"hk" | "jp" | "us", CompanyProfile>;

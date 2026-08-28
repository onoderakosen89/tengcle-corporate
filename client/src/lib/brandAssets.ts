const releaseRoot = "/images/brand/v4/svg";

export const brandAssets = {
  primary: {
    black: `${releaseRoot}/tengcle-primary-tagline-black.svg`,
    white: `${releaseRoot}/tengcle-primary-tagline-white.svg`,
  },
  compact: {
    black: `${releaseRoot}/tengcle-header-compact-black.svg`,
    white: `${releaseRoot}/tengcle-header-compact-white.svg`,
  },
  regional: {
    hk: {
      black: `${releaseRoot}/tengcle-regional-hk-black.svg`,
      white: `${releaseRoot}/tengcle-regional-hk-white.svg`,
    },
    jp: {
      black: `${releaseRoot}/tengcle-regional-jp-black.svg`,
      white: `${releaseRoot}/tengcle-regional-jp-white.svg`,
    },
    us: {
      black: `${releaseRoot}/tengcle-regional-us-black.svg`,
      white: `${releaseRoot}/tengcle-regional-us-white.svg`,
    },
  },
  legal: {
    hk: {
      black: `${releaseRoot}/tengcle-legal-hk-black.svg`,
      white: `${releaseRoot}/tengcle-legal-hk-white.svg`,
    },
    jp: {
      black: `${releaseRoot}/tengcle-legal-jp-black.svg`,
      white: `${releaseRoot}/tengcle-legal-jp-white.svg`,
    },
    us: {
      black: `${releaseRoot}/tengcle-legal-us-black.svg`,
      white: `${releaseRoot}/tengcle-legal-us-white.svg`,
    },
  },
} as const;

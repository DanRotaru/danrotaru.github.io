// Alternative ways to support me, shown on /coffee under the Buy Me a Coffee widget.
// Fill in the values below. Empty fields are hidden in production
// (in dev they show a placeholder so you can see the layout).
// A method with no filled fields is hidden entirely.

type SupportField = {
  label: string;
  value: string;
  /** Render in a monospace font (addresses, IBANs). */
  mono?: boolean;
};

type SupportMethod = {
  id: string;
  title: string;
  description: string;
  fields: SupportField[];
  /** Optional external link. With `logo` or `brand`, it renders as a branded pay button. */
  link?: { label: string; href: string; logo?: string; brand?: "wise" };
};

export const supportMethods: SupportMethod[] = [
  {
    id: "crypto",
    title: "Bitcoin & crypto currencies",
    description: "Always match the network and double-check the address.",
    fields: [
      { label: "Bitcoin (BTC)", value: "12zovCpUc7xDVdpWKwfYGUxs4LSNx6ALEb", mono: true },
      { label: "USDT (ERC-20)", value: "0x983e0d5860ab3cf42032f202b202bb437e492bd0", mono: true },
      { label: "USDT (TRC-20)", value: "TThaUjM583QJaEPzhgJj8vCp4E4WCDrPBY", mono: true },
      { label: "Binance UID", value: "145677023", mono: true },
    ],
  },
  {
    id: "wise",
    title: "Wise",
    description: "Low-fee transfers in almost any currency.",
    fields: [],
    link: { label: "Pay with Wise", href: "https://wise.com/pay/me/danr457", brand: "wise" },
  },
  {
    id: "mia",
    title: "MIA instant payment",
    description: "Moldova's instant payments. Scan or open the link from any Moldovan bank app, in MDL.",
    fields: [],
    link: {
      label: "Pay with MIA",
      href: "https://mia-qr.bnm.md/1/m/BNM/AGR0ca2c7b8f059470a8a8bfb26cd94f262",
      logo: "/static/icons/mia.svg",
    },
  },
];

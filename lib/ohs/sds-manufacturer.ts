/** Example manufacturer SDS for products a tower / mobile crane crew actually meets.
 *  The sheet for the exact product on this machine wins. These are starters for the binder. */

export type ManufacturerSds = {
  fieldSlug: string;
  product: string;
  maker: string;
  file: string;
  source: string;
  region: string;
  note: string;
};

export const MANUFACTURER_SDS: ManufacturerSds[] = [
  {
    fieldSlug: "diesel-fuel",
    product: "Diesel (ULSD)",
    maker: "Shell Trading Canada",
    file: "shell-diesel-ulsd.pdf",
    source:
      "https://www.epc.shell.com/DocumentManagement/BlobDocumentDownload?DocId=169895683",
    region: "Canada",
    note: "Ultra-low sulphur diesel for on-road and off-road engines. Common on carriers and support trucks.",
  },
  {
    fieldSlug: "diesel-fuel",
    product: "Diesel Fuel",
    maker: "Petro-Canada (Suncor)",
    file: "petro-canada-diesel-fuel.pdf",
    source: "https://www.petro-canada.ca/en/business/sds",
    region: "Canada",
    note: "Seasonal, dyed, ULSD and biodiesel blends as sold in Canada. Swap this sheet if the tank on site is a different brand.",
  },
  {
    fieldSlug: "hydraulic-oil",
    product: "AW Hydraulic Oils ISO 22-220",
    maker: "Safety-Kleen / Kleen Performance Products",
    file: "safety-kleen-aw-hydraulic-oil.pdf",
    source: "https://www.msdsdigital.com/system/files/Performance%20Plus%20AW%20Hydraulic%20Oils.pdf",
    region: "Canada / USA",
    note: "Anti-wear hydraulic oil covering ISO 46 and 68 — the grades most crane systems actually hold.",
  },
  {
    fieldSlug: "grease-and-lubricants",
    product: "Ulti-Plex Grease EP NLGI 1, 2",
    maker: "Chevron",
    file: "chevron-ulti-plex-ep-grease.pdf",
    source: "https://msdsdigital.com/system/files/Chevron%20Ulti-Plex%20Grease%20EP%20NLGI%201%2C%202.pdf",
    region: "USA / Canada distribution",
    note: "Lithium-complex EP grease for pins, slew and chassis. Use the manufacturer’s grease if the crane book names one.",
  },
  {
    fieldSlug: "penetrating-oil",
    product: "WD-40 Multi-Use Product Aerosol",
    maker: "WD-40 Company",
    file: "wd-40-multi-use-aerosol.pdf",
    source:
      "https://files.wd40.com/pdf/sds/mup/wd-40-multi-use-product-aerosol-low-voc-sds-us-ghs.pdf",
    region: "USA SDS (same product sold in Canada)",
    note: "The can in most toolboxes. Not a cleaner for synthetic slings. Keep off hot exhaust.",
  },
  {
    fieldSlug: "wire-rope-dressing",
    product: "453 Wirelife Almasol Coating Grease",
    maker: "Lubrication Engineers",
    file: "wirelife-almasol-coating-grease-453.pdf",
    source:
      "https://www.perma-tec.com/_Resources/Lubricants/LE/453_WIRELIFE_ALMASOL_COATING_GREASE_MSDS_en.pdf",
    region: "EU SDS (same product line)",
    note: "Tacky wire-rope dressing. Dressing does not hide broken wires. Rope OEM wins if they name a product.",
  },
  {
    fieldSlug: "battery-electrolyte",
    product: "Electrolyte / Battery Acid",
    maker: "Surrette Battery Company (Nova Scotia)",
    file: "surrette-battery-electrolyte.pdf",
    source: "https://www.surrette.com/wp-content/uploads/2019/11/SDS-Battery_Acid.pdf",
    region: "Canada",
    note: "Dilute sulfuric acid for flooded lead-acid batteries on carriers and site plant.",
  },
  {
    fieldSlug: "battery-electrolyte",
    product: "Battery Electrolyte",
    maker: "EnerSys",
    file: "enersys-battery-electrolyte.pdf",
    source:
      "https://preproduction.enersys.com/49591c/globalassets/documents/corporate/sds-or-msds/amer/english/sds-853022-battery-electrolyte-EN.pdf",
    region: "USA / Canada office",
    note: "Industrial battery electrolyte. Hydrogen while charging is the explosion hazard — not just the acid.",
  },
  {
    fieldSlug: "hand-cleaner",
    product: "GOJO Original Pumice Hand Cleaner",
    maker: "GOJO Industries",
    file: "gojo-original-pumice-hand-cleaner.pdf",
    source: "https://www.gojo.com/en/SDS",
    region: "USA",
    note: "Shop pumice cleaner for grease after rigging. Not for eyes. Not a substitute for gloves.",
  },
  {
    fieldSlug: "degreaser",
    product: "Simple Green All-Purpose Cleaner",
    maker: "Sunshine Makers",
    file: "simple-green-all-purpose-cleaner.pdf",
    source: "https://cdn.simplegreen.com/downloads/SDS_EN-US_SimpleGreenAllPurposeCleaner.pdf",
    region: "USA",
    note: "Example water-based shop cleaner. If the parts washer is solvent, that solvent’s SDS belongs here instead.",
  },
];

export function manufacturerSdsFor(slug: string) {
  return MANUFACTURER_SDS.filter((item) => item.fieldSlug === slug);
}

export type Wheel = {
  slug: string;
  name: string;
  finish: string;
  size: string;
  fitment: string;
  price: string;
  category: string;
  description: string;
};

export const wheels: Wheel[] = [
  {
    slug: "forged-mesh-01",
    name: "FORGED MESH 01",
    finish: "Satin Graphite",
    size: "20 × 9.0 / 20 × 10.5",
    fitment: "5 × 112",
    price: "$1,280",
    category: "FORGED",
    description: "A lightweight multi-spoke forged wheel engineered for a precise, understated stance.",
  },
  {
    slug: "flow-form-07",
    name: "FLOW FORM 07",
    finish: "Brushed Silver",
    size: "19 × 8.5 / 19 × 9.5",
    fitment: "5 × 112",
    price: "$920",
    category: "FLOW FORMED",
    description: "A clean split-spoke profile with a balanced blend of strength, weight, and daily usability.",
  },
  {
    slug: "track-series-12",
    name: "TRACK SERIES 12",
    finish: "Gloss Black",
    size: "20 × 9.5 / 20 × 10.5",
    fitment: "5 × 112",
    price: "$1,460",
    category: "FORGED",
    description: "A motorsport-influenced wheel with a strong center and an open spoke layout.",
  },
  {
    slug: "classic-five-03",
    name: "CLASSIC FIVE 03",
    finish: "Hyper Silver",
    size: "18 × 8.0 / 18 × 9.0",
    fitment: "5 × 112",
    price: "$780",
    category: "CAST",
    description: "A timeless five-spoke design built for a restrained factory-plus appearance.",
  },
];

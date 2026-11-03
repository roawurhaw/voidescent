// Product photography lives on the existing Shopify CDN.
const CDN = "https://voidescent.com/cdn/shop/files/";

export type Img = { src: string; alt: string; width: number; height: number };

const img = (file: string, alt: string, width = 900, height = 1125): Img => ({
  src: CDN + file,
  alt,
  width,
  height,
});

export const IMAGES = {
  logo: img("pinkescent_c83bb00e-a390-4d8c-ba63-753871e835cb.png?v=1779066570", "Voidescent", 900, 146),
  heroBottle: img(
    "Untitled_04607b57-ad3b-44d7-8e60-a6e0ad086711.png?v=1792096904",
    "A Voidescent bottle of red fragrance oil hanging from its black cord",
    900,
    1200,
  ),
  nebulaCard: img("nebUntitled.png?v=1793367020", "Nebula bottle among pink roses and blossom"),
  nebulaCar: img("nebula1.png?v=1792093931", "Nebula hanging from a rear-view mirror at night, city lights outside"),
  nebulaRoses: img("nebula2.png?v=1792093931", "Nebula on dark petals and wood"),
  nebulaMarble: img("nebula3.png?v=1792093931", "Nebula lying on pink marble with rose petals"),
  heavensCard: img("heavensUntitled.png?v=1793367020", "Heavens bottle with sandalwood and cinnamon", 900, 1200),
  descentCard: img("descentUntitled.png?v=1793367021", "Descent bottle with coffee beans, vanilla and white flowers"),
  bundleOrbit: img("productpicturepng.png?v=1793318189", "Nebula, Heavens and Descent hanging together"),
  trio: img("HOOLY_TRIO.png?v=1791940736", "Heavens, Nebula and Descent among wood, petals and flowers"),
  trioTop: img("TOPDOWN.png?v=1791940737", "The three bottles laid out with roses, wood and coffee beans"),
  mystery: img("Untitled_6903cd9a-3940-4461-9f2c-5823ebc36ae4.png?v=1793060585", "An unlabelled bottle in the dark", 900, 1599),
} satisfies Record<string, Img>;

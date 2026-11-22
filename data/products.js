const image = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=85`;

const productCategories = [
  {
    title: "Machinery",
    description: "Industrial and commercial equipment.",
    products: [
      { title: "Industrial Equipment", image: image("1581091226825-a6a2a5aee158"), alt: "Industrial equipment and technical work" },
      { title: "Workshop Machinery", image: image("1567789884554-0b844b597180"), alt: "Machinery in an industrial workspace" },
      { title: "Production Equipment", image: image("1581092160562-40aa08e78837"), alt: "Industrial production equipment" },
    ],
  },
  {
    title: "Electronic Items",
    description: "Consumer and trade electronics.",
    products: [
      { title: "Consumer Electronics", image: image("1498049794561-7780e7231661"), alt: "Modern electronic consumer devices" },
      { title: "Trade Electronics", image: image("1516321318423-f06f85e504b3"), alt: "Electronic equipment for business use" },
      { title: "Business Devices", image: image("1497366811353-6870744d04b2"), alt: "Electronic devices in a commercial workspace" },
    ],
  },
  {
    title: "Gaming Gadgets",
    description: "Controllers, consoles, and accessories.",
    products: [
      { title: "Gaming Controllers", image: image("1592840496694-26d035b9a193"), alt: "Gaming controller" },
      { title: "Gaming Console", image: image("1606144042614-b2417e99c4e3"), alt: "Modern gaming console" },
      { title: "Gaming Accessories", image: image("1542751371-adc38448a05e"), alt: "Gaming accessories and equipment" },
    ],
  },
  {
    title: "Other Gadgets",
    description: "Smart and everyday devices.",
    products: [
      { title: "Smart Device", image: image("1518444065439-e933c06ce9cd"), alt: "Smart everyday device" },
      { title: "Portable Gadget", image: image("1556656793-08538906a9f8"), alt: "Portable consumer gadget" },
      { title: "Lifestyle Electronics", image: image("1505740420928-5e560c06d30e"), alt: "Lifestyle and everyday electronics" },
    ],
  },
  {
    title: "Mobile Accessories",
    description: "Chargers, cables, cases, and audio products.",
    products: [
      { title: "Phone Charger", image: image("1609592424824-7e8b7b1a0f8e"), alt: "Mobile phone charger" },
      { title: "Phone Case", image: image("1603891128711-11b4b03bb138"), alt: "Protective mobile phone case" },
      { title: "Mobile Audio", image: image("1505740420928-5e560c06d30e"), alt: "Headphones and mobile audio products" },
    ],
  },
  {
    title: "Toys",
    description: "Retail and wholesale toys.",
    products: [
      { title: "Wholesale Toy Set", image: image("1558060370-d644479cb6f7"), alt: "Colourful toys arranged for retail" },
      { title: "Toy Vehicle", image: image("1560961911-ba7ef651a56c"), alt: "Toy vehicle" },
      { title: "Children's Play Set", image: image("1599623560574-39d485900c95"), alt: "Children's toys and play items" },
    ],
  },
  {
    title: "Sleeping and Traveling Items",
    description: "Pillows, bags, and travel essentials.",
    products: [
      { title: "Travel Pillow", image: image("1584100936595-c0654b55a2e2"), alt: "Comfort pillow for travel" },
      { title: "Travel Bag", image: image("1553062407-98eeb64c6a62"), alt: "Bag and luggage for travel" },
      { title: "Travel Essentials", image: image("1527631746610-bca00a040d60"), alt: "Travel essentials packed for a trip" },
    ],
  },
  {
    title: "Shoes",
    description: "Casual, sports, and formal footwear.",
    products: [
      { title: "Casual Footwear", image: image("1542291026-7eec264c27ff"), alt: "Casual sports shoe" },
      { title: "Sports Shoes", image: image("1460353581641-37baddab0fa2"), alt: "Sports footwear" },
      { title: "Formal Shoes", image: image("1449505278894-297fdb3edbc1"), alt: "Formal leather footwear" },
    ],
  },
  {
    title: "Home Décor",
    description: "Decorative and furnishing pieces.",
    products: [
      { title: "Decorative Home Accent", image: image("1618221195710-dd6b41faaea6"), alt: "Decorative accents in a home interior" },
      { title: "Interior Decor", image: image("1616486338812-3dadae4b4ace"), alt: "Styled interior with decorative details" },
      { title: "Living Space Decor", image: image("1600210492486-724fe5c67fb0"), alt: "Decorated living room interior" },
    ],
  },
  {
    title: "Kitchen Accessories",
    description: "Tools, storage, and cookware.",
    products: [
      { title: "Kitchen Tools", image: image("1556911220-bff31c812dba"), alt: "Tools and cookware in a kitchen" },
      { title: "Food Storage", image: image("1584269600519-112d071b35e6"), alt: "Kitchen storage containers" },
      { title: "Cookware", image: image("1584990347449-a4d1fc4a3a9d"), alt: "Cookware and kitchen equipment" },
    ],
  },
  {
    title: "Jewelry",
    description: "Fashion and trade jewelry.",
    products: [
      { title: "Fashion Jewelry", image: image("1515562141207-7a88fb7ce338"), alt: "Fashion jewelry collection" },
      { title: "Trade Jewelry", image: image("1599643478518-a784e5dc4c8f"), alt: "Jewelry suitable for trade" },
      { title: "Jewelry Accessories", image: image("1617038220319-276d3cfab638"), alt: "Jewelry accessory display" },
    ],
  },
  {
    title: "Industrial Chemicals",
    description: "Industrial chemicals and textile processing inputs.",
    products: [
      { title: "Sodium Dithionite (Rangkat)", image: image("1582719508461-905c673771fd"), alt: "Industrial chemical processing" },
      { title: "Textile Processing Chemicals", image: image("1532187863486-abf9dbad1b69"), alt: "Chemicals for industrial processing" },
      { title: "Industrial Auxiliaries", image: image("1576091160399-112ba8d25d1d"), alt: "Industrial laboratory supplies" },
    ],
  },
].map((category) => ({
  ...category,
  image: category.products[0].image,
  alt: category.products[0].alt,
}));

export default productCategories;

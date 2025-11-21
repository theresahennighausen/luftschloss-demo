export interface Review {
  id: string;
  reviewerName: string;
  date: string;
  rating: number;
  text: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  tags: string[];
  price: number;
  guests: number;
  type: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Alpine Sauna Retreat",
    location: "Innsbruck, Austria",
    description: "Small mountain cabin with panoramic views and a private sauna. Nestled in the Austrian Alps, this cozy retreat offers the perfect escape for those seeking tranquility and natural beauty. Wake up to stunning mountain vistas and unwind in your private wood-fired sauna after a day of hiking or skiing.",
    imageUrl: "/assets/skandinavian_snowy.jpg",
    tags: ["sauna", "withAView", "wifi"],
    price: 180,
    guests: 4,
    type: "Cabin",
    rating: 4.8,
    reviewCount: 34,
    reviews: [
      { id: "r1", reviewerName: "Maria S.", date: "March 2024", rating: 5, text: "Absolutely stunning location! The sauna was heavenly after a day in the mountains. The cabin is cozy and has everything you need." },
      { id: "r2", reviewerName: "Thomas K.", date: "February 2024", rating: 5, text: "Perfect winter getaway. The views are breathtaking and the host was very responsive. Highly recommend!" },
      { id: "r3", reviewerName: "Sophie L.", date: "January 2024", rating: 4, text: "Beautiful cabin with amazing views. The sauna is a real highlight. Only minor issue was the wifi was a bit slow, but that's expected in the mountains." }
    ]
  },
  {
    id: "2",
    title: "Seaside Cabin Escape",
    location: "Ålesund, Norway",
    description: "Cozy waterfront wood cabin, perfect for walks with pets. This charming Norwegian cabin sits right on the water's edge, offering direct access to peaceful coastal trails. The perfect spot for nature lovers and their furry friends.",
    imageUrl: "/assets/seaside_cabin_norway.png",
    tags: ["withAView", "wifi", "petFriendly"],
    price: 150,
    guests: 3,
    type: "Cabin",
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      { id: "r1", reviewerName: "Lars P.", date: "April 2024", rating: 5, text: "Perfect spot for a quiet retreat. Our dog loved the trails nearby. The cabin is simple but has everything you need." },
      { id: "r2", reviewerName: "Emma J.", date: "March 2024", rating: 5, text: "Stunning location right by the water. We spent hours just watching the waves. Pet-friendly and very clean!" }
    ]
  },
  {
    id: "3",
    title: "Floating Houseboat Haven",
    location: "Amsterdam, Netherlands",
    description: "Modern canal houseboat with bright interior and central location. Experience urban living on the water in this stylish Amsterdam houseboat, complete with all modern amenities.",
    imageUrl: "/assets/house_boat.png",
    tags: ["houseBoats", "wifi"],
    price: 165,
    guests: 2,
    type: "Houseboat",
    rating: 4.7,
    reviewCount: 19,
    reviews: [
      { id: "r1", reviewerName: "Julia M.", date: "April 2024", rating: 5, text: "Such a unique experience! The houseboat was modern and cozy. Perfect location in Amsterdam." },
      { id: "r2", reviewerName: "David R.", date: "March 2024", rating: 4, text: "Great stay, loved the canal views. Only downside was some noise from passing boats, but overall wonderful." }
    ]
  },
  {
    id: "4",
    title: "Hidden Treehouse Lodge",
    location: "Portland, USA",
    description: "Elevated treehouse with forest views and a family-friendly layout. This magical treehouse offers a unique escape into nature while being close to Portland's vibrant downtown.",
    imageUrl: "/assets/treehouse_with_pool.png",
    tags: ["treeHouses", "withAView", "familyFriendly"],
    price: 195,
    guests: 5,
    type: "Treehouse",
    rating: 4.9,
    reviewCount: 42,
    reviews: [
      { id: "r1", reviewerName: "Sarah W.", date: "May 2024", rating: 5, text: "Our kids absolutely loved it! The treehouse is spacious and the pool was a huge hit. Incredible experience." },
      { id: "r2", reviewerName: "Michael B.", date: "April 2024", rating: 5, text: "Magical place! Waking up in the trees was surreal. Great for families." }
    ]
  },
  {
    id: "5",
    title: "Sunshine Beach Bungalow",
    location: "Byron Bay, Australia",
    description: "Bright beach house with pool and open kitchen near surf spots. Steps from the beach, this sunny bungalow offers the perfect Australian coastal escape with modern comforts.",
    imageUrl: "/assets/beach_bungalow.png",
    tags: ["pool", "wifi", "petFriendly"],
    price: 220,
    guests: 6,
    type: "Beach House",
    rating: 4.8,
    reviewCount: 56,
    reviews: [
      { id: "r1", reviewerName: "Amy T.", date: "May 2024", rating: 5, text: "Perfect beach house! Pool was amazing, kitchen well-equipped. Our dog loved the nearby beach. Highly recommend!" },
      { id: "r2", reviewerName: "Chris H.", date: "April 2024", rating: 5, text: "Incredible location, literally minutes from great surf spots. House is beautiful and spacious." }
    ]
  },
  {
    id: "6",
    title: "Old Castle Keep Apartment",
    location: "Edinburgh, Scotland",
    description: "Historic stone apartment overlooking the old town rooftops. Live like royalty in this unique castle apartment with original stone walls and panoramic Edinburgh views.",
    imageUrl: "/assets/castle_vibes.jpg",
    tags: ["castles", "withAView", "wifi"],
    price: 210,
    guests: 4,
    type: "Castle",
    rating: 4.7,
    reviewCount: 31,
    reviews: [
      { id: "r1", reviewerName: "Robert M.", date: "April 2024", rating: 5, text: "Staying in a real castle was a dream come true! The views of Edinburgh are spectacular. So much history here." },
      { id: "r2", reviewerName: "Linda K.", date: "March 2024", rating: 4, text: "Beautiful historic property. The stone walls and location are incredible. A bit chilly but that's part of the castle experience!" }
    ]
  },
  {
    id: "7",
    title: "Forest Edge Cottage",
    location: "Black Forest, Germany",
    description: "Traditional cottage with allergy-friendly renovation and a large garden. Surrounded by ancient trees, this charming German cottage offers peace and nature at its finest.",
    imageUrl: "/assets/black_forest_germany.png",
    tags: ["familyFriendly", "allergyFriendly", "wifi"],
    price: 140,
    guests: 4,
    type: "Cottage",
    rating: 4.6,
    reviewCount: 24,
    reviews: [
      { id: "r1", reviewerName: "Anna F.", date: "May 2024", rating: 5, text: "Perfect for our family with allergies. The cottage is beautifully maintained and the forest location is magical." },
      { id: "r2", reviewerName: "Hans W.", date: "April 2024", rating: 4, text: "Lovely traditional cottage. Great for families, lots of space in the garden. Very peaceful." }
    ]
  },
  {
    id: "8",
    title: "Lakeside Sauna Cabin",
    location: "Kuusamo, Finland",
    description: "Tiny lake cabin with wood-fired sauna and water access. Experience authentic Finnish lake life with your own private sauna and stunning water views.",
    imageUrl: "/assets/alpine_lake.jpg",
    tags: ["sauna", "withAView", "petFriendly"],
    price: 130,
    guests: 3,
    type: "Cabin",
    rating: 4.9,
    reviewCount: 37,
    reviews: [
      { id: "r1", reviewerName: "Mika V.", date: "May 2024", rating: 5, text: "True Finnish experience! The sauna by the lake is perfection. Brought our dog and he loved it too." },
      { id: "r2", reviewerName: "Elena S.", date: "April 2024", rating: 5, text: "So peaceful and authentic. The wood-fired sauna was amazing. Best vacation ever!" }
    ]
  },
  {
    id: "9",
    title: "Cliffside Glass Studio",
    location: "Santorini, Greece",
    description: "Glass-front studio with sweeping sea sunset views. Watch the famous Santorini sunsets from this stunning glass studio perched on the cliffside.",
    imageUrl: "/assets/cliffside_glass_house.png",
    tags: ["withAView", "wifi"],
    price: 280,
    guests: 2,
    type: "Studio",
    rating: 5.0,
    reviewCount: 67,
    reviews: [
      { id: "r1", reviewerName: "Isabella R.", date: "May 2024", rating: 5, text: "Best sunset views in Santorini! The glass walls make you feel like you're floating above the sea. Absolutely stunning." },
      { id: "r2", reviewerName: "James C.", date: "April 2024", rating: 5, text: "Perfect romantic getaway. The views are even better than the photos. Worth every penny!" }
    ]
  },
  {
    id: "10",
    title: "Riverside Farmhouse",
    location: "Vermont, USA",
    description: "Rustic farmhouse with a riverside garden and fire pit. Classic New England charm meets modern comfort in this beautiful riverside property.",
    imageUrl: "/assets/farmhouse_vermont.png",
    tags: ["familyFriendly", "petFriendly", "wifi"],
    price: 175,
    guests: 6,
    type: "Farmhouse",
    rating: 4.8,
    reviewCount: 45,
    reviews: [
      { id: "r1", reviewerName: "Rachel G.", date: "May 2024", rating: 5, text: "Perfect family retreat! Kids loved the fire pit and playing by the river. Our dogs had a blast too." },
      { id: "r2", reviewerName: "Paul D.", date: "April 2024", rating: 5, text: "Beautiful rustic farmhouse with all modern amenities. The riverside location is so peaceful." }
    ]
  },
  {
    id: "11",
    title: "Desert Adobe Hideout",
    location: "Sedona, USA",
    description: "Quiet adobe-style home with open light and peaceful surroundings. Find tranquility in this minimalist desert retreat surrounded by Sedona's famous red rocks.",
    imageUrl: "/assets/desert_hideout.jpg",
    tags: ["allergyFriendly", "wifi"],
    price: 190,
    guests: 3,
    type: "Adobe House",
    rating: 4.7,
    reviewCount: 29,
    reviews: [
      { id: "r1", reviewerName: "Nicole P.", date: "May 2024", rating: 5, text: "So peaceful and serene. Perfect for my allergies too. The desert views are breathtaking." },
      { id: "r2", reviewerName: "Brandon L.", date: "April 2024", rating: 4, text: "Great hideaway spot. Very quiet and relaxing. Adobe architecture is beautiful." }
    ]
  },
  {
    id: "12",
    title: "Nordic Minimalist Loft",
    location: "Copenhagen, Denmark",
    description: "Minimalist loft with large windows and allergy-friendly materials. Experience Danish hygge in this beautifully designed minimalist space in the heart of Copenhagen.",
    imageUrl: "/assets/nordic_loft_denmark.png",
    tags: ["wifi", "allergyFriendly"],
    price: 170,
    guests: 2,
    type: "Loft",
    rating: 4.8,
    reviewCount: 38,
    reviews: [
      { id: "r1", reviewerName: "Karen N.", date: "May 2024", rating: 5, text: "Perfect minimalist design! So clean and allergy-friendly. Great location in Copenhagen too." },
      { id: "r2", reviewerName: "Erik A.", date: "April 2024", rating: 5, text: "Beautiful Nordic design. The large windows fill the space with natural light. Loved it!" }
    ]
  },
  {
    id: "13",
    title: "Mountain Peak Chalet",
    location: "Zermatt, Switzerland",
    description: "Luxury chalet with indoor pool and Matterhorn views. Ultimate alpine luxury with heated indoor pool and breathtaking views of the iconic Matterhorn.",
    imageUrl: "/assets/indoor_pool_with_view.jpg",
    tags: ["withAView", "pool", "wifi"],
    price: 450,
    guests: 8,
    type: "Chalet",
    rating: 4.9,
    reviewCount: 52,
    reviews: [
      { id: "r1", reviewerName: "Victoria H.", date: "May 2024", rating: 5, text: "Absolute luxury! The indoor pool with Matterhorn views is unforgettable. Worth every penny." },
      { id: "r2", reviewerName: "Marcus B.", date: "April 2024", rating: 5, text: "Best chalet we've ever stayed in. The views, the pool, everything is perfect. Highly recommend!" }
    ]
  },
  {
    id: "14",
    title: "Vintage Lighthouse Home",
    location: "Galway, Ireland",
    description: "Refurbished lighthouse with complete coastal panorama. Live in a piece of maritime history with 360-degree ocean views from this restored Irish lighthouse.",
    imageUrl: "/assets/lighthouse.jpg",
    tags: ["withAView", "wifi"],
    price: 200,
    guests: 4,
    type: "Lighthouse",
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      { id: "r1", reviewerName: "Fiona O.", date: "May 2024", rating: 5, text: "Incredible experience staying in a real lighthouse! The ocean views are spectacular. So unique!" },
      { id: "r2", reviewerName: "Patrick M.", date: "April 2024", rating: 5, text: "Magical place! Waking up surrounded by ocean is amazing. The lighthouse is beautifully restored." }
    ]
  },
  {
    id: "15",
    title: "Jungle Tree Canopy Home",
    location: "Ubud, Indonesia",
    description: "Tropical treetop home suitable for families. Immerse yourself in the Bali jungle canopy with this unique treehouse offering nature and adventure.",
    imageUrl: "/assets/jungle_treehouse.jpg",
    tags: ["treeHouses", "withAView", "wifi", "familyFriendly"],
    price: 160,
    guests: 5,
    type: "Treehouse",
    rating: 4.8,
    reviewCount: 48,
    reviews: [
      { id: "r1", reviewerName: "Amanda L.", date: "May 2024", rating: 5, text: "Amazing jungle experience! Kids loved waking up in the trees. So many tropical birds and wildlife." },
      { id: "r2", reviewerName: "Tom W.", date: "April 2024", rating: 5, text: "Unforgettable stay in the heart of nature. The treehouse is spacious and comfortable. Great for families!" }
    ]
  },
  {
    id: "16",
    title: "Harborfront Houseboat Loft",
    location: "Stockholm, Sweden",
    description: "Stylish loft houseboat with allergy-friendly interior. Modern Scandinavian design meets waterfront living in Stockholm's beautiful archipelago.",
    imageUrl: "/assets/house_boat.png",
    tags: ["houseBoats", "wifi", "allergyFriendly"],
    price: 185,
    guests: 3,
    type: "Houseboat",
    rating: 4.7,
    reviewCount: 33,
    reviews: [
      { id: "r1", reviewerName: "Sofia E.", date: "May 2024", rating: 5, text: "Beautiful houseboat with stunning harbor views. Perfect for my allergies too. Loved Stockholm from the water!" },
      { id: "r2", reviewerName: "Gustav L.", date: "April 2024", rating: 4, text: "Great location and modern design. Unique way to experience Stockholm. Very comfortable." }
    ]
  },
  {
    id: "17",
    title: "Cozy Snowfield Cottage",
    location: "Quebec, Canada",
    description: "Winter cottage with fireplace and snow trail access. Perfect winter escape with cozy fireplace, surrounded by snowy landscapes and great trails.",
    imageUrl: "/assets/skandinavian_snowy.jpg",
    tags: ["familyFriendly", "wifi", "petFriendly"],
    price: 155,
    guests: 5,
    type: "Cottage",
    rating: 4.8,
    reviewCount: 36,
    reviews: [
      { id: "r1", reviewerName: "Marie C.", date: "March 2024", rating: 5, text: "Perfect winter getaway! The fireplace was so cozy after a day in the snow. Our dog loved running in the snow." },
      { id: "r2", reviewerName: "Pierre L.", date: "February 2024", rating: 5, text: "Beautiful Quebec winter experience. Great trails nearby and the cottage is warm and welcoming." }
    ]
  },
  {
    id: "18",
    title: "Medieval Mini Castle Stay",
    location: "Carcassonne, France",
    description: "Small castle with rooftop terrace overlooking the medieval city. Step back in time in this authentic medieval castle with stunning views of Carcassonne's fortified city.",
    imageUrl: "/assets/castle_vibes.jpg",
    tags: ["castles", "withAView", "wifi"],
    price: 230,
    guests: 4,
    type: "Castle",
    rating: 4.9,
    reviewCount: 44,
    reviews: [
      { id: "r1", reviewerName: "Claire D.", date: "May 2024", rating: 5, text: "Living in a medieval castle was incredible! The rooftop terrace views of Carcassonne are breathtaking." },
      { id: "r2", reviewerName: "Antoine B.", date: "April 2024", rating: 5, text: "Magical experience! The castle is authentic and the location within the medieval city is perfect." }
    ]
  },
  {
    id: "19",
    title: "Summer Garden Villa",
    location: "Tuscany, Italy",
    description: "Tuscan villa with large garden, pool, and family space. Classic Italian villa surrounded by vineyards, olive groves, and rolling Tuscan hills.",
    imageUrl: "/assets/villa_tuscany.png",
    tags: ["pool", "wifi", "familyFriendly"],
    price: 320,
    guests: 8,
    type: "Villa",
    rating: 4.9,
    reviewCount: 61,
    reviews: [
      { id: "r1", reviewerName: "Gabriella M.", date: "May 2024", rating: 5, text: "Dream Tuscan villa! The pool is beautiful, garden is huge, perfect for our family. Amazing Italian experience." },
      { id: "r2", reviewerName: "Marco R.", date: "April 2024", rating: 5, text: "Stunning villa with incredible views. The whole family loved it. Great location for exploring Tuscany." }
    ]
  },
  {
    id: "20",
    title: "Nordic Sauna Micro-Cabin",
    location: "Rovaniemi, Finland",
    description: "Tiny cabin with sauna, allergy-friendly materials, and forest views. Minimalist Finnish cabin in Lapland with private sauna and a chance to see the Northern Lights.",
    imageUrl: "/assets/alpine_lake.jpg",
    tags: ["sauna", "allergyFriendly", "wifi"],
    price: 145,
    guests: 2,
    type: "Cabin",
    rating: 4.8,
    reviewCount: 39,
    reviews: [
      { id: "r1", reviewerName: "Hanna J.", date: "March 2024", rating: 5, text: "Perfect tiny cabin! The sauna was wonderful and we even saw Northern Lights. Great for my allergies too." },
      { id: "r2", reviewerName: "Olaf S.", date: "February 2024", rating: 5, text: "Cozy and authentic. The forest location is so peaceful. Sauna by the woods is the best!" }
    ]
  },
];

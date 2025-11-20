export interface Listing {
  id: string;
  title: string;
  location: string;
  tags: string[];
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Cozy Mountain Cabin",
    location: "Swiss Alps, Switzerland",
    tags: ["petFriendly", "wifi", "withAView", "familyFriendly"],
  },
  {
    id: "2",
    title: "Beachfront Villa",
    location: "Santorini, Greece",
    tags: ["pool", "wifi", "withAView", "allergyFriendly"],
  },
  {
    id: "3",
    title: "Enchanted Castle",
    location: "Scottish Highlands, Scotland",
    tags: ["castles", "withAView", "wifi"],
  },
  {
    id: "4",
    title: "Floating Houseboat",
    location: "Amsterdam, Netherlands",
    tags: ["houseBoats", "wifi", "petFriendly"],
  },
  {
    id: "5",
    title: "Treetop Retreat",
    location: "Costa Rica",
    tags: ["treeHouses", "withAView", "familyFriendly", "wifi"],
  },
  {
    id: "6",
    title: "Luxury Spa Resort",
    location: "Bali, Indonesia",
    tags: ["pool", "sauna", "wifi", "allergyFriendly"],
  },
  {
    id: "7",
    title: "Historic Castle Tower",
    location: "Loire Valley, France",
    tags: ["castles", "wifi", "withAView"],
  },
  {
    id: "8",
    title: "Family Lake House",
    location: "Lake Como, Italy",
    tags: ["familyFriendly", "pool", "wifi", "petFriendly"],
  },
  {
    id: "9",
    title: "Romantic Treehouse",
    location: "Oregon, USA",
    tags: ["treeHouses", "withAView", "wifi"],
  },
  {
    id: "10",
    title: "Canal Houseboat",
    location: "Venice, Italy",
    tags: ["houseBoats", "withAView", "wifi"],
  },
  {
    id: "11",
    title: "Mountain Spa Chalet",
    location: "Aspen, USA",
    tags: ["sauna", "pool", "wifi", "withAView", "familyFriendly"],
  },
  {
    id: "12",
    title: "Cliff Castle",
    location: "Edinburgh, Scotland",
    tags: ["castles", "withAView", "wifi"],
  },
  {
    id: "13",
    title: "Tropical Beach House",
    location: "Maldives",
    tags: ["pool", "wifi", "withAView", "allergyFriendly"],
  },
  {
    id: "14",
    title: "Forest Treehouse",
    location: "Black Forest, Germany",
    tags: ["treeHouses", "petFriendly", "wifi", "familyFriendly"],
  },
  {
    id: "15",
    title: "Lake Houseboat",
    location: "Kashmir, India",
    tags: ["houseBoats", "withAView", "wifi"],
  },
  {
    id: "16",
    title: "Pet-Friendly Cottage",
    location: "Cotswolds, England",
    tags: ["petFriendly", "wifi", "familyFriendly", "withAView"],
  },
];

import { useParams, useNavigate, Link } from "react-router-dom";
import { mockListings } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Star, Users, Wifi, Dog, Droplets, Trees, Castle, Home, Heart, AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import ListingCard from "@/components/ListingCard";


const tagLabels: Record<string, string> = {
  sauna: "Sauna",
  withAView: "Scenic view",
  wifi: "Wifi",
  petFriendly: "Pet friendly",
  houseBoats: "Houseboat",
  treeHouses: "Treehouse",
  pool: "Pool",
  familyFriendly: "Family friendly",
  castles: "Castle",
  allergyFriendly: "Allergy friendly",
};

const tagIcons: Record<string, React.ReactNode> = {
  sauna: <Droplets className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  petFriendly: <Dog className="w-4 h-4" />,
  treeHouses: <Trees className="w-4 h-4" />,
  pool: <Droplets className="w-4 h-4" />,
  castles: <Castle className="w-4 h-4" />,
  houseBoats: <Home className="w-4 h-4" />,
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Listing not found</h2>
            <p className="text-muted-foreground mb-6">The listing you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")}>Back to listings</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBooking = () => {
    toast({
      title: "Demo mode",
      description: "This is a demo. No real booking is performed.",
    });
  };

  const description = listing.description || "";
  const isLongDescription = description.length > 200;
  const displayDescription = showFullDescription || !isLongDescription 
    ? description 
    : description.slice(0, 200) + "...";

  const similarListings = mockListings
    .filter((l) => l.id !== listing.id && l.tags.some((tag) => listing.tags.includes(tag)))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white">
      {/* Header with back button */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Title and location */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{listing.title}</h1>
              <p className="text-lg text-foreground/70 mb-3">{listing.location}</p>
              <div className="flex flex-wrap gap-2 text-sm text-foreground/80">
                {listing.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="flex items-center gap-1">
                    {tagIcons[tag]}
                    {tagLabels[tag] || tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick facts strip */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-foreground/70 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Guests</span>
                    </div>
                    <p className="font-semibold">Up to {listing.guests}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-foreground/70 mb-1">
                      <Home className="w-4 h-4" />
                      <span className="text-sm">Type</span>
                    </div>
                    <p className="font-semibold">{listing.type}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-foreground/70 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">Rating</span>
                    </div>
                    <p className="font-semibold">{listing.rating} ({listing.reviewCount})</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-foreground/70 mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Featured</span>
                    </div>
                    <p className="font-semibold">{listing.tags.length} amenities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  {displayDescription}
                </p>
                {isLongDescription && (
                  <Button
                    variant="link"
                    className="px-0 mt-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {tagIcons[tag] || <Home className="w-4 h-4" />}
                      <span className="font-medium">{tagLabels[tag] || tag}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{listing.rating} · {listing.reviewCount} reviews</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {listing.reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.reviewerName}</p>
                        <p className="text-sm text-foreground/60">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground/80">{review.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column - Booking box */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">€{listing.price}</span>
                    <span className="text-foreground/60">/ night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{listing.rating}</span>
                    <span className="text-foreground/60">({listing.reviewCount} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in</Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-pink-50 border-pink-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out</Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-pink-50 border-pink-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min={1}
                      max={listing.guests}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="bg-pink-50 border-pink-200"
                    />
                  </div>
                  <Button onClick={handleBooking} className="w-full" size="lg">
                    Request booking
                  </Button>
                  <p className="text-xs text-center text-foreground/60">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarListings.map((similarListing) => (
                <Link key={similarListing.id} to={`/listing/${similarListing.id}`}>
                  <ListingCard
                    title={similarListing.title}
                    location={similarListing.location}
                    imageUrl={similarListing.imageUrl}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingDetail;

import { ImageIcon, Mountain } from "lucide-react";

interface ListingCardProps {
  title: string;
  location: string;
}

const ListingCard = ({ title, location }: ListingCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Mountain className="w-16 h-16 text-white/40" />
        </div>
        <ImageIcon className="w-12 h-12 text-white/60 absolute" />
      </div>
      <div className="p-4 text-center">
        <p className="text-sm font-medium text-foreground">Listing</p>
      </div>
    </div>
  );
};

export default ListingCard;

interface ListingCardProps {
  title: string;
  location: string;
  imageUrl: string;
}

const ListingCard = ({ title, location, imageUrl }: ListingCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-foreground/70">{location}</p>
      </div>
    </div>
  );
};

export default ListingCard;

import Image from "next/image";

export type CarouselCardProps = {
  title: string;
  image?: string;
  icon?: React.ReactNode;
};

const CarouselCard = ({ title, image, icon }: CarouselCardProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {image ? <Image height={80} width={80} src={image} /> : icon}
      <h1 className="text-center w-full">{title}</h1>
    </div>
  );
};
export default CarouselCard;

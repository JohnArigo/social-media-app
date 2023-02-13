import Image from "next/image";

export type CarouselCardProps = {
  title: string;
  image?: string;
  icon?: React.ReactNode;
  execute?: boolean;
};

const CarouselCard = ({ title, image, icon, execute }: CarouselCardProps) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center duration-1000 ease-in transform transition-all ${
        execute ? `opacity-100` : "opacity-0"
      }`}
    >
      {image ? <Image height={80} width={80} src={image} /> : icon}
      <h1 className="text-center w-full">{title}</h1>
    </div>
  );
};
export default CarouselCard;

import Image from 'next/image';

interface CardProps {
  img: string;
  name: string;
}

const Card = ({ img, name }: CardProps) => {
  return (
    <div className="border bg-white border-gray-200 rounded-md">
      <div className='relative h-80'>
        <Image src={img} alt={name} fill />
      </div>
      <h1 className="p-2 text-slate-800 font-xl font-semibold">{name}</h1>
    </div>
  );
};

export default Card;

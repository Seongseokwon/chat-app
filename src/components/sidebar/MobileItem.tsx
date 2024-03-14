import Link from "next/link";
import { IconType } from "react-icons/lib";

type MobileItemProps = {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

const MobileItem = ({ href, active, icon: Icon, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={`${href}`}
      className={`
    group
    flex
    gap-x-3
    leading-6
    font-semibold
    w-full
    justify-center
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
  `}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;

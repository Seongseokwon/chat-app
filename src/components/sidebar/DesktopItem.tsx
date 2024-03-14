import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type DesktopItemProps = {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

const DesktopItem = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={`${href}`}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          bg-white
          hover:bg-gray-100
        `,
          active && "bg-gray-200 text-black"
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;

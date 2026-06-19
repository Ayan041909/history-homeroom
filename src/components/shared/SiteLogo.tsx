import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  size?: number;
  showText?: boolean;
  textClassName?: string;
  href?: string | null;
  className?: string;
};

export function SiteLogo({
  size = 36,
  showText = true,
  textClassName = "font-heading font-bold text-lg gold-gradient-text",
  href = "/",
  className = "",
}: SiteLogoProps) {
  const mark = (
    <Image
      src="/logo.png"
      alt="History Homeroom"
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      priority
    />
  );

  const label = showText ? (
    <span className={textClassName}>History Homeroom</span>
  ) : null;

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg ${className}`}
      >
        {mark}
        {label}
      </Link>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      {label}
    </div>
  );
}

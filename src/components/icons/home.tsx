import { SVGProps } from "react";

interface HomeIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export default function HomeIcon({ className, ...props }: HomeIconProps) {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
      {...props}
    >
      <path
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        fill="currentColor"
      />
    </svg>
  );
}

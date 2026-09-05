import type { ReactNode } from "react";

function BrandIcon({
  children,
  size = 22,
  color,
  className,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color ?? "currentColor"}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

/** Official Simple Icons marks — https://simpleicons.org */
export function LinkedinIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} color="#0A66C2">
      <path
        fillRule="evenodd"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </BrandIcon>
  );
}

export function FacebookIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} color="#1877F2">
      <path
        fillRule="evenodd"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      />
    </BrandIcon>
  );
}

export function TwitterIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} className="wire-share-x">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </BrandIcon>
  );
}

export function MailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4CAF50" d="M45 16.2 40 18.95 35 23.7V40h7c1.657 0 3-1.343 3-3V16.2z" />
      <path fill="#1E88E5" d="M3 16.2 6.614 17.91 13 23.55V40H6c-1.657 0-3-1.343-3-3V16.2z" />
      <path fill="#E53935" d="m35 11.2-11 8.25-11-8.25-1 5.8 1 6.55 11 8.2 11-8.2 1-6.55z" />
      <path fill="#C62828" d="M3 12.298V16.2l10 7.35V11.2L9.876 8.748C8.207 7.499 6.047 7.63 4.606 9.07L3 12.298z" />
      <path fill="#FBC02D" d="M45 12.298V16.2l-10 7.35V11.2l3.124-2.452c1.669-1.249 3.829-1.12 5.27.32L45 12.298z" />
    </svg>
  );
}

export function CopyIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} className="wire-share-tool">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </BrandIcon>
  );
}

export function CheckIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} className="wire-share-tool">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </BrandIcon>
  );
}

export function ShareIcon({ size }: { size?: number }) {
  return (
    <BrandIcon size={size} className="wire-share-tool">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7A3.3 3.3 0 0 0 9 12a3.3 3.3 0 0 0-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91a3 3 0 1 0-3-3c0 .24.03.47.09.7L8.04 9.72A3 3 0 1 0 8 12a3 3 0 0 0 .09.7l7.13 4.16c-.05.21-.09.43-.09.65a3 3 0 1 0 3-3.43z" />
    </BrandIcon>
  );
}

// Butonlardaki ikonlar: sitedeki ok ikonuyla aynı çizgi kalınlığı (2) ve uçlar.
type IconProps = { className?: string };

export const ChatIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M20 11.5a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1.45-4.1A8.5 8.5 0 1 1 20 11.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const PhoneIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M5 4h3.5l1.75 4.5-2.25 1.5a11 11 0 0 0 6 6l1.5-2.25L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

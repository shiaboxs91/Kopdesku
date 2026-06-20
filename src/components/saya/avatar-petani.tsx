/**
 * Avatar ilustrasi SVG — petani muda. 0 dependency, tajam di semua layar,
 * tanpa foto orang asli (aman privasi). Warna mengikuti tema merah-putih.
 * Ganti dengan foto asli bila FAL_KEY/aset tersedia.
 */
export default function AvatarPetani({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Ilustrasi anggota koperasi desa"
    >
      <defs>
        <linearGradient id="bgav" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbe9eb" />
          <stop offset="100%" stopColor="#f7d9dd" />
        </linearGradient>
        <clipPath id="clipav">
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>

      <g clipPath="url(#clipav)">
        <rect width="120" height="120" fill="url(#bgav)" />
        {/* bukit/sawah */}
        <path d="M0 96 Q30 80 60 92 T120 88 V120 H0 Z" fill="#c7e3b8" />
        <path d="M0 104 Q40 94 78 104 T120 100 V120 H0 Z" fill="#a9d492" />

        {/* leher + badan (baju merah) */}
        <rect x="48" y="78" width="24" height="14" rx="6" fill="#e7b9a0" />
        <path
          d="M30 120 Q30 92 60 92 Q90 92 90 120 Z"
          fill="#ce1126"
        />
        <path d="M60 92 V120" stroke="#a00d1e" strokeWidth="2" />

        {/* kepala */}
        <circle cx="60" cy="58" r="24" fill="#f0c4a8" />
        {/* rambut */}
        <path
          d="M36 56 Q36 30 60 30 Q84 30 84 56 Q84 44 60 44 Q44 44 40 58 Z"
          fill="#3a2a22"
        />
        {/* topi caping miring */}
        <path d="M30 40 Q60 22 90 40 Q60 34 30 40 Z" fill="#d8a85a" />
        <path d="M52 30 Q60 24 68 30 Q60 28 52 30 Z" fill="#b9852f" />

        {/* mata */}
        <circle cx="51" cy="58" r="2.6" fill="#2a1d18" />
        <circle cx="69" cy="58" r="2.6" fill="#2a1d18" />
        {/* senyum */}
        <path
          d="M52 66 Q60 73 68 66"
          stroke="#9c5a45"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* pipi */}
        <circle cx="46" cy="64" r="3" fill="#f3a98e" opacity="0.6" />
        <circle cx="74" cy="64" r="3" fill="#f3a98e" opacity="0.6" />
      </g>
    </svg>
  );
}

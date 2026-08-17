import React from 'react';

interface ValleyVetLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'bubble';
}

export const ValleyVetLogo: React.FC<ValleyVetLogoProps> = ({
  className = 'w-12 h-12',
  variant = 'full',
}) => {
  if (variant === 'bubble') {
    return (
      <div
        className={`bg-white rounded-2xl p-1 shadow-sm border border-emerald-900/10 flex items-center justify-center overflow-hidden ${className}`}
        title="Valley Veterinary Surgery"
      >
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background hills */}
          <path
            d="M 20 50 Q 80 15 120 40 Q 160 20 180 50"
            fill="none"
            stroke="#8ea371"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 70 30 Q 115 10 145 35"
            fill="none"
            stroke="#778d59"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Horse silhouette */}
          <path
            d="M 68 58 C 65 52, 70 42, 78 40 C 85 39, 90 44, 94 48 C 96 46, 102 46, 106 50 C 107 55, 106 63, 106 72 L 102 72 L 100 63 L 95 63 L 94 72 L 90 72 L 91 60 C 86 60, 83 60, 80 64 L 79 72 L 75 72 L 77 58 Z"
            fill="#3d3f44"
          />

          {/* Cow / Cattle silhouette */}
          <path
            d="M 98 48 C 103 44, 115 44, 122 47 C 127 49, 131 54, 130 60 L 128 72 L 124 72 L 125 63 L 118 63 L 117 72 L 113 72 L 114 58 C 109 58, 104 57, 100 55 Z"
            fill="#6d8355"
          />

          {/* Dog silhouette */}
          <path
            d="M 126 55 C 130 52, 137 53, 142 56 C 144 58, 144 65, 144 72 L 140 72 L 139 64 L 134 64 L 133 72 L 129 72 L 130 60 Z"
            fill="#2c333a"
          />

          {/* Sheep / Lamb silhouette */}
          <path
            d="M 144 60 C 147 58, 153 58, 157 60 C 159 62, 159 67, 158 72 L 155 72 L 154 66 L 150 66 L 149 72 L 146 72 Z"
            fill="#808891"
          />

          {/* Foreground text: VALLEY */}
          <g fill="#2d3748">
            <text
              x="100"
              y="98"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="28"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              VALLEY
            </text>
            <text
              x="100"
              y="116"
              fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              fontSize="12"
              fontWeight="700"
              letterSpacing="2.5"
              fill="#7a8b99"
              textAnchor="middle"
            >
              VET SURGERY
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-1.5 shadow-sm border border-emerald-900/10 flex items-center justify-center overflow-hidden ${className}`}
      title="Valley Veterinary Surgery"
    >
      <svg
        viewBox="0 0 240 140"
        className="w-full h-full object-contain"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft backdrop hills */}
        <path
          d="M 25 55 Q 90 12 140 40 Q 185 18 215 55"
          fill="none"
          stroke="#8ea371"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 85 32 Q 135 8 175 36"
          fill="none"
          stroke="#738a53"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Horse silhouette */}
        <path
          d="M 72 65 C 68 58, 74 46, 84 44 C 92 43, 98 48, 102 53 C 105 51, 112 51, 117 55 C 118 61, 117 70, 117 80 L 112 80 L 110 70 L 104 70 L 103 80 L 98 80 L 99 66 C 94 66, 90 66, 86 71 L 85 80 L 80 80 L 82 65 Z"
          fill="#393b40"
        />

        {/* Cattle silhouette */}
        <path
          d="M 108 53 C 114 48, 128 48, 136 52 C 142 54, 146 60, 145 67 L 143 80 L 138 80 L 139 70 L 131 70 L 130 80 L 125 80 L 126 64 C 120 64, 115 63, 110 61 Z"
          fill="#6d8355"
        />

        {/* Dog silhouette */}
        <path
          d="M 140 61 C 145 57, 153 58, 159 62 C 161 64, 161 72, 161 80 L 156 80 L 155 71 L 149 71 L 148 80 L 143 80 L 144 67 Z"
          fill="#232a31"
        />

        {/* Sheep silhouette */}
        <path
          d="M 160 67 C 164 64, 171 64, 175 67 C 177 69, 177 75, 176 80 L 172 80 L 171 73 L 167 73 L 166 80 L 162 80 Z"
          fill="#7d8691"
        />

        {/* VALLEY VET SURGERY text */}
        <g>
          <text
            x="120"
            y="108"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="32"
            fontWeight="900"
            letterSpacing="3.5"
            fill="#2d3748"
            textAnchor="middle"
          >
            VALLEY
          </text>
          <text
            x="120"
            y="127"
            fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontSize="13"
            fontWeight="800"
            letterSpacing="3"
            fill="#7b8c9b"
            textAnchor="middle"
          >
            VET SURGERY
          </text>
        </g>
      </svg>
    </div>
  );
};

export const LoginBackground = () => {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cg1" cx="28%" cy="38%" r="52%">
          <stop offset="0%" stopColor="#7DD968" stopOpacity=".28" />
          <stop offset="100%" stopColor="#7DD968" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cg2" cx="72%" cy="62%" r="45%">
          <stop offset="0%" stopColor="#C8E8BA" stopOpacity=".18" />
          <stop offset="100%" stopColor="#C8E8BA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7DD968" stopOpacity="0" />
          <stop offset="50%" stopColor="#7DD968" stopOpacity=".85" />
          <stop offset="100%" stopColor="#7DD968" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#cg1)" />
      <rect width="1440" height="900" fill="url(#cg2)" />

      <g opacity=".06" stroke="white" strokeWidth="1">
        {Array.from({ length: 10 }, (_, i) => i * 100).map((y) => (
          <line key={y} x1="0" x2="1440" y1={y} y2={y} />
        ))}
        {Array.from({ length: 15 }, (_, i) => i * 104).map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="900" />
        ))}
      </g>

      <g fill="none" stroke="white" strokeWidth=".8" opacity=".14" strokeDasharray="2 6">
        <ellipse cx="720" cy="450" rx="680" ry="380" />
        <ellipse cx="720" cy="450" rx="480" ry="380" />
        <ellipse cx="720" cy="450" rx="260" ry="380" />
        <ellipse cx="720" cy="450" rx="680" ry="220" />
        <ellipse cx="720" cy="450" rx="680" ry="100" />
      </g>

      <path
        d="M 200 430 Q 720 180 1200 450"
        stroke="url(#arcGrad)"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
        style={{ animation: 'dashflow 14s linear infinite' }}
      />
      <path
        d="M 180 540 Q 720 340 1230 510"
        stroke="#7DD968"
        fill="none"
        strokeWidth="1.2"
        opacity=".45"
        strokeDasharray="2 9"
        strokeLinecap="round"
        style={{ animation: 'dashflow 22s linear infinite' }}
      />

      <circle cx="200" cy="430" r="22" fill="#7DD968" opacity=".15" />
      <circle cx="200" cy="430" r="11" fill="#7DD968" opacity=".4" />
      <circle cx="200" cy="430" r="5" fill="white" />
      <text x="228" y="425" fill="white" opacity=".9" fontSize="14" fontWeight="700">
        广州
      </text>
      <text x="228" y="443" fill="white" opacity=".45" fontSize="11">
        Guangzhou
      </text>

      <circle cx="1200" cy="450" r="22" fill="#C8E8BA" opacity=".15" />
      <circle cx="1200" cy="450" r="11" fill="#C8E8BA" opacity=".45" />
      <circle cx="1200" cy="450" r="5" fill="white" />
      <text x="1220" y="445" fill="white" opacity=".9" fontSize="14" fontWeight="700">
        Бишкек
      </text>
      <text x="1220" y="463" fill="white" opacity=".45" fontSize="11">
        Bishkek
      </text>
    </svg>
  )
}

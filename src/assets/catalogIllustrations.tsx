import React from 'react';

type IllustrationKey =
  | 'kit'
  | 'single'
  | 'customerPrint'
  | 'sectionMember'
  | 'eventMember'
  | 'team'
  | 'travel'
  | 'tshirt'
  | 'hoodie'
  | 'drawstringBag'
  | 'shopper'
  | 'crossbody'
  | 'backpack'
  | 'chestLogo'
  | 'frontPrint'
  | 'backPrint'
  | 'accessoryLogo';

type Props = {
  imageKey: string;
  width?: number;
  height?: number;
};

const frameStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%)',
  borderRadius: 20,
  border: '1px solid #e7e8ee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const SvgWrap: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ children, width = 220, height = 140 }) => {
  return (
    <div style={{ ...frameStyle, width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
};

const Shadow = () => (
  <ellipse cx="110" cy="118" rx="56" ry="10" fill="#E7EAF3" />
);

const TShirt = ({
  x = 65,
  y = 24,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M18 12L34 2H56L72 12L86 24L76 38L64 32V92H26V32L14 38L4 24L18 12Z"
      fill="#FFFFFF"
      stroke="#1F1F1F"
      strokeWidth="2"
    />
    <path d="M34 2C36 8 41 11 45 11C49 11 54 8 56 2" stroke="#1F1F1F" strokeWidth="2" />
    {print && <rect x="33" y="28" width="24" height="18" rx="4" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const Hoodie = ({
  x = 58,
  y = 18,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M25 10C29 3 36 0 45 0C54 0 61 3 65 10L73 20L87 28L78 44L67 38V98H23V38L12 44L3 28L17 20L25 10Z"
      fill="#F3F4F8"
      stroke="#1F1F1F"
      strokeWidth="2"
    />
    <path d="M31 14C34 18 38 20 45 20C52 20 56 18 59 14" stroke="#1F1F1F" strokeWidth="2" />
    <path d="M38 33H52" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
    <path d="M33 74H57" stroke="#D7DAE5" strokeWidth="8" strokeLinecap="round" />
    {print && <rect x="33" y="34" width="24" height="18" rx="4" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const DrawstringBag = ({
  x = 78,
  y = 30,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M16 16H72V84C72 90 67 95 61 95H27C21 95 16 90 16 84V16Z"
      fill="#FFFFFF"
      stroke="#1F1F1F"
      strokeWidth="2"
    />
    <path d="M16 20L8 92" stroke="#1F1F1F" strokeWidth="2" />
    <path d="M72 20L80 92" stroke="#1F1F1F" strokeWidth="2" />
    <path d="M22 16V7H66V16" stroke="#1F1F1F" strokeWidth="2" />
    {print && <rect x="28" y="34" width="32" height="20" rx="4" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const Shopper = ({
  x = 75,
  y = 28,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M18 28H74V92H18V28Z"
      fill="#FFFDFB"
      stroke="#1F1F1F"
      strokeWidth="2"
    />
    <path d="M30 28C30 17 36 10 46 10C56 10 62 17 62 28" stroke="#1F1F1F" strokeWidth="2" />
    {print && <rect x="31" y="42" width="30" height="22" rx="4" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const Crossbody = ({
  x = 76,
  y = 36,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M14 8L78 0" stroke="#1F1F1F" strokeWidth="3" />
    <rect x="20" y="20" width="56" height="36" rx="8" fill="#F5F6FA" stroke="#1F1F1F" strokeWidth="2" />
    <path d="M26 20V12H70V20" stroke="#1F1F1F" strokeWidth="2" />
    {print && <rect x="35" y="30" width="24" height="12" rx="3" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const Backpack = ({
  x = 72,
  y = 22,
  scale = 1,
  print = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  print?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M28 10C28 4 35 0 44 0C53 0 60 4 60 10V18H68C75 18 80 23 80 30V90C80 97 75 102 68 102H20C13 102 8 97 8 90V30C8 23 13 18 20 18H28V10Z"
      fill="#FFFFFF"
      stroke="#1F1F1F"
      strokeWidth="2"
    />
    <rect x="24" y="30" width="40" height="24" rx="6" fill="#F2F4F8" stroke="#1F1F1F" strokeWidth="2" />
    <rect x="28" y="62" width="32" height="20" rx="6" fill="#F2F4F8" stroke="#1F1F1F" strokeWidth="2" />
    {print && <rect x="35" y="36" width="18" height="10" rx="3" fill="#1F1F1F" opacity="0.85" />}
  </g>
);

const PrintFront = () => (
  <>
    <Shadow />
    <TShirt x={66} y={16} scale={1.1} print />
    <rect x="132" y="32" width="48" height="34" rx="8" fill="#1F1F1F" opacity="0.08" />
    <rect x="140" y="40" width="32" height="18" rx="4" fill="#1F1F1F" />
  </>
);

const PrintBack = () => (
  <>
    <Shadow />
    <g transform="translate(68 16)">
      <path
        d="M18 12L34 2H56L72 12L86 24L76 38L64 32V92H26V32L14 38L4 24L18 12Z"
        fill="#FFFFFF"
        stroke="#1F1F1F"
        strokeWidth="2"
      />
      <path d="M34 2C36 8 41 11 45 11C49 11 54 8 56 2" stroke="#1F1F1F" strokeWidth="2" />
      <rect x="24" y="34" width="42" height="28" rx="5" fill="#1F1F1F" opacity="0.85" />
    </g>
  </>
);

const PrintChest = () => (
  <>
    <Shadow />
    <TShirt x={66} y={16} scale={1.1} />
    <circle cx="110" cy="58" r="7" fill="#1F1F1F" />
  </>
);

const AccessoryPrint = () => (
  <>
    <Shadow />
    <Shopper x={68} y={20} scale={1.1} print />
  </>
);

const KitScene = () => (
  <>
    <Shadow />
    <TShirt x={28} y={22} scale={0.9} print />
    <DrawstringBag x={110} y={28} scale={0.8} print />
    <circle cx="154" cy="34" r="18" fill="#F3F5FA" />
    <path d="M147 34H161" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
    <path d="M154 27V41" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
  </>
);

const SingleScene = () => (
  <>
    <Shadow />
    <TShirt x={18} y={28} scale={0.72} print />
    <Hoodie x={62} y={26} scale={0.66} print />
    <Shopper x={120} y={44} scale={0.65} print />
  </>
);

const CustomerPrintScene = () => (
  <>
    <Shadow />
    <TShirt x={26} y={20} scale={0.85} />
    <rect x="128" y="30" width="48" height="34" rx="8" fill="#F5F6FA" stroke="#1F1F1F" strokeWidth="2" />
    <rect x="140" y="40" width="24" height="14" rx="4" fill="#1F1F1F" />
    <path d="M104 48H126" stroke="#1F1F1F" strokeWidth="2" strokeDasharray="4 4" />
  </>
);

const SectionMemberScene = () => (
  <>
    <Shadow />
    <TShirt x={26} y={22} scale={0.88} print />
    <DrawstringBag x={112} y={30} scale={0.78} print />
  </>
);

const EventMemberScene = () => (
  <>
    <Shadow />
    <TShirt x={26} y={22} scale={0.88} print />
    <Shopper x={116} y={28} scale={0.82} print />
  </>
);

const TeamScene = () => (
  <>
    <Shadow />
    <Hoodie x={22} y={16} scale={0.86} print />
    <Crossbody x={126} y={44} scale={0.8} print />
  </>
);

const TravelScene = () => (
  <>
    <Shadow />
    <TShirt x={10} y={34} scale={0.62} print />
    <Hoodie x={70} y={18} scale={0.72} print />
    <Backpack x={142} y={22} scale={0.58} print />
  </>
);

const renderIllustration = (key: IllustrationKey) => {
  switch (key) {
    case 'kit':
      return <KitScene />;
    case 'single':
      return <SingleScene />;
    case 'customerPrint':
      return <CustomerPrintScene />;
    case 'sectionMember':
      return <SectionMemberScene />;
    case 'eventMember':
      return <EventMemberScene />;
    case 'team':
      return <TeamScene />;
    case 'travel':
      return <TravelScene />;
    case 'tshirt':
      return (
        <>
          <Shadow />
          <TShirt x={66} y={16} scale={1.1} print />
        </>
      );
    case 'hoodie':
      return (
        <>
          <Shadow />
          <Hoodie x={62} y={12} scale={1.04} print />
        </>
      );
    case 'drawstringBag':
      return (
        <>
          <Shadow />
          <DrawstringBag x={70} y={20} scale={1} print />
        </>
      );
    case 'shopper':
      return (
        <>
          <Shadow />
          <Shopper x={70} y={18} scale={1} print />
        </>
      );
    case 'crossbody':
      return (
        <>
          <Shadow />
          <Crossbody x={68} y={42} scale={1} print />
        </>
      );
    case 'backpack':
      return (
        <>
          <Shadow />
          <Backpack x={68} y={14} scale={0.92} print />
        </>
      );
    case 'chestLogo':
      return <PrintChest />;
    case 'frontPrint':
      return <PrintFront />;
    case 'backPrint':
      return <PrintBack />;
    case 'accessoryLogo':
      return <AccessoryPrint />;
    default:
      return <KitScene />;
  }
};

export const CatalogIllustration: React.FC<Props> = ({
  imageKey,
  width = 220,
  height = 140,
}) => {
  return (
    <SvgWrap width={width} height={height}>
      {renderIllustration(imageKey as IllustrationKey)}
    </SvgWrap>
  );
};
/**
 * fontFamily
 */
const serif = "georgia, 'times new roman', times, serif";
const sans = 'helvetica, arial, sans-serif';
const cheltenham = `'nyt-cheltenham', ${serif}`;
const franklin = `'nyt-franklin', ${sans}`;

export const fontFamily = {
  franklin,
  cheltenham,
};

/**
 * fontWeight
 */
export const fontWeight = {
  200: '200',
  300: '300',
  400: '400',
  600: '600',
  700: '700',
};

/**
 * typeSize
 */
const typeSize = {
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.375rem', // 22px
  xxl: '1.625rem', // 26px
};

/**
 * lineHeight
 */
const lineHeight = {
  sm: '0',
  md: '1.3',
  lg: '1.5',
};

/**
 * typography
 */
const typography = {
  core: {
    headline: {
      1: `${fontWeight[600]} ${typeSize.xxl}/${lineHeight.md} ${fontFamily.franklin}`,
      2: `${fontWeight[700]} ${typeSize.xl}/${lineHeight.md} ${fontFamily.franklin}`,
    },
    title: {
      1: `${fontWeight[700]} ${typeSize.lg}/${lineHeight.lg} ${fontFamily.franklin}`,
      2: `${fontWeight[700]} ${typeSize.md}/${lineHeight.lg} ${fontFamily.franklin}`,
      3: `${fontWeight[700]} ${typeSize.sm}/${lineHeight.lg} ${fontFamily.franklin}`,
    },
    subtitle: {
      1: `${fontWeight[600]} ${typeSize.lg}/${lineHeight.lg} ${fontFamily.franklin}`,
      2: `${fontWeight[600]} ${typeSize.md}/${lineHeight.lg} ${fontFamily.franklin}`,
      3: `${fontWeight[600]} ${typeSize.sm}/${lineHeight.lg} ${fontFamily.franklin}`,
    },
    body: {
      1: `${fontWeight[400]} ${typeSize.lg}/${lineHeight.lg} ${fontFamily.franklin}`,
      2: `${fontWeight[400]} ${typeSize.md}/${lineHeight.lg} ${fontFamily.franklin}`,
      3: `${fontWeight[400]} ${typeSize.sm}/${lineHeight.lg} ${fontFamily.franklin}`,
    },
  },
  specialty: {
    display: {
      1: [
        `${fontWeight[300]} 2.5rem/1.2 ${fontFamily.cheltenham}`,
        `${fontWeight[200]} 3.125rem/1.12 ${fontFamily.cheltenham}`,
        `${fontWeight[200]} 2.875rem/1.22 ${fontFamily.cheltenham}`,
      ],
      2: [
        `${fontWeight[300]} 2.25rem/1.2 ${fontFamily.cheltenham}`,
        `${fontWeight[300]} 2.5rem/1.2 ${fontFamily.cheltenham}`,
      ],
      3: `${fontWeight[400]} 1.875rem/1.3333 ${fontFamily.cheltenham}`,
    },
    subscription: {
      1: `${fontWeight[700]} 1.875rem/1.333 ${fontFamily.cheltenham}`,
      2: `${fontWeight[700]} 1.5rem/1.333 ${fontFamily.cheltenham}`,
    },
    legal: {
      1: `${fontWeight[400]} 0.75rem/${lineHeight.lg} ${fontFamily.franklin}`,
    },
  },
};

const typographyFlat = { ...typography.core, ...typography.specialty };

export { typography, typographyFlat };

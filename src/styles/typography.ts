/**
 * Typography Scale - Minor Third (1.2 ratio)
 * Base size: 16px (1rem)
 * 
 * This creates a harmonious typographic scale where each step 
 * is 1.2 times larger than the previous one.
 */

const SCALE_RATIO = 1.2;
const BASE_SIZE = 1; // 1rem = 16px

// Calculate sizes using Minor Third scale
const calculateSize = (steps: number): number => {
  return BASE_SIZE * Math.pow(SCALE_RATIO, steps);
};

export const typographyTokens = {
  // Font sizes in rem units
  fontSize: {
    // Smaller than body text
    micro: `${calculateSize(-2).toFixed(3)}rem`,     // ~0.694rem (~11.11px)
    caption: `${calculateSize(-1).toFixed(3)}rem`,   // ~0.833rem (~13.33px)
    
    // Body text
    body: `${calculateSize(0)}rem`,                   // 1rem (16px)
    
    // Headings (progressively larger)
    h6: `${calculateSize(1).toFixed(3)}rem`,         // ~1.2rem (~19.2px)
    h5: `${calculateSize(2).toFixed(3)}rem`,         // ~1.44rem (~23.04px)
    h4: `${calculateSize(3).toFixed(3)}rem`,         // ~1.728rem (~27.65px)
    h3: `${calculateSize(4).toFixed(3)}rem`,         // ~2.074rem (~33.18px)
    h2: `${calculateSize(5).toFixed(3)}rem`,         // ~2.488rem (~39.81px)
    h1: `${calculateSize(6).toFixed(3)}rem`,         // ~2.986rem (~47.78px)
    
    // Display text (largest)
    display: `${calculateSize(7).toFixed(3)}rem`,    // ~3.583rem (~57.33px)
  },
  
  // Line heights optimized for each size
  lineHeight: {
    micro: '1.4',
    caption: '1.4', 
    body: '1.5',
    h6: '1.4',
    h5: '1.4',
    h4: '1.3',
    h3: '1.3',
    h2: '1.2',
    h1: '1.2',
    display: '1.1',
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Export individual tokens for easy access
export const {
  fontSize,
  lineHeight,
  fontWeight,
} = typographyTokens;

export default typographyTokens;
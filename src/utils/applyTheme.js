// src/utils/applyTheme.js
// Dynamic theme application utility for the coworking white-label platform
// Handles color palette generation and CSS custom property updates

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color (#ffffff)
 * @returns {Object} RGB values {r, g, b}
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL values {h, s, l}
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color
 */
function hslToHex(h, s, l) {
  h = h % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Generate a complete color palette from a base color
 * @param {string} baseColor - Base hex color
 * @returns {Object} Color palette with various shades
 */
function generateColorPalette(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    50: hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 40)),
    100: hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
    200: hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 20)),
    300: hslToHex(hsl.h, hsl.s, Math.min(70, hsl.l + 10)),
    400: hslToHex(hsl.h, hsl.s, Math.min(60, hsl.l + 5)),
    500: baseColor, // Base color
    600: hslToHex(hsl.h, hsl.s, Math.max(40, hsl.l - 5)),
    700: hslToHex(hsl.h, hsl.s, Math.max(30, hsl.l - 10)),
    800: hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 20)),
    900: hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
    950: hslToHex(hsl.h, hsl.s, Math.max(5, hsl.l - 40))
  };
}

/**
 * Apply theme colors to CSS custom properties
 * @param {Object} theme - Theme configuration object
 */
export function applyTheme(theme) {
  if (!theme) return;
  
  const root = document.documentElement;
  
  // Primary color and variations
  if (theme.primaryColor) {
    const primaryPalette = generateColorPalette(theme.primaryColor);
    const primaryRgb = hexToRgb(theme.primaryColor);
    
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    
    Object.entries(primaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-primary-${shade}`, color);
    });
  }
  
  // Secondary color and variations
  if (theme.secondaryColor) {
    const secondaryPalette = generateColorPalette(theme.secondaryColor);
    const secondaryRgb = hexToRgb(theme.secondaryColor);
    
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
    
    Object.entries(secondaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-secondary-${shade}`, color);
    });
  }
  
  // Accent color and variations
  if (theme.accentColor) {
    const accentPalette = generateColorPalette(theme.accentColor);
    const accentRgb = hexToRgb(theme.accentColor);
    
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
    
    Object.entries(accentPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-accent-${shade}`, color);
    });
  }
  
  // Background and text colors
  if (theme.backgroundColor) {
    root.style.setProperty('--color-background', theme.backgroundColor);
  }
  
  if (theme.textColor) {
    root.style.setProperty('--color-text', theme.textColor);
  }
  
  // Update meta theme-color for mobile browsers
  updateMetaThemeColor(theme.primaryColor);
  
  console.log('🎨 Theme applied:', {
    primary: theme.primaryColor,
    secondary: theme.secondaryColor,
    accent: theme.accentColor
  });
}

/**
 * Update meta theme-color for mobile browser chrome
 * @param {string} color - Hex color
 */
function updateMetaThemeColor(color) {
  if (!color) return;
  
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    document.head.appendChild(themeColorMeta);
  }
  themeColorMeta.content = color;
}

/**
 * Get contrasting text color for given background
 * @param {string} backgroundColor - Hex color
 * @returns {string} White or black hex color
 */
function getContrastingTextColor(backgroundColor) {
  const rgb = hexToRgb(backgroundColor);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

/**
 * Apply theme to settings object structure
 * @param {Object} settings - Complete settings object
 */
export function applyFullTheme(settings) {
  if (!settings || !settings.branding) return;
  
  applyTheme(settings.branding);
  
  // Apply additional settings if they exist
  const root = document.documentElement;
  
  if (settings.branding.borderRadius) {
    root.style.setProperty('--border-radius-base', settings.branding.borderRadius);
  }
  
  if (settings.branding.fontFamily) {
    root.style.setProperty('--font-family-base', settings.branding.fontFamily);
  }
}

// Export utility functions
export { 
  hexToRgb, 
  rgbToHsl, 
  hslToHex,
  generateColorPalette,
  getContrastingTextColor,
  updateMetaThemeColor
};
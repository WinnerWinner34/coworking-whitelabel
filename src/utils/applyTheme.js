// src/utils/applyTheme.js
// Utility functions for applying dynamic themes to the site
// Person A's settings page will use this to preview theme changes in real-time

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color code (e.g., '#2563eb')
 * @returns {Object|null} RGB values or null if invalid
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to HSL for color manipulation
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL values
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
    }
    h /= 6;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Generate lighter/darker variations of a color
 * @param {string} hex - Base hex color
 * @param {number} amount - Amount to lighten/darken (-100 to 100)
 * @returns {string} Modified hex color
 */
function adjustBrightness(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const adjust = (value) => {
    const adjusted = value + (amount * 255 / 100);
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const r = adjust(rgb.r);
  const g = adjust(rgb.g);
  const b = adjust(rgb.b);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Generate color palette from a base color
 * @param {string} baseColor - Base hex color
 * @returns {Object} Color palette with variations
 */
function generateColorPalette(baseColor) {
  return {
    50: adjustBrightness(baseColor, 45),
    100: adjustBrightness(baseColor, 35),
    200: adjustBrightness(baseColor, 25),
    300: adjustBrightness(baseColor, 15),
    400: adjustBrightness(baseColor, 8),
    500: baseColor, // Base color
    600: adjustBrightness(baseColor, -8),
    700: adjustBrightness(baseColor, -15),
    800: adjustBrightness(baseColor, -25),
    900: adjustBrightness(baseColor, -35)
  };
}

/**
 * Apply theme colors to CSS custom properties
 * @param {Object} theme - Theme configuration object
 */
export function applyThemeColors(theme) {
  const root = document.documentElement;
  
  // Primary color and variations
  if (theme.primaryColor) {
    const primaryPalette = generateColorPalette(theme.primaryColor);
    const primaryRgb = hexToRgb(theme.primaryColor);
    
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    
    // Set palette variations
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
  
  console.log('🎨 Theme colors applied:', {
    primary: theme.primaryColor,
    secondary: theme.secondaryColor,
    accent: theme.accentColor
  });
}

/**
 * Apply complete theme including fonts and spacing
 * @param {Object} settings - Complete settings object
 */
export function applyFullTheme(settings) {
  if (!settings) return;
  
  const root = document.documentElement;
  
  // Apply colors
  if (settings.branding) {
    applyThemeColors(settings.branding);
  }
  
  // Apply typography (if defined in future)
  if (settings.typography) {
    if (settings.typography.fontFamily) {
      root.style.setProperty('--font-family', settings.typography.fontFamily);
    }
    if (settings.typography.fontSize) {
      root.style.setProperty('--font-size-base', settings.typography.fontSize);
    }
  }
  
  // Apply layout settings
  if (settings.layout) {
    if (settings.layout.borderRadius) {
      root.style.setProperty('--border-radius', settings.layout.borderRadius);
    }
    if (settings.layout.spacing) {
      root.style.setProperty('--spacing-unit', settings.layout.spacing);
    }
  }
  
  // Update meta theme-color for mobile browsers
  updateMetaThemeColor(settings.branding?.primaryColor);
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
 * Generate CSS for theme preview
 * @param {Object} theme - Theme configuration
 * @returns {string} CSS string
 */
export function generateThemeCSS(theme) {
  const primaryPalette = generateColorPalette(theme.primaryColor || '#2563eb');
  const secondaryPalette = generateColorPalette(theme.secondaryColor || '#9333ea');
  const accentPalette = generateColorPalette(theme.accentColor || '#10b981');
  
  let css = ':root {\n';
  
  // Primary colors
  css += `  --color-primary: ${theme.primaryColor || '#2563eb'};\n`;
  Object.entries(primaryPalette).forEach(([shade, color]) => {
    css += `  --color-primary-${shade}: ${color};\n`;
  });
  
  // Secondary colors
  css += `  --color-secondary: ${theme.secondaryColor || '#9333ea'};\n`;
  Object.entries(secondaryPalette).forEach(([shade, color]) => {
    css += `  --color-secondary-${shade}: ${color};\n`;
  });
  
  // Accent colors
  css += `  --color-accent: ${theme.accentColor || '#10b981'};\n`;
  Object.entries(accentPalette).forEach(([shade, color]) => {
    css += `  --color-accent-${shade}: ${color};\n`;
  });
  
  // RGB versions for opacity
  const primaryRgb = hexToRgb(theme.primaryColor || '#2563eb');
  const secondaryRgb = hexToRgb(theme.secondaryColor || '#9333ea');
  const accentRgb = hexToRgb(theme.accentColor || '#10b981');
  
  if (primaryRgb) {
    css += `  --color-primary-rgb: ${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b};\n`;
  }
  if (secondaryRgb) {
    css += `  --color-secondary-rgb: ${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b};\n`;
  }
  if (accentRgb) {
    css += `  --color-accent-rgb: ${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b};\n`;
  }
  
  css += '}\n';
  
  return css;
}

/**
 * Reset theme to default colors
 */
export function resetTheme() {
  const defaultTheme = {
    primaryColor: '#2563eb',
    secondaryColor: '#9333ea',
    accentColor: '#10b981',
    backgroundColor: '#f9fafb',
    textColor: '#111827'
  };
  
  applyThemeColors(defaultTheme);
}

/**
 * Get current theme colors from CSS
 * @returns {Object} Current theme colors
 */
export function getCurrentTheme() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  return {
    primaryColor: computedStyle.getPropertyValue('--color-primary').trim() || '#2563eb',
    secondaryColor: computedStyle.getPropertyValue('--color-secondary').trim() || '#9333ea',
    accentColor: computedStyle.getPropertyValue('--color-accent').trim() || '#10b981',
    backgroundColor: computedStyle.getPropertyValue('--color-background').trim() || '#f9fafb',
    textColor: computedStyle.getPropertyValue('--color-text').trim() || '#111827'
  };
}

/**
 * Preview theme temporarily (for settings page)
 * @param {Object} theme - Theme to preview
 * @returns {Function} Function to revert changes
 */
export function previewTheme(theme) {
  const currentTheme = getCurrentTheme();
  applyThemeColors(theme);
  
  // Return function to revert
  return () => {
    applyThemeColors(currentTheme);
  };
}

/**
 * Check if a color is light or dark
 * @param {string} hex - Hex color
 * @returns {string} 'light' or 'dark'
 */
export function getColorBrightness(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'dark';
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? 'light' : 'dark';
}

/**
 * Get contrasting text color for a background
 * @param {string} backgroundColor - Background hex color
 * @returns {string} '#ffffff' or '#000000'
 */
export function getContrastingTextColor(backgroundColor) {
  const brightness = getColorBrightness(backgroundColor);
  return brightness === 'light' ? '#000000' : '#ffffff';
}

/**
 * Generate accessible color combinations
 * @param {string} baseColor - Base hex color
 * @returns {Object} Color combinations with good contrast
 */
export function generateAccessibleColors(baseColor) {
  const brightness = getColorBrightness(baseColor);
  
  return {
    background: baseColor,
    text: getContrastingTextColor(baseColor),
    accent: brightness === 'light' ? adjustBrightness(baseColor, -30) : adjustBrightness(baseColor, 30),
    muted: brightness === 'light' ? adjustBrightness(baseColor, -10) : adjustBrightness(baseColor, 10),
    border: brightness === 'light' ? adjustBrightness(baseColor, -20) : adjustBrightness(baseColor, 20)
  };
}

// Export utility functions for external use
export { 
  hexToRgb, 
  rgbToHsl, 
  adjustBrightness, 
  generateColorPalette,
  updateMetaThemeColor 
};
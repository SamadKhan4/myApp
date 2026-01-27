import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Font scaling
const scaleFont = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale(1)));

// Dimension scaling
const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Legacy scaling functions
const scaleSize = (size) => {
  // Base size for iPhone 14 Pro (393 x 852)
  const baseWidth = 393;
  const scale = SCREEN_WIDTH / baseWidth;
  return Math.round(size * scale);
};

const scaleVertical = (size) => {
  const baseHeight = 852;
  const scale = SCREEN_HEIGHT / baseHeight;
  return Math.round(size * scale);
};

const legacyModerateScale = (size, factor = 0.5) => {
  return size + (scaleSize(size) - size) * factor;
};

// Safe area insets
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

// Export all functions
export {
    hp, isAndroid, isIOS, legacyModerateScale, moderateScale, scale, scaleFont, scaleSize,
    scaleVertical, SCREEN_HEIGHT, SCREEN_WIDTH, verticalScale, wp
};

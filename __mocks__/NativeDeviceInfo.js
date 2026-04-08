// Mock for react-native NativeDeviceInfo
const constants = {
  Dimensions: {
    window: { width: 375, height: 667, scale: 2, fontScale: 1 },
    screen: { width: 375, height: 667, scale: 2, fontScale: 1 },
  },
  isEdgeToEdge: false,
};

const NativeDeviceInfo = {
  getConstants() {
    return constants;
  },
};

// Support both CJS and ESM imports
module.exports = NativeDeviceInfo;
module.exports.default = NativeDeviceInfo;
module.exports.__esModule = true;

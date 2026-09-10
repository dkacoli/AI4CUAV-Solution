// Annotation Types
export const ANNOTATION_TYPES = [
  { value: "0", label: "BoundingBoxes" },
  { value: "1", label: "Polygons" },
  { value: "2", label: "Keypoints" },
  { value: "3", label: "Segmentation" },
];

// Detection Types
export const DETECTION_TYPES = [
  { value: "0", label: "Thermal" },
  { value: "1", label: "Infrared" },
  { value: "2", label: "Visual" },
  { value: "3", label: "Radar" },
];

// Drone Classes
export const DRONE_CLASSES = {
  MultiRotor: [],
  FixedWing: [],
  HybridVTOL: [],
};

export const URGENCY_LEVELS = [
  "Low",
  "Medium",
  "High",
  "Critical"
];

export const DATA_MODALITIES = [
  "RGB",
  "Thermal",
  "Infrared",
  "Radar",
  "LiDAR",
  "Multi-modal"
];

export const ENVIRONMENTS = [
  "Urban",
  "Rural",
  "Desert",
  "Forest",
  "Water",
  "Mixed"
];

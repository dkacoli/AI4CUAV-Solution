import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitOrder } from "../services/orderService";
import { uploadDatasetProof, sendNda } from "../services/ndaService";

const INITIAL_FORM = {
  userId: "",
  detectionTypes: [],
  droneTypes: [],
  droneClasses: { MultiRotor: [], FixedWing: [], HybridVTOL: [] },
  dataFusionMethod: "",
  recognitionType: "",
  requiresTracking: false,
  customModelNeed: "",
  specifications: "",
  urgencyLevel: "",
  provideOwnDataset: false,
  dataset: "",
  additionalDetails: "",
  datasetURL: "",
  enviroment: "",
  dataModality: "",
  hasAnnotationType: false,
  annotationFormat: "",
  isDatasetVerified: false
};

const RECOGNITION_MAP = {
  "Basic Recognition": 0,
  "Advanced Recognition": 1,
  "AI Enhanced Recognition": 2
};

const MULTIROTOR_MAP = { Quadcopter: 0, Hexacopter: 1, Octocopter: 2 };
const FIXEDWING_MAP  = { Glider: 0, Trainer: 1, Jet: 2 };
const HYBRIDVTOL_MAP = { "Tail Sitter": 0, "Tilt Rotor": 1, "Tilt Wing": 2 };

function mapEnum(arr, map) {
  return arr.map((v) => map[v] ?? null).filter((v) => v !== null);
}

// One validator per wizard step, in step order. Each returns an error
// message or null. Used both to block "Next" on the current step and,
// defensively, to re-check every earlier step on final submit (in case the
// user went back and un-filled something).
const STEP_VALIDATORS = [
  (formData) => {
    if (formData.detectionTypes.length === 0)
      return "Please select at least one detection type.";
    if (formData.detectionTypes.length > 1 && !formData.dataFusionMethod)
      return "Please select a data fusion method.";
    return null;
  },
  (formData) => {
    if (!formData.recognitionType) return "Please select a recognition type.";
    if (!formData.enviroment) return "Please enter the model's operating environment.";
    return null;
  },
  (formData, datasetProofFile) => {
    if (formData.isDatasetVerified && !datasetProofFile)
      return "Please upload a proof file for the verified dataset.";
    return null;
  }
];

export function useOrderForm() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep]         = useState(0);
  const [isSaving, setIsSaving]             = useState(false);
  const [formData, setFormData]             = useState(INITIAL_FORM);
  const [droneEntry, setDroneEntry]         = useState({ type: "", className: "" });
  const [datasetProofFile, setDatasetProofFile] = useState(null);
  const [showNdaDialog, setShowNdaDialog]   = useState(false);
  const [orderIdForNda, setOrderIdForNda]   = useState(null);
  const [customerName]                      = useState("");
  const [toast, setToast]                   = useState(null); // { message, key }

  const showToast = (message) => setToast({ message, key: Date.now() });
  const closeToast = () => setToast(null);

  const handleNext = () => {
    const error = STEP_VALIDATORS[activeStep](formData, datasetProofFile);
    if (error) { showToast(error); return; }
    setActiveStep((p) => p + 1);
  };
  const handleBack = () =>
    activeStep === 0 ? navigate("/") : setActiveStep((p) => p - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleDetectionTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      detectionTypes: checked
        ? [...prev.detectionTypes, value]
        : prev.detectionTypes.filter((v) => v !== value)
    }));
  };

  const handleAddDroneType = () => {
    const { type, className } = droneEntry;
    if (!type || !className) return;
    setFormData((prev) => ({
      ...prev,
      droneTypes: prev.droneTypes.includes(type)
        ? prev.droneTypes
        : [...prev.droneTypes, type],
      droneClasses: {
        ...prev.droneClasses,
        [type]: prev.droneClasses[type].includes(className)
          ? prev.droneClasses[type]
          : [...prev.droneClasses[type], className]
      }
    }));
    setDroneEntry({ type: "", className: "" });
  };

  const handleSubmit = async () => {
    for (let step = 0; step <= activeStep; step++) {
      const error = STEP_VALIDATORS[step](formData, datasetProofFile);
      if (error) { showToast(error); return; }
    }

    setIsSaving(true);
    try {
      // Drone type/class names are sent as strings — the backend has a
      // JsonStringEnumConverter registered, so it binds "HybridVTOL" etc.
      // directly to the matching enum member (sending numeric indices here
      // would silently target the wrong enum member, since these enums'
      // declaration order doesn't line up with the UI's own numbering).
      const apiData = {
        DetectionTypes: formData.detectionTypes,
        DataFusionMethod:
          formData.detectionTypes.length > 1
            ? formData.dataFusionMethod
            : "Early Fusion",
        RecognitionMethods: [RECOGNITION_MAP[formData.recognitionType] ?? 0],
        DroneTypes: formData.droneTypes,
        MultiRotorClasses: mapEnum(formData.droneClasses.MultiRotor, MULTIROTOR_MAP),
        FixedWingClasses:  mapEnum(formData.droneClasses.FixedWing,  FIXEDWING_MAP),
        HybridVTOLClasses: mapEnum(formData.droneClasses.HybridVTOL, HYBRIDVTOL_MAP),
        RecognitionType:   RECOGNITION_MAP[formData.recognitionType] ?? 0,
        RequiresTracking:  formData.requiresTracking,
        ProvideOwnDataset: formData.provideOwnDataset || false,
        CustomModelNeed:   formData.customModelNeed   || null,
        Specifications:    formData.specifications    || null,
        UrgencyLevel:      formData.urgencyLevel      || null,
        AdditionalDetails: formData.additionalDetails || null,
        DatasetURL:        formData.datasetURL        || null,
        Enviroment:        formData.enviroment        || null,
        DataModality:      formData.dataModality      || null,
        HasAnnotationType: formData.hasAnnotationType || false,
        AnnotationFormat:  formData.annotationFormat  || null,
        IsDatasetVerified: formData.isDatasetVerified
      };

      const result = await submitOrder(apiData);
      const newOrderId = result?.id ?? result?.orderId ?? result?.OrderId ?? result;
      if (!newOrderId) throw new Error("Order submitted but no orderId was returned.");

      if (formData.isDatasetVerified && datasetProofFile)
        await uploadDatasetProof(newOrderId, datasetProofFile);

      setOrderIdForNda(newOrderId);
      setShowNdaDialog(true);
    } catch (err) {
      showToast(
        typeof err?.message === "string"
          ? err.message
          : "Failed to submit your order. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleNdaClose = (res) => {
    setShowNdaDialog(false);
    if (res?.sent) navigate("/");
  };

  const handleNdaSend = async (email, name) => {
    await sendNda({ orderId: orderIdForNda, email, partyName: name || undefined });
  };

  return {
    activeStep, isSaving,
    formData, setFormData,
    droneEntry, setDroneEntry,
    datasetProofFile, setDatasetProofFile,
    showNdaDialog, orderIdForNda, customerName,
    toast, closeToast,
    handleNext, handleBack,
    handleChange, handleDetectionTypeChange,
    handleAddDroneType, handleSubmit,
    handleNdaClose, handleNdaSend
  };
}

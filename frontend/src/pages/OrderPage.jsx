import {
  Box, Typography, Button, Card, CardContent,
  Stepper, Step, StepLabel, Divider
} from "@mui/material";
import { StepDataset, StepDetection, StepRecognition } from "./OrderSteps";
import EmailCaptureDialog from "../components/EmailCaptureDialog";
import { useOrderForm } from "../hooks/useOrderForm";
import { GRADIENTS } from "../constants/colors";

const STEPS = [
  "Step 1: Detection Technology",
  "Step 2: Recognition & Requirements",
  "Step 3: Dataset & Details"
];

export default function OrderPage() {
  const {
    activeStep, isSaving,
    formData, setFormData,
    droneEntry, setDroneEntry,
    setDatasetProofFile,
    showNdaDialog, orderIdForNda, customerName,
    handleNext, handleBack,
    handleChange, handleDetectionTypeChange,
    handleAddDroneType, handleSubmit,
    handleNdaClose, handleNdaSend
  } = useOrderForm();

  const stepContent = [
    <StepDetection
    key="detection"
    setFormData={setFormData}
     formData={formData}
     droneEntry={droneEntry}
      setDroneEntry={setDroneEntry} handleChange={handleChange}
      handleDetectionTypeChange={handleDetectionTypeChange}
      handleAddDroneType={handleAddDroneType}
    />,
    <StepRecognition key="recognition" formData={formData} handleChange={handleChange} />,
    <StepDataset
      key="dataset"
      formData={formData}
      handleChange={handleChange}
      setDatasetProofFile={setDatasetProofFile}
    />
  ];

  return (
    <Box sx={{ background: GRADIENTS.PAGE_BG, color: "#fff", width: "100vw", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", py: 5, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 900, letterSpacing: "-0.02em", mb: 1 }}>
          Order Custom AI Model
        </Typography>
        <Typography textAlign="center" sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}>
          Configure detection, recognition and dataset details in a guided flow.
        </Typography>

        <Box sx={{ bgcolor: "#fff", borderRadius: 3, px: { xs: 1, md: 2 }, py: { xs: 2, md: 2.5 }, mb: 3, boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
        </Box>

        <Card elevation={0} sx={{ borderRadius: 3, bgcolor: "#fff", color: "#111", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
          <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
  <Box sx={{ height: 480, overflowY: "auto", pr: 1 }}>
    {stepContent[activeStep]}
  </Box>
  <Divider sx={{ my: 3 }} />
  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
    <Button onClick={handleBack} variant="outlined">Back</Button>
    <Button
      variant="contained"
      onClick={activeStep === STEPS.length - 1 ? handleSubmit : handleNext}
      disabled={isSaving}
    >
      {activeStep === STEPS.length - 1 ? (isSaving ? "Submitting…" : "Submit Order") : "Next"}
    </Button>
  </Box>
</CardContent>
        </Card>
      </Box>

      <EmailCaptureDialog
        open={showNdaDialog}
        orderId={orderIdForNda}
        defaultName={customerName}
        onClose={handleNdaClose}
        onSend={handleNdaSend}
      />
    </Box>
  );
}

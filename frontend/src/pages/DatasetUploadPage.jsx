import {
  Box, Typography, Card, CardContent, TextField,
  Select, MenuItem, FormControl, InputLabel, Button, Alert,
  Checkbox, FormControlLabel
} from "@mui/material";
import { useRef, useState } from "react";
import { uploadDataset } from "../services/datasetService";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import { ANNOTATION_TYPES, DETECTION_TYPES } from "../constants/enums";
import { formatFileSize } from "../helpers/formatters";
import { ROUTES } from "../constants/routes";

export default function DatasetUploadPage() {
  const [form, setForm] = useState({
    modelType: "", sensorType: "", datasource: "", resolution: "",
    frameRate: "", dataFormat: "", numberOfSamples: "", annotationType: "",
    taskType: "", trainingSize: "", validationSize: "", testingSize: "",
    projectPartner: "", commentss: "", datasetUrl: ""
  });

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [useExistingFile, setUseExistingFile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const validate = () => {
    const required = [
      "modelType", "sensorType", "datasource", "resolution",
      "frameRate", "dataFormat", "numberOfSamples", "annotationType", "taskType"
    ];
    for (const k of required) {
      if (!String(form[k] ?? "").trim()) return `Field "${k}" is required`;
    }
    if (!useExistingFile && !file) return "Please choose a dataset file to upload";
    if (useExistingFile && !form.datasetUrl.trim()) return "Please enter your dataset URL";
    return null;
  };

  const doUpload = async () => {
    setErr(null); setMsg(null);
    const v = validate();
    if (v) { setErr(v); return; }
    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append("ModelType", form.modelType);
      fd.append("SensorType", form.sensorType);
      fd.append("Datasource", form.datasource);
      fd.append("Resolution", form.resolution);
      fd.append("FrameRate", form.frameRate);
      fd.append("DataFormat", form.dataFormat);
      fd.append("NumberOfSamples", form.numberOfSamples);
      fd.append("AnnotationType", form.annotationType);
      fd.append("TaskType", form.taskType);
      if (form.trainingSize) fd.append("TrainingSize", form.trainingSize);
      if (form.validationSize) fd.append("ValidationSize", form.validationSize);
      if (form.testingSize) fd.append("TestingSize", form.testingSize);
      if (form.projectPartner) fd.append("ProjectPartner", form.projectPartner);
      if (form.commentss) fd.append("Commentss", form.commentss);
      if (useExistingFile) fd.append("FileURL", form.datasetUrl);
      else fd.append("File", file);

      const res = await uploadDataset(fd);
      setMsg(`Uploaded dataset (${res?.modelType ?? ""})`);
      setFile(null);
      setForm((p) => ({ ...p, datasetUrl: "" }));
      setUseExistingFile(false);
      navigate(ROUTES.DATASETS);
    } catch (e) {
      setErr(e?.message || "Upload failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ backgroundColor: "#f5f7fb", minHeight: "100vh", py: 5, px: { xs: 2, md: 6 } }}>

        {/* Header */}
        <Typography variant="h5" fontWeight={700} mb={0.5}>
          Upload Training Dataset
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Upload a labeled dataset to train a new threat detection model
        </Typography>

        {/* Drop zone */}
        {!useExistingFile ? (
          <Box
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            sx={{
              border: `2px dashed ${dragging ? "#378ADD" : "#c8d0dc"}`,
              borderRadius: 3,
              bgcolor: dragging ? "#f0f7ff" : "#fff",
              py: 6, px: 3,
              display: "flex", flexDirection: "column", alignItems: "center",
              cursor: "pointer", mb: 3, transition: "all 0.15s",
              "&:hover": { borderColor: "#378ADD", bgcolor: "#f7faff" }
            }}
          >
            <Box sx={{
              width: 56, height: 56, borderRadius: "50%",
              bgcolor: "#eef1f6", display: "flex", alignItems: "center", justifyContent: "center", mb: 2
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4m0 0L8 8m4-4l4 4"/><path d="M20 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"/>
              </svg>
            </Box>
            {file ? (
              <>
                <Typography fontWeight={600} mb={0.5}>{file.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(file.size)} — click to change
                </Typography>
              </>
            ) : (
              <>
                <Typography fontWeight={600} mb={0.5}>Drag and drop your dataset here</Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>or click to browse files</Typography>
                <Typography variant="caption" color="text.disabled">Only ZIP files are supported</Typography>
              </>
            )}
            <input hidden ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </Box>
        ) : (
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth size="small" label="Dataset File URL"
              name="datasetUrl" value={form.datasetUrl} onChange={handleChange}
              placeholder="https://..."
            />
          </Box>
        )}

        {/* Toggle online/local */}
        <FormControlLabel
          sx={{ mb: 3 }}
          control={
            <Checkbox
              checked={useExistingFile}
              onChange={(e) => { setUseExistingFile(e.target.checked); if (e.target.checked) setFile(null); }}
            />
          }
          label="My dataset is hosted online"
        />

        {/* Metadata fields */}
        <Card sx={{ mb: 3, borderRadius: 2 }} elevation={0} variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Typography fontWeight={600} mb={2}>Dataset Metadata</Typography>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 2
            }}>
              <TextField size="small" label="Model Type"        name="modelType"        value={form.modelType}        onChange={handleChange} fullWidth />
              <TextField size="small" label="Sensor Type"       name="sensorType"       value={form.sensorType}       onChange={handleChange} fullWidth />
              <TextField size="small" label="Datasource"        name="datasource"       value={form.datasource}       onChange={handleChange} fullWidth />
              <TextField size="small" label="Resolution"        name="resolution"       value={form.resolution}       onChange={handleChange} fullWidth />
              <TextField size="small" label="Frame Rate"        name="frameRate"        value={form.frameRate}        onChange={handleChange} fullWidth />
              <TextField size="small" label="Data Format"       name="dataFormat"       value={form.dataFormat}       onChange={handleChange} fullWidth />
              <TextField size="small" label="Number of Samples" name="numberOfSamples"  value={form.numberOfSamples}  onChange={handleChange} fullWidth />
              <TextField size="small" label="Project Partner"   name="projectPartner"   value={form.projectPartner}   onChange={handleChange} fullWidth />

              <FormControl size="small" fullWidth>
                <InputLabel>Annotation Type</InputLabel>
                <Select label="Annotation Type" name="annotationType" value={form.annotationType} onChange={handleChange}>
                  {ANNOTATION_TYPES.map((a) => <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Task Type</InputLabel>
                <Select label="Task Type" name="taskType" value={form.taskType} onChange={handleChange}>
                  {DETECTION_TYPES.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField size="small" type="number" label="Training Size (%)"   name="trainingSize"   value={form.trainingSize}   onChange={handleChange} fullWidth />
              <TextField size="small" type="number" label="Validation Size (%)" name="validationSize" value={form.validationSize} onChange={handleChange} fullWidth />
              <TextField size="small" type="number" label="Testing Size (%)"    name="testingSize"    value={form.testingSize}    onChange={handleChange} fullWidth />

              <TextField
                size="small" label="Comments" name="commentss"
                value={form.commentss} onChange={handleChange}
                fullWidth multiline rows={1}
                sx={{ gridColumn: { md: "span 3" } }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Dataset format hint */}
        <Card sx={{ mb: 3, borderRadius: 2 }} elevation={0} variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <Typography fontWeight={600}>Dataset Format</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1.5}>
              Your ZIP file should contain the following structure:
            </Typography>
            <Box sx={{ bgcolor: "#f8f9fc", borderRadius: 1.5, p: 2, fontFamily: "monospace", fontSize: 13 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <span style={{ fontSize: 16 }}>🗜️</span>
                <span style={{ fontWeight: 600 }}>dataset.zip</span>
              </Box>
              <Box sx={{ pl: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
                  <span>📁</span>
                  <span><b>images/</b></span>
                  <span style={{ color: "#94a3b8" }}>← Drone images (jpg, png)</span>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>📁</span>
                  <span><b>labels/</b></span>
                  <span style={{ color: "#94a3b8" }}>← YOLO annotations (.txt)</span>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Alerts */}
        {msg && <Alert severity="success" onClose={() => setMsg(null)} sx={{ mb: 2 }}>{msg}</Alert>}
        {err && <Alert severity="error"   onClose={() => setErr(null)} sx={{ mb: 2 }}>{err}</Alert>}

        {/* Submit */}
        <Button
          variant="contained" size="large" onClick={doUpload}
          disabled={isSaving}
          startIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16V4m0 0L8 8m4-4l4 4"/><path d="M20 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"/>
            </svg>
          }
          sx={{ px: 4 }}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>

      </Box>
    </AdminLayout>
  );
}

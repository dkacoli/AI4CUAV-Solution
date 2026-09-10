import {
  Grid, Typography, FormControl, Select, MenuItem,
  FormControlLabel, Checkbox, TextField, Box, Chip
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const lightMenuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#fff", color: "#111",
      border: "1px solid rgba(0,0,0,0.10)",
      "& .MuiMenuItem-root": { color: "#111" },
      "& .MuiMenuItem-root.Mui-selected": { bgcolor: "rgba(31,111,235,0.12)" }
    }
  }
};

export function StepDetection({ formData, setFormData, handleChange, handleDetectionTypeChange }) {
  const [openTypes, setOpenTypes] = useState({
    MultiRotor: false, FixedWing: false, HybridVTOL: false
  });

  const DRONES = [
    { type: "MultiRotor", classes: ["Quadcopter", "Hexacopter", "Octocopter"] },
    { type: "FixedWing",  classes: ["Glider", "Trainer", "Jet"] },
    { type: "HybridVTOL", classes: ["Tail Sitter", "Tilt Rotor", "Tilt Wing"] }
  ];

  const toggleOpen = (type) =>
    setOpenTypes((prev) => ({ ...prev, [type]: !prev[type] }));

  const toggleClass = (type, cls) => {
    setFormData((prev) => {
      const current = prev.droneClasses[type];
      const updated = current.includes(cls)
        ? current.filter((c) => c !== cls)
        : [...current, cls];
      const updatedClasses = { ...prev.droneClasses, [type]: updated };
      const updatedTypes = Object.entries(updatedClasses)
        .filter(([, v]) => v.length > 0)
        .map(([k]) => k);
      return { ...prev, droneClasses: updatedClasses, droneTypes: updatedTypes };
    });
  };

  return (
    <Grid container spacing={3} direction="column">

      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 500, color: "#111", mb: 1 }}>Detection types</Typography>
        <FormControl component="fieldset" sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {["Thermal", "Infrared", "Visual", "Radar"].map((type) => (
            <FormControlLabel key={type} sx={{ mr: 2 }}
              control={<Checkbox checked={formData.detectionTypes.includes(type)} onChange={handleDetectionTypeChange} value={type} />}
              label={type}
            />
          ))}
        </FormControl>
      </Grid>

      {/* Data fusion */}
      {formData.detectionTypes.length > 1 && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500, color: "#111", mb: 1 }}>Data fusion method</Typography>
          <FormControl fullWidth>
            <Select name="dataFusionMethod" value={formData.dataFusionMethod} onChange={handleChange} displayEmpty MenuProps={lightMenuProps}>
              <MenuItem value=""><em>Select fusion method</em></MenuItem>
              <MenuItem value="Automatic (System chooses the best method)">Automatic</MenuItem>
              <MenuItem value="Early Fusion">Early Fusion</MenuItem>
              <MenuItem value="Late Fusion">Late Fusion</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {/* Drone accordion */}
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 500, color: "#111", mb: 1 }}>Drone type &amp; classes</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {DRONES.map(({ type, classes }) => {
            const selectedClasses = formData.droneClasses[type];
            const hasSelection = selectedClasses.length > 0;
            const isOpen = openTypes[type];
            return (
              <Box key={type} sx={{ border: "0.5px solid", borderColor: "rgba(0,0,0,0.15)", borderRadius: 2, overflow: "hidden" }}>
                {/* Header */}
                <Box
                  onClick={() => toggleOpen(type)}
                  sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    px: 2, py: 1.5, cursor: "pointer",
                    bgcolor: hasSelection ? "#E6F1FB" : "#fff",
                    "&:hover": { bgcolor: hasSelection ? "#daeef9" : "rgba(0,0,0,0.03)" }
                  }}
                >
                  <Typography sx={{ flex: 1, fontWeight: 500, fontSize: 14, color: hasSelection ? "#185FA5" : "#111" }}>
                    {type}
                  </Typography>
                  {hasSelection && (
                    <Box sx={{ fontSize: 12, color: "#185FA5", border: "0.5px solid #378ADD", borderRadius: "99px", px: 1, py: 0.2 }}>
                      {selectedClasses.length} selected
                    </Box>
                  )}
                  <ExpandMoreIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </Box>

                {/* Class pills */}
                {isOpen && (
                  <Box sx={{ px: 2, py: 1.5, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
                    {classes.map((cls) => {
                      const isSelected = selectedClasses.includes(cls);
                      return (
                        <Box
                          key={cls}
                          onClick={() => toggleClass(type, cls)}
                          sx={{
                            border: isSelected ? "none" : "0.5px solid rgba(0,0,0,0.18)",
                            borderRadius: "99px", px: 1.5, py: 0.7,
                            textAlign: "center", cursor: "pointer", fontSize: 13,
                            bgcolor: isSelected ? "#378ADD" : "#fff",
                            color: isSelected ? "#fff" : "#111",
                            fontWeight: isSelected ? 500 : 400,
                            "&:hover": { bgcolor: isSelected ? "#185FA5" : "#f0f7ff" }
                          }}
                        >
                          {cls}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Grid>

      {/* Selected tags */}
      {formData.droneTypes.length > 0 && (
        <Grid item xs={12}>
          <Box sx={{ border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 2, p: 1.5, bgcolor: "rgba(0,0,0,0.02)", display: "flex", flexWrap: "wrap", gap: 0.8 }}>
            {DRONES.flatMap(({ type }) =>
              formData.droneClasses[type].map((cls) => (
                <Chip
                  key={`${type}-${cls}`}
                  label={`${type} · ${cls}`}
                  onDelete={() => toggleClass(type, cls)}
                  size="small"
                  sx={{ bgcolor: "#fff", border: "0.5px solid rgba(0,0,0,0.15)" }}
                />
              ))
            )}
          </Box>
        </Grid>
      )}

    </Grid>
  );
}
export function StepRecognition({ formData, handleChange }) {
  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 800, color: "#111", mb: 1 }}>Recognition Level</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <Select name="recognitionType" value={formData.recognitionType} onChange={handleChange} displayEmpty MenuProps={lightMenuProps}>
                <MenuItem value=""><em>Select Recognition</em></MenuItem>
                <MenuItem value="Basic Recognition">Basic Recognition</MenuItem>
                <MenuItem value="Advanced Recognition">Advanced Recognition</MenuItem>
                <MenuItem value="AI Enhanced Recognition">AI Enhanced Recognition</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={<Checkbox checked={formData.requiresTracking} onChange={handleChange} name="requiresTracking" />}
              label="Enable Tracking"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField fullWidth name="customModelNeed" label="Custom Model Aim" value={formData.customModelNeed} onChange={handleChange} placeholder="Explain briefly why you need this model..." />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth name="enviroment" label="Operating Environment" value={formData.enviroment} onChange={handleChange} placeholder="Where will this model operate?" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth name="specifications" label="Specific Requirements" value={formData.specifications} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} displayEmpty MenuProps={lightMenuProps}>
            <MenuItem value=""><em>Select Urgency Level</em></MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export function StepDataset({ formData, handleChange, setDatasetProofFile }) {
  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={formData.provideOwnDataset} onChange={handleChange} name="provideOwnDataset" />}
          label="Provide Own Dataset"
        />
      </Grid>

      {formData.provideOwnDataset && (
        <>
          <Grid item xs={12}>
            <TextField fullWidth name="datasetURL" label="Dataset URL" value={formData.datasetURL} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select name="dataset" value={formData.dataset} onChange={handleChange} displayEmpty MenuProps={lightMenuProps}>
                <MenuItem value="">Select Dataset Type</MenuItem>
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
         <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1, bgcolor: "rgba(55,138,221,0.07)", borderRadius: 1.5, border: "0.5px solid rgba(55,138,221,0.25)" }}>
              <Typography sx={{ fontSize: 13, color: "#185FA5", fontWeight: 500 }}>
                Image Based
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.hasAnnotationType} onChange={handleChange} name="hasAnnotationType" />}
              label="Has Annotation Type"
            />
          </Grid>
         {formData.hasAnnotationType && (
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1, bgcolor: "rgba(55,138,221,0.07)", borderRadius: 1.5, border: "0.5px solid rgba(55,138,221,0.25)" }}>
              <Typography sx={{ fontSize: 13, color: "#185FA5", fontWeight: 500 }}>
                YOLO
              </Typography>
            </Box>
          </Grid>
        )}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.isDatasetVerified} onChange={handleChange} name="isDatasetVerified" />}
              label="Dataset is verified"
            />
          </Grid>
          {formData.isDatasetVerified && (
            <Grid item xs={12}>
              <Box sx={{ border: "1px dashed rgba(0,0,0,0.25)", borderRadius: 2, p: 2, bgcolor: "rgba(0,0,0,0.03)" }}>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setDatasetProofFile(e.target.files?.[0] ?? null)}
                />
                <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.75)" }}>
                  Upload proof (PDF/PNG/JPEG)
                </Typography>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}

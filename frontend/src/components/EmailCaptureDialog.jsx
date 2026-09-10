import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Alert
} from "@mui/material";
import { sendNda } from "../services/ndaService";
import { validateEmail } from "../helpers/formatters";

export default function EmailCaptureDialog({
  open,
  onClose,
  orderId,
  defaultName = ""        // async (email, name) => void
}) {
  const [email, setEmail] = useState("");
  const [name, setName]   = useState(defaultName);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setError("");
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!orderId) { setError("Missing order id. Please try again."); return; }

    try {
      setSending(true);
      await sendNda({ orderId, email, partyName: name || undefined });
      onClose({ sent: true, email, name });
    } catch (e) {
      setError(e?.message || "Failed to send NDA. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>Where should we send your NDA?</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Email"
            type="email"
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <TextField
            label="Your name (optional)"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Jane Customer"
          />
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose()} disabled={sending}>Cancel</Button>
        <Button onClick={handleSend} variant="contained" disabled={sending}>
          {sending ? "Sending…" : "Send NDA"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

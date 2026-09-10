import { Box } from "@mui/material";
import TopNavigation from "../components/layout/TopNavigation";
import HeroSection from "../components/home/HeroSection";
import { COLORS } from "../constants/colors";

export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: COLORS.DARK_BG, color: COLORS.WHITE }}>
      <TopNavigation />
      <HeroSection />
    </Box>
  );
}

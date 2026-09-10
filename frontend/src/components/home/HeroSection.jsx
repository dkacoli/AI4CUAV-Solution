import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { COLORS } from "../../constants/colors";
import droneImg from "../../assets/drone.jpg";
import rome from "../../assets/rome.jpg";
import moldova from "../../assets/moldova.png";
import confdefense from "../../assets/defenseconf.jpeg";

const PAGE_GRADIENT =
  "linear-gradient(135deg, #061423 0%, #081b31 35%, #0a2542 70%, #0b2b4f 100%)";

const SECTION_SURFACE =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)";

export default function HeroSection() {
  const features = [
    {
      title: "Detection and Classification",
      desc: "Multi-sensor pipelines for reliable drone detection and classification (EO/IR, RF, radar).",
      to: ROUTES.PRE_TRAINED_MODELS,
      tag: "Models",
    },
    {
      title: "Shared Dataset and Benchmarking",
      desc: "Curated data to train and evaluate detection, identification, and tracking workflows.",
      to: ROUTES.DATASET_UPLOAD,
      tag: "Datasets",
    },
    {
      title: "Threat Evaluation and Behavior",
      desc: "Tracking, behavior recognition, and decision support signals for mission success.",
      to: ROUTES.ADMIN_DASHBOARD,
      tag: "Dashboard",
    },
  ];

 const news = [
  {
    date: "Nov 12, 2025",
    title: "Trial & Partner Visit in Rome",
    desc: "Field experiments and partner collaboration highlights.",
    href: "https://ai4cuav.org/index.php/2025/11/12/trial-partner-visit-in-rome-ai4cuav-field-experiments-at-link-campus-university/",
    img: rome,
  },
  {
    date: "Sep 24, 2025",
    title: "Successful UAV Behavior Recognition Trial in Moldova",
    desc: "Demonstration of behavior recognition under operational conditions.",
    href: "https://ai4cuav.org/index.php/2025/09/24/successful-uav-behavior-recognition-trial-conducted-in-moldova/",
    img: moldova,
  },
  {
    date: "Jun 24, 2025",
    title: "AI4CUAV showcased at a Defense Conference",
    desc: "Project presence and technical discussions with stakeholders.",
    href: "https://ai4cuav.org/index.php/2025/06/24/ai4cuav-showcased-at-the-defence-conference/",
    img: confdefense,
  },
];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        background: PAGE_GRADIENT,
      }}
    >
      {/* Spacer for fixed navbar */}
      <Box sx={{ height: { xs: 64, md: 72 } }} />

      {/* HERO */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {/* Optional background media (video or image) */}
       <Box
  component="img"
  src={droneImg}
  alt="Drone"
  sx={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.35,
    filter: "contrast(1.05) saturate(1.05)",
  }}
/>
        {/* Blue overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(3,10,24,0.86) 0%, rgba(6,20,35,0.55) 55%, rgba(10,37,66,0.35) 100%)",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: "92vh",
            display: "flex",
            alignItems: "center",
            py: { xs: 8, md: 12 },
          }}
        >
          <Fade in timeout={900}>
            <Box sx={{ maxWidth: 860 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "2.3rem", sm: "3rem", md: "4.4rem" },
                  lineHeight: { xs: 1.12, md: 1.03 },
                  mb: 2,
                }}
              >
                Elevate CUAV Missions with AI
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.35rem" },
                  lineHeight: 1.65,
                  mb: 4,
                  maxWidth: 720,
                }}
              >
                AI framework for detection, classification, tracking and behavior recognition using
                EO/IR, RF and radar data.
              </Typography>

              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <Button
                  component={RouterLink}
                  to={ROUTES.PRE_TRAINED_MODELS}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3.6,
                    py: 1.35,
                    borderRadius: 999,
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: "#1f6feb",
                    "&:hover": { bgcolor: "#1a5fd1" },
                  }}
                >
                  Explore Models
                </Button>

                <Button
                  component={RouterLink}
                  to={ROUTES.ADMIN_DASHBOARD}
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 3.6,
                    py: 1.35,
                    borderRadius: 999,
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.40)",
                    bgcolor: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.75)",
                      bgcolor: "rgba(255,255,255,0.10)",
                    },
                  }}
                >
                  Project Overview
                </Button>
              </Stack>

              {/* Feature tiles */}
              <Box
                sx={{
                  mt: { xs: 6, md: 8 },
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 2,
                }}
              >
                {features.map((f) => (
                  <Card
                    key={f.title}
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: SECTION_SURFACE,
                      backdropFilter: "blur(10px)",
                      color: "#fff",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.22)",
                        transform: "translateY(-2px)",
                      },
                      transition: "transform 180ms ease, border-color 180ms ease",
                    }}
                  >
                    <CardActionArea
                      component={RouterLink}
                      to={f.to}
                      sx={{
                        height: "100%",
                        p: 0,
                        "&:hover .hoverLine": { opacity: 1, transform: "scaleX(1)" },
                      }}
                    >
                      <CardContent sx={{ p: 2.4 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.2 }}>
                          <Chip
                            label={f.tag}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.10)",
                              color: "rgba(255,255,255,0.90)",
                              border: "1px solid rgba(255,255,255,0.14)",
                            }}
                          />
                        </Stack>

                        <Typography sx={{ fontWeight: 750, fontSize: "1.05rem", mb: 0.8 }}>
                          {f.title}
                        </Typography>

                        <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.98rem" }}>
                          {f.desc}
                        </Typography>

                        <Box sx={{ mt: 1.6, display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                            Learn more
                          </Typography>
                          <Box
                            className="hoverLine"
                            sx={{
                              height: 2,
                              width: 46,
                              borderRadius: 2,
                              bgcolor: "#fff",
                              opacity: 0,
                              transform: "scaleX(0.7)",
                              transformOrigin: "left",
                              transition: "opacity 180ms ease, transform 180ms ease",
                            }}
                          />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Bottom fade */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 140,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(6,20,35,0.75) 100%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* OVERVIEW */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "2.2rem" },
                  letterSpacing: "-0.02em",
                  mb: 2,
                }}
              >
                Built for counter-UAS workflows
              </Typography>

              <Typography sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.85, mb: 2 }}>
                End-to-end workflows from dataset ingestion and training to inference and reporting.
                The focus is deployment readiness: robust detection signals, classification, tracking,
                and behavior recognition across sensor modalities.
              </Typography>

              <Stack direction="row" spacing={1.1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
                {["EO/IR", "RF", "Radar", "Tracking", "Behavior", "Benchmarking"].map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  />
                ))}
              </Stack>

              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <Button
                  component={RouterLink}
                  to={ROUTES.DATASET_UPLOAD}
                  variant="outlined"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.35)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.65)" },
                  }}
                >
                  Upload Dataset
                </Button>

                <Button
                  component={RouterLink}
                  to={ROUTES.ORDER_CREATE}
                  variant="contained"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    bgcolor: COLORS?.PRIMARY || "#1f6feb",
                    color: "#fff",
                    "&:hover": { opacity: 0.92 },
                  }}
                >
                  Create Order
                </Button>
              </Stack>
            </Box>

            {/* Right visual placeholder */}
            <Box
              sx={{
                borderRadius: 5,
                border: "1px solid rgba(255,255,255,0.12)",
                background: SECTION_SURFACE,
                backdropFilter: "blur(10px)",
                minHeight: { xs: 220, md: 360 },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(700px 320px at 30% 20%, rgba(31,111,235,0.22), rgba(0,0,0,0) 60%)",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* NEWS */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "2.2rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                Latest News and Events
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)", mt: 1 }}>
                Updates from trials, partner visits, and project milestones.
              </Typography>
            </Box>

            <Button
              component="a"
              href="https://ai4cuav.org/"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.35)",
                "&:hover": { borderColor: "rgba(255,255,255,0.65)" },
              }}
            >
              View all
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {news.map((n) => (
              <Card
                key={n.title}
                elevation={0}
                sx={{
                  borderRadius: 5,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: SECTION_SURFACE,
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  overflow: "hidden",
                }}
              >
                <CardActionArea component="a" href={n.href} target="_blank" rel="noreferrer">
               <Box
  sx={{
    height: 160,
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${n.img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    bgcolor: "rgba(255,255,255,0.05)",
  }}
>
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
    }}
  />

  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(600px 250px at 30% 30%, rgba(31,111,235,0.22), rgba(0,0,0,0) 65%)",
    }}
  />

  <Box sx={{ position: "absolute", left: 16, bottom: 16 }}>
    <Chip
      label={n.date}
      size="small"
      sx={{
        bgcolor: "rgba(0,0,0,0.35)",
        color: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
    />
  </Box>
</Box>

                  <CardContent sx={{ p: 2.4 }}>
                    <Typography sx={{ fontWeight: 800, mb: 0.8, lineHeight: 1.25 }}>
                      {n.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.74)", lineHeight: 1.75 }}>
                      {n.desc}
                    </Typography>
                    <Typography sx={{ mt: 1.4, fontWeight: 750, fontSize: "0.95rem" }}>
                      Read more
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* PARTNER STRIP */}
      <Box sx={{ py: { xs: 5, md: 6 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 5,
              px: { xs: 2, md: 3 },
              py: { xs: 2.2, md: 2.6 },
              background: SECTION_SURFACE,
              backdropFilter: "blur(10px)",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 0.4 }}>
                Supported by NATO SPS Programme
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                Science for Peace and Security (SPS)
              </Typography>
            </Box>

            <Button
              component="a"
              href="https://ai4cuav.org/"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.35)",
                "&:hover": { borderColor: "rgba(255,255,255,0.65)" },
              }}
            >
              Learn more
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ py: 5 }}>
        <Container maxWidth="lg">
          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 3 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
              © {new Date().getFullYear()} AI4CUAV
            </Typography>

            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Link
                component="a"
                href="https://ai4cuav.org/"
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                Project site
              </Link>
              <Link
                component="a"
                href="mailto:info@ai4cuav.org"
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                info@ai4cuav.org
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

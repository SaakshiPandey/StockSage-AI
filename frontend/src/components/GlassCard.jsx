import { Box } from "@mui/material";

const GlassCard = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        backdropFilter: "blur(16px)",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        padding: 4,
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;

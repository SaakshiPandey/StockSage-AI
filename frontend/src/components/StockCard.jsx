import {
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const StockCard = ({ symbol, price, change, chartData }) => {
  const isChangeNumber = typeof change === "number";
  const positive = isChangeNumber && change >= 0;

  return (
    <Card
      sx={{
        minWidth: 280,
        maxWidth: 300,
        height: 260,
        m: 2,
        background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        color: "white",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {symbol || "N/A"}
        </Typography>

        <Typography variant="body1">
          Price: {typeof price === "number" ? `$${price.toFixed(2)}` : "N/A"}
        </Typography>

        <Typography
          variant="body2"
          color={positive ? "#4caf50" : "#e53935"}
          sx={{ mb: 2 }}
        >
          Change: {isChangeNumber ? `${positive ? "+" : ""}${change.toFixed(2)}%` : "N/A"}
        </Typography>

        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={positive ? "#4caf50" : "#ef4444"}
                strokeWidth={2.8}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="gray">
            No chart data available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StockCard;

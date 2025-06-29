import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import axios from "axios";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://your-deployed-api-url.com"; // Replace with your actual deployment

const NewsSection = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        if (response.data?.news) {
          setNewsList(response.data.news);
        } else {
          throw new Error("No news data found");
        }
      } catch (err) {
        console.error("News fetch error:", err);
        setError("News service is currently unavailable.");
        setNewsList([
          {
            title: "Market Update",
            description:
              "News service is currently unavailable. Please try again later.",
            image: "https://via.placeholder.com/300x160?text=News+Image",
            url: "#",
            source: "System"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const scroll = (dir) => {
    const scrollAmount = scrollRef.current?.offsetWidth * 0.8 || 340;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 2, sm: 4 },
        py: 4,
        maxWidth: "100%",
        overflow: "hidden"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          mb: 4,
          textAlign: "center"
        }}
      >
        
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          zIndex: 1,
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.selected"
          },
          display: { xs: "none", sm: "flex" }
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          px: 1,
          py: 2,
          scrollSnapType: "x mandatory"
        }}
      >
        {newsList.map((news, i) => (
          <Card
            key={i}
            sx={{
              minWidth: 300,
              scrollSnapAlign: "start",
              flexShrink: 0,
              backgroundColor: "background.paper"
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={news.image}
              alt={news.title}
              sx={{
                objectFit: "cover"
              }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {news.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {news.description?.slice(0, 100)}
                {news.description?.length > 100 ? "..." : ""}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Source: {news.source}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          zIndex: 1,
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.selected"
          },
          display: { xs: "none", sm: "flex" }
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default NewsSection;

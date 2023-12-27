import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import NewsSection from "./NewsSection";
import axios from "axios"; // Import axios
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const News = () => {
  const [topHeadlines, setTopHeadlines] = useState([]);

  // Fetch top headlines on component mount
  useEffect(() => {
    const fetchTopHeadlines = async () => {
      const apiKey = "ae71668dd4724e42aff4a0ffc9752b3f";
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=${apiKey}`
        );
        setTopHeadlines(response.data.articles);
      } catch (error) {
        console.error("Error fetching top headlines:", error);
      }
    };

    fetchTopHeadlines();
  }, []); // Empty dependency array to ensure it runs only once on component mount

  return (
    <div>
      <Carousel autoplay>
        {topHeadlines.map((article, index) => (
          <div key={index} style={{ height: "300px", position: "relative" }}>
            <img
              src={article.urlToImage || "../components/assets/newsimg.jpg"}
              //   alt={article.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                position: "relative",
              }}
            />
            <div
              style={{
                marginTop: -190,
                position: "absolute",
                width: "inherit",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))", // Adjust the alpha value here
                backgroundBlendMode: "overlay",
              }}
            >
              {/* Headline */}
              <h3
                style={{
                  textAlign: "inherit",
                  marginBottom: 10,
                  fontSize: 45,
                  fontWeight: 900,
                  color: "white",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                {article.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  textAlign: "inherit",
                  marginBottom: 20,
                  color: "white",
                }}
              >
                {article.description}
              </p>

              {/* Read More Button */}
              <Button
                type="primary"
                onClick={() => window.open(article.url, "_blank")}
                style={{
                  marginLeft: 600,
                  marginBottom: 35,
                }}
              >
                Read More
              </Button>
            </div>
          </div>
        ))}
      </Carousel>

      <NewsSection
        category="top-headlines"
        query="country=in"
        topHeading="Top News"
        linkText="See More Headlines"
        results="15"
      />
      <NewsSection
        category="everything"
        query="q=trending india"
        topHeading="Trending in India"
        linkText="More Indian Trends"
        results="12"
      />
      <NewsSection
        category="everything"
        query="q=trending tech"
        topHeading="Tech Trends"
        linkText="More about Tech"
        results="12"
      />
    </div>
  );
};

export default News;

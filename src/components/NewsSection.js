import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Divider, Card, Pagination, Input } from "antd";
import { fetchNews } from "../api";
import ReactHtmlParser from "react-html-parser";

const { Meta } = Card;

const NewsSection = (request) => {
  const [newsSection, setNewsSection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of articles per page

  useEffect(() => {
    const fetchAPI = async () => {
      const articles = await fetchNews(request);
      setNewsSection(articles);
    };
    fetchAPI();
  }, [request]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    const newArticles = await fetchNews({
      ...request,
      page: page, // Add a page parameter to the request
    });
    setNewsSection(newArticles);
  };

  //   const paginatedNews = newsSection.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );

  return (
    <div>
      <Row>
        <Col>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 900,
              marginTop: 20,
              fontFamily: "serif",
            }}
          >
            {request.topHeading}
          </h1>
        </Col>
      </Row>
      <Row>
        {newsSection.length > 1
          ? newsSection.map((article, key) =>
              article.urlToImage === "" ||
              article.urlToImage === null ? null : (
                <Col key={key} md={{ span: 8 }} sm={{ span: 24 }}>
                  <Card
                    onClick={() => window.open(article.url, "_blank")}
                    type="inner"
                    hoverable="true"
                    style={{ width: 380, marginBottom: 20, height: 480 }}
                    cover={
                      article.urlToImage === "" ||
                      article.urlToImage === null ? null : (
                        <img
                          alt={article.title}
                          src={
                            article.urlToImage
                              ? article.urlToImage
                              : "../components/assests/newsimg.jpg"
                          }
                        />
                      )
                    }
                    title={
                      article.source.name === "" || article.source.name === null
                        ? null
                        : "Source: " + ReactHtmlParser(article.source.name)
                    }
                    extra={
                      article.author === "" || article.author === null
                        ? null
                        : "Author: " + ReactHtmlParser(article.author)
                    }
                  >
                    <h3>{ReactHtmlParser(article.title)}</h3>
                    <Meta description={ReactHtmlParser(article.description)} />
                  </Card>
                </Col>
              )
            )
          : "Loading.."}
      </Row>
      <Row>
        <Col span={24}>
          <Pagination
            current={currentPage}
            total={newsSection.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </Col>
      </Row>

      {request.linkText != null ? (
        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default NewsSection;

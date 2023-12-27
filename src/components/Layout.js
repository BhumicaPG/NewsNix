import React, { Suspense } from "react";
import "antd/dist/antd.css";
import "./Layout.css";
import NewsletterSignup from "./NewsletterSignup";
import { Col, Layout, Menu, Row, Input, Divider } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  StockOutlined,
  InfoCircleOutlined,
  MailOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  mailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { fetchSources } from "../api";

const NewsSection = React.lazy(() => import("./NewsSection"));
const News = React.lazy(() => import("./News"));

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input; // Import the Search component from Ant Design

class MainLayout extends React.Component {
  state = {
    collapsed: true,
    sources: [],
    homePage: true,
    query: "",
  };

  handleSearch = (value) => {
    // Load news based on search query
    this.loadNews(value);
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async componentDidMount() {
    const sources = await fetchSources();

    this.setState({ sources });
  }

  loadNews(query) {
    this.setState({
      homePage: false,
      query: query,
    });
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={!this.state.collapsed}>
          <div className="logo">
            <h2
              style={{
                fontFamily: "Times New Roman",
                fontWeight: 600,
              }}
            >
              <a href="/">{!this.state.collapsed ? "N" : "NewsNIX"}</a>
            </h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["-1"]}>
            <Menu.Item
              onClick={() => this.setState({ homePage: true })}
              key="-1"
              icon={<StockOutlined />}
            >
              Top News
            </Menu.Item>
            <Menu.Item key="about" icon={<InfoCircleOutlined />}>
              About Us
            </Menu.Item>
            {/* Add Contact */}
            <Menu.Item key="contact" icon={<MailOutlined />}>
              Contact
            </Menu.Item>
            {/* Add Category */}
            <Menu.SubMenu
              key="category"
              icon={<AppstoreOutlined />}
              title="Category"
            >
              <Menu.Item onClick={() => this.loadNews("Technology")} key="tech">
                Technology
              </Menu.Item>
              <Menu.Item onClick={() => this.loadNews("Sports")} key="sports">
                Sports
              </Menu.Item>
              <Menu.Item
                onClick={() => this.loadNews("Business")}
                key="Business"
              >
                Business
              </Menu.Item>
              <Menu.Item
                onClick={() => this.loadNews("Entertainment")}
                key="Entertainment"
              >
                Entertainment
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sources"
              icon={<AppstoreAddOutlined />}
              title="Sources"
            >
              {Array.isArray(this.state.sources) &&
                this.state.sources.map((source) => (
                  <Menu.Item
                    onClick={() => this.loadNews(source.name)}
                    key={source.name}
                  >
                    {source.name}
                  </Menu.Item>
                ))}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                {React.createElement(
                  !this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </Col>

              <Col>
                {/* Search bar */}
                <Search
                  placeholder="Search for news..."
                  onSearch={this.handleSearch}
                  style={{
                    width: "100%", // Set width to 100% to make it responsive
                    maxWidth: "200px", // Set a maximum width if needed
                    marginRight: "60px",
                    marginBottom: "16px", // Add bottom margin for spacing
                    borderRadius: "10px", // Add border-radius for rounded corners
                    border: "1px solid #d9d9d9", // Add border color
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)", // Add box shadow
                  }}
                />
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              paddingRight: 50,
              minHeight: 280,
            }}
          >
            <Suspense
              fallback={<h1 style={{ fontSize: "30px" }}>Loading...</h1>}
            >
              {this.state.homePage === true ? (
                <News />
              ) : (
                <NewsSection
                  category="everything"
                  query={"q=" + this.state.query}
                  topHeading={this.state.query}
                  results="100"
                />
              )}
            </Suspense>
          </Content>

          <Footer
            style={{
              textAlign: "center",
              background: "#001529",
              padding: "20px",
              paddingLeft: 50,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                {/* Logo and About Us section */}
                <div>
                  <h2
                    style={{
                      color: "white",
                      fontFamily: "Times New Roman",
                      fontWeight: 600,
                      fontSize: 40,
                      textAlign: "left",
                    }}
                  >
                    <a href="./"> NewsNIX</a>
                  </h2>
                  <p
                    style={{
                      color: "#fff",
                      textAlign: "left",
                      marginTop: -10,
                      marginLeft: 5,
                    }}
                  >
                    Your reliable source for the latest news.
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                {/* Contact Us section */}
                <div>
                  <h3
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 30,
                      textAlign: "left",
                      marginTop: 5,
                    }}
                  >
                    Contact Us
                  </h3>
                  <p
                    style={{ color: "#fff", textAlign: "left", marginTop: -10 }}
                  >
                    <MailOutlined></MailOutlined> Email: contact@newsnix.com
                    <br />
                    <PhoneOutlined></PhoneOutlined> Phone: +1 (123) 456-7890
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                {/* Category section */}
                <div>
                  <h3
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 30,
                      textAlign: "left",
                      marginTop: 5,
                    }}
                  >
                    Categories
                  </h3>
                  <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={["-1"]}
                    style={{
                      fontSize: 15,
                      textAlign: "left",
                      marginBottom: -10,
                    }}
                  >
                    {/* Add your categories here */}
                    <Menu.Item
                      onClick={() => this.loadNews("Technology")}
                      key="tech"
                    >
                      Technology
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => this.loadNews("Sports")}
                      key="sports"
                    >
                      Sports
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => this.loadNews("Business")}
                      key="Business"
                    >
                      Business
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => this.loadNews("Entertainment")}
                      key="Entertainment"
                    >
                      Entertainment
                    </Menu.Item>
                  </Menu>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                {/* Newsletter section */}
                <NewsletterSignup />
              </Col>
            </Row>

            {/* Social media icons */}
            <Divider style={{ background: "#fff" }} />
            <div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                />
              </a>
            </div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;

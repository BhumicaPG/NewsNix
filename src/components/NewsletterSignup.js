import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, e.g., send the email to the server
    console.log(`Subscribed with email: ${email}`);
    // Reset the email field
    setEmail("");
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <div style={{ marginRight: "20px" }}>
        <h3 style={{ color: "#001529", marginBottom: "16px" }}>
          Subscribe to Newsletter
        </h3>
        <p style={{ marginBottom: "16px" }}>
          Stay updated with the latest news and updates!
        </p>
      </div>
      <div
        style={{ background: "#f0f6ff", padding: "20px", borderRadius: "8px" }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address",
              },
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input value={email} onChange={handleEmailChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewsletterSignup;

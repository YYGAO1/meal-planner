import React from "react";

const AboutUs = () => {
  return (
    <div
      className="container bg-primary"
      style={{
        paddingTop: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-around",
      }}
    >
      <div style={{ width: "85%", margin: "auto" }}>
        <h1 className="text-secondary">About Us</h1>
        <img
          src="./static/spatula-spoon.png"
          style={{ maxWidth: "10%", margin: "auto" }}
        />
        <p className="text-danger" style={{ marginTop: "15px" }}>
          Welcome to EatEasy, your ultimate solution for effortless meal
          organization and planning. Developed in 2023-2024 by a dedicated team
          of skilled professionals, EatEasy is the brainchild of passionate
          developers committed to simplifying your culinary journey.
        </p>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Co-developed Excellence</h2>
          <p>
            At EatEasy, we pride ourselves on collaboration and innovation.
            Co-developed by a dynamic duo of visionary developers, our app
            seamlessly integrates cutting-edge technology with user-centric
            design. With a keen focus on functionality and user experience,
            we've crafted a fully functional recipe and meal planner app
            tailored to meet your culinary needs.
          </p>
        </div>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Comprehensive Features</h2>
          <p>
            Our app goes beyond mere recipe collection. With full-stack
            functionality, EatEasy empowers users to effortlessly search for
            recipes, curate personalized meal plans, and generate customized
            shopping lists with just a few clicks. Say goodbye to culinary chaos
            and hello to streamlined meal management with EatEasy.
          </p>
        </div>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Technological Expertise</h2>
          <p>
            Driven by a passion for excellence, our team harnesses the power of
            top-tier technologies to deliver unparalleled performance and
            reliability. Leveraging Javascript, React, Redux, Node, Express,
            PostgreSQL, Bootstrap, and the Spoonacular API, we've created a
            robust platform designed to exceed your expectations.
          </p>
        </div>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Join the Culinary Revolution</h2>
          <p>
            Whether you're a seasoned chef or a novice cook, EatEasy is your
            trusted companion on the journey to culinary mastery. Join us today
            and experience the convenience, efficiency, and joy of effortless
            meal planning.
          </p>
        </div>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you! Reach out to
            co-developers{" "}
            <a href="https://www.linkedin.com/in/angel-yanyun-software-engineer/">
              Angel
            </a>{" "}
            and{" "}
            <a href="https://www.linkedin.com/in/sarah-goewey-software-engineer/">
              Sarah
            </a>{" "}
            and let us know how we can further enhance your meal planning
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

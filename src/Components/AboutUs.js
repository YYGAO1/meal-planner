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
      <div style={{ width: "65%", margin: "auto" }}>
        <h1 className="text-secondary">About Us</h1>
        <img
          src="./static/spatula.png"
          style={{ maxWidth: "35%", margin: "auto" }}
        />
        <p className="text-danger">
          Welcome to Meal Planner, your ultimate solution for effortless meal
          organization and planning. Developed in 2023-2024 by a dedicated team
          of skilled professionals, Meal Planner is the brainchild of passionate
          developers committed to simplifying your culinary journey.
        </p>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Co-developed Excellence</h2>
          <p>
            At Meal Planner, we pride ourselves on collaboration and innovation.
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
            functionality, Meal Planner empowers users to effortlessly search
            for recipes, curate personalized meal plans, and generate customized
            shopping lists with just a few clicks. Say goodbye to culinary chaos
            and hello to streamlined meal management with Meal Planner.
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
          <h2 className="text-secondary">Dedicated Deployment</h2>
          <p>
            Powered by Render, Meal Planner offers seamless deployment and
            scalability, ensuring a smooth user experience at all times. Our
            commitment to excellence extends beyond development; we prioritize
            reliability and accessibility to provide you with a hassle-free meal
            planning experience.
          </p>
        </div>

        <div
          className="card bg-danger text-success"
          style={{ marginBottom: "15px" }}
        >
          <h2 className="text-secondary">Join the Culinary Revolution</h2>
          <p>
            Whether you're a seasoned chef or a novice cook, Meal Planner is
            your trusted companion on the journey to culinary mastery. Join us
            today and experience the convenience, efficiency, and joy of
            effortless meal planning.
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

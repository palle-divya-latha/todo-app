import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container style={{backgroundColor: "#efdfe9"}}>
      {/* <Row> */}
        <Col>
          <h2 style={{color: "#9c23bc"}}>About Us</h2>

          <p>Welcome to our to-do list app! We're excited to have you on board as part of our community.</p>

          <p>
            Our mission is to simplify your life by providing a user-friendly and efficient tool for managing your tasks
            and staying organized. Whether you're a student, professional, or anyone in between, our goal is to make your
            daily life more productive and enjoyable.
          </p>

          {/* <h3>Why Choose Our To-Do List App?</h3>

          <p>
            At our core, we believe in the power of simplicity and functionality. Our app is designed with a clean and
            intuitive interface, ensuring that you can focus on what matters most - your tasks. Here are some key
            features that set us apart:
          </p>

          <ul>
            <li>Easy task creation and management</li>
            <li>Intuitive user interface for a seamless experience</li>
            <li>Customizable settings to fit your unique workflow</li>
            <li>Collaboration features for team projects</li>
            <li>Cross-platform accessibility - use it on your desktop, tablet, or smartphone</li>
          </ul> */}
        </Col>

        {/* <Col>
          <h3>Meet the Team</h3>

          <p>
            Behind every great app is a dedicated team. We're a passionate group of developers, designers, and
            productivity enthusiasts committed to creating the best task management solution. Get to know the faces
            behind the code:
          </p>

          <ul>
            <li>John Doe - Founder and CEO</li>
            <li>Jane Smith - Lead Developer</li>
            <li>Chris Johnson - UX/UI Designer</li>
            <li>Emily Brown - Marketing and Communications</li>
          </ul>

          <p>
            We're constantly working to improve and enhance your experience with our app. Your feedback is invaluable,
            so feel free to reach out to us at <a href="mailto:info@example.com">info@example.com</a> with any
            suggestions or questions.
          </p>

        
        </Col> */}
        <p>Thank you for choosing our to-do list app to help you organize your life!</p>
      {/* </Row> */}
    </Container>
  );
};

export default AboutUs;

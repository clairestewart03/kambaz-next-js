import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            Full Stack software developer</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/3456/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/OOD.jpeg" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3456</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Object Oriented Design</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>
                    
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/2345/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/database.jpeg" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2345</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Database Design</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/4567/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/ai.jpeg" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4567</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Introduction to AI</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/5678/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/discrete.webp" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5678</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Discrete Mathematics</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/6789/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/systems.jpeg" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS6789</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Computer Systems</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                        <Link href="/Courses/7891/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/algo.jpeg" width="100%" height={160}/>
                        <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS7891</CardTitle>
                        <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        Algorithms</CardText>
                        <Button variant="primary">Go</Button>
                        </CardBody>
                        </Link>
                        </Card>
                    </Col>


                </Row>
            
            </div>
        </div>
    );
}

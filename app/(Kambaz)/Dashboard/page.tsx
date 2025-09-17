import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150}
                               alt="React JS logo"/>
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3456" className="wd-dashboard-course-link">
                        <Image src="/images/OOD.jpeg" width={200} height={150}
                               alt="OOD"/>
                        <div>
                            <h5> CS3456 Object Oriented Design </h5>
                            <p className="wd-dashboard-course-title">
                                Object Oriented Design</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/2345" className="wd-dashboard-course-link">
                        <Image src="/images/database.jpeg" width={200} height={150}
                               alt="database"/>
                        <div>
                            <h5> CS2345 Database Design </h5>
                            <p className="wd-dashboard-course-title">
                                Database Design</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/4567" className="wd-dashboard-course-link">
                        <Image src="/images/ai.jpeg" width={200} height={150}
                               alt="AI"/>
                        <div>
                            <h5> CS4567 Artificial Intelligence </h5>
                            <p className="wd-dashboard-course-title">
                                Artificial Intelligence</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5678" className="wd-dashboard-course-link">
                        <Image src="/images/discrete.webp" width={200} height={150}
                               alt="discrete math"/>
                        <div>
                            <h5> CS5678 Discrete Mathematics </h5>
                            <p className="wd-dashboard-course-title">
                                Discrete Math</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/6789" className="wd-dashboard-course-link">
                        <Image src="/images/systems.jpeg" width={200} height={150}
                               alt="systems"/>
                        <div>
                            <h5> CS6789 Computer Systems </h5>
                            <p className="wd-dashboard-course-title">
                                Computer Systems</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/7891" className="wd-dashboard-course-link">
                        <Image src="/images/algo.jpeg" width={200} height={150}
                               alt="algorithms"/>
                        <div>
                            <h5> CS7891 Algorithms </h5>
                            <p className="wd-dashboard-course-title">
                                Algorithms</p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

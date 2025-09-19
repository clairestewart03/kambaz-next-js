import CourseStatus from "@/app/(Kambaz)/Courses/[cid]/Home/Status";

export default function Modules() {
    return (
        <div>
            <button>Collapse All</button>
            <button>View Progress</button>
            <select id='wd-publish-all'>
                <option value='Publish All'>Publish All</option>
                <option value='Unpublish All'>Unpublish All</option>
            </select>
            <button>+ Module</button>
            <ul>
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the HTML</li>
                                <li className="wd-content-item">Learn how to create a website with HTMl</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">Learn how to style code with CSS</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

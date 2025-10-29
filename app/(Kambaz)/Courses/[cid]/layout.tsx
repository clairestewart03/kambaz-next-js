/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, use } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useState } from "react";
export default function CoursesLayout({ children }: { children: ReactNode })
    {
    const params = useParams();
    const cid = params.cid as string;
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);
    const [isNavVisible, setIsNavVisible] = useState(true);
    return (
    
        <div id="wd-courses">
            <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" 
            onClick={() => setIsNavVisible(!isNavVisible)}/>
            <Breadcrumb course={course} />
             </h2> <hr />
    
        <div className="d-flex">
            {isNavVisible && (
            <div className="d-none d-md-block">
            <CourseNavigation params={{ cid }} />
            </div>
            )}
            <div className="flex-fill">
            {children}
            </div></div>
    
        </div>

    );}

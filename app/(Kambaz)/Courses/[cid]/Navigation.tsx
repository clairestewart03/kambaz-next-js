"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroupItem } from "react-bootstrap";
export default function CourseNavigation({ params, }:
    { params: { cid: string }; }) {
    const pathname = usePathname();
    const links: string[] = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { cid } = params;
    return (
        <div id="wd-courses-navigation" className='wd-list-group fs-5 rounded-0'>
        {links.map((link: string) => (
            <ListGroupItem key={link} as={Link} href={`/Courses/${cid}/${link}`}
                className={`list-group-item text-danger border-0
                ${pathname.includes(link) ? "text-black bg-white" : "text-danger"}`}>
          <br />
          {link}
          
        </ListGroupItem>))}
        </div>

    );}



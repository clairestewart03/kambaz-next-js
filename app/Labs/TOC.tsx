/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Nav, NavLink, NavItem } from "react-bootstrap";
import Link from "next/link";
import { use } from "react";
import { usePathname } from "next/navigation";
export default function TOC() {
    const pathname = usePathname();
    return (
        <Nav variant="pills">
        <NavItem>
            <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>Labs</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>Lab 1</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>Lab 2</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/Labs/Lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>Lab 3</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/Labs/Lab4" as={Link} className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}>Lab 4</NavLink>
        </NavItem>
            <NavItem>
                <NavLink href="/Labs/Lab5" as={Link} className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}>Lab 5</NavLink>
            </NavItem>
        <NavItem>
            <NavLink href="/" as={Link}>Kambaz</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="https://github.com/clairestewart03/kambaz-next-js">Kambaz Next JS Github</NavLink>
        </NavItem>
            <NavItem>
                <NavLink href="https://github.com/clairestewart03/kambaz-node-server-app">Kambaz Node Server Github</NavLink>
            </NavItem>
    </Nav>
    );}

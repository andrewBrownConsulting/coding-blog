'use client';
import { useEffect } from "react"

export default function About() {
    useEffect(() => {
        document.title = "About Me"
    }, [])
    return (
        <><div className="container ">
            <p>
                About me
            </p>
        </div>
        </>
    )
}
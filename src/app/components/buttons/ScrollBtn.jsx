'use client'
import React from "react"

const ScrollBtn = () => {
    return (
        <>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-top scroll-to-target" data-target="html">
          <i className="fas fa-angle-up"></i>
        </button>
        </>
    )
}

export default ScrollBtn;
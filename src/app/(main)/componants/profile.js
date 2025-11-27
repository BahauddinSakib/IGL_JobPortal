'use client'
import React, { useState, useRef } from "react";
import Image from "next/image";

import { FiCamera } from "../assets/icons/vander"

export default function Profile(){
    let [file, setFile] = useState('/images/team/01.jpg');
    let [bannerFile, setBannerFile] = useState('/images/hero/bg5.jpg');
    const fileInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleBannerChange(e) {
        if (e.target.files && e.target.files[0]) {
            setBannerFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleBannerClick = () => {
        bannerInputRef.current?.click();
    }

    return(
        <div className="col-12">
            <div className="position-relative">
                <div className="candidate-cover">
                    <div className="profile-banner relative text-transparent">
                        <input 
                            id="pro-banner" 
                            type="file" 
                            ref={bannerInputRef}
                            onChange={handleBannerChange}
                            style={{display: 'none'}}
                            accept="image/*"
                        />
                        <div className="relative shrink-0">
                            <Image 
                                src={bannerFile} 
                                width={0} 
                                height={0} 
                                sizes="100vw" 
                                style={{width:'100%', height:'250px'}} 
                                className="rounded shadow" 
                                id="profile-banner" 
                                alt="Banner"
                            />
                            <label 
                                className="profile-image-label" 
                                htmlFor="pro-banner"
                                style={{cursor: 'pointer', position: 'absolute', bottom: '10px', right: '10px'}}
                            >
                                <span className="btn btn-icon btn-sm btn-pills btn-primary">
                                    <FiCamera className="icons"/>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="candidate-profile d-flex align-items-end mx-2" style={{marginTop: '-50px'}}>
                    <div className="position-relative">
                        <input 
                            id="pro-img"
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{display: 'none'}}
                            accept="image/*"
                        />
                        <div className="position-relative d-inline-block">
                            <Image 
                                src={file} 
                                width={110} 
                                height={110} 
                                className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm" 
                                id="profile-image" 
                                alt="Profile"
                            />
                            <label 
                                className="icons position-absolute bottom-0 end-0" 
                                htmlFor="pro-img"
                                style={{cursor: 'pointer'}}
                            >
                                <span className="btn btn-icon btn-sm btn-pills btn-primary">
                                    <FiCamera className="icons"/>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="ms-2">
                        <h5 className="mb-0">Mr. Calvin Carlo</h5>
                        <p className="text-muted mb-0">Web Designer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
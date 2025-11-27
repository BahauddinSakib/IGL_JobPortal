"use client";
import useAuthUser from "@/custom_hooks/useAuthUser";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const page = () => {

  const [products, setProducts] = useState([]);
  const { user, isAuthenticated, setUser } = useAuthUser();



  useEffect( ()=>{
    
      const fetchData = async ()=>{
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/product-list-by-status/2`);
            if(res.status === 200 || res.status === 201){
              setProducts(res.data);
            }
      }
      fetchData()
    }, [])


    const handleApproveBtn = async (id, status, fromReject) =>{
      const result = await Swal.fire({
            title: "Approve Product?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: fromReject? "Yes, Reject it!" : "Yes, Approve it!",
            cancelButtonText: "Cancel",
            backdrop: `
            rgba(0,0,0,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
            allowOutsideClick: false,
          });

          if(!result.isConfirmed) return;

          const payload = {
            product_id: id,
            admin_id: user?.id,
            status: status
          }

          const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/product-approve`, payload, { withCredentials: true }
      );

      if(res.status === 201 || res.status === 200){
        toast.success("Product Approved Successfully");
        window.location.reload();
      }else{
        toast.error("Failed to Approve Product");
      }
    }



  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Product Approval</h1>
            <p className="breadcrumbs">
              <span><a href="index.html">Home</a></span>
              <span><i className="mdi mdi-chevron-right"></i></span>Products
            </p>
          </div>
          <div>
            <a href="#" className="btn btn-primary">Add Product</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-header card-header-border-bottom d-flex justify-content-between">
                <div className="card-bar">
                  <div className="col-lg-6 col-md-12">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="searchProduct"
                      placeholder="search with product name.." 
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 sort">
                    <div className="col-lg-4 col-md-6 p-space">
                      <select className="form-control" id="dropdownCategory">
                        <option value="ALL">ALL Category</option>
                        <option value="MEN">Men's</option>
                        <option value="WOMAN">Woman's</option>
                        <option value="KID">Kids</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-6 p-space">
                      <select className="form-control" id="dropdownOrderBy">
                        <option value="ALL">ORDER BY</option>
                        <option value="MEN">Latest</option>
                        <option value="WOMAN">Price Low - High</option>
                        <option value="KID">Price High - Low</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {products?.map((product) => (
                    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="card-wrapper">
                        <div className="card-container">
                          <div className="card-top">
                            <img 
                              className="card-image" 
                              src={`${process.env.imageBaseurl}/uploads/products/${product.pro_thumbnail}`} 
                              alt={product.pro_title} 
                            />
                          </div>
                          <div className="card-bottom d-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                            <div>
                              <h3>{product.pro_title}</h3>
                            <p>{product.pro_price}</p>
                            </div>
                            <div className="d-flex" style={{justifyContent: "center", gap: "5px", alignItems: "center"}}>
                              <button onClick={(e)=> handleApproveBtn(product.id, 1, false)} className="btn btn-success">Approve</button>
                              <button onClick={(e)=> handleApproveBtn(product.id, 0, true)} className="btn btn-danger">Reject</button>
                            </div>
                          </div>
                          <div className="card-action">
                            {/* <div className="card-edit">
                              <i className="mdi mdi-circle-edit-outline"></i>
                            </div> */}
                            <div className="card-preview">
                              <Link href={`/admin/products/product-details/${product.id}`}><i className="mdi mdi-eye-outline"></i></Link>
                            </div>
                            {/* <div className="card-remove">
                              <i className="mdi mdi-delete-outline"></i>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <nav aria-label="Page navigation example p-0">
                    <ul className="pagination pagination-seperated pagination-seperated-rounded">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true" className="mdi mdi-chevron-left mr-1"></span> Prev
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          Next
                          <span aria-hidden="true" className="mdi mdi-chevron-right ml-1"></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default page;

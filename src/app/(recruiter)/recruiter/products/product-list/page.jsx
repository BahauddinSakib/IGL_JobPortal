"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [products, setProducts] = useState([])

  useEffect( ()=>{
    const fetchData = async () =>{
      const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/product-list`);
    
          if(res.status === 200 || res.status === 201){
            setProducts(res.data)
          }
    }
    fetchData()
          // console.log(res, "from list")
  }, [])




  return (
			<div className="ec-content-wrapper">
				<div className="content">
					<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
						<div>
							<h1>Product List</h1>
							<p className="breadcrumbs"><span><a href="index.html">Home</a></span>
								<span><i className="mdi mdi-chevron-right"></i></span>Product</p>
						</div>
						<div>
							<Link href="/admin/products/add-product" className="btn btn-primary"> Add Porduct</Link>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="card card-default">
								<div className="card-body">
									<div className="">
										<table id="responsive-data-table" className="table"
											style={{width:"100%"}}>
											<thead>
												<tr>
													<th>Product</th>
													<th>Name</th>
													<th>Price</th>
													<th>Offer</th>
													<th>Purchased</th>
													<th>Stock</th>
													<th>Status</th>
													<th>Offer Expire Date</th>
													<th>Action</th>
												</tr>
											</thead>

											<tbody>
                        {
                          products?.length > 0 ? (
                            products.map((product, index)=>(
                              <tr key={index}>
													<td><img className="tbl-thumb" src={`${process.env.imageBaseurl}/uploads/products/${product.pro_thumbnail}`} alt="Product Image" /></td>
													<td>{product.pro_title}</td>
													<td>{product.pro_price}</td>
													<td>{`${product.pro_discount_percentage}% OFF`}</td>
													<td>61</td>
													<td>5421</td>
													<td><span className="mb-2 mr-2 badge badge-secondary">{
                            product.pro_status === 0? "REJECTED": product.pro_status === 1? "APPROVED": "PENDING"
                            }</span></td>
													<td>{
                            product.pro_discount_expire?.split("T")[0]
                            }</td>
													<td>
														<div className="btn-group mb-1">
													<div className="btn-group">
  <Link 
    href={`/admin/products/product-details/${product.id}`} 
    className="btn btn-outline-success"
  >
    view-details
  </Link>
  <button
    type="button"
    className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
    data-bs-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    data-display="static"
  >
    <span className="sr-only">view-details</span>
  </button>
  <div className="dropdown-menu">
    {/* Dropdown items */}
    <Link 
      href={`/admin/products/product-details/${product.id}`} 
      className="dropdown-item"
    >
      View Details
    </Link>
    <Link 
      href={`/admin/products/edit-product/${product.id}`} 
      className="dropdown-item"
    >
      Edit Product
    </Link>
    <div className="dropdown-divider"></div>
    <Link 
      href={`/admin/products/delete/${product.id}`}
      className="dropdown-item text-danger"
    >
      Delete
    </Link>
  </div>
</div>

															<div className="dropdown-menu">
																<a className="dropdown-item" href="#">Edit</a>
																<a className="dropdown-item" href="#">Delete</a>
															</div>
														</div>
													</td>
												</tr>
                            ))
                          ) : (
                            <tr>
                              <td><h1>No Products</h1></td>
                            </tr>
                          )
                        }

											</tbody>
										</table>
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
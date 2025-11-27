import axios from "axios";
import React from "react";

const page = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/vendors/all-vendors`, {
    cache: 'no-store' 
  })
const data = await res.json();
const vendors = data.vendors



  return (
    <div className="ec-content-wrapper ec-ec-content-wrapper mb-m-24px">
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Our Vendors</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              User
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modal-add-contact"
            >
              {" "}
              View All
            </button>
          </div>
        </div>

        <div className="row">


          
    {vendors?.length > 0 && vendors.map((vendor, index) => (
  <div className="col-lg-6 col-xl-4 mb-24px" key={index}>
    <div className="ec-user-card card card-default p-4">
      <a
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#modalContact"
        className="view-detail"
      >
        <i className="mdi mdi-eye-plus-outline"></i>
      </a>
      <a href="#" className="media text-secondary">
        <img
          src="assets/img/user/u-xl-1.jpg"
          className="mr-3 img-fluid"
          alt="Avatar Image"
        />

        <div className="media-body">
          <h5 className="mt-0 mb-2 text-dark">{vendor.u_name}</h5>
          <ul className="list-unstyled">
            <li className="d-flex mb-1">
              <i className="mdi mdi-email mr-1"></i>
              <span>{vendor.u_email}</span>
            </li>
            <li className="d-flex mb-1">
              <i className="mdi mdi-phone mr-1"></i>
              <span>{vendor.u_phone}</span>
            </li>
          </ul>
        </div>
      </a>
    </div>
  </div>
))}



        </div>
        <div
          className="modal fade modal-contact-detail"
          id="modalContact"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header justify-content-end border-bottom-0">
                <button
                  type="button"
                  className="btn-edit-icon"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="mdi mdi-pencil"></i>
                </button>
                <div className="dropdown">
                  <button
                    className="btn-dots-icon"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-dots-vertical"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close-icon"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="mdi mdi-close"></i>
                </button>
              </div>
              <div className="modal-body pt-0">
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <div className="profile-content-left px-4">
                      <div className="text-center widget-profile px-0 border-0">
                        <div className="card-img mx-auto rounded-circle">
                          <img src="assets/img/user/u6.jpg" alt="user image" />
                        </div>

                        <div className="card-body">
                          <h4 className="py-2 text-dark">John Devilo</h4>
                          <p>johnexample@gmail.com</p>
                          <a className="btn btn-primary btn-pill my-4" href="#">
                            Follow
                          </a>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">354</h6>
                          <p>Bought</p>
                        </div>

                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">30</h6>
                          <p>Wish List</p>
                        </div>

                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">1200</h6>
                          <p>Following</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="contact-info px-4">
                      <h4 className="text-dark mb-1">Contact Details</h4>
                      <p className="text-dark font-weight-medium pt-4 mb-2">
                        Email address
                      </p>
                      <p>johnexample@gmail.com</p>
                      <p className="text-dark font-weight-medium pt-4 mb-2">
                        Phone Number
                      </p>
                      <p>+00 9539 2641 31</p>
                      <p className="text-dark font-weight-medium pt-4 mb-2">
                        Birthday
                      </p>
                      <p>Dec 10, 1991</p>
                      <p className="text-dark font-weight-medium pt-4 mb-2">
                        Address
                      </p>
                      <p>123/2, Kings fort street-2, Polo alto, US.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade modal-add-contact"
          id="modal-add-contact"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form>
                <div className="modal-header px-4">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Add New User
                  </h5>
                </div>

                <div className="modal-body px-4">
                  <div className="form-group row mb-6">
                    <label
                      htmlFor="coverImage"
                      className="col-sm-4 col-lg-2 col-form-label"
                    >
                      User Image
                    </label>

                    <div className="col-sm-8 col-lg-10">
                      <div className="custom-file mb-1">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="coverImage"
                          required
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="coverImage"
                        >
                          Choose file...
                        </label>
                        <div className="invalid-feedback">
                          Example invalid custom file feedback
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value="John"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value="Deo"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="userName">User name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          value="johndoe"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value="johnexample@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="Birthday">Birthday</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Birthday"
                          value="10-12-1991"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="event">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="event"
                          value="Address here"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer px-4">
                  <button
                    type="button"
                    className="btn btn-secondary btn-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary btn-pill">
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;

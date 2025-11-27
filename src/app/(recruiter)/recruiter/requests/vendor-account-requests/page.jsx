import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="ec-content-wrapper ec-vendor-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Vendor Acount Requests</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>{" "}
              Vendor
            </p>
          </div>
          <div>
            <Link href="/admin/vendors/our-vendors">
              <button
                type="button"
                className="btn btn-primary"
                //   data-bs-toggle="modal"
                //   data-bs-target="#modal-add-member"
              >
                Our Vendors List
              </button>
            </Link>
          </div>
        </div>

        <div className="card card-default p-4 ec-card-space">
          <div className="ec-vendor-card mt-m-24px row">
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u1.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Emma Smith</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 963-852-7410</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>180</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>1908</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$2691</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u2.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Bobly Smith</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 863-852-7654</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>65</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>548</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$254</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u3.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Robin Hood</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 889-852-7466</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>654</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>548</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$654</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u4.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">devin chingol</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 789-852-7865</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>977</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>987</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$654</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u5.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Nitilo Smith</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 658-852-7410</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>654</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>159</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$951</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u6.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Mehulo Kathia</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 698-852-7410</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>658</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>854</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$634</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u7.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Bridg Stone</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 333-852-7410</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>652</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>125</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$475</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u8.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">pintu Trainee</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 698-866-7410</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>658</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>457</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$874</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u9.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">DL Kapdia</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 332-852-3215</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>180</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>1908</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$2691</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u10.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Manu Semli</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 654-852-7744</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>252</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>542</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$854</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u11.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Niki Smith</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 45+6-852-5522</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>425</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>352</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$421</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card card-default mt-24px">
                <a
                  href="javascript:0"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-contact"
                  className="view-detail"
                >
                  <i className="mdi mdi-eye-plus-outline"></i>
                </a>
                <div className="vendor-info card-body text-center p-4">
                  <a
                    href="javascript:0"
                    className="text-secondary d-inline-block mb-3"
                  >
                    <div className="image mb-3">
                      <img
                        src="assets/img/vendor/u12.jpg"
                        className="img-fluid rounded-circle"
                        alt="Avatar Image"
                      />
                    </div>

                    <h5 className="card-title text-dark">Jullie Bronzna</h5>

                    <ul className="list-unstyled">
                      <li className="d-flex mb-1">
                        <i className="mdi mdi-cellphone-basic mr-1"></i>
                        <span>+91 325-852-6543</span>
                      </li>
                      <li className="d-flex">
                        <i className="mdi mdi-email mr-1"></i>
                        <span>exmaple@email.com</span>
                      </li>
                    </ul>
                  </a>
                  <div className="row justify-content-center ec-vendor-detail">
                    <div className="col-4">
                      <h6 className="text-uppercase">Items</h6>
                      <h5>254</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Sell</h6>
                      <h5>574</h5>
                    </div>
                    <div className="col-4">
                      <h6 className="text-uppercase">Payout</h6>
                      <h5>$325</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="modal-contact"
          tabIndex="-1"
          role="dialog"
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
                          <img src="assets/img/user/u1.jpg" alt="user image" />
                        </div>

                        <div className="card-body">
                          <h4 className="py-2 text-dark">John Deo</h4>
                          <p>john.example@gmail.com</p>
                          <a className="btn btn-primary btn-pill my-3" href="#">
                            Follow
                          </a>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">1503</h6>
                          <p>Items</p>
                        </div>

                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">2905</h6>
                          <p>Sell</p>
                        </div>

                        <div className="text-center pb-4">
                          <h6 className="text-dark pb-2">1200</h6>
                          <p>Payout</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="contact-info px-4">
                      <h4 className="text-dark mb-1">Contact Details</h4>
                      <p className="text-dark font-weight-medium pt-3 mb-2">
                        Email address
                      </p>
                      <p>john.example@gmail.com</p>
                      <p className="text-dark font-weight-medium pt-3 mb-2">
                        Phone Number
                      </p>
                      <p>+00 1234 5678 91</p>
                      <p className="text-dark font-weight-medium pt-3 mb-2">
                        Birthday
                      </p>
                      <p>Dec 10, 1991</p>
                      <p className="text-dark font-weight-medium pt-3 mb-2">
                        Event
                      </p>
                      <p className="mb-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="modal-add-member"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-sm"
            role="document"
          >
            <div className="modal-content">
              <form className="modal-header border-bottom-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </form>

              <div
                className="modal-body p-0"
                data-simplebar
                style={{ height: "320px" }}
              >
                <ul className="list-unstyled border-top mb-0">
                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u1.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Aaren</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" defaultChecked={true} />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message ">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u2.jpg"
                          alt="Image"
                        />
                        <span className="status active"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Leon Battista</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" defaultChecked={true} />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u3.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Abriel</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u4.jpg"
                          alt="Image"
                        />
                        <span className="status active"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Emma</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u5.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Emily</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u6.jpg"
                          alt="Image"
                        />
                        <span className="status"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">William</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u7.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Sophia</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u8.jpg"
                          alt="Image"
                        />
                        <span className="status"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Sophia</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u1.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Aaren</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u2.jpg"
                          alt="Image"
                        />
                        <span className="status"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Abby</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u3.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>
                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Abriel</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u4.jpg"
                          alt="Image"
                        />
                        <span className="status active"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Emma</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u5.jpg"
                          alt="Image"
                        />
                        <span className="status"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Emily</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u6.jpg"
                          alt="Image"
                        />
                        <span className="status away"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">William</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="media media-message">
                      <div className="position-relative mr-3">
                        <img
                          className="rounded-circle"
                          src="assets/img/user/u7.jpg"
                          alt="Image"
                        />
                        <span className="status"></span>
                      </div>

                      <div className="media-body d-flex justify-content-between align-items-center">
                        <div className="message-contents">
                          <h4 className="title">Sophia</h4>
                          <p className="last-msg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam itaque doloremque odio, eligendi delectus
                            vitae.
                          </p>
                        </div>

                        <div className="control outlined control-checkbox checkbox-primary">
                          <input type="checkbox" />
                          <div className="control-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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
                  Add new member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

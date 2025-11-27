import React from 'react';

const page = () => {
    return (
 <div className="ec-content-wrapper">
    <div className="content">
      <div className="breadcrumb-wrapper breadcrumb-contacts">
        <div>
          <h1>User Profile</h1>
          <p className="breadcrumbs">
            <span>
              <a href="index.html">Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Profile
          </p>
        </div>
        <div>
          <a href="user-list.html" className="btn btn-primary">
            Edit
          </a>
        </div>
      </div>
      <div className="card bg-white profile-content">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <div className="profile-content-left profile-left-spacing">
              <div className="text-center widget-profile px-0 border-0">
                <div className="card-img mx-auto rounded-circle">
                  <img src="assets/img/user/u1.jpg" alt="user image" />
                </div>
                <div className="card-body">
                  <h4 className="py-2 text-dark">Mark deo</h4>
                  <p>mark.example@gmail.com</p>
                  <a className="btn btn-primary my-3" href="#">
                    Follow
                  </a>
                </div>
              </div>

              <div className="d-flex justify-content-between ">
                <div className="text-center pb-4">
                  <h6 className="text-dark pb-2">546</h6>
                  <p>Bought</p>
                </div>

                <div className="text-center pb-4">
                  <h6 className="text-dark pb-2">32</h6>
                  <p>Wish List</p>
                </div>

                <div className="text-center pb-4">
                  <h6 className="text-dark pb-2">1150</h6>
                  <p>Following</p>
                </div>
              </div>

              <hr className="w-100" />

              <div className="contact-info pt-4">
                <h5 className="text-dark">Contact Information</h5>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Email address
                </p>
                <p>mark.example@gmail.com</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Phone Number
                </p>
                <p>+00 1234 5678 91</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Birthday
                </p>
                <p>Dec 10, 1991</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Social Profile
                </p>
                <p className="social-button">
                  <a
                    href="#"
                    className="mb-1 btn btn-outline btn-twitter rounded-circle"
                  >
                    <i className="mdi mdi-twitter"></i>
                  </a>

                  <a
                    href="#"
                    className="mb-1 btn btn-outline btn-linkedin rounded-circle"
                  >
                    <i className="mdi mdi-linkedin"></i>
                  </a>

                  <a
                    href="#"
                    className="mb-1 btn btn-outline btn-facebook rounded-circle"
                  >
                    <i className="mdi mdi-facebook"></i>
                  </a>

                  <a
                    href="#"
                    className="mb-1 btn btn-outline btn-skype rounded-circle"
                  >
                    <i className="mdi mdi-skype"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9">
            <div className="profile-content-right profile-right-spacing py-5">
              <ul
                className="nav nav-tabs px-3 px-xl-5 nav-style-border"
                id="myProfileTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="true"
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="settings-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#settings"
                    type="button"
                    role="tab"
                    aria-controls="settings"
                    aria-selected="false"
                  >
                    Settings
                  </button>
                </li>
              </ul>
              <div className="tab-content px-3 px-xl-5" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="tab-widget mt-5">
                    <div className="row">
                      <div className="col-xl-4">
                        <div className="media widget-media p-3 bg-white border">
                          <div className="icon rounded-circle mr-3 bg-primary">
                            <i className="mdi mdi-account-outline text-white "></i>
                          </div>

                          <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">546</h4>
                            <p>Bought</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-4">
                        <div className="media widget-media p-3 bg-white border">
                          <div className="icon rounded-circle bg-warning mr-3">
                            <i className="mdi mdi-cart-outline text-white "></i>
                          </div>

                          <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">1953</h4>
                            <p>Wish List</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-4">
                        <div className="media widget-media p-3 bg-white border">
                          <div className="icon rounded-circle mr-3 bg-success">
                            <i className="mdi mdi-ticket-percent text-white "></i>
                          </div>

                          <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">02</h4>
                            <p>Voucher</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div className="card card-default">
                          <div className="card-header justify-content-between mb-1">
                            <h2>Latest Notifications</h2>
                            <div>
                              <button className="text-black-50 mr-2 font-size-20">
                                <i className="mdi mdi-cached"></i>
                              </button>
                              <div className="dropdown show d-inline-block widget-dropdown">
                                <a
                                  className="dropdown-toggle icon-burger-mini"
                                  href="#"
                                  role="button"
                                  id="dropdown-notification"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  data-display="static"
                                ></a>
                                <ul
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdown-notification"
                                >
                                  <li className="dropdown-item">
                                    <a href="#">Action</a>
                                  </li>
                                  <li className="dropdown-item">
                                    <a href="#">Another action</a>
                                  </li>
                                  <li className="dropdown-item">
                                    <a href="#">Something else here</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div
                            className="card-body compact-notifications"
                            data-simplebar
                            style={{height: "434px"}}
                          >
                            <div className="media pb-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
                                <i className="mdi mdi-cart-outline font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  New Order
                                </a>
                                <p>Selena has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 10 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                <i className="mdi mdi-email-outline font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  New Enquiry
                                </a>
                                <p>Phileine has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 9 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
                                <i className="mdi mdi-stack-exchange font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  Support Ticket
                                </a>
                                <p>Emma has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 10 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
                                <i className="mdi mdi-cart-outline font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  New order
                                </a>
                                <p>Ryan has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 10 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-info text-white">
                                <i className="mdi mdi-calendar-blank font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href=""
                                >
                                  Comapny Meetup
                                </a>
                                <p>Phileine has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 10 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
                                <i className="mdi mdi-stack-exchange font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  Support Ticket
                                </a>
                                <p>Emma has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 10 AM
                              </span>
                            </div>

                            <div className="media py-3 align-items-center justify-content-between">
                              <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                <i className="mdi mdi-email-outline font-size-20"></i>
                              </div>
                              <div className="media-body pr-3">
                                <a
                                  className="mt-0 mb-1 font-size-15 text-dark"
                                  href="#"
                                >
                                  New Enquiry
                                </a>
                                <p>Phileine has placed an new order</p>
                              </div>
                              <span className=" font-size-12 d-inline-block">
                                <i className="mdi mdi-clock-outline"></i> 9 AM
                              </span>
                            </div>
                          </div>
                          <div className="mt-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="settings"
                  role="tabpanel"
                  aria-labelledby="settings-tab"
                >
                  <div className="tab-pane-content mt-5">
                    <form>
                      <div className="form-group row mb-6">
                        <label
                          for="coverImage"
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
                            <label className="custom-file-label" for="coverImage">
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
                            <label for="firstName">First name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              value="First name"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="lastName">Last name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              value="Last name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <label for="userName">User name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          value="User name"
                        />
                        <span className="d-block mt-1">
                          Accusamus nobis at omnis consequuntur culpa tempore
                          saepe animi.
                        </span>
                      </div>

                      <div className="form-group mb-4">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value="ekka.example@gmail.com"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label for="oldPassword">Old password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="oldPassword"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label for="newPassword">New password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label for="conPassword">Confirm password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="conPassword"
                        />
                      </div>

                      <div className="d-flex justify-content-end mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary mb-2 btn-pill"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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
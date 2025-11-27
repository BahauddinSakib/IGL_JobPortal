import React from "react";

const page = () => {
  return (
    <div className="content w-full" style={{ padding: '0', margin: '0', width: '100%' }}>
      <div className="breadcrumb-wrapper breadcrumb-wrapper-2" style={{ padding: '20px' }}>
        <h1>New Orders</h1>
        <p className="breadcrumbs">
          <span>
            <a href="index.html">Home</a>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          Orders
        </p>
      </div>
      <div className="row" style={{ margin: '0', width: '100%' }}>
        <div className="col-12" style={{ padding: '0 20px' }}>
          <div className="card card-default" style={{ width: '100%' }}>
            <div className="card-body" style={{ padding: '20px' }}>
              <div className="table-responsive">
                <table
                  id="responsive-data-table"
                  className="table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Name</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1050</td>
                      <td>
                        <img
                          className="product-img tbl-img"
                          src="assets/img/products/p1.jpg"
                          alt="product"
                        />
                      </td>
                      <td>Baby Pink Shoes</td>
                      <td>
                        <strong>John Deo</strong>
                        <br />
                        johny@example.com
                      </td>
                      <td>3</td>
                      <td>$80</td>
                      <td>PAID</td>
                      <td>
                        <span className="mb-2 mr-2 badge badge-secondary">
                          Pending
                        </span>
                      </td>
                      <td>2021-10-30</td>
                      <td>
                        <div className="btn-group mb-1">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                          >
                            Info
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">Info</span>
                          </button>

                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="/vendor/orders/order-details/2">
                              Detail
                            </a>
                            <a className="dropdown-item" href="#">
                              Track
                            </a>
                            <a className="dropdown-item" href="#">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
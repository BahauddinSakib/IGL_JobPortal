"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const VendorRegistrationPage = () => {
  const [bankOptions, setBankOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    businessInfo: {
      storeName: "",
      businessType: "Individual",
      businessCategory: [],
      companyEmail: "",
      registrationNumber: "",
      taxId: "",
      yearEstablished: "",
    },
    contactPerson: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      position: "CEO",
      idNumber: "",
    },
    businessAddress: {
      address: "",
      city: "",
      postalCode: "",
      district: "",
      country: "",
    },
    bankDetails: {
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      swiftCode: "",
      mobileWallet: "",
    },
    documents: {
      license: null,
      taxCertificate: null,
      idDocument: null,
      logo: null,
    },
    agreeToTerms: false,
  });



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox differently
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    // Handle nested form data
    const [section, field] = name.split(".");

    if (section && field) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleFileChange = (e) => {
  const { name, files } = e.target;

  if (files && files.length > 0) {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0],
      },
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

    for (const [section, data] of Object.entries(formData)) {
      if (section === "documents") {
        for (const [field, file] of Object.entries(data)) {
          if (file) {
            formPayload.append(`${field}`, file);
          }
        }
      } else if (section === "businessInfo") {
        for (const [field, value] of Object.entries(data)) {
          if (field === "businessCategory") {
            if (Array.isArray(value)) {
              value.forEach((categoryId, index) => {
                formPayload.append(`${section}.${field}[${index}]`, categoryId);
              });
            } else {
              formPayload.append(`${section}.${field}`, value);
            }
          } else {
            formPayload.append(`${section}.${field}`, value);
          }
        }
      } else if (section === "agreeToTerms") {
        formPayload.append(section, data.toString());
      } else {
        for (const [field, value] of Object.entries(data)) {
          formPayload.append(`${section}.${field}`, value);
        }
      }
    }
      console.log("Form Data Submitted:", Object.fromEntries(formPayload.entries()), formPayload);

      // Example API call (uncomment to use):
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/vendors/vendors-register`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response);

      alert("Vendor registration submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your registration. Please try again."
      );
    }
  };

  useEffect(() => {
    const banksInfoFetch = async () => {
      fetch("/assets/common_assets/banks.json")
        .then((response) => response.json())
        .then((data) => {
          const allBankData = data.map((bank) => ({
            value: bank.BankName, // This will be the value when selected
            label: bank.BankName, // This will be displayed in the dropdown
          }));
          setBankOptions(allBankData);
        })
        .catch((error) => {
          console.error("Error fetching banks info:", error);
        });
    };


   const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`
      );
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

    banksInfoFetch();
    fetchCategories();
  }, []);

   const categoryOptions = categories
    .filter(category => !category.pro_cat_parent_id) // Only top-level categories
    .map(category => ({
      value: category.id,
      label: category.pro_cat_name
    }));


    const handleCategoryChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        businessCategory: [...selectedOptions.map(option => option.value)]
      }
    }));
  };


  

  return (
    <main>
      <section className="breadcrumb-area-four breadcrumb-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="breadcrumb-content">
                <h2 className="title">Become a Vendor</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Become a vendor
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="breadcrumb-img text-end">
                <img
                  src="/assets/img/images/breadcrumb_img.png"
                  alt="Breadcrumb image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vendor-registration-area pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="vr-form-box">
                <h3 className="title">Vendor Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  {/* Business Information */}
                  <h6 className="mb-4">Business Information</h6>
                  <div className="form-grp">
                    <label htmlFor="businessInfo.storeName">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      id="businessInfo.storeName"
                      name="businessInfo.storeName"
                      value={formData.businessInfo.storeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grp select-grp">
                    <label htmlFor="businessInfo.businessType">
                      Business Type *
                    </label>
                    <select
                      id="businessInfo.businessType"
                      name="businessInfo.businessType"
                      value={formData.businessInfo.businessType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                    </select>
                  </div>
                  <div className="form-grp select-grp">
      <label htmlFor="businessInfo.businessCategory">
        Business Category *
      </label>
      <Select
        isMulti
        name="businessInfo.businessCategory"
        options={categoryOptions}
        value={categoryOptions.filter(option => 
          formData.businessInfo.businessCategory.includes(option.value)
        )}
        onChange={handleCategoryChange}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select categories..."
        closeMenuOnSelect={false}
        isSearchable
        required
      />
    </div>
                  <div className="form-grp">
                    <label htmlFor="businessInfo.companyEmail">
                      Company Email *
                    </label>
                    <input
                      type="email"
                      id="businessInfo.companyEmail"
                      name="businessInfo.companyEmail"
                      value={formData.businessInfo.companyEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessInfo.registrationNumber">
                          Business Registration Number *
                        </label>
                        <input
                          type="text"
                          id="businessInfo.registrationNumber"
                          name="businessInfo.registrationNumber"
                          value={formData.businessInfo.registrationNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessInfo.taxId">
                          Tax/VAT ID Number *
                        </label>
                        <input
                          type="text"
                          id="businessInfo.taxId"
                          name="businessInfo.taxId"
                          value={formData.businessInfo.taxId}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-grp">
                    <label htmlFor="businessInfo.yearEstablished">
                      Year Established *
                    </label>
                    <input
                      type="date"
                      id="businessInfo.yearEstablished"
                      name="businessInfo.yearEstablished"
                      value={formData.businessInfo.yearEstablished}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Contact Person Information */}
                  <h6 className="mb-4">Contact Person Information</h6>
                  <div className="form-grp">
                    <label htmlFor="contactPerson.name">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      id="contactPerson.name"
                      name="contactPerson.name"
                      value={formData.contactPerson.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grp">
                    <label htmlFor="contactPerson.email">Contact Email *</label>
                    <input
                      type="email"
                      id="contactPerson.email"
                      name="contactPerson.email"
                      value={formData.contactPerson.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="contactPerson.phone">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="contactPerson.phone"
                          name="contactPerson.phone"
                          value={formData.contactPerson.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="contactPerson.alternatePhone">
                          Alternate Phone Number
                        </label>
                        <input
                          type="tel"
                          id="contactPerson.alternatePhone"
                          name="contactPerson.alternatePhone"
                          value={formData.contactPerson.alternatePhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-grp select-grp">
                    <label htmlFor="contactPerson.position">
                      Designation / Position *
                    </label>
                    <select
                      id="contactPerson.position"
                      name="contactPerson.position"
                      value={formData.contactPerson.position}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="CEO">CEO</option>
                      <option value="General Manager">General Manager</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="form-grp">
                    <label htmlFor="contactPerson.idNumber">
                      National ID / Passport Number *
                    </label>
                    <input
                      type="text"
                      id="contactPerson.idNumber"
                      name="contactPerson.idNumber"
                      value={formData.contactPerson.idNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Business Address */}
                  <h6 className="mb-4">Business Address</h6>
                  <div className="form-grp">
                    <label htmlFor="businessAddress.address">Address *</label>
                    <input
                      type="text"
                      id="businessAddress.address"
                      name="businessAddress.address"
                      value={formData.businessAddress.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessAddress.city">City *</label>
                        <input
                          type="text"
                          id="businessAddress.city"
                          name="businessAddress.city"
                          value={formData.businessAddress.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessAddress.postalCode">
                          Zip / Postal Code *
                        </label>
                        <input
                          type="text"
                          id="businessAddress.postalCode"
                          name="businessAddress.postalCode"
                          value={formData.businessAddress.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessAddress.district">
                          District *
                        </label>
                        <input
                          type="text"
                          id="businessAddress.district"
                          name="businessAddress.district"
                          value={formData.businessAddress.district}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="businessAddress.country">
                          Country *
                        </label>
                        <input
                          type="text"
                          id="businessAddress.country"
                          name="businessAddress.country"
                          value={formData.businessAddress.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank & Payment Details */}
                  <h6 className="mb-4">Bank & Payment Details</h6>
                  <div className="form-grp">
                    <label htmlFor="bankDetails.bankName">Bank Name *</label>
                    <Select
                      id="bankDetails.bankName"
                      name="bankDetails.bankName"
                      options={bankOptions}
                      value={bankOptions.find(
                        (option) =>
                          option.value === formData.bankDetails.bankName
                      )}
                      onChange={(selectedOption) => {
                        // Update your form data with the selected value
                        setFormData({
                          ...formData,
                          bankDetails: {
                            ...formData.bankDetails,
                            bankName: selectedOption.value,
                          },
                        });
                      }}
                      required
                      placeholder="Select a bank..."
                    />
                  </div>
                  <div className="form-grp">
                    <label htmlFor="bankDetails.accountHolder">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      id="bankDetails.accountHolder"
                      name="bankDetails.accountHolder"
                      value={formData.bankDetails.accountHolder}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="bankDetails.accountNumber">
                          Bank Account Number *
                        </label>
                        <input
                          type="text"
                          id="bankDetails.accountNumber"
                          name="bankDetails.accountNumber"
                          value={formData.bankDetails.accountNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="bankDetails.swiftCode">
                          IFSC/SWIFT Code *
                        </label>
                        <input
                          type="text"
                          id="bankDetails.swiftCode"
                          name="bankDetails.swiftCode"
                          value={formData.bankDetails.swiftCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-grp">
                    <label htmlFor="bankDetails.mobileWallet">
                      Mobile Wallet Number (optional)
                    </label>
                    <input
                      type="text"
                      id="bankDetails.mobileWallet"
                      name="bankDetails.mobileWallet"
                      value={formData.bankDetails.mobileWallet || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Uploaded Documents */}
                  <h6 className="mb-4">Uploaded Documents</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="license">
                          Business License Document *
                        </label>
                        <input
                          style={{ padding: "10px 5px" }}
                          type="file"
                          id="license"
                          name="license"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="taxCertificate">
                          Tax Certificate / VAT Document *
                        </label>
                        <input
                          style={{ padding: "10px 5px" }}
                          type="file"
                          id="taxCertificate"
                          name="taxCertificate"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="idDocument">
                          National ID / Passport (Owner) *
                        </label>
                        <input
                          style={{ padding: "10px 5px" }}
                          type="file"
                          id="idDocument"
                          name="idDocument"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="logo">
                          Store Logo / Brand Logo *
                        </label>
                        <input
                          style={{ padding: "10px 5px" }}
                          type="file"
                          id="logo"
                          name="logo"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-grp checkbox-grp">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="agreeToTerms">
                      Your personal data will be used to support your experience
                      throughout this website
                    </label>
                  </div>
                  <button type="submit">REGISTER</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-area-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="newsletter-content">
                <i className="fa-regular fa-paper-plane"></i>
                <h2 className="title">
                  Sign Up for get 10% Weekly <span>Newsletter</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="newsletter-form">
                <input type="text" placeholder="Your email here..." />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VendorRegistrationPage;

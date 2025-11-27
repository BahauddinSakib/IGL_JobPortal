'use client'
import useAuthUser from '@/custom_hooks/useAuthUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const page = () => {
  const { user, isAuthenticated, setUser } = useAuthUser();

  // console.log(user)


  const [mainImage, setMainImage] = useState(null);
  const [mainImageView ,setMainImageView] = useState(null);
  const [thumbnails, setThumbnails] = useState(Array(3).fill(null));
  const [thumbnailsView, setThumbnailsView] = useState(Array(3).fill(null));
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    category: 't-shirt',
    subCategory: '',
    description: '',
    colors: ['#ff6191', '#33317d', '#56d4b7', '#009688'],
    sizes: [],
    price: '',
    quantity: '',
    brand_id: '',
    fullDetail: '',
    productCode: '',
    productModel: '',
    discountPercentage: '',
    vendor_id: null,
    discountExpire: '',
    discountAmount: '',
    howToUse: '',
    buyPrice: '',
    tags: []
  });


  useEffect(() => {
  if (user && user.u_role === 2) {
    setProductData(prev => ({
      ...prev,
      vendor_id: user.id
    }));
  }
}, [user]);

 const handleImageUpload = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  // Update thumbnail file list (for backend submission)
  setThumbnails(prev => {
    const updated = [...prev];
    updated[index] = file;
    return updated;
  });

  // Update thumbnail preview (for frontend image view)
  setThumbnailsView(prev => {
    const updated = [...prev];
    updated[index] = previewUrl;
    return updated;
  });
};


  const handleChange = (e) => {
    
    const { name, value } = e.target;
    if(name === "category"){
      getSubCategory(parseInt(e.target.value))
    }
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index, color) => {
    const newColors = [...productData.colors];
    newColors[index] = color;
    setProductData(prev => ({ ...prev, colors: newColors }));
  };

  const handleSizeToggle = (size) => {
    setProductData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setProductData(prev => ({ ...prev, tags }));
  };



 const handleSubmit = async(e) => {
  e.preventDefault();

  const formData = new FormData();

  if (mainImage) {
    formData.append('mainImage', mainImage);
  }
  thumbnails.forEach(file => {
  if (file) {
    formData.append('thumbnails', file);
  }
});

  formData.append('productData', JSON.stringify(productData));

  // Debug log
  // console.log(JSON.parse(Object.fromEntries(formData.entries()).productData));
  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/create-products`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });


  if(res?.status === 200 || res?.status === 201){
    toast.success("Product successfully created");
    window.location.reload()
  }else{
    toast.error("Product unsuccessfully created");
  }
};

  
  // get category
  const getCategory = async () =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`)
    if(res.status === 200 || res.status === 201){
      setCategory(res.data)
    }
  }

  const getBrands = async () =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/brands/get-all-brands`)
    if(res.status === 200 || res.status === 201){
      setBrands(res.data.data)
    }
  }

 

  const getSubCategory = async (id) =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-sub-categories/${id}`)
    if(res.status === 200 || res.status === 201){
      setSubCategory(res.data)
    }
  }


  // Date
  function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}


  useEffect(()=>{
    getCategory()
    getBrands()
  }, [])

  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Add Product</h1>
            <p className="breadcrumbs">
              <span><a href="/admin">Home</a></span>
              <span><i className="mdi mdi-chevron-right"></i></span>
              <span>Product</span>
            </p>
          </div>
          <div>
            <a href="/admin/product-list" className="btn btn-primary">View All</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-header card-header-border-bottom">
                <h2>Add Product</h2>
              </div>

              <div className="card-body">
                <div className="row ec-vendor-uploads">
                  {/* Image Upload Section */}
                  <div className="col-lg-4">
                    <div className="ec-vendor-img-upload">
                      <div className="ec-vendor-main-img">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input 
                              type='file' 
                              id="imageUpload" 
                              className="ec-image-upload"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => {
                                handleImageUpload(e)
                                setMainImage(e.target.files[0])
                              }}
                            />
                            <label htmlFor="imageUpload">
                              <img src="../../assets/admin_assets/img/icons/edit.svg" className="svg_img header_svg" alt="edit" />
                            </label>
                          </div>
                          <div className="avatar-preview ec-preview">
                            <div className="imagePreview ec-div-preview">
                              <img 
                                className="ec-image-preview"
                                src={mainImageView || "/assets/admin_assets/img/products/vender-upload-thumb-preview.jpg"}
                                alt="preview"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="thumb-upload-set colo-md-12">
                          {thumbnailsView.map((thumb, index) => (
                            <div className="thumb-upload" key={index}>
                              <div className="thumb-edit">
                                <input 
                                  type='file' 
                                  id={`thumbUpload0${index+1}`}
                                  className="ec-image-upload"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={(e) => handleImageUpload(e, index)}
                                />
                                <label htmlFor={`thumbUpload0${index+1}`}>
                                  <img src="../../assets/admin_assets/img/icons/edit.svg" className="svg_img header_svg" alt="edit" />
                                </label>
                              </div>
                              <div className="thumb-preview ec-preview">
                                <div className="image-thumb-preview">
                                  <img 
                                    className="image-thumb-preview ec-image-preview"
                                    src={thumb || "../../assets/admin_assets/img/products/vender-upload-thumb-preview.jpg"}
                                    alt="thumb"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Form Section */}
                  <div className="col-lg-8">
                    <div className="ec-vendor-upload-detail">
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                          <label htmlFor="productName" className="form-label">Product Title</label>
                          <input 
                            type="text" 
                            className="form-control slug-title" 
                            id="productName"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Select Categories</label>
                          <select 
                            name="category"
                            id="category" 
                            className="form-select"
                            value={productData.category}
                            onChange={handleChange}
                            defaultValue={""}
                          >
                            <option value="" hidden>Select</option>
                            {
                              category && category?.map((cat, index) =>{
                                return(
                                  <option value={`${cat?.id}`}>{cat?.pro_cat_name}</option>
                                )
                              })
                            }
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Select Sub Categories</label>
                          <select 
                            name="subCategory"
                            id="subCategory" 
                            className="form-select"
                            defaultValue={""}
                            value={productData.subCategory}
                            onChange={(e)=>{
                              const { name, value } = e.target;
                              setProductData(prev => ({ ...prev, [name]: value }));
                            }}
                          >
                              <option value="">Select</option>
                            {
                              subCategory && subCategory?.map((cat, index) =>{
                                return(
                                  <option value={`${cat?.id}`}>{cat?.pro_cat_name}</option>
                                )
                              })
                            }
                          </select>
                        </div>


                        <div className='row'>
                          <div className="col-md-6">
                          <label htmlFor="slug" className="col-12 col-form-label">Product Model</label> 
                          <div className="col-12">
                            <input 
                              id="productModel" 
                              name="productModel" 
                              className="form-control here set-slug" 
                              type="text"
                              value={productData.productModel}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                          

                        <div className="col-md-6">
                          <label htmlFor="slug" className="col-12 col-form-label">Product Code</label> 
                          <div className="col-12">
                            <input 
                              id="productCode" 
                              name="productCode" 
                              className="form-control here set-slug" 
                              type="text"
                              value={productData.productCode}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        </div>
                        
                        <div className="col-md-12">
                          <label className="form-label">Product Description</label>
                          <textarea 
                            className="form-control" 
                            rows="2"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        
                        <div className="col-md-4 mb-25">
                          <label className="form-label">Colors</label>
                          {productData.colors.map((color, index) => (
                            <input 
                              key={index}
                              type="color" 
                              className="form-control form-control-color"
                              id={`colorInput${index+1}`}
                              value={color}
                              onChange={(e) => handleColorChange(index, e.target.value)}
                              title="Choose your color"
                            />
                          ))}
                        </div>
                        
                        <div className="col-md-8 mb-25">
                          <label className="form-label">Size</label>
                          <div className="form-checkbox-box">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                              <div className="form-check form-check-inline" key={size}>
                                <input 
                                  type="checkbox" 
                                  name="size1" 
                                  value={size}
                                  checked={productData.sizes.includes(size)}
                                  onChange={() => handleSizeToggle(size)}
                                />
                                <label>{size}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Price</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="price1"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Buy Price</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="quantity1"
                            name="buyPrice"
                            value={productData.buyPrice}
                            onChange={handleChange}
                            min="0"
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Quantity</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="quantity1"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Select Brand</label>
                          <select 
                            name="brand_id"
                            id="brand_id" 
                            className="form-select"
                            value={productData.brands}
                            onChange={handleChange}
                            defaultValue={""}
                          >
                            <option value="" hidden>Select</option>
                            {
                              brands && brands?.map((brand, index) =>{
                                return(
                                  <option value={`${brand?.id}`}>{brand?.b_name}</option>
                                )
                              })
                            }
                          </select>
                        </div>

                        <div className="row">
                          <label className="form-label">Discount</label>
                          <div className="col-md-4">
                            <input 
                              type="number" 
                              className="form-control" 
                              id="quantity1"
                              name="discountAmount"
                              placeholder='enter in amount'
                              value={productData.discountAmount}
                              onChange={handleChange}
                              min="0"
                              required
                            />
                        </div>
                        <div className="col-md-4">
                          {/* <label className="form-label">%</label> */}
                            <input 
                              type="number" 
                              className="form-control" 
                              id="quantity1"
                              name="discountPercentage"
                              placeholder='enter in percentage (%)'
                              value={productData.discountPercentage}
                              onChange={handleChange}
                              min="0"
                              required
                            />
                        </div>
                        <div className="col-md-4">
                          {/* <label className="form-label">Expire Date</label> */}
                            <input 
                              type="date" 
                              className="form-control" 
                              id="quantity1"
                              name="discountExpire"
                              placeholder='enter in percentage'
                              value={productData.discountExpire}
                              onChange={handleChange}
                              min={getTomorrowDate()}
                              required
                            />
                        </div>
                        </div>
                        
                        <div className="col-md-12">
                          <label className="form-label">How to Use</label>
                          <textarea 
                            className="form-control" 
                            rows="4"
                            name="howToUse"
                            value={productData.howToUse}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        
                        {/* <div className="col-md-12">
                          <label className="form-label">Product Tags <span>( Type and make comma to separate tags )</span></label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="group_tag"
                            name="group_tag"
                            value={productData.tags.join(', ')}
                            onChange={handleTagsChange}
                            placeholder=""
                          />
                        </div> */}
                        
                        <div className="col-md-12">
                          <button type="submit" className="btn btn-primary">Submit</button>
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
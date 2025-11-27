"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/categories/${id}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategory(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch category details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  const getImageUrl = (imageName) => {
    
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/category-data/${
      imageName || 'default.jpg'
    }`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatSubcategories = (metaKeys) => {
    if (!metaKeys) return [];
    return metaKeys.split(',').map(key => key.trim()).filter(key => key);
  };

  const getStatusDisplay = (status) => {
    return status ? (
      <span className="active">Active</span>
    ) : (
      <span className="inactive">Inactive</span>
    );
  };

  const getTrendingBadge = (status, subcatCount) => {
    if (status && subcatCount > 3) {
      return <span className="badge badge-success">Trending</span>;
    }
    return null;
  };

  const handleDeleteCategory = (categoryId) => {
    // Implement your delete logic here
    toast.success(`Category ${categoryId} deleted successfully`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {error}
        <button 
          onClick={fetchCategoryDetails}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!category) {
    return <div className="p-4">No category found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Category Details</h1>
      
<div className="flex gap-8">
  <div className="w-full md:w-1/3">
    {category.pro_cat_img ? (
      <img
        src={getImageUrl(category.pro_cat_img)}
        alt={category.pro_cat_name}
        className="w-full h-64 md:h-80 object-contain rounded-lg shadow"
      />
    ) : (
      <div className="bg-gray-200 w-full h-64 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No Image Available</span>
      </div>
    )}
  </div>

  {/* Right Column - Content */}
  <div className="w-full md:w-2/3">
    <h2 className="text-2xl font-semibold my-4" style={{color: "black"}}>{category.pro_cat_name}</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className='d-flex mt-2'>
        <p className="text-gray-600">Slug:</p>
        <p className="font-medium">{category.pro_cat_slug}</p>
      </div>
      
      <div className='d-flex mt-2'>
        <p className="text-gray-600">Status:</p>
        <p className="font-medium">
          {category.pro_cat_status ? 'Active' : 'Inactive'}
        </p>
      </div>
      
      <div className='d-flex mt-2'>
        <p className="text-gray-600">Created At:</p>
        <p className="font-medium">{formatDate(category.created_at)}</p>
      </div>
      
      <div className='d-flex mt-2'>
        <p className="text-gray-600">Last Updated:</p>
        <p className="font-medium">{formatDate(category.updated_at)}</p>
      </div>
      
      <div className="md:col-span-2 d-flex mt-2">
        <p className="text-gray-600">Meta Keywords:</p>
        <p className="font-medium">{category.pro_cat_meta_keys || 'None'}</p>
      </div>
    </div>

    <div className="mb-6 mt-2">
      <p className="text-gray-600">Description:</p>
      <p className="font-medium">{category.pro_cat_description || 'No description available'}</p>
    </div>

    <div className="mb-6 mt-2">
      <p className="text-gray-600">Content Description:</p>
      <p className="font-medium">{category.pro_cat_content_description || 'No content description'}</p>
    </div>
  </div>
</div>


      {/* Child Categories Section */}
      {category.children && category.children.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Child Categories</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sub</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {category.children.map((child) => {
                  const subcategories = formatSubcategories(child.pro_cat_meta_keys);
                  return (
                    <tr key={child.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {child.pro_cat_img ? (
                          <img
                            height={40}
                            width={40}
                            src={getImageUrl(child.pro_cat_img)}
                            alt={child.pro_cat_name}
                            className="h-10 w-10 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {child.pro_cat_name || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="ec-sub-cat-list">
                          <span className="ec-sub-cat-count" title="Total Sub Categories">
                            {subcategories.length}
                          </span>
                          {subcategories.map((subcat, index) => (
                            <span key={index} className="ec-sub-cat-tag">
                              {subcat}
                            </span>
                          ))}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {child.children?.length || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {child.pro_cat_status === false ? (
                          <span className="inactive">Inactive</span>
                        ) : (
                          getStatusDisplay(child.pro_cat_status)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTrendingBadge(child.pro_cat_status, subcategories.length)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                            >
                          <Link href={`/vendor/category/view-category/${child?.id}`}>
                              View
                          </Link>
                            </button>

                          <button
                            type="button"
                            className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">View</span>
                          </button>
                          <div className="dropdown-menu">
                            <Link
                              href={`/vendor/category/edit-category/${child?.id}`}
                              className="dropdown-item"
                            >
                              Edit
                            </Link>
                            <button
                              className="dropdown-item"
                              onClick={() => handleDeleteCategory(child?.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          No child categories found
        </div>
      )}
    </div>
  );
};

export default Page;
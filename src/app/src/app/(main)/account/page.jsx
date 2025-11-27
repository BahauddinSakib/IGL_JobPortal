"use client";
import { useEffect, useState } from 'react';
import useAuthUser from '@/custom_hooks/useAuthUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AccountPage = () => {
  const { user, isAuthenticated } = useAuthUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/orders/user-orders`, {
            credentials: 'include'
          });
          const data = await response.json();
          setOrders(data.orders || []);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="account-page bg-gray-50 min-h-screen">
      {/* Account Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-blue-100">Welcome back, {user.u_details?.ud_full_name || user.u_name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-inner">
                    {user.u_details?.ud_profile_pic ? (
                      <img 
                        src={user.u_details.ud_profile_pic} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fa-solid fa-user text-3xl text-blue-600"></i>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.u_details?.ud_full_name || user.u_name}</h3>
                    <p className="text-gray-500 text-sm">{user.u_email}</p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-gauge-high mr-3 text-lg w-6 text-center"></i>
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'orders' 
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-box-open mr-3 text-lg w-6 text-center"></i>
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'addresses' 
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-location-dot mr-3 text-lg w-6 text-center"></i>
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'account' 
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-user-gear mr-3 text-lg w-6 text-center"></i>
                  Account Details
                </button>
                <Link 
                  href="/wishlist"
                  className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <i className="fa-solid fa-heart mr-3 text-lg w-6 text-center"></i>
                  Wishlist
                </Link>
                <Link 
                  href="/logout" 
                  className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-lg w-6 text-center"></i>
                  Logout
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {activeTab === 'dashboard' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 rounded-xl p-5 shadow-sm">
                      <h3 className="text-gray-600 mb-2">Total Orders</h3>
                      <p className="text-3xl font-bold text-blue-600">12</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-100 rounded-xl p-5 shadow-sm">
                      <h3 className="text-gray-600 mb-2">Pending Orders</h3>
                      <p className="text-3xl font-bold text-yellow-600">2</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-100 rounded-xl p-5 shadow-sm">
                      <h3 className="text-gray-600 mb-2">Wishlist Items</h3>
                      <p className="text-3xl font-bold text-pink-600">5</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.slice(0, 5).map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.order_number}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.total_amount.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link 
                                  href={`/orders/${order.id}`} 
                                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                >
                                  View <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-box-open text-2xl text-blue-600"></i>
                      </div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h4>
                      <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
                      <Link 
                        href="/shop" 
                        className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <i className="fa-solid fa-bag-shopping mr-2"></i> Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                  <div className="relative">
                    <select className="appearance-none bg-gray-100 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Orders</option>
                      <option>Completed</option>
                      <option>Processing</option>
                      <option>Cancelled</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-xs text-gray-500"></i>
                  </div>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium text-gray-700">Order #: {order.order_number}</span>
                              <span className="mx-3 text-gray-300">|</span>
                              <span className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-medium text-gray-800">${order.total_amount.toFixed(2)}</h4>
                                <p className="text-sm text-gray-500">{order.items.length} items</p>
                              </div>
                              <div className="flex space-x-3">
                                <Link 
                                  href={`/orders/${order.id}`} 
                                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                  View Details
                                </Link>
                                {order.status === 'processing' && (
                                  <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                                    Cancel Order
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 5).map((item, idx) => (
                                <div key={idx} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      <i className="fa-solid fa-image text-xs"></i>
                                    </div>
                                  )}
                                </div>
                              ))}
                              {order.items.length > 5 && (
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 shadow-sm">
                                  +{order.items.length - 5}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-box-open text-2xl text-blue-600"></i>
                      </div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h4>
                      <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
                      <Link 
                        href="/shop" 
                        className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <i className="fa-solid fa-bag-shopping mr-2"></i> Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
                  <button className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fa-solid fa-plus mr-2"></i> Add New Address
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.u_details?.ud_addresses?.length > 0 ? (
                      user.u_details.ud_addresses.map((address, index) => (
                        <div key={index} className={`border rounded-xl p-5 relative transition-all hover:shadow-md ${
                          address.is_default ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                        }`}>
                          {address.is_default && (
                            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              Default
                            </div>
                          )}
                          <div className="flex items-start mb-4">
                            <div className={`p-2 rounded-lg mr-4 ${
                              address.address_type === 'shipping' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-purple-100 text-purple-600'
                            }`}>
                              <i className={`fa-solid ${
                                address.address_type === 'shipping' 
                                  ? 'fa-truck-fast' 
                                  : 'fa-receipt'
                              }`}></i>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {address.address_type === 'shipping' ? 'Shipping Address' : 'Billing Address'}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {address.street}, {address.city}, {address.state}, {address.country} - {address.postal_code}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4 mt-4">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                              <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                            </button>
                            <button className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center">
                              <i className="fa-solid fa-trash-can mr-1"></i> Delete
                            </button>
                            {!address.is_default && (
                              <button className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center ml-auto">
                                <i className="fa-solid fa-check mr-1"></i> Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <i className="fa-solid fa-location-dot text-2xl text-blue-600"></i>
                        </div>
                        <h4 className="text-lg font-medium text-gray-700 mb-2">No saved addresses</h4>
                        <p className="text-gray-500 mb-6">You haven't saved any addresses yet</p>
                        <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <i className="fa-solid fa-plus mr-2"></i> Add New Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          defaultValue={user.u_details?.ud_full_name?.split(' ')[0] || ''}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          defaultValue={user.u_details?.ud_full_name?.split(' ')[1] || ''}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <input
                        type="text"
                        defaultValue={user.u_name}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2">This will be how your name will be displayed in the account section and in reviews</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue={user.u_email}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Password Change</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password (leave blank to leave unchanged)</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to leave unchanged)</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 mr-3 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
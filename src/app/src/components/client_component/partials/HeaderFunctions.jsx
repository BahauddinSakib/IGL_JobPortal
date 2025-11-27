"use client";
import CartBtn from '@/components/buttons/CartBtn';
import useAuthUser from '@/custom_hooks/useAuthUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const HeaderFunctions = () => {
  const { user, isAuthenticated, setUser } = useAuthUser();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();

  

const handleLogout = async () => {
  setLoadingLogout(true);
  document.cookie = "token=; Max-Age=0; path=/;";
  // router.refresh();
  // router.push('/login');
   window.location.reload();
};


  return (
    <div className="header-action">
      <ul>
        <li>
          <Link href="/wishlist"><i className="far fa-star"></i>Wishlist</Link>
        </li>
        <li>
          <Link href="/compare"><i className="fas fa-redo"></i>Compare</Link>
        </li>
        <li className="header-shop">
          <CartBtn />
        </li>
<li className="header-sine-in">
  {isAuthenticated && user ? (
    <div className="user-menu">
      <Link href="/account">
        <i className="fa-solid fa-user"></i>
        <p>
          Hello, {user.u_details?.ud_full_name || user.u_name}
          <span>My Account</span>
        </p>
      </Link>
      <button
        onClick={handleLogout}
        disabled={loadingLogout}
        className="logout-btn"
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        {loadingLogout ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  ) : (
    <Link href="/login">
      <i className="fa-solid fa-user"></i>
      <p>
        Hello, Sign in <span>My Account</span>
      </p>
    </Link>
  )}
</li>
      </ul>
    </div>
  );
};

export default HeaderFunctions;

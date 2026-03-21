import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  // ✅ LOAD FROM LOCALSTORAGE
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ ADD
  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.name === product.name
    );

    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  // ✅ REMOVE
  const removeFromWishlist = (name) => {
    setWishlist(wishlist.filter((item) => item.name !== name));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

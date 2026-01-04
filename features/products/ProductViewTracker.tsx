"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "@/features/products/ProductSlice";
import { Product } from "@/models/Products";

export function ProductViewTracker({ product }: { product: Product }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecentlyViewed(product));
  }, [product, dispatch]);

  return null;
}
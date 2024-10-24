import { useState } from "react";
import { Coupon } from "../../types";

interface UseNewCouponProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const useNewCoupon = ({ onCouponAdd }: UseNewCouponProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};

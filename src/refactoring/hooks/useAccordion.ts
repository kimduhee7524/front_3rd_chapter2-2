import { useState } from "react";
import {
  toggleAccordionItem,
  isAccordionItemOpen,
} from "../hooks/utils/adminUtils";

export const useAccordion = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => toggleAccordionItem(prev, productId));
  };

  const isProductOpen = (productId: string) => {
    return isAccordionItemOpen(openProductIds, productId);
  };

  return {
    openProductIds,
    toggleProductAccordion,
    isProductOpen,
  };
};

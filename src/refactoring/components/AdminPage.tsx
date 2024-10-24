import { Coupon, Product } from "../../types";
import { NewProductForm } from "./NewProductForm";
import { useProductEdit } from "../hooks/useProductEdit";
import { useAccordion } from "../hooks/useAccordion";
import { useNewProduct } from "../hooks/useNewProduct";
import { useNewCoupon } from "../hooks/useNewCoupon";
import { CouponList } from "./CouponList";
import { ProductEditForm } from "./ProductEditForm";
import { ProductDetails } from "./ProductDetails";
import { NewCouponForm } from "./NewCouponForm";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  // 상품 수정 관련 커스텀 훅
  const {
    editingProduct,
    newDiscount,
    setNewDiscount,
    handleEditProduct,
    handleEditComplete,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
  } = useProductEdit(products, onProductUpdate);

  // 상품 열고 닫기 관련 커스텀 훅
  const { toggleProductAccordion, isProductOpen } = useAccordion();

  // 새 상품 추가 관련 커스텀 훅
  const {
    newProduct,
    setNewProduct,
    showNewProductForm,
    toggleNewProductForm,
    handleAddNewProduct,
  } = useNewProduct({ onProductAdd });

  // 쿠폰 추가 관련 커스텀 훅
  const { newCoupon, setNewCoupon, handleAddCoupon } = useNewCoupon({
    onCouponAdd,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={toggleNewProductForm}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <NewProductForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddNewProduct={handleAddNewProduct}
            />
          )}
          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-${index + 1}`}
                className="bg-white p-4 rounded shadow"
              >
                <button
                  data-testid="toggle-button"
                  onClick={() => toggleProductAccordion(product.id)}
                  className="w-full text-left font-semibold"
                >
                  {product.name} - {product.price}원 (재고: {product.stock})
                </button>
                {isProductOpen(product.id) && (
                  <div className="mt-2">
                    {editingProduct && editingProduct.id === product.id ? (
                      <ProductEditForm
                        product={product}
                        editingProduct={editingProduct}
                        newDiscount={newDiscount}
                        setNewDiscount={setNewDiscount}
                        handleProductNameUpdate={handleProductNameUpdate}
                        handlePriceUpdate={handlePriceUpdate}
                        handleStockUpdate={handleStockUpdate}
                        handleAddDiscount={handleAddDiscount}
                        handleRemoveDiscount={handleRemoveDiscount}
                        handleEditComplete={handleEditComplete}
                      />
                    ) : (
                      <ProductDetails
                        product={product}
                        handleEditProduct={handleEditProduct}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <NewCouponForm
              newCoupon={newCoupon}
              setNewCoupon={setNewCoupon}
              handleAddCoupon={handleAddCoupon}
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
              <CouponList coupons={coupons} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

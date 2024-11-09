import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import Layout from "@/pages/(website)/layout";
import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import GamePage from "@/pages/(dashboard)/game/page";
import GameAddPage from "@/pages/(dashboard)/game/add/page";
import GameEditPage from "@/pages/(dashboard)/game/edit/page";
import CategoryPage from "@/pages/(dashboard)/category/page";
import CategoryAddPage from "@/pages/(dashboard)/category/add/page";
import CategoryEditPage from "@/pages/(dashboard)/category/edit/page";
import BrandPage from "@/pages/(dashboard)/brand/page";
import BrandAddPage from "@/pages/(dashboard)/brand/add/page";
import BrandEditPage from "@/pages/(dashboard)/brand/edit/page";
import PlatformPage from "@/pages/(dashboard)/platform/page";
import PlatFormAddPage from "@/pages/(dashboard)/platform/add/page";
import PlatformEditPage from "@/pages/(dashboard)/platform/edit/page";
import HomePage from "@/pages/(website)/home/page";
import ProductDetail from "@/pages/(website)/home/ProductDetail";

import PagePay from "@/pages/(website)/pays/page";

import ProductPage from "@/pages/(website)/product/page";
import PageCart from "@/pages/(website)/cart/page";
import VnpayPayment from "@/pages/(website)/pays/_components/payvnpay";
import PaymentMomo from "@/pages/(website)/pays/_components/paymm";
import PagePayment_method from "@/pages/(website)/Payment_method/page";
import BankingPage from "@/pages/(website)/Payment_method/_components/bank_transfer";

const Router = () => {
  return (
    <Routes>
      {/* Các route cho trang người dùng */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="games/:game_id" element={<ProductDetail />} />
        <Route path="pay" element={<PagePay />} />
        <Route path="/pay-vnpay" element={<VnpayPayment />} />
        <Route path="/pay-momo" element={<PaymentMomo />} />

        <Route path="products" element={<ProductPage />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="paymentMethods" element={<PagePayment_method />} />
        <Route path="/banhking24h" element={<BankingPage/>}/>

      </Route>

      {/* Các route cho trang quản trị */}
      <Route path="admin/" element={<LayoutAdmin />}>
        <Route index element={<DashboardPage />} />
        <Route path="games" element={<GamePage />} />
        <Route path="games/add" element={<GameAddPage />} />
        <Route path="games/:game_id/edit" element={<GameEditPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/add" element={<CategoryAddPage />} />
        <Route
          path="categories/:category_id/edit"
          element={<CategoryEditPage />}
        />
        <Route path="brands" element={<BrandPage />} />
        <Route path="brands/add" element={<BrandAddPage />} />
        <Route path="brands/:brand_id/edit" element={<BrandEditPage />} />
        <Route path="platforms" element={<PlatformPage />} />
        <Route path="platforms/add" element={<PlatFormAddPage />} />
        <Route
          path="platforms/:platform_id/edit"
          element={<PlatformEditPage />}
        />
      </Route>
    </Routes>
  );
};

export default Router;

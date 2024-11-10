import BrandAddPage from "@/pages/(dashboard)/brand/add/page";
import BrandEditPage from "@/pages/(dashboard)/brand/edit/page";
import BrandPage from "@/pages/(dashboard)/brand/page";
import CartAddPage from "@/pages/(dashboard)/cart/add/page";
import CartEditPage from "@/pages/(dashboard)/cart/edit/page";
import CartPage from "@/pages/(dashboard)/cart/page";
import Cart_ItemAddPage from "@/pages/(dashboard)/cart_item/add/page";
import Cart_ItemEditPage from "@/pages/(dashboard)/cart_item/edit/page";
import Cart_ItemPage from "@/pages/(dashboard)/cart_item/page";
import CategoryAddPage from "@/pages/(dashboard)/category/add/page";
import CategoryEditPage from "@/pages/(dashboard)/category/edit/page";
import CategoryPage from "@/pages/(dashboard)/category/page";
import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import FilterAddPage from "@/pages/(dashboard)/filter/add/page";
import FilterEditPage from "@/pages/(dashboard)/filter/edit/page";
import FilterPage from "@/pages/(dashboard)/filter/page";
import GameAddPage from "@/pages/(dashboard)/game/add/page";
import GameEditPage from "@/pages/(dashboard)/game/edit/page";
import GamePage from "@/pages/(dashboard)/game/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import OrderAddPage from "@/pages/(dashboard)/order/add/page";
import OrderEditPage from "@/pages/(dashboard)/order/edit/page";
import OrderPage from "@/pages/(dashboard)/order/page";
import Order_DetailAddPage from "@/pages/(dashboard)/order_detail/add/page";
import Order_DetailEditPage from "@/pages/(dashboard)/order_detail/edit/page";
import Order_DetailPage from "@/pages/(dashboard)/order_detail/page";
import Payment_MethodAddPage from "@/pages/(dashboard)/payment_method/add/page";
import Payment_MethodEditPage from "@/pages/(dashboard)/payment_method/edit/page";
import Payment_MethodPage from "@/pages/(dashboard)/payment_method/page";
import PlatFormAddPage from "@/pages/(dashboard)/platform/add/page";
import PlatformEditPage from "@/pages/(dashboard)/platform/edit/page";
import PlatformPage from "@/pages/(dashboard)/platform/page";
import ReviewAddPage from "@/pages/(dashboard)/review/add/page";
import ReviewEditPage from "@/pages/(dashboard)/review/edit/page";
import ReviewPage from "@/pages/(dashboard)/review/page";
import RoleAddPage from "@/pages/(dashboard)/role/add/page";
import RoleEditPage from "@/pages/(dashboard)/role/edit/page";
import RolePage from "@/pages/(dashboard)/role/page";
import UserEditPage from "@/pages/(dashboard)/user/edit/page";
import LoginPage from "@/pages/(dashboard)/user/login/page";
import UserPage from "@/pages/(dashboard)/user/page";
import RegisterPage from "@/pages/(dashboard)/user/register/page";
import PayMoMOForm from "@/pages/(website)/Payment_method/_components/PayMomo";
import VnPay_autoForm from "@/pages/(website)/Payment_method/_components/VnPay";
import NapTienTuDongForm from "@/pages/(website)/Payment_method/_components/auto_top_u";
import BankingPage from "@/pages/(website)/Payment_method/_components/bank_transfer";
import CardBankForm from "@/pages/(website)/Payment_method/_components/card_Bank";
import PagePayment_method from "@/pages/(website)/Payment_method/page";
import PageCart from "@/pages/(website)/cart/page";
import ProductDetail from "@/pages/(website)/home/ProductDetail";
import HomePage from "@/pages/(website)/home/page";
import Layout from "@/pages/(website)/layout";
import PagePayCofirm from "@/pages/(website)/paycofirm/page";
import PaymentMomo from "@/pages/(website)/pays/_components/paymm";
import VnpayPayment from "@/pages/(website)/pays/_components/payvnpay";
import PagePay from "@/pages/(website)/pays/page";
import ProductGame from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes >
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="productgame/:game_id" element={<ProductDetail />} />
          <Route path="pay" element={<PagePay />} />
          <Route path="/pay-vnpay" element={<VnpayPayment />} />
          <Route path="/pay-momo" element={<PaymentMomo />} />
          <Route path="/payconfirm" element={<PagePayCofirm />} />
          <Route path="games" element={<ProductGame />} />
          <Route path="cart" element={<PageCart />} />
          <Route path="paymentMethods" element={<PagePayment_method />} />
          <Route path="/banhking24h" element={<BankingPage />} />
          <Route path="/NapTienTuDongForm" element={<NapTienTuDongForm />} />
          <Route path="/CardBank" element={<CardBankForm />} />
          <Route path="/VnPhayauto" element={<VnPay_autoForm />} />
          <Route path="/PayMoMOAuto" element={<PayMoMOForm />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardPage />} />
          <Route path="brands" element={<BrandPage />} />
          <Route path="brands/add" element={<BrandAddPage />} />
          <Route path="brands/:brand_id/edit" element={<BrandEditPage />} />
          <Route path="cart_items" element={<Cart_ItemPage />} />
          <Route path="cart_items/add" element={<Cart_ItemAddPage />} />
          <Route
            path="cart_items/:cart_item_id/edit"
            element={<Cart_ItemEditPage />}
          />
          <Route path="carts" element={<CartPage />} />
          <Route path="carts/add" element={<CartAddPage />} />
          <Route path="carts/:cart_id/edit" element={<CartEditPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/add" element={<CategoryAddPage />} />
          <Route
            path="categories/:category_id/edit"
            element={<CategoryEditPage />}
          />
          <Route path="games" element={<GamePage />} />
          <Route path="games/add" element={<GameAddPage />} />
          <Route path="games/:game_id/edit" element={<GameEditPage />} />
          <Route path="order_details" element={<Order_DetailPage />} />
          <Route path="order_details/add" element={<Order_DetailAddPage />} />
          <Route
            path="order_details/:order_detail_id/edit"
            element={<Order_DetailEditPage />}
          />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orders/add" element={<OrderAddPage />} />
          <Route path="orders/:order_id/edit" element={<OrderEditPage />} />
          <Route path="payment_methods" element={<Payment_MethodPage />} />
          <Route
            path="payment_methods/add"
            element={<Payment_MethodAddPage />}
          />
          <Route
            path="payment_methods/:payment_method_id/edit"
            element={<Payment_MethodEditPage />}
          />
          <Route path="platforms" element={<PlatformPage />} />
          <Route path="platforms/add" element={<PlatFormAddPage />} />
          <Route
            path="platforms/:platform_id/edit"
            element={<PlatformEditPage />}
          />

          <Route path="filters" element={<FilterPage />} />
          <Route path="filters/add" element={<FilterAddPage />} />
          <Route
            path="filters/:filter_id/edit"
            element={<FilterEditPage />}
          />
          <Route path="reviews" element={<ReviewPage />} />
          <Route path="reviews/add" element={<ReviewAddPage />} />
          <Route path="reviews/:review_id/edit" element={<ReviewEditPage />} />
          <Route path="roles" element={<RolePage />} />
          <Route path="roles/add" element={<RoleAddPage />} />
          <Route path="roles/:role_id/edit" element={<RoleEditPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="users/:user_id/edit" element={<UserEditPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;

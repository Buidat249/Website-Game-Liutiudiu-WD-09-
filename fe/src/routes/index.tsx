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
import CategoryNewAddPage from "@/pages/(dashboard)/categorynew/add/page";
import CategoryNewEditPage from "@/pages/(dashboard)/categorynew/edit/page";
import CategoryNewPage from "@/pages/(dashboard)/categorynew/page";
import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import DescriptionAddPage from "@/pages/(dashboard)/description/add/page";
import DescriptionEditPage from "@/pages/(dashboard)/description/edit/pages";
import DescriptionPage from "@/pages/(dashboard)/description/page";
import DescriptionDetailAddPage from "@/pages/(dashboard)/description_detail/add/pages";
import DescriptionDetailEditPage from "@/pages/(dashboard)/description_detail/edit/page";
import DescriptionDetailPage from "@/pages/(dashboard)/description_detail/page";
import FilterAddPage from "@/pages/(dashboard)/filter/add/page";
import FilterEditPage from "@/pages/(dashboard)/filter/edit/page";
import FilterPage from "@/pages/(dashboard)/filter/page";
import GameAddPage from "@/pages/(dashboard)/game/add/page";
import GameEditPage from "@/pages/(dashboard)/game/edit/page";
import GamePage from "@/pages/(dashboard)/game/page";
import AddKeyPage from "@/pages/(dashboard)/keys/add/page";
import EditKeyPage from "@/pages/(dashboard)/keys/edit/page";
import KeysPage from "@/pages/(dashboard)/keys/pages";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import OrderAddPage from "@/pages/(dashboard)/order/add/page";
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
import TintucAddPage from "@/pages/(dashboard)/tintuc/add/page";
import TintucEditPage from "@/pages/(dashboard)/tintuc/edit/page";
import TintucPage from "@/pages/(dashboard)/tintuc/page";
import UserEditPage from "@/pages/(dashboard)/user/edit/page";
import LoginPage from "@/pages/(dashboard)/user/login/page";
import UserPage from "@/pages/(dashboard)/user/page";
import RegisterPage from "@/pages/(dashboard)/user/register/page";
import PageEmptCart from "@/pages/(website)/EmptyCart/page";
import PayMoMOForm from "@/pages/(website)/Payment_method/_components/PayMomo";
import VnPay_autoForm from "@/pages/(website)/Payment_method/_components/VnPay";
import NapTienTuDongForm from "@/pages/(website)/Payment_method/_components/auto_top_u";
import BankingPage from "@/pages/(website)/Payment_method/_components/bank_transfer";
import CardBankForm from "@/pages/(website)/Payment_method/_components/card_Bank";
import NapTrucTiepForm from "@/pages/(website)/Payment_method/_components/naptructiep";
import TheCaoForm from "@/pages/(website)/Payment_method/_components/thecao";
import PagePayment_method from "@/pages/(website)/Payment_method/page";
import PageShopping from "@/pages/(website)/buyingguide/Superfast_shopping/page";
import PageCart from "@/pages/(website)/cart/page";
import ContactHelp from "@/pages/(website)/contact/ContectHelp/component/contacthelp";
import Fanpage from "@/pages/(website)/contact/Fanpage/conponent/fanpage";
import Introduce from "@/pages/(website)/contact/Introduce/component/introduce";
import PageContactHelp from "@/pages/(website)/contact/ContectHelp/page";
import PageContact from "@/pages/(website)/contact/turtorbuy/page";
import ProductDetail from "@/pages/(website)/home/ProductDetail";
import HomePage from "@/pages/(website)/home/page";
import Layout from "@/pages/(website)/layout";
import PagePayCofirm from "@/pages/(website)/paycofirm/page";
import PaymentMomo from "@/pages/(website)/paymomo/_components/paymm";
import PagePayMomo from "@/pages/(website)/paymomo/page";
import VnpayPayment from "@/pages/(website)/payvnpay/_components/payvnpay";
import PagePayVnPay from "@/pages/(website)/payvnpay/page";
import {
  default as ProductGame,
  default as ProductPage,
} from "@/pages/(website)/product/page";

import NewsPage from "@/pages/(website)/tintuc/page";
import NewsDetailPage from "@/pages/(website)/tintuc/tintucchitiet";
import OrderHistory from "@/pages/(website)/users/User_Order/Page";
import PageProfile from "@/pages/(website)/users/User_Profile/page";
import PageAffiliate from "@/pages/(website)/users/User_affiliate/Page";
import Mycomment from "@/pages/(website)/users/User_comments/page";
import SecuritySettings from "@/pages/(website)/users/User_security/page";
import TransactionsHistory from "@/pages/(website)/users/User_transactions/page";
import Wishlist from "@/pages/(website)/users/User_wishlist/page";
import { Route, Routes } from "react-router-dom";
import PageFanpage from "@/pages/(website)/contact/Fanpage/page";
import PageIntroduce from "@/pages/(website)/contact/Introduce/page";
import PageTurtoregister from "@/pages/(website)/contact/TurtorRegister/page";
import PageTurRecharge from "@/pages/(website)/contact/TurtorRechange/page";
import PageTurtorBuy from "@/pages/(website)/contact/turtorbuy/page";
import PaymentSuccess from "@/pages/(website)/payvnpay/_components/success";
import PaymentFall from "@/pages/(website)/payvnpay/_components/fall";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="productgame/:game_id" element={<ProductDetail />} />
        <Route path="/tintucs" element={<NewsPage />} />
        <Route path="/tintucs/:tintuc_id" element={<NewsDetailPage />} />

        <Route path="/vnpayconfirm" element={<PagePayVnPay />} />
        <Route path="/vnpayment" element={<VnpayPayment />} />
        <Route path="/vnpay/success" element={<PaymentSuccess />} />
        <Route path="/vnpay/fall" element={<PaymentFall />} />


        <Route path="/momoconfirm" element={<PagePayMomo />} />
        <Route path="/momoment" element={<PaymentMomo />} />
        <Route path="/payconfirm" element={<PagePayCofirm />} />

        <Route path="games" element={<ProductGame />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="emptcart" element={<PageEmptCart />} />

        <Route path="products" element={<ProductPage />} />
        <Route path="cart" element={<PageCart />} />

        <Route path="games" element={<ProductGame />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="emptcart" element={<PageEmptCart />} />

        <Route path="paymentMethods" element={<PagePayment_method />} />
        <Route path="/banhking24h" element={<BankingPage />} />
        <Route path="/NapTienTuDongForm" element={<NapTienTuDongForm />} />
        <Route path="/CardBank" element={<CardBankForm />} />
        <Route path="/VnPhayauto" element={<VnPay_autoForm />} />
        <Route path="/PayMoMOAuto" element={<PayMoMOForm />} />
        <Route path="/napthecao" element={<TheCaoForm />} />
        <Route path="/naptructiep" element={<NapTrucTiepForm />} />
        <Route path="/user/profile" element={<PageProfile />} />
        <Route path="/user/orders" element={<OrderHistory />} />
        <Route path="/user/transactions" element={<TransactionsHistory />} />
        <Route path="/user/security" element={<SecuritySettings />} />
        <Route path="/user/comments" element={<Mycomment />} />
        <Route path="/user/wishlist" element={<Wishlist />} />
        <Route path="/user/affiliate" element={<PageAffiliate />} />
        <Route path="/contact" element={<PageContactHelp />} />
        <Route path="/contact/contacthelp" element={<PageContactHelp />} />
        <Route path="/contact/fanpage" element={<PageFanpage />} />
        <Route path="/contact/introduce" element={<PageIntroduce />} />
        <Route path="/contact/turtorrecharge" element={<PageTurRecharge />} />
        <Route path="/contact/turtorregister" element={<PageTurtoregister />} />
        <Route path="/contact/turtorbuy" element={<PageTurtorBuy />} />
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
        <Route path="categories/:category_id/edit" element={<CategoryEditPage />} />
        <Route path="categorynews" element={<CategoryNewPage />} />
        <Route path="categorynews/add" element={<CategoryNewAddPage />} />
        <Route path="categorynews/:categorynew_id/edit" element={<CategoryNewEditPage />} />

        <Route path="games" element={<GamePage />} />
        <Route path="games/add" element={<GameAddPage />} />
        <Route path="games/:game_id/edit" element={<GameEditPage />} />
        <Route path="order_details" element={<Order_DetailPage />} />
        <Route path="order_details/add" element={<Order_DetailAddPage />} />
        <Route path="order_details/:order_detail_id/edit" element={<Order_DetailEditPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="orders/add" element={<OrderAddPage />} />
        <Route path="payment_methods" element={<Payment_MethodPage />} />
        <Route path="payment_methods/add" element={<Payment_MethodAddPage />} />
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
        <Route path="filters/:filter_id/edit" element={<FilterEditPage />} />

        <Route path="descriptions" element={<DescriptionPage />} />
        <Route path="descriptions/add" element={<DescriptionAddPage />} />
        <Route
          path="descriptions/:description_id/edit"
          element={<DescriptionEditPage />}
        />

        <Route path="description_details" element={<DescriptionDetailPage />} />
        <Route
          path="description_details/add"
          element={<DescriptionDetailAddPage />}
        />
        <Route
          path="description_details/:descriptiondetail_id/edit"
          element={<DescriptionDetailEditPage />}
        />

        <Route path="keys" element={<KeysPage />} />
        <Route path="keys/add" element={<AddKeyPage />} />
        <Route path="keys/:keys_id/edit" element={<EditKeyPage />} />

        <Route path="reviews" element={<ReviewPage />} />
        <Route path="reviews/add" element={<ReviewAddPage />} />
        <Route path="reviews/:review_id/edit" element={<ReviewEditPage />} />
        <Route path="roles" element={<RolePage />} />
        <Route path="roles/add" element={<RoleAddPage />} />
        <Route path="roles/:role_id/edit" element={<RoleEditPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="users/:user_id/edit" element={<UserEditPage />} />
        <Route path="tintucs/add" element={<TintucAddPage />} />
        <Route path="tintucs" element={<TintucPage />} />
        <Route path="tintucs/:tintuc_id/edit" element={<TintucEditPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

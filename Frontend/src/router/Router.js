import React, { Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ToastContainer } from "react-toastify";
import Loader from "../components/Layout/Loader";

const AuthPage = React.lazy(() => import("../pages/AuthPage"));
const ActivationPage = React.lazy(() => import("../pages/ActivationPage"));
const HomePage = React.lazy(() => import("../pages/HomePage"));
const ProductsPage = React.lazy(() => import("../pages/ProductsPage"));
const BestSellingPage = React.lazy(() => import("../pages/BestSellingPage"));
const EventsPage = React.lazy(() => import("../pages/EventsPage"));
const FAQPage = React.lazy(() => import("../pages/FAQPage"));
const ProductDetailsPage = React.lazy(() =>
  import("../pages/ProductDetailsPage")
);
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const ShopCreatePage = React.lazy(() => import("../pages/ShopCreatePage"));
const ActivationShopPage = React.lazy(() =>
  import("../pages/ActivationShopPage")
);
const ShopHomePage = React.lazy(() => import("../pages/ShopHomePage"));
const ShopDashboardPage = React.lazy(() =>
  import("../pages/ShopDashboardPage")
);
const ShopCreateProduct = React.lazy(() =>
  import("../pages/ShopCreateProduct")
);
const ShopAllProducts = React.lazy(() => import("../pages/ShopAllProducts"));
const ShopCreateEvent = React.lazy(() => import("../pages/ShopCreateEvent"));
const ShopAllEvents = React.lazy(() => import("../pages/ShopAllEvents"));
const ShopAllCoupons = React.lazy(() => import("../pages/ShopAllCoupons"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const PaymentPage = React.lazy(() => import("../pages/PaymentPage"));
const OrderSuccessPage = React.lazy(() => import("../pages/OrderSuccessPage"));
const ShopPreviewPage = React.lazy(() => import("../pages/ShopPreviewPage"));
const EventDetailsPage = React.lazy(() => import("../pages/EventDetailsPage"));
const ShopAllOrdersPage = React.lazy(() =>
  import("../pages/ShopAllOrdersPage")
);
const OrderDetailsPage = React.lazy(() => import("../pages/OrderDetailsPage"));
const UserOrderDetailsPage = React.lazy(() =>
  import("../pages/UserOrderDetailsPage")
);
const TrackOrderPage = React.lazy(() => import("../pages/TrackOrderPage"));
const ShopAllRefunds = React.lazy(() => import("../pages/ShopAllRefunds"));
const ShopSettingsPage = React.lazy(() => import("../pages/ShopSettingsPage"));
const ShopChangePasswordPage = React.lazy(() =>
  import("../pages/ShopChangePasswordPage")
);
const ForgetPasswordPage = React.lazy(() =>
  import("../pages/ForgetPasswordPage")
);
const ChangeForgetPasswordPage = React.lazy(() =>
  import("../pages/ChangeForgetPasswordPage")
);
const ShopForgetPasswordPage = React.lazy(() =>
  import("../pages/ShopForgetPasswordPage")
);
const ShopChangeForgetPasswordPage = React.lazy(() =>
  import("../pages/ShopChangeForgetPasswordPage")
);

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Elements stripe={loadStripe("YOUR_SECRET_API")}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <UserOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route
            path="/seller/activation/:activation_token"
            element={<ActivationShopPage />}
          />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <OrderDetailsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/change-password"
            element={
              <SellerProtectedRoute>
                <ShopChangePasswordPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/forgot-password"
            element={<ShopForgetPasswordPage />}
          />
          <Route
            path="/shop/change-forget-password/:token"
            element={<ShopChangeForgetPasswordPage />}
          />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route
            path="/change-forget-password/:token"
            element={<ChangeForgetPasswordPage />}
          />
        </Routes>
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default Router;

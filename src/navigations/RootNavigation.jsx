import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/ui";
import { LoginPage } from "../pages/login";
import { BasketPage, MyPage, QuestionAppPage, QuestionPage, WishPage } from "../pages/mypage";
import { HomePage } from "../pages/home";
import { ProductPage } from "../pages/product";
import { DetailPage } from "../pages/detail";
import { BuyPage } from "../pages/trade/buy";
import { ApplyListPage, SellListPage } from "../pages/trade/sell";
import { SignUpPage } from "../pages/signup";
import Temp from "../pages/test";
import { NoticePage, CustomerCenterPage, ExamPage, FAQPAGE } from "../pages/admin/cs";
import QuestionList from "../components/mypage/question/QuestionList";
import {
  QuestionAnswerPage,
  QuestionListAdminPage,
  SaleAppListPage,
  SaleExamPage,
  SaleListPage,
} from "../pages/admin/manage";

export const RootNavigation = () => {
  //^ 기능별로 Navigation을 묶을 수도 있다.
  //^ 화면별로 나와있다고 생각하자.
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/detail/:watch_id" element={<DetailPage />} />
        <Route path="/mypage/buy" element={<BuyPage />} />
        <Route path="/mypage/apply" element={<ApplyListPage />} />
        <Route path="/mypage/wish" element={<WishPage />} />
        <Route path="/mypage/basket" element={<BasketPage />} />
        <Route path="/mypage/question" element={<QuestionList />} />
        <Route path="/mypage/question/app" element={<QuestionAppPage />} />
        <Route path="/mypage/sell" element={<SellListPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/test" element={<Temp />} />
        <Route path="/watches/:category" element={<HomePage />} />
        <Route path="/cs/customer" element={<CustomerCenterPage />} />
        <Route path="/cs/exam" element={<ExamPage />} />
        <Route path="/cs/notice" element={<NoticePage />} />
        <Route path="/cs/faq" element={<FAQPAGE />} />
        <Route path="/admin/saleAppList" element={<SaleAppListPage />} />
        <Route path="/admin/question" element={<QuestionListAdminPage />} />
        <Route path="/admin/saleList" element={<SaleListPage />} />
        <Route path="/admin/exam/:watch_id" element={<SaleExamPage />} />
        <Route path="/question/:question_id" element={<QuestionAnswerPage />} />
      </Routes>
    </Layout>
  );
};

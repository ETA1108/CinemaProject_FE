import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Layout_C from "./Layout_C";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Movie_C from "./pages/Movie_C";
import Movie_Create from "./pages/Movie_Create";
import Movie_Update from "./pages/Movie_Update";
import Plan from "./pages/Plan";
import Plan_C from "./pages/Plan_C";
import Plan_Create from "./pages/Plan_Create";
import Plan_Update from "./pages/Plan_Update";
import Planall from "./pages/Planall";
import Seat from "./pages/Seat";
import Seat_C from "./pages/Seat_C";
import Ticket_C from "./pages/Ticket_C";
import TicketNM from "./pages/TicketNM";
import Customer from "./pages/Customer";
import Customer_Order from "./pages/Customer_Order";
import Pay_C from "./pages/Pay_C";
import Mypage from "./pages/Mypage_C";
import Mypage_ud from "./pages/Mypage_C_ud";
import MypageNM from "./pages/MypageNM";
import Orderabout from "./pages/Orderabout";
import Join from "./pages/Join_C";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage_nm" element={<MypageNM />} />
      <Route path="/orderabout" element={<Orderabout />} />
      <Route element={<Layout />}>
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie_create" element={<Movie_Create />} />
        <Route path="/movie_update" element={<Movie_Update />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan_create" element={<Plan_Create />} />
        <Route path="/plan_update" element={<Plan_Update />} />
        <Route path="/planall" element={<Planall />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer_order" element={<Customer_Order />} />
      </Route>
      <Route element={<Layout_C />}>
        <Route path="/movie_c" element={<Movie_C />} />
        <Route path="/plan_c" element={<Plan_C />} />
        <Route path="/seat_c" element={<Seat_C />} />
        <Route path="/pay_c" element={<Pay_C />} />
        <Route path="/ticket_c" element={<Ticket_C />} />
        <Route path="/ticket_nm" element={<TicketNM />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage_ud" element={<Mypage_ud />} />
      </Route>
    </Routes>
  );
};

export default App;

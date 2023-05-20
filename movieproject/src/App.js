import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Layout_C from "./Layout_C";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Movie_C from "./pages/Movie_C";
import Plan from "./pages/Plan";
import Plan_C from "./pages/Plan_C";
import Seat from "./pages/Seat";
import Seat_C from "./pages/Seat_C";
import Ticket from "./pages/Ticket";
import Ticket_C from "./pages/Ticket_C";
import Customer from "./pages/Customer";
import Pay from "./pages/Pay";
import Pay_C from "./pages/Pay_C";
import Mypage from "./pages/Mypage_C";
import Join from "./pages/Join_C";
import Temp from "./pages/temp";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route element={<Layout />}>
        <Route path="/movie" element={<Movie />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/pay" element={<Pay />} />
      </Route>
      <Route element={<Layout_C />}>
        <Route path="/movie_c" element={<Movie_C />} />
        <Route path="/plan_c" element={<Plan_C />} />
        <Route path="/seat_c" element={<Seat_C />} />
        <Route path="/pay_c" element={<Pay_C />} />
        <Route path="/ticket_c" element={<Ticket_C />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
    </Routes>
  );
};

export default App;

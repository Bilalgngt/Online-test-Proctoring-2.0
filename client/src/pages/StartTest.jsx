import { useState } from "react";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function StartTest() {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [testId, setTestId] = useState('');
  const [PhoneCo, setPhoneCo] = useState([]);
  const [PhoneNum, setPhoneNum] = useState(0);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoinTest = async (e) => {
    try {
      const timeout = 3000;
      const response = axios.get("http://localhost:9000/start-test");
      navigate(`/test-page/${testId}`);

      const res = await Promise.race([
        response,
        new Promise((resolve) =>
          setTimeout(() => resolve({ timeout: true }), timeout)
        ),
      ]);
      if (res.timeout) {
        navigate(`/test-page/${testId}`);
      } else if (res.data.success) {
        message.success(res.data.message);
        navigate(`/test-page/${testId}`);
        
      }

    } catch (error) {
      navigate(`/test-page/${testId}`);
      message.error("Error in fetching test details");
    }
  };

  const getPhoneCo = async () => {
    try {
      const res = await axios.get("http://localhost:9000/check-connection/phones_co");
      // Assurez-vous que la clé "Téléphones connectés" existe dans votre réponse JSON
      if (res.data && res.data["Téléphones connectés"]) {
        // Mise à jour de PhoneCo pour contenir le tableau complet des téléphones connectés
        setPhoneCo(res.data["Téléphones connectés"]);
        setPhoneNum(res.data["Téléphones connectés"].length);
        console.log(PhoneCo);
        // Affichage d'un message de succès pour chaque téléphone connecté
        res.data["Téléphones connectés"].forEach(phone => {
          message.success(phone);
        });
      } else {
        setPhoneCo(res.data);
        setPhoneNum(0);
        console.log(PhoneCo);
      }
    } catch (error) {
      console.log(error);
      message.error("Une erreur est survenue lors de la récupération des téléphones connectés.");
    }
  };

    useEffect(() => {
        getPhoneCo();
    }, []);
  

  return (
    <Layout>
      <div className="content flex flex-col justify-center items-center">
        <div className="slogan flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center font-semibold">
            Welcome to Proctopous
          </h1>
          <p className="py-3">
            Empowering Learning, Ensuring Trust, Beyond Boundaries, Within
            Integrity.
          </p>
        </div>
        <div>
            <p>{PhoneCo}</p>
        </div>
        <div>
          <form className="flex justify-between items-center">
            <label className="font-bold whitespace-nowrap" htmlFor="link">
              Paste Your Link:
            </label>
            <input
              id="link"
              className="rounded-lg w-5/6 ml-2 text-black bg-blue-100 p-2 focus:bg-blue-100 focus:outline-none"
              type="text"
              name="link"
              autoComplete="none"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              required
            />
            <button
              disabled={!testId || PhoneNum !== 2}
              onClick={handleJoinTest}
              className="ml-2 w-20 my-3 py-2 bg-blue-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default StartTest;

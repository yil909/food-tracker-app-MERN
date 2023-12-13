import OverallWaste from "./OverallWaste.jsx";
import NearingExpiration from "./NearingExpiration.jsx";
import WasteOverTime from "./WasteOverTime.jsx";
import MostWastedItem from "./MostWastedItem.jsx";
import Layout from "../../common/Layout.jsx";

const ReportPage = () =>{
    return(
      <>
          <Layout></Layout>
          <OverallWaste/>
          <NearingExpiration/>
          <WasteOverTime/>
          <MostWastedItem/>
      </>
    );
}

export default ReportPage;
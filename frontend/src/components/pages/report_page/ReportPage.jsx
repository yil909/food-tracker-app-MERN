import OverallWaste from "./OverallWaste.jsx";
import NearingExpiration from "./NearingExpiration.jsx";
import WasteOverTime from "./WasteOverTime.jsx";
import MostWastedItem from "./MostWastedItem.jsx";
import Layout from "../../common/Layout.jsx";

const ReportPage = () =>{
    return(
      <Layout>
          <OverallWaste/>
          <NearingExpiration/>
          <WasteOverTime/>
          <MostWastedItem/>
      </Layout>
    );
}

export default ReportPage;
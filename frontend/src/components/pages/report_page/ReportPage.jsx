import OverallWaste from "./OverallWaste.jsx";
import NearingExpiration from "./NearingExpiration.jsx";
import WasteOverTime from "./WasteOverTime.jsx";
import MostWastedItem from "./MostWastedItem.jsx";

const ReportPage = () =>{
    return(
      <>
          <OverallWaste/>
          <NearingExpiration/>
          <WasteOverTime/>
          <MostWastedItem/>
      </>
    );
}

export default ReportPage;
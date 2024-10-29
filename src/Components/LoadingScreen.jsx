import { Hourglass } from "react-loader-spinner";
export default function LoadingScreen() {
return (
<div className="loading">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass=""
        colors={["#575757", "#949494"]}
      />
      <p>Fetching data please wait...</p>
    </div>
)
}
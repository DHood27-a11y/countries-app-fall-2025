import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
  const countryName = useParams().countryName;
  console.log(countryName);

  return;
  <>
    <main>
      <h2>Country Detail</h2>
    </main>
  </>;
}

export default CountryDetail;

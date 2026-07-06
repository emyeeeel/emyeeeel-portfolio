import Logotype from "./Logotype.jsx";
import "./PageWipe.css";

function PageWipe({ stage }) {
  return (
    <div className={`wipe wipe--${stage}`} aria-hidden="true">
      <Logotype className="wipe__mark" />
    </div>
  );
}

export default PageWipe;

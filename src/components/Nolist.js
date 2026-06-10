import { Link } from "react-router-dom";

const Nolist = ({display, add, fun}) =>{
    return(
        <div className="not-found">
            <div className="text">{display}</div>
            {add && <Link to='/Create'>Add Here!</Link>}
            {fun && <div className="text">Have Some Fun!</div>}
        </div>
    )
}

export default Nolist;
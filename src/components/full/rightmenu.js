import "./rightmenu.css";
import SectionHome from "./SectionHome";
import SongCardHistory from "../basic/SongCardHistory";
import SongCardExtend from "../basic/SongCardExtend";
import SelectMethodPhoto from "../full/SelectMethodPhoto";
import CallAnalyticsOptions from "./CallAnalyticsOptions";
import CallHistory from "./CallHistory";

function RightMenu({children}) {

    const handleTakePhoto = () => {
        alert("Ok");
      };
    
      const handleUploadPhoto = () => {
       alert("Upload");
      };

    return (
        <div className="main-right-menu-container">
            <div className="right-menu-content-container">
                {children}
            </div>
        </div>
    );
};

export default RightMenu;
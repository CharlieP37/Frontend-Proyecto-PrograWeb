import "./rightmenu.css";

function RightMenu({children}) {
    return (
        <div className="main-right-menu-container">
            <div className="right-menu-content-container">
                {children}
            </div>
        </div>
    );
};

export default RightMenu;
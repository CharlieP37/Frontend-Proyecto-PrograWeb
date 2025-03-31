import "./actionbar.css";

function ActionBar({children}){
    return (
        <div className="actionbar-container">
            <div className="actionbar-inner-container">
                {children}
                <p style={{textAlign: "center"}}>Action Bar</p>
            </div>
        </div>
    );
};

export default ActionBar;
import "./actionbar.css";

function ActionBar({children}){
    return (
        <div className="actionbar-container">
            <div className="actionbar-inner-container">
                {children}
            </div>
        </div>
    );
};

export default ActionBar;
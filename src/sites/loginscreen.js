import LogoImg from '../assets/ModifyLogoAlt1.svg';
import SignUpOptionsComponent from "../components/full/signupoptions.js";
import "./loginscreen.css";

function LoginScreen(){
    
    return(
        <div className="main-login-container">
            <div className="content-container">
                <div className="left-container">
                    <img id="mainLogo" src={LogoImg} alt="Logo"/>
                </div>
                <div className="right-container">
                    <h2 className="subtitle-font-style">Tu estado de ánimo, tu música. La playlist perfecta para cada emoción.</h2>
                    <div className="login-options-container">
                        <SignUpOptionsComponent/>
                    </div>
                </div>
            </div>
            <div className="credits-location-container">
                <p>© Carlos Pop & Diego Gil. Universidad Rafael Landívar. 2025.</p>
            </div>
        </div>
    );
    
};

export default LoginScreen;
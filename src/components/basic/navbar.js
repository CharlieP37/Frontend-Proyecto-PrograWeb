import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MoodifyIcon from "../../assets/MoodifyLogoMain.svg";
import ProfileIcon from "../../assets/UserProfile.png";
import CustomButton from "./button";
import DialogHeader from "./dialogheader";
import CustomDropDown from "../basic/dropdown";
import CustomInput from "../basic/input";
import { meProfile, updateProfile, profileOptions } from "../../services/api";
import "./navbar.css";

function NavBar(){
    
    const navigate = useNavigate();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countryData, setCountryData] = useState();
    const [formData, setFormData] = useState({
        profileuser: "",
        profileemail: "",
        profilename: "",
        profilelastname: "",
        profilebirthday: null,
        profilesex: "",
        profilecountry: null
    });

    const sex = [
        "Masculino",
        "Femenino"
    ];

    const handleSignOut = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        alert("Cerrando Sesión");
        navigate("/");
    };

    const handleProfileOptions = async () => {
        try {
            const responseData = await profileOptions();
            setCountryData(responseData.country);
        } catch (error) {
            setError('Error al obtener opciones para el perfil.');
            console.error(error);
        };
    };

    const handleProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const responseData = await meProfile({token});
            const dataprofile = {
                profileuser: responseData.profile.username,
                profileemail: responseData.profile.email,
                profilename: responseData.profile.name,
                profilelastname: responseData.profile.lastname,
                profilebirthday: responseData.profile.birthdate,
                profilesex: responseData.profile.sex,
                profilecountry: responseData.profile.country
            };
            setFormData(dataprofile);
        } catch (error) {
            setError('Error al obtener información del perfil.');
            console.error(error);
        }
    }

    const handleProfileClick = async () => {
        setLoading(true);
        setError(null);
        try {
            setDialogVisible(true);
            await handleProfileOptions();
            await handleProfileInfo();
        } catch (error) {
            setError('Error al consultar información del perfil.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = async () => {
        setLoading(true);
        setError(null);
        try {
            const currenttoken = localStorage.getItem('token');
            const profiledata = ({
                username: formData.profileuser,
                email: formData.profileemail,
                name: formData.profilename,
                lastname: formData.profilelastname,
                birthdate: formData.profilebirthday,
                sex: formData.profilesex,
                country: countryData.indexOf(formData.profilecountry)+1
            });
            const data = ({ token: currenttoken, profile: profiledata });
            await updateProfile(data);
            setDialogVisible(false);
        } catch (error) {
            setError('Error al actualizar información de perfil.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeDrop = (e, name) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-inner-container">
                    <div className="navbar-image-container">
                        <img alt="Moodify Logo" id ="logoIcon" src={MoodifyIcon}></img>
                    </div>
                    <div className="navbar-logon-container">
                        <div className="navbar-account-icon-container" onClick={handleProfileClick}>
                            <img alt="profile" id="profileIcon" src={ProfileIcon}/>
                        </div>
                        <div className="navbar-signout-container">
                            <CustomButton type={"button"} atributes={{name: "signoutBtn", value:"0", text: "Cerrar Sesión"}} onClick={() => handleSignOut()}/>
                        </div>
                    </div>
                </div>
            </div>
            {dialogVisible && (
                <DialogHeader
                id={"profileinformation"}
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                header={
                    <div className="information-account-icon-container">
                        {loading ? (<p></p>) :
                        error ? (<p></p>) : (<>
                        <img alt="profile" id="profileIcon2" src={ProfileIcon}/>
                        </>)}
                    </div>
                }
                children={
                    <div className="profile-options-container">
                        {loading ? (<p className='status-message-profile'>Cargando...</p>) :
                        error ? (<p className='status-message-profile error'>{error}</p>) : (<>
                        <div className="profile-row-one-information">
                            <CustomInput type={"text"} atributes={{name: "profileusername", label:"Usuario"}} value={formData.profileuser} onChange={handleChange} disabled/>
                            <div className="profile-middle-div"></div>
                            <CustomInput type={"text"} atributes={{name: "profileemail", label:"Correo Electrónico"}} value={formData.profileemail} onChange={handleChange}/>
                        </div>
                        <div className="profile-row-two-information">
                            <CustomInput type={"text"} atributes={{name: "profilename", label:"Nombre"}} value={formData.profilename} onChange={handleChange}/>
                            <div className="profile-middle-div"></div>
                            <CustomInput type={"text"} atributes={{name: "profilelastname", label:"Apellido"}} value={formData.profilelastname} onChange={handleChange}/>
                        </div>
                        <div className="profile-row-three-information">
                            <div className="card quizcard-profile">
                                    <label id="profilesexLabel" htmlFor="profilesex">Sexo</label>
                                    <CustomDropDown id={"profilesex"} text={""} name={"name"} options={sex} value={formData.profilesex || ""} onChange={(e) => handleChangeDrop(e, "profilesex")}/>
                            </div>
                            <div className="profile-middle-div"></div>
                            <div className="card quizcard-profile">
                                    <label id="profilecountryLabel" htmlFor="profilecountry">País</label>
                                    <CustomDropDown id={"profilecountry"} text={""} name={"name"} options={countryData} value={formData.profilecountry || ""} onChange={(e) => handleChangeDrop(e, "profilecountry")}/>
                            </div>
                        </div>
                        <div className="profile-row-four-information">
                            <div className="calendar-group custom-container profile-calendar">
                                <CustomInput type={"text"} atributes={{name: "profilebirthday", label:"Fecha de nacimiento"}} value={formData.profilebirthday} onChange={handleChange} disabled/>
                            </div>
                        </div>
                        <div className="profile-row-btn-container">
                            <CustomButton type={"button"} atributes={{name: "profileCancelSubmitBtn", value:"", text: "Cancelar"}} onClick={() => setDialogVisible(false)}/>
                            <div className="profile-middle-div"></div>
                            <CustomButton type={"submit"} atributes={{name: "profileUpdateSubmitBtn", value:"", text: "Actualizar"}} onClick={handleUpdateClick}/>
                        </div> </>)}
                    </div>
                }
                />
            )}
        </>
    );
};

export default NavBar;
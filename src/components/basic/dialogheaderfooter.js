import React from "react";
import { Dialog } from 'primereact/dialog';
import "./dialog.css";

function DialogFull({ id, visible, onHide, headerContent, footerContent, className, children, ...rest }) {

    let classname = "";

    if (className === undefined || className === null){
        classname = " custom-dialog dialog-full";
    }
    else {
        classname = className + " custom-dialog dialog-full";
    }

    return (
        <div className="card dialog-container">
            <Dialog id={ id + "DialogFull"} className={classname}
                visible={visible}
                modal
                header={headerContent}
                footer={footerContent}
                onHide={onHide}
                {...rest}
            >
                <div className="dialog-elements-container" id={ id + "DialogElementsContainer"}>
                    {children}
                </div>
            </Dialog>
        </div>
    );
}

export default DialogFull;

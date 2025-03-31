import React from "react";
import { Dialog } from 'primereact/dialog';
import "./dialog.css";

function DialogHeader({ id, visible, onHide, headerContent, className, children, ...rest }) {

    const classname = className + " custom-dialog dialog-header";

    return (
        <div className="card dialog-container">
            <Dialog id={ id + "DialogHeader"} className={classname}
                visible={visible}
                modal
                header={headerContent}
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

export default DialogHeader;

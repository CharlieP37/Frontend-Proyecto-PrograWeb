import React from "react";
import { Dialog } from 'primereact/dialog';
import "./dialog.css";

function DialogHeader({ id, visible, onHide, headerContent, children, ...rest }) {

    return (
        <div className="card dialog-container">
            <Dialog id={ id + "DialogHeader"} className="custom-dialog dialog-header"
                visible={visible}
                modal
                header={headerContent}
                onHide={onHide}
            >
                <div className="dialog-elements-container" id={ id + "DialogElementsContainer"}>
                    {children}
                </div>
            </Dialog>
        </div>
    );
}

export default DialogHeader;

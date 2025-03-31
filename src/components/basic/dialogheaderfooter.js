import React from "react";
import { Dialog } from 'primereact/dialog';
import "./dialog.css";

function DialogFull({ id, visible, onHide, headerContent, footerContent, children, ...rest }) {

    return (
        <div className="card dialog-container">
            <Dialog id={ id + "DialogFull"} className="custom-dialog dialog-full"
                visible={visible}
                modal
                header={headerContent}
                footer={footerContent}
                onHide={onHide}
            >
                <div className="dialog-elements-container" id={ id + "DialogElementsContainer"}>
                    {children}
                </div>
            </Dialog>
        </div>
    );
}

export default DialogFull;

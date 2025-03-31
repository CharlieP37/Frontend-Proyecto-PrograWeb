import React from "react";
import { Dialog } from 'primereact/dialog';
import "./dialog.css";

function DialogDefault({ id, visible, onHide, children, ...rest }) {
    
    return (
        <div className="card dialog-container">
            <Dialog id={ id + "DialogDefault" } className="custom-dialog dialog-default"
                visible={visible}
                modal
                content={( ) => (
                        <div className="dialog-elements-container" id={ id + "DialogElementsContainer"}>
                            {children}
                        </div>
                    )
                }
                onHide={onHide}
                {...rest}
            >
            </Dialog>
        </div>
    );
}

export default DialogDefault;

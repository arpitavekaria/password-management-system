import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the interface for props
interface ConfirmationProps {
    isOpen: boolean; // isOpen will control whether the dialog is open
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // setIsOpen is the function to change the dialog's state
    title: string;
    description: string;
    saveButtonText: string;
    cancelButtonText: string;
    onSave: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
                                                       isOpen,
                                                       setIsOpen,
                                                       title,
                                                       description,
                                                       saveButtonText,
                                                       cancelButtonText,
                                                       onSave
                                                   }) => {
    // Function to handle closing the dialog
    const handleClose = () => {
        setIsOpen(false); // Close the dialog by setting isOpen to false
    };

    // Function for the action to continue
    const handleAction = () => {
        onSave(); // Trigger the onSave callback passed via props
        handleClose(); // Close the dialog
    };

    return (
        <>
            {/* Control the dialog open/close state */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleClose}>{cancelButtonText}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAction}>{saveButtonText}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Confirmation;

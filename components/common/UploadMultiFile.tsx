"use client";
import React, { Fragment, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import Loading from "@/components/common/Loader";
import Image from "next/image";

// Define types for the component props
interface UploadMultiFileProps {
    getImage: (files: File[]) => void;
    fieldName: string;
}

export const UploadMultiFile: React.FC<UploadMultiFileProps> = ({ getImage, fieldName }) => {
    const [files, setFiles] = useState<File[]>([]);  // State for multiple file uploads
    const [loading, setLoading] = useState<boolean>(false);  // Loading state

    // Type the options for the dropzone
    const dropzoneOptions: DropzoneOptions = {
        maxFiles: 5,
        maxSize: 2000000,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
        },
        onDrop: (acceptedFiles: File[]) => {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...acceptedFiles.map((file) => Object.assign(file)),
            ]);
        },
        onDropRejected: () => {
            toast('You can only upload up to 5 files & each file should be 2MB max.');
        },
    };

    const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

    const renderFilePreview = (file: File) => {
        if (file.type.startsWith('image')) {
            return <Image width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />;
        } else {
            return <i className="bx bx-transfer-alt" />;
        }
    };

    // Handle file removal
    const handleRemoveFile = (file: File) => {
        setFiles((prevFiles) => prevFiles.filter((item) => item.name !== file.name));
        getImage(files.filter((item) => item.name !== file.name));
    };

    const fileList = files.map((file) => (
        <li key={file.name} className="flex justify-between items-center">
            <div className="flex items-center">
                <div className="mr-2">{renderFilePreview(file)}</div>
                <span className="text-sm">{file.name}</span>
            </div>
            <button onClick={() => handleRemoveFile(file)} className="text-gray-500 hover:text-gray-700">
                <i className="bx bx-cross" />
            </button>
        </li>
    ));

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone border-dashed bg-[#f1f0ef] dark:bg-background  border-2 border-gray-300 p-6 rounded-md flex flex-col items-center' })}>
                <Loading loading={loading} />
                <Input {...getInputProps()} />
                {/*<Upload className="mb-4 w-64" />*/}
                <div className="text-center">
                    <h5 className="text-xl mb-2">Drop {fieldName} here or click to upload.</h5>
                    {/*<p className="text-gray-500">Allowed *.jpeg, *.jpg, *.png, *.jpeg (Max 5 files)</p>*/}
                </div>
            </div>

            {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {fileList}
                </ul>
            )}
        </Fragment>
    );
};


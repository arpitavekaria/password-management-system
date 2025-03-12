"use client";
import { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Loading from "@/components/common/Loader";
import Image from "next/image";
import {deleteProject, imageUpload} from "@/server/project";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface UploadFileProps {
    getImage: (image: string | File[]) => void;
    fieldName: string;
}

interface UploadedFile extends File {
    preview: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({ getImage, fieldName }) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        maxSize: 2000000,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length === 1) {
                const uploadedFile = Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0]),
                });

                setFiles([uploadedFile]);
                setShowImage(true);

                const formData = new FormData();
                formData.append("file", uploadedFile);

                handleUpload(formData)

                // Uncomment and implement API logic
                // setLoading(true);
                // dispatch(addImage(formData)).then((res) => {
                //   setLoading(false);
                //   if (res.payload.filename) {
                //     getImage(res.payload.filename);
                //     setShowImage(true);
                //   } else {
                //     const message = res.payload.response.data.message;
                //     toast.error(message);
                //   }
                // });
            }
        },
        onDropRejected: () => {
            toast("You can only upload 1 file & maximum size of 2 MB.");
        },
    });


    const handleUpload = async (data:any) => {
        const fetchedData = await imageUpload(data);

        if (fetchedData) {
            console.log(fetchedData);
            if (fetchedData?.status === ApiResponseType.SUCCESS) {
                getImage(fetchedData?.data?.image_path);
            } else {
                if (Array.isArray(fetchedData?.error) && fetchedData.error.length > 0) {
                    toast.error(fetchedData.error[0]);
                } else if (typeof fetchedData?.error === 'string') {
                    toast.error(fetchedData.error);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    }

    const handleRemoveFile = (file: UploadedFile) => {
        const filtered = files.filter((f) => f.name !== file.name);
        setFiles(filtered);
        getImage(filtered.length === 0 ? "" : filtered);
    };

    const fileList = files.map((file) => (
        <li key={file.name} className="flex justify-between items-center">
            <div className="flex items-center">
                <Image width={38} height={38} alt={file.name} src={file.preview} className="mr-2" />
                <span className="text-sm">{file.name}</span>
            </div>
            <button
                onClick={() => handleRemoveFile(file)}
                className="text-gray-500 hover:text-gray-700"
            >
                <X />
            </button>
        </li>
    ));

    return (
        <Fragment>
            <div
                {...getRootProps({
                    className:
                        "dropzone border-dashed border-2 border-gray-300 bg-[#f1f0ef] dark:bg-background p-6 rounded-md flex flex-col items-center",
                })}
            >
                <Loading loading={loading} />
                <Input {...getInputProps()} />
                {/*<Upload className="mb-4 w-64" />*/}
                <div className="text-center">
                    <h5 className="text-xl mb-2">Drop {fieldName} here or click to upload.</h5>
                    {/*<p className="text-gray-500">Allowed: *.jpeg, *.jpg, *.png</p>*/}
                </div>
            </div>
            {showImage && files.length > 0 && <ul className="mt-4 space-y-2">{fileList}</ul>}
        </Fragment>
    );
};

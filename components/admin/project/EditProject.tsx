"use client";

import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {DialogClose, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {startTransition, useActionState, useEffect, useMemo, useState} from "react";
import {toast} from "sonner";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import {useCommonStore} from "@/components/store/common";
import {editProject, getProjectById} from "@/server/project";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UploadFile} from "@/components/common/UploadFile";
import {getAllClients} from "@/server/client";
import Image from "next/image";

const EditProject = (props: any) => {
    const {closeModal, loadData, dataId} = props

    const [image, setImage] = useState<File | null>(null)
    const [editImage, setEditImage] = useState<string>('')
    const [clients, setClients] = useState<{ id: string, name: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const setIsLoading = useCommonStore((state: any) => state.setIsLoading);
    const [state, dispatch, isPending] = useActionState(editProject, undefined);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await getAllClients();
                setClients(result.data);
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching clients");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await getProjectById(dataId);
                console.log("Fetched client ID:", result?.data?.client_id);

                console.log(result?.data?.image);
                setValue('name', result?.data?.name);
                setValue('client', String(result?.data?.client_id));
                setEditImage(result?.data?.image)
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const schema = yup.object().shape({
        name: yup.string().required("Name Is Required."),
        client: yup.string().required("Client Is Required."),
    });

    type FormData = {
        name: string;
        client: string;
    };

    const defaultValues: FormData = useMemo(() => ({
        name: '',
        client: '',
    }), []);

    const {
        control,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        console.log(data)

        try {
            const {name, client} = data;

            const formData = {
                id: dataId,
                name: name,
                client: client,
                image: editImage !== '' ? editImage : image,
            };

            startTransition(() => {
                dispatch(formData);
            });

        } catch (error) {
            console.error("Error fetching register session:", error);
        }
    }

    useEffect(() => {
        if (state?.status === ApiResponseType.SUCCESS) {
            const handleSessionCreation = async () => {
                try {
                    toast.success(state?.data?.message);
                    console.log(state?.data);

                    closeModal()
                    loadData()
                } catch (error) {
                    console.error("Session creation failed:", error);
                }
            };

            handleSessionCreation();
        }

        if (state?.status === ApiResponseType.ERROR) {
            if (Array.isArray(state?.error) && state.error.length > 0) {
                toast.error(state.error[0]);
            } else if (typeof state?.error === 'string') {
                toast.error(state.error);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }, [state]);

    useEffect(() => {
        if (isPending) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isPending]);

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-y-4 gap-x-4 sm:grid-cols-12">
                <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                    <Label htmlFor="name">Name</Label>
                    <Controller
                        name="name"
                        control={control}
                        render={({field: {value, onChange, onBlur}}) => (
                            <Input
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='Name'
                            />

                        )}
                    />
                    {errors.name && (
                        <div className="p-1 text-sm text-danger" role="alert">
                            <i className="bx bx-error-circle"/> {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                    <Label htmlFor="client">Client</Label>
                    <Controller
                        name="client"
                        control={control}
                        render={({field: {value, onChange}}) => (
                            <Select
                                value={value ? String(value) : ""}
                                onValueChange={(selectedValue) => onChange(String(selectedValue))}
                            >
                                <SelectTrigger className="w-full shadow-none">
                                    <SelectValue placeholder="Select Client"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <Input
                                        type="text"
                                        className="w-full px-3 py-2 mb-2"
                                        placeholder="Search client..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

                                    {clients.length > 0 ? (
                                        clients
                                            .filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((client) => (
                                                <SelectItem key={client.id}
                                                            value={String(client.id)}>
                                                    {client.name}
                                                </SelectItem>
                                            ))
                                    ) : (
                                        <div className="p-2 text-center text-gray-500">No clients found</div>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.client && (
                        <div className="p-1 text-sm text-danger" role="alert">
                            <i className="bx bx-error-circle"/> {String(errors.client?.message)}
                        </div>
                    )}
                </div>

                <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                    <Label htmlFor="name">Image</Label>

                    <UploadFile
                        getImage={(value: any) => {
                            setImage(value)
                        }}
                        fieldName='Image'/>
                </div>

                {editImage !== '' && <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                    <div>
                        <Image src={editImage} alt='Edit Image' height={50} width={50}/>
                    </div>
                </div>}

            </div>
            <DialogFooter className="sm:justify-start mt-3">
                <Button type="submit" className='bg-[#5c67f7]'>
                    Save
                </Button>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={() => closeModal()}>
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </form>

    )
        ;
};

export default EditProject;

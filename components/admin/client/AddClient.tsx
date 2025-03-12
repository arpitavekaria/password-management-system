"use client";

import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {DialogClose, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {startTransition, useActionState, useEffect, useMemo} from "react";
import {toast} from "sonner";
import {addClient} from "@/server/client";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import {useCommonStore} from "@/components/store/common";

const AddClient = (props: any) => {
    const {closeModal,loadData} = props

    const setIsLoading = useCommonStore((state:any) => state.setIsLoading);
    const [state, dispatch, isPending] = useActionState(addClient, undefined);

    const schema = yup.object().shape({
        name: yup.string().required("Name Is Required."),
    });

    type FormData = {
        name: string;
    };

    const defaultValues: FormData = useMemo(() => ({
        name: '',
    }), []);

    const {
        control,
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
            const {name} = data;

            const formData = {
                name: name,
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

export default AddClient;

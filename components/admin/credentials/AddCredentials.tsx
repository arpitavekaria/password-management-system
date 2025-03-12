"use client";
import React, {startTransition, useActionState, useEffect, useMemo, useState} from 'react';
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import BreadCrumbUi from "@/components/common/BreadCrumb";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Link from "next/link";
import {useCommonStore} from "@/components/store/common";
import {getAllProjects} from "@/server/project";
import {addCredential} from "@/server/credential";
import {getAllCredentialTypes} from "@/server/credential-type";
import Loading from "@/components/common/Loader";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import useCustomNavigation from "@/hooks/useCustomNavigation";

type FormData = {
    username: string;
    password: string;
    notes: string;
    project: string;
    type: string;
};

const AddCredentials = () => {
    const [searchProjectTerm, setSearchProjectTerm] = useState("");
    const [searchTypeTerm, setSearchTypeTerm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [projects, setProjects] = useState<{ id: string, name: string }[]>([]);
    const [types, setTypes] = useState<{ id: string, name: string }[]>([]);

    const [state, dispatch, isPending] = useActionState(addCredential, undefined);

    const setIsLoading = useCommonStore((state: any) => state.setIsLoading);
    const isLoading = useCommonStore((state: any) => state.isLoading);

    const {navigateTo} = useCustomNavigation();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await getAllProjects();
                setProjects(result.data);
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
                const result = await getAllCredentialTypes();
                setTypes(result.data);
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching clients");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const schema = yup.object().shape({
        username: yup.string().required("User name Is Required."),
        password: yup.string().required("Password Is Required."),
        notes: yup.string(),
        project: yup.string().required("Project Is Required."),
        type: yup.string().required("Credentials Type Is Required."),
    });

    const defaultValues: FormData = useMemo(() => ({
        username: '',
        password: '',
        notes: '',
        project: '',
        type: '',
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
            const {username, password, notes, project, type} = data;

            const formData = {
                project_id: project,
                credential_type_id: type,
                username: username,
                password: password,
                notes: notes,
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

                    const timer = setTimeout(() => {
                        navigateTo('/admin/credentials');
                    }, 500);

                    return () => {
                        clearTimeout(timer);
                    };

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
        <>
            <Loading loading={isLoading}/>
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Menu" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">Credentials</span>
                    </div>
                </div>
            </div>
            <div className="col-span-12 mt-6">
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Card className='rounded-sm border-0'>
                        <CardHeader className="rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3">
                            <CardTitle>Add Credentials</CardTitle>
                        </CardHeader>
                        <CardContent className='pt-3'>
                            <div className="grid grid-cols-6 gap-y-4 gap-x-4 sm:grid-cols-12">
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="email">Project</Label>
                                    <Controller
                                        name="project"
                                        control={control}
                                        defaultValue="light"
                                        render={({field: {value, onChange}}) => {

                                            return (
                                                <Select
                                                    value={value ? String(value) : ""}
                                                    onValueChange={(selectedValue) => onChange(String(selectedValue))}
                                                >
                                                    <SelectTrigger className="w-full shadow-none">
                                                        <SelectValue placeholder="Project"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <Input
                                                            type="text"
                                                            className="w-full px-3 py-2 mb-2"
                                                            placeholder="Search project..."
                                                            value={searchProjectTerm}
                                                            onChange={(e) => setSearchProjectTerm(e.target.value)}
                                                        />

                                                        {projects.length > 0 ? (
                                                            projects
                                                                .filter(project => project.name.toLowerCase().includes(searchProjectTerm.toLowerCase()))
                                                                .map((project) => (
                                                                    <SelectItem key={project.id} value={String(project.id)}>
                                                                        {project.name}
                                                                    </SelectItem>
                                                                ))
                                                        ) : (
                                                            <div className="p-2 text-center text-gray-500">No projects found</div>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />
                                    {errors.project && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.project.message}
                                        </div>
                                    )}
                                </div>
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="email">Credentials Type</Label>
                                    <Controller
                                        name="type"
                                        control={control}
                                        defaultValue="light"
                                        render={({field: {value, onChange}}) => {

                                            return (
                                                <Select
                                                    value={value ? String(value) : ""}
                                                    onValueChange={(selectedValue) => onChange(String(selectedValue))}
                                                >
                                                    <SelectTrigger className="w-full shadow-none">
                                                        <SelectValue placeholder="Credentials Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <Input
                                                            type="text"
                                                            className="w-full px-3 py-2 mb-2"
                                                            placeholder="Search Credentials Type..."
                                                            value={searchTypeTerm}
                                                            onChange={(e) => setSearchTypeTerm(e.target.value)}
                                                        />

                                                        {types.length > 0 ? (
                                                            types
                                                                .filter(type => type.name.toLowerCase().includes(searchTypeTerm.toLowerCase()))
                                                                .map((type) => (
                                                                    <SelectItem key={type.id} value={String(type.id)}>
                                                                        {type.name}
                                                                    </SelectItem>
                                                                ))
                                                        ) : (
                                                            <div className="p-2 text-center text-gray-500">No credentials types found</div>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />
                                    {errors.type && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.type.message}
                                        </div>
                                    )}
                                </div>
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="username">User Name</Label>
                                    <Controller
                                        name="username"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <Input
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='User Name'
                                            />

                                        )}
                                    />
                                    {errors.username && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.username.message}
                                        </div>
                                    )}

                                </div>
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="email">Password</Label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password" value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    autoComplete="new-password"
                                                    placeholder='Password'
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showPassword ? (
                                                        <span><i className="bx bx-show"/></span>
                                                    ) : (
                                                        <span><i className="bx bx-low-vision"/></span>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    />
                                    {errors.password && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Controller
                                        name="notes"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <Textarea
                                                className='shadow-none'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Notes'
                                            />

                                        )}
                                    />
                                    {errors.notes && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.notes.message}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end items-center py-3 gap-2">
                        <Link href='/admin/credentials'>
                            <Button size="lg" className='shadow-none'>Back</Button>
                        </Link>
                        <Button size="lg" type='submit' className='bg-[#5c67f7] shadow-none'>Save</Button>
                    </div>

                </form>
            </div>

        </>
    );
};

export default AddCredentials;
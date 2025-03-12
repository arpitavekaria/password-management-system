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
import Link from "next/link";
import {SelectDate} from "@/components/common/DatePicker";
import {UploadFile} from "@/components/common/UploadFile";
import {editUser, getUserById} from "@/server/user";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import moment from "moment";
import useCustomNavigation from "@/hooks/useCustomNavigation";
import {useCommonStore} from "@/components/store/common";
import Loading from "@/components/common/Loader";
import Image from "next/image";
import {getAllTechnologies} from "@/server/technology";
import {Select, SelectContent, SelectTrigger} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";

type FormData = {
    name: string;
    email: string;
    password?: string;
    address: string;
    aadhar_card_no: string;
    date: any;
    technologies: any[];
};

const EditUser = ({id}: { id: string }) => {

    const [image, setImage] = useState<File | null>(null)
    const [editImage, setEditImage] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false);
    const [dob, setDob] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [technologyList, setTechnologyList] = useState<{ id: string, name: string }[]>([]);

    const [state, dispatch, isPending] = useActionState(editUser, undefined);
    const setIsLoading = useCommonStore((state: any) => state.setIsLoading);
    const isLoading = useCommonStore((state: any) => state.isLoading);

    const {navigateTo} = useCustomNavigation();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const result = await getAllTechnologies();
                setTechnologyList(result.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const result = await getUserById(id);

                console.log(result?.data?.image);
                setValue('name', result?.data?.name);
                setValue('address', result?.data?.address);
                setValue('email', result?.data?.email);
                setValue('aadhar_card_no', result?.data?.aadhar_card_no);
                setEditImage(result?.data?.image)
                const date = moment(result?.data?.dob).toDate();
                setValue('date', date)
                setDob(result?.data?.dob)
                const techIds = result?.data?.technologies?.flatMap((value: any) => value.technology_id);
                setValue('technologies', techIds)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const schema = yup.object().shape({
        name: yup.string().required("Name Is Required."),
        email: yup.string().required("Email Is Required."),
        password: yup.string(),
        address: yup.string().required("Address Is Required."),
        aadhar_card_no: yup.string().required("Aadhar card no Is Required."),
        date: yup.date().typeError("Date is required").required("Date is required."),
        technologies: yup
            .array()
            .min(1, "At least one technology is required.") // Require at least one selection
            .required("Technology is required.")
    });

    const defaultValues: FormData = useMemo(() => ({
        name: '',
        email: '',
        password: '',
        address: '',
        aadhar_card_no: '',
        date: '',
        technologies: [],
    }), []);

    const {
        control,
        setError,
        handleSubmit,
        formState: {errors},
        setValue,
        clearErrors
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    // const onDateChange = (date: any) => {
    //     setDate(date);
    // }

    // const onDateChange = (date: any | null) => {
    //     if (date) {
    //         // const formattedDate = format(date, "yyyy-MM-dd");
    //         // console.log(formattedDate)
    //         console.log(date)
    //         setValue("date", date);
    //     }
    // };

    const onInputChange = (e: any) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        if (value.length < 12) {
            setError('aadhar_card_no', {
                type: 'manual',
                message: "Enter Valid aadhar card no",
            });
        } else if (value.length === 12) {
            clearErrors('aadhar_card_no');
        }

        setValue('aadhar_card_no', value.slice(0, 12));
    };


    const onDateChange = (date: any | null) => {
        if (date) {
            const formattedDate = moment(date).format("YYYY-MM-DD");
            setValue("date", date);
            setDob(formattedDate);
        }
    };

    const onSubmit = (data: any) => {
        console.log(data)

        try {
            const {name, email, password, address, aadhar_card_no, technologies} = data;

            const formData = {
                id: id,
                name: name,
                email: email,
                password: password,
                dob: dob,
                address: address,
                aadhar_card_no: aadhar_card_no,
                image: editImage !== '' ? editImage : image,
                technologies: technologies,
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
                        navigateTo('/admin/user');
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
            <Loading loading={loading}/>
            <Loading loading={isLoading}/>
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Menu" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">User</span>
                    </div>
                </div>
            </div>
            <div className="col-span-12 mt-6">
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Card className='rounded-sm border-0'>
                        <CardHeader className="rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3">
                            <CardTitle>Edit User</CardTitle>
                        </CardHeader>
                        <CardContent className='pt-3'>
                            <div className="grid grid-cols-6 gap-y-4 gap-x-4 sm:grid-cols-12">
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
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
                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="email">Email</Label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <Input
                                                type='email'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Email'
                                            />

                                        )}
                                    />
                                    {errors.email && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.email.message}
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
                                                        <span><i className="bx bx-low-vision"/></span> // Replace with your hidden icon
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

                                {/*<div className="xl:col-span-6 col-span-6 sm:grid-cols-12">*/}
                                {/*    <Label htmlFor="phone">Pick Date</Label>*/}
                                {/*    <SelectDate*/}
                                {/*        onDateChange={onDateChange}*/}
                                {/*        selectedDate={date}*/}
                                {/*        placeHolder="Pick a date"/>*/}
                                {/*</div>*/}

                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="date">DOB</Label>
                                    <Controller
                                        name="date"
                                        control={control}
                                        render={({field}) => (
                                            <SelectDate
                                                selectedDate={field.value}
                                                onDateChange={onDateChange}
                                                placeHolder="Select date"
                                            />
                                        )}
                                    />
                                    {errors.date?.message && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {String(errors.date?.message)}
                                        </div>
                                    )}
                                </div>

                                {/*<div className="xl:col-span-6 col-span-6 sm:grid-cols-12">*/}
                                {/*    <Label htmlFor="aadhar_card_no">Aadhar Card No.</Label>*/}
                                {/*    <Controller*/}
                                {/*        name="aadhar_card_no"*/}
                                {/*        control={control}*/}
                                {/*        render={({field: {value, onChange, onBlur}}) => (*/}
                                {/*            <Input*/}
                                {/*                value={value}*/}
                                {/*                onBlur={onBlur}*/}
                                {/*                onChange={onChange}*/}
                                {/*                placeholder='Aadhar Card No.'*/}
                                {/*            />*/}

                                {/*        )}*/}
                                {/*    />*/}
                                {/*    {errors.aadhar_card_no && (*/}
                                {/*        <div className="p-1 text-sm text-danger" role="alert">*/}
                                {/*            <i className="bx bx-error-circle"/> {errors.aadhar_card_no.message}*/}
                                {/*        </div>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="aadhar_card_no">Aadhar Card No</Label>
                                    <Controller
                                        name="aadhar_card_no"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <Input
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={(e) => onInputChange(e)}
                                                placeholder='Aadhar Card No'
                                            />

                                        )}
                                    />
                                    {errors.aadhar_card_no && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.aadhar_card_no.message}
                                        </div>
                                    )}

                                </div>

                                <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                                    <Label htmlFor="email">Technology</Label>
                                    <Controller
                                        name="technologies"
                                        defaultValue={[]} // Store selected technology IDs
                                        control={control}
                                        render={({field: {value = [], onChange}}) => {
                                            const handleChange = (selectedId: string) => {
                                                if (value.includes(selectedId)) {
                                                    onChange(value.filter((id: string) => id !== selectedId));
                                                } else {
                                                    onChange([...value, selectedId]);
                                                }
                                            };

                                            const selectedNames = technologyList
                                                .filter((tech) => value.includes(tech.id))
                                                .map((tech) => tech.name)
                                                .join(", ");

                                            return (
                                                <Select>
                                                    <SelectTrigger className="w-full">
                    <span>
                        {selectedNames || "Select Technology"}
                    </span>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <Input
                                                            type="text"
                                                            className="w-full px-3 py-2"
                                                            placeholder="Search Technology..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />

                                                        {technologyList.length > 0 ? (
                                                            technologyList
                                                                .filter((option) =>
                                                                    option.name.toLowerCase().includes(searchTerm.toLowerCase())
                                                                )
                                                                .map((option) => (
                                                                    <div
                                                                        key={option.id}
                                                                        className="flex items-center space-x-2 px-3 py-2"
                                                                    >
                                                                        <Checkbox
                                                                            id={option.id}
                                                                            checked={value.includes(option.id)}
                                                                            onCheckedChange={() => handleChange(option.id)}
                                                                        />
                                                                        <label htmlFor={option.id} className="text-sm">
                                                                            {option.name}
                                                                        </label>
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            <div className="p-2 text-center text-gray-500">No technology
                                                                found</div>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />
                                    {errors.technologies && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.technologies.message}
                                        </div>
                                    )}
                                </div>


                                <div className="xl:col-span-12 col-span-12 sm:grid-cols-12">
                                    <Label htmlFor="address">Address</Label>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({field: {value, onChange, onBlur}}) => (
                                            <Textarea
                                                className='shadow-none'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Address'
                                            />

                                        )}
                                    />
                                    {errors.address && (
                                        <div className="p-1 text-sm text-danger" role="alert">
                                            <i className="bx bx-error-circle"/> {errors.address.message}
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
                                        <Image src={editImage} alt='Edit Image' height={100} width={100}/>
                                    </div>
                                </div>}

                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end items-center py-3 gap-2">
                        <Link href='/admin/user'>
                            <Button size="lg" className='shadow-none'>Back</Button>
                        </Link>
                        <Button size="lg" type='submit' className='bg-[#5c67f7] shadow-none'>Save</Button>
                    </div>

                </form>
            </div>

        </>
    );
};

export default EditUser;
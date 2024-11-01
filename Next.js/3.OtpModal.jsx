"use client"
import { set, z } from 'zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Input from '@/components/atoms/inputs/Input'
import Label from '@/components/atoms/labels/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOtp, getOtp } from '@/services/authService'
import BackButton from '@/components/atoms/buttons/BackButton'
import SubmitButton from '@/components/atoms/buttons/SubmitButton'

const schema = z.object({
    verify_code: z.string().min(5, { message: "لطفا کد را وارد کنید" }).max(5, { message: "کد پنج رقمیست" })
})
export default function OtpModal({ nextStep, prevStep, phone, setPhone }) {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(schema)
        }
    )

    const [loading, setLoading] = useState(false)
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0o0);

    const handleBack = () => {
        prevStep()
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds, minutes]);

    const resendOTP = async () => {
        setLoading(true)
        await getOtp(phone)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('کد مجددا ارسال شد', {
                        position: "top-right",
                    });
                    setMinutes(2);
                    setSeconds(0o0);
                    setLoading(false)
                } else {
                    toast.error(res.errors.phone[0])
                }
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            })
    };

    const submitHandler = async (data) => {
        setLoading(true)
        const verifyData = { ...data, ...phone }
        await checkOtp(verifyData)
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    toast.success('کد تایید شد', {
                        position: "top-center",
                    });
                    if (res.data.user.first_name === null || res.data.user.last_name === null) {
                        nextStep()
                    } else {
                        router.push("/")
                        toast.success('با موفقیت وارد شدید', {
                            position: "top-center",
                        });
                    }
                    setLoading(false)
                } else {
                    toast.error(res.data.message, {
                        position: "top-center"
                    })
                    setLoading(false)
                }
            }).catch((error) => {
                console.log(error);
                toast.error("مشکل در برقراری ارتباط", {
                    position: "top-center"
                })
                setLoading(false)
            })
    }

    return (
        <div className='modal-container'>
            <form onSubmit={handleSubmit(submitHandler)} className='modal-form relative'>
                <div className='flex flex-col w-full items-start'>
                    <span className='text-3xl font-semibold mb-3'>احراز هویت</span>
                    <Label htmlFor="otp">کد ارسالی را وارد کنید</Label>
                    <div className='flex items-center gap-2 w-full'>
                        <input {...register("verify_code")} className={`input input-bordered w-full font-numerals my-2 ${errors.verify_code ? "input-error" : null}`} name="verify_code" type="text" placeholder="کد ارسالی" />
                        <button disabled={seconds > 0 || minutes > 0} onClick={resendOTP} className={`font-numerals px-4 py-3 text-white rounded-lg min-w-20 flex items-center justify-center ${seconds > 0 || minutes > 0 ? 'bg-[#54515d]' : 'bg-[#5227CC]'}`}>
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : "تمدید "}
                        </button>
                    </div>
                    <div className='flex gap-2 mt-2 sm:w-full'>
                        <SubmitButton loading={loading} type="submit" text="ورود" />
                    </div>
                </div>
            </form>
        </div>
    )
}

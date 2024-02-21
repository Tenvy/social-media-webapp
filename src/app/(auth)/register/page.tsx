'use client';
import React, { useState } from 'react';
import { CreateUser } from '@/services/register';
import { userType } from '@/type/user';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const Form = () => {
  const [formData, setFormData] = useState<userType>({
    Username: '',
    Password: '',
    Email: '',
    NamaLengkap: '',
    Alamat: '',
  });
  const [confirm, setConfirm] = useState<Boolean>()
  const { toast } = useToast()

  const register = async () => {
    try {
        if(formData.Username === '' || formData.Password === '' || formData.NamaLengkap === '' || formData.Email === '' || formData.Alamat === '') { return toast({title: 'Validation Error', description: 'All Data Must be filled'})}
        if (!confirm) return toast({title: 'Password Error', description: 'Confirm Password field Doesnt Match'})
      const response = await CreateUser(formData);
      if(response) return toast({title: 'Server Message', description: response.msg})
    console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if(formData.Password === value) setConfirm(true)
    else setConfirm(false)
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-screen w-screen flex flex-nowrap justify-center items-center px-3">
      <div className="min-w-fit px-6 min-h-fit w-[40vh] py-5 rounded-xl flex flex-col gap-4 border text-primary-color">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>
        <div>
          <h2 className="text-md font-semibold pb-2">Full Name</h2>
          <Input onChange={onChangeInput} type="text" placeholder="John Doe" name="NamaLengkap" className="w-full rounded-full py-2 px-4 border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold pb-2">Username</h2>
          <Input onChange={onChangeInput} type="text" placeholder="Username" name="Username" className="w-full rounded-full py-2 px-4 border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold pb-2">Email</h2>
          <Input onChange={onChangeInput} type="email" placeholder="name@example.com" name="Email" className="w-full rounded-full py-2 px-4 border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold pb-2">Alamat</h2>
          <Input onChange={onChangeInput} type="text" placeholder="St. here" name="Alamat" className="w-full rounded-full py-2 px-4 border" required />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <h2 className="text-md font-semibold pb-2">Password</h2>
            <Input onChange={onChangeInput} type="password" name="Password" placeholder="Secret" className="w-full rounded-full py-2 px-4 border" required />
          </div>
          <div>
            <h2 className={`text-md font-semibold pb-2 ${!confirm && `after:content-['*'] after:text-red-700`}`}>Confirm Password</h2>
            <Input onChange={checkPassword} type="password" placeholder="Secret" className="w-full rounded-full py-2 px-4 border" required />
          </div>
        </div>
        <Button onClick={()=> register()} className="p-3 rounded-full">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Form;
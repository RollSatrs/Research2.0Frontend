"use client"  

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { toast } from "sonner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError]= useState("")

    const handlerFunction = async(e: React.FormEvent)=>{
      e.preventDefault()
      console.log('handler submit')
      setLoading(true)
      setError("")
      if (password !== confirmPassword) {
        toast.warning("Пароли не совпадают")
        setLoading(false)
        return
      }

      try{
        const response = await fetch("/api/signup",{
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({fullname, email, password})
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || "Произошла ошибка")
        }
        toast.success(`Аккаунт ${fullname} успешно создан!`)

      }
      catch(err: any){
        toast.error(err.message || "Произошла ошибка при регистрации")

      }
      finally{
        console.log('finaly')
        setLoading(false)
      }


    }

  return (
    <form onSubmit={handlerFunction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Создайте аккаунт</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Заполните фор му ниже, чтобы создать свой аккаунт
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Полное имя</FieldLabel>
          <Input 
            id="name" 
            type="text" 
            placeholder="Иван Иванов" 
            required 
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Электронная почта</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@mail.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldDescription>
            Мы будем использовать эту почту для связи с вами. Мы не будем
            передавать вашу почту третьим лицам.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldDescription>
            Должен содержать не менее 8 символов.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Подтвердите пароль</FieldLabel>
          <Input 
              id="confirm-password" 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <FieldDescription>Пожалуйста, подтвердите ваш пароль.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner className="mr-2" /> : null}
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Уже есть аккаунт? <a href="/auth/login">Войти</a>
          </FieldDescription>
        </Field>
      </FieldGroup> 
    </form>
  )
}

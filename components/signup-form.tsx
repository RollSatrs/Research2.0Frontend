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
import { AlertError } from "./alert"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Register } from "@/lib/api/auth"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handlerFunction = async(e: React.FormEvent)=>{
      e.preventDefault()

      try{
        setError("")
        console.log("1")
        if (password !== confirmPassword) {
          console.log("error")
          setError("Пароли не совподают")
          setLoading(false)
          return
        }
        console.log("2")
        const data = await Register({fullname, email, password})
        console.log('Успешна регистрация', data)

      }catch(err: any){
        setError(err.message)
        console.log("Ошибка: ",err)

      }finally{
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
        {error && (
          <p className="text-red-600 text-sm mt-1">
            {error}
          </p>
        )}
        <Field>
          <FieldDescription className="px-6 text-center">
            Уже есть аккаунт? <a href="/auth/login">Войти</a>
          </FieldDescription>
        </Field>
      </FieldGroup> 
    </form>
  )
}

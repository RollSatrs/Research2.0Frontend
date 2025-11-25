"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import React, {useState} from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlerSubmit =async(e: React.FormEvent) =>{
    e.preventDefault()

    try{
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({email, password})

      })
    }catch(err){

    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Вход в аккаунт</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Введите вашу электронную почту для входа в аккаунт
          </p>
        </div>
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
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Забыли пароль?
            </a>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button>Войти</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Нет аккаунта?{" "}
            <a href="/auth/register" className="underline underline-offset-4">
              Зарегистрироваться
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

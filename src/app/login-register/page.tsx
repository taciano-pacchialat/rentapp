"use client";

import "@radix-ui/themes/styles.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function AuthView() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerDNI, setRegisterDNI] = useState("");
  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
  });

  const base_url = "http://localhost:8000";

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const validateDNI = (dni: string) => {
    const re = /^\d{7,8}$/;
    return re.test(dni);
  };

  // TODO manejar error de login correctamente
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(base_url + "/api/auth/login/", {
        email: loginEmail,
        password: loginPassword,
      });
      const token = response.data.token;

      // TODO almacenarlo como una cookie.
      // Por simplicidad, se almacena en localStorage.
      localStorage.setItem("token", token);
    } catch {
      setLoginError("Credenciales inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(base_url + "/api/auth/register/", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confirm_password: confirmPassword,
        dni: registerDNI,
      });

      // TODO loguear al usuario si el registro fue exitoso
      // setActiveTab('login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setRegisterErrors((prevErrors) => ({
          ...prevErrors,
          ...error.response?.data.errors,
        }));
      } else {
        setRegisterErrors((prevErrors) => ({
          ...prevErrors,
          general: "Ocurrió un error al registrarse. Por favor, inténtelo de nuevo.",
        }));
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loginEmail || loginPassword) {
      setLoginError("");
    }
  }, [loginEmail, loginPassword]);

  // Effect to validate register form as user types
  useEffect(() => {
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dni: "",
    };

    if (registerName && registerName.length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres.";
    }

    if (registerEmail && !validateEmail(registerEmail)) {
      errors.email = "Por favor, ingrese un email válido.";
    }

    if (registerPassword && !validatePassword(registerPassword)) {
      errors.password =
        "La contraseña debe tener al menos 8 caracteres, dos números y dos carácteres especiales.";
    }

    if (confirmPassword && registerPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (registerDNI && !validateDNI(registerDNI)) {
      errors.dni = "El DNI debe tener entre 7 y 8 dígitos.";
    }

    setRegisterErrors(errors);
  }, [registerName, registerEmail, registerPassword, confirmPassword, registerDNI]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">RentApp</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Gestiona tus alquileres de forma fácil y segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Correo Electrónico</Label>
                    <Input
                      id="email-login"
                      placeholder="tu@ejemplo.com"
                      required
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password-login"
                        required
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                    {registerErrors.name && (
                      <p className="text-sm text-red-500">{registerErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Correo Electrónico</Label>
                    <Input
                      id="email-register"
                      placeholder="tu@ejemplo.com"
                      required
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    {registerErrors.email && (
                      <p className="text-sm text-red-500">{registerErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni-register">DNI</Label>
                    <Input
                      id="dni-register"
                      placeholder="12345678"
                      required
                      type="text"
                      value={registerDNI}
                      onChange={(e) => setRegisterDNI(e.target.value)}
                    />
                    {registerErrors.dni && (
                      <p className="text-sm text-red-500">{registerErrors.dni}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password-register"
                        required
                        type={showPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {registerErrors.password && (
                      <p className="text-sm text-red-500">{registerErrors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input
                      id="confirm-password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-500">{registerErrors.confirmPassword}</p>
                    )}
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Cargando..." : "Registrarse"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <Link href="/terminos-y-condiciones" className="text-primary hover:underline">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/terminos-y-condiciones" className="text-primary hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

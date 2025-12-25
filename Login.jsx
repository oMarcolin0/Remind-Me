import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import { Mail, User, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isLogin ? "Dados do login:" : "Dados do cadastro:", { name, email, password });
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  // Função para login com Google
  const handleGoogleLogin = () => {
    console.log("Iniciando login com Google...");
    
    // Aqui você implementaria a lógica real de autenticação com Google
    // Exemplo com Firebase ou OAuth2:
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider).then((result) => {
    //   const user = result.user;
    //   console.log("Usuário logado com Google:", user);
    //   // Redirecionar para dashboard
    //   window.location.href = "/dashboard";
    // }).catch((error) => {
    //   console.error("Erro no login com Google:", error);
    // });
    
    // Para demonstração, apenas redirecionamos
    window.location.href = "/dashboard";
  };

  // Variantes de animação para fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Componente do botão do Google
  const GoogleButton = () => (
    <motion.button
      type="button"
      onClick={handleGoogleLogin}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md py-3 rounded-md bg-white border border-gray-300 text-gray-700 font-medium text-lg transition-all hover:bg-gray-50 hover:shadow-md flex items-center justify-center gap-3"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continuar com Google
    </motion.button>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-[#E0FFFF] font-sans p-4 overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="flex bg-white rounded-lg overflow-hidden shadow-lg relative min-h-[600px]"
        >
          {/* Container do Formulário */}
          <motion.div
            className="w-1/2 p-8 bg-[#008B8B] text-white flex items-center flex-shrink-0"
            animate={{ x: isLogin ? 0 : "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {isLogin ? (
              // Formulário de Login
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-center"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-center mb-6"
                >
                  Acessar conta
                </motion.h1>

                {/* Botão do Google */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full max-w-md mb-6"
                >
                  <GoogleButton />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-md mb-6 flex items-center"
                >
                  <div className="flex-grow h-px bg-white/30"></div>
                  <span className="px-4 text-sm text-white/70">ou</span>
                  <div className="flex-grow h-px bg-white/30"></div>
                </motion.div>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative w-full max-w-md mb-6 text-white block"
                >
                  <span className="block mb-1">Seu Email</span>
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative w-full max-w-md mb-4 text-white block"
                >
                  <span className="block mb-1">Sua senha</span>
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full max-w-md mb-6 text-right"
                >
                  <a
                    href="#"
                    className="text-sm text-white/90 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  type="submit"
                  className="w-full max-w-md py-3 rounded-md bg-[#20B2AA] hover:bg-[#28c4ba] text-white font-bold text-lg transition-colors"
                >
                  Entrar
                </motion.button>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="w-full max-w-md mt-4 text-center text-white/90"
                >
                  <p>
                    Não tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={handleSwitch}
                      className="font-bold text-white hover:underline flex items-center gap-2 mx-auto"
                    >
                      Cadastre-se
                      <ArrowRight size={16} />
                    </button>
                  </p>
                </motion.div>
              </form>
            ) : (
              // Formulário de Cadastro
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-center"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-center mb-6"
                >
                  Criar conta
                </motion.h1>

                {/* Botão do Google */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full max-w-md mb-6"
                >
                  <GoogleButton />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-md mb-6 flex items-center"
                >
                  <div className="flex-grow h-px bg-white/30"></div>
                  <span className="px-4 text-sm text-white/70">ou</span>
                  <div className="flex-grow h-px bg-white/30"></div>
                </motion.div>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative w-full max-w-md mb-6 text-white block"
                >
                  <span className="block mb-1">Seu Nome</span>
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative w-full max-w-md mb-6 text-white block"
                >
                  <span className="block mb-1">Seu Email</span>
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative w-full max-w-md mb-4 text-white block"
                >
                  <span className="block mb-1">Sua senha</span>
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Crie uma senha forte"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.label 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="relative w-full max-w-md mb-6 text-white block"
                >
                  <span className="block mb-1">Confirmar senha</span>
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    required
                    className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 placeholder-white/70 text-white text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#20B2AA]/30"
                  />
                </motion.label>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  type="submit"
                  className="w-full max-w-md py-3 rounded-md bg-[#20B2AA] hover:bg-[#28c4ba] text-white font-bold text-lg transition-colors"
                >
                  Criar Conta
                </motion.button>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="w-full max-w-md mt-4 text-center text-white/90"
                >
                  <p>
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={handleSwitch}
                      className="font-bold text-white hover:underline flex items-center gap-2 mx-auto"
                    >
                      Fazer Login
                      <ArrowRight size={16} />
                    </button>
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Container do Logo */}
          <motion.div
            className="w-1/2 bg-white flex items-center justify-center p-8 flex-shrink-0"
            animate={{ x: isLogin ? 0 : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {isLogin ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <img
                  src={logoImage}
                  alt="Logo ReminderMe"
                  className="max-w-full h-auto rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold text-[#008B8B] mb-2">Bem-vindo de volta!</h2>
                <p className="text-gray-600">Faça login para acessar sua conta</p>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <img
                  src={logoImage}
                  alt="Logo ReminderMe"
                  className="max-w-full h-auto rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold text-[#008B8B] mb-2">Junte-se a nós!</h2>
                <p className="text-gray-600">Crie sua conta em poucos segundos</p>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800">
                    <strong>Rápido e fácil:</strong> Cadastre-se com Google em um clique
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
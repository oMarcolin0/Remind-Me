import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import imagemCelular from "../assets/imagemCelular.png";

// Ícones placeholder - você pode substituir por imagens reais
const iconeCadastro = "📝";
const iconeRemedios = "💊";
const iconeLembretes = "⏰";
const iconeControle = "💊🕒";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Efeito de fade no scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Função para calcular opacidade baseada no scroll
  const getScrollOpacity = (elementOffset = 0) => {
    const elementScrollPosition = scrollY - elementOffset;
    if (elementScrollPosition < 100) return 0;
    if (elementScrollPosition > 300) return 1;
    return (elementScrollPosition - 100) / 200;
  };

  return (
    <div className="min-h-screen bg-white text-[#222] font-sans relative">
      {/* Navbar sticky no topo - COM ISOLATION */}
      <div className="isolate z-50">
        <Navbar />
      </div>

      {/* Conteúdo principal - COM Z-INDEX BAIXO */}
      <div className="relative z-0">
        {/* Padding para compensar altura do navbar */}
        <div className="pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="flex flex-col py-4 text-center">
              
              {/* HERO SECTION */}
              <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-20 min-h-[80vh] md:min-h-[85vh] mt-8">
                <div className={`flex-1 max-w-2xl transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}>
                  <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
                    Nunca mais se <span className="text-[#20B2AA]">esqueça</span> das suas medicações!
                  </h1>
                  <h2 className={`text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 italic leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                    isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    "Este é um compromisso com a sua vida."
                  </h2>
                  <div className={`transition-all duration-1000 ease-out delay-400 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button className="bg-[#20B2AA] hover:bg-[#28c4ba] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                      <a  className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] mx-auto md:mx-0" href="/login">Começar Agora</a>
                      
                    </button>
                  </div>
                </div>

                <div className={`relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] mx-auto md:mx-0 transition-all duration-1000 ease-out delay-300 ${
                  isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-6 scale-95'
                }`}>
                  <img
                    src={imagemCelular}
                    alt="Imagem do celular Reminder"
                    className="w-full h-auto block drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)] [mask-image:linear-gradient(to_bottom,white_75%,transparent)] transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </section>

              {/* COMO FUNCIONA SECTION */}
              <section className="mb-16 md:mb-24 py-12">
                <div 
                  className="text-center mb-12 transition-all duration-1000 ease-out"
                  style={{
                    opacity: getScrollOpacity(200),
                    transform: `translateY(${getScrollOpacity(200) * 20 - 20}px)`
                  }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Como o <span className="text-[#20B2AA]">ReminderMe</span> funciona?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Em 4 passos simples, você garante que nunca mais vai esquecer de tomar seus medicamentos
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[
                    {
                      icon: iconeCadastro,
                      title: "1. Cadastro Pessoal",
                      description: "Cadastre seus dados básicos de forma segura e rápida"
                    },
                    {
                      icon: iconeRemedios,
                      title: "2. Adicione Medicamentos",
                      description: "Informe os remédios, dosagens e horários específicos"
                    },
                    {
                      icon: iconeControle,
                      title: "3. Controle de Medicamentos",
                      description: "Acompanhe seus medicamentos e histórico de lembretes enviados"
                    },
                    {
                      icon: iconeLembretes,
                      title: "4. Lembretes Automáticos",
                      description: "Receba notificações no Telegram nos horários certos"
                    }
                  ].map((step, index) => (
                    <div 
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-1000 ease-out hover:shadow-xl hover:transform hover:scale-105 cursor-pointer"
                      style={{
                        opacity: getScrollOpacity(400 + index * 100),
                        transform: `translateY(${getScrollOpacity(400 + index * 100) * 20 - 20}px)`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="text-4xl mb-4">{step.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* BENEFÍCIOS SECTION */}
              <section className="mb-16 md:mb-24 py-12">
                <div 
                  className="bg-gradient-to-r from-[#008B8B] to-[#20B2AA] rounded-2xl p-8 md:p-12 text-white transition-all duration-1000 ease-out"
                  style={{
                    opacity: getScrollOpacity(800),
                    transform: `translateY(${getScrollOpacity(800) * 20 - 20}px)`
                  }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    Por que escolher o ReminderMe?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                        <span className="text-2xl">⏰</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Lembretes Inteligentes</h3>
                        <p className="text-white text-opacity-90">
                          Notificações personalizadas via Telegram para cada horário de medicação
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2"> Controle de Medicamentos</h3>
                        <p className="text-white text-opacity-90">
                          Acesso a medicamentos cadastrados e histórico de lembretes enviados
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                        <span className="text-2xl">🔒</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Privacidade Garantida</h3>
                        <p className="text-white text-opacity-90">
                          Seus dados e informações de saúde protegidos com segurança
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* TELEGRAM INTEGRATION SECTION */}
              <section className="mb-16 md:mb-24 py-12">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                  <div 
                    className="flex-1 transition-all duration-1000 ease-out"
                    style={{
                      opacity: getScrollOpacity(1200),
                      transform: `translateX(${getScrollOpacity(1200) * 20 - 20}px)`
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                      Notificações via <span className="text-[#0088cc]">Telegram</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Receba lembretes diretamente no seu Telegram, o aplicativo de mensagens que você já usa no dia a dia.
                    </p>
                    <ul className="text-left space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Notificações instantâneas nos horários programados
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Lembretes mesmo quando o navegador estiver fechado
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Fácil interação e confirmação de medicamentos tomados
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Alertas para seu contato de emergência quando necessário
                      </li>
                    </ul>
                  </div>
                  
                  <div 
                    className="flex-1 transition-all duration-1000 ease-out"
                    style={{
                      opacity: getScrollOpacity(1200),
                      transform: `translateX(${20 - getScrollOpacity(1200) * 20}px)`
                    }}
                  >
                    <div className="bg-gradient-to-br from-[#0088cc] to-[#20B2AA] p-8 rounded-2xl text-white text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <h3 className="text-2xl font-bold mb-4">Conecte-se Agora</h3>
                      <p className="mb-6">Adicione nosso bot do Telegram e comece a receber seus lembretes</p>
                      <button className="bg-white text-[#0088cc] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Conectar Telegram
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA FINAL SECTION */}
              <section 
                className="text-center bg-gradient-to-r from-[#008B8B] to-[#20B2AA] rounded-2xl p-8 md:p-12 text-white transition-all duration-1000 ease-out my-16"
                style={{
                  opacity: getScrollOpacity(1600),
                  transform: `translateY(${getScrollOpacity(1600) * 20 - 20}px)`
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pronto para nunca mais esquecer?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Cadastre-se agora e garanta que seus medicamentos sejam tomados no horário certo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-[#008B8B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
                    Cadastrar Agora
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                    Saber Mais
                  </button>
                </div>
              </section>

            </main>

            {/* Footer */}
            <section className="mt-12">
              <Footer />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
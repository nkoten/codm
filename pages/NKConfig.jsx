import React, { useState, useEffect } from 'react';

const ICONS = {
  Smartphone: '📱',
  Settings: '⚙️',
  Crosshair: '🎯',
  Target: '🎯',
  Flame: '🔥',
  Shield: '🛡️',
  Trophy: '🏆',
  Check: '✓',
  ChevronRight: '›',
};

const initialSteps = [
  {
    id: 'step-1',
    title: 'O Alicerce: Modo de Disparo e Layout',
    description:
      'A base do quickscope não é apenas reflexo, mas sim como o jogo lê seus toques. No seu Galaxy A26 5G, a tela de 120Hz ajuda, mas a configuração correta é vital.',
    details: [
      'Ative o **Modo de Disparo Avançado** (Advanced Mode). Isso permite abrir a mira e disparar simultaneamente com um toque, essencial para o quickscope.',
      'Mantenha a opção "Manter para abrir mira" (Tap and Hold to ADS) ativada. Isso evita que você perca a precisão no momento do tiro.',
      'Considere migrar para **3 ou 4 dedos**. Com 2 dedos você atinge um teto de velocidade. O indicador esquerdo dispara enquanto o polegar direito controla a mira.',
    ],
    category: 'Configuração',
    icon: 'Smartphone',
    completed: false,
  },
  {
    id: 'step-2',
    title: 'Calibragem da Sensibilidade (120Hz)',
    description:
      'Seu celular tem 120Hz, então a imagem é mais fluida. A sensibilidade pode ser um pouco mais alta que o padrão, mas o controle fino é rei no sniper.',
    details: [
      '**Sensibilidade da Câmera (Padrão):** 60 – 70. Para girar e encontrar inimigos rapidamente.',
      '**Sensibilidade da Mira de Sniper:** 55 – 65. **Não suba muito.** O quickscope exige microajuste; se estiver alta demais, você passará direto do inimigo.',
      '**Giroscópio (Opcional):** 60 – 80. Use apenas para compensar o recuo no momento exato do disparo, se você já tiver costume.',
    ],
    category: 'Sensibilidade',
    icon: 'Settings',
    completed: false,
  },
  {
    id: 'step-3',
    title: 'A Mecânica do Quickscope',
    description:
      'O segredo não é mirar com o olho, é mirar com o centro da tela antes mesmo de abrir a mira.',
    details: [
      '**Memorize o Centro:** A posição da mira hip fire (sem abrir) é idêntica ao centro após abrir. Use o ponto branco para "cobrir" o inimigo antes de atirar.',
      '**O Fluxo:** Mova o centro da tela para perto do inimigo (pré-mira) → Toque no botão de disparo (abre e atira automaticamente) → Ajuste fino com o polegar → Tiro sai.',
      '**Lead (Antecipação):** Para inimigos correndo, mire 2 a 3 "corpos" à frente dele.',
      '**Reposicionamento:** Após atirar, feche a mira imediatamente. Ficar parado olhando pelo scope após errar é morte certa.',
    ],
    category: 'Mecânica',
    icon: 'Crosshair',
    completed: false,
  },
  {
    id: 'step-4',
    title: 'Armas e Loadouts (Seu Arsenal)',
    description:
      'Você já tem familiaridade com DLQ, Locus, Tundra e ZRG. Vamos otimizar cada um para o seu estilo, focando em velocidade de ADS.',
    details: [
      '**DL Q33 (O Rei do Início):** Foco total em velocidade. **Canos Leves (MIP Light Short)**, **Coronha Leve (Skeleton/No Stock)**, **Laser Tático OWC**. Evite pesos pesados.',
      '**Locus (Para Iniciantes/Intermediários):** Use o perk **OWC Stopping Power Reload**. Ele expande a área de kill para a barriga, tornando os flicks mais perdoadores. Combine com cano leve e coronha esqueleto.',
      '**LW3-Tundra (Meta Atual):** ADS otimizado chega a ~334ms. Extremamente rápido. Use cano leve e coronha para mobilidade.',
      '**ZRG 20mm (Dano Pesado):** Mais lento, mas mata com um tiro no peito/braço. Use **MIP Light Barrel (Short)** para tentar compensar a lentidão.',
    ],
    category: 'Loadout Sniper',
    icon: 'Target',
    completed: false,
  },
  {
    id: 'step-5',
    title: 'Armas de Suporte (LMGs)',
    description:
      'Para quando você precisar de pressão constante ou estiver em mapas mais abertos, as metralhadoras precisam de controle.',
    details: [
      '**M4LMG (A Laser):** Para quem quer estabilidade. Foque em precisão e controle. **Barril de Forças Especiais**, **Laser OWC Tático**, e um **Supressor Tático** para não aparecer no minimapa.',
      '**Chopper (Versátil):** Excelente dano e cadência. Use **Cano de Forças Especiais** para melhorar a velocidade de ADS e **OWC Laser** para precisão.',
      '**S36 (Agressiva):** Cadência alta. Use **Red Dot** (a mira de ferro é ruim) e foque em controle de recuo vertical para médias distâncias.',
    ],
    category: 'Loadout LMG',
    icon: 'Flame',
    completed: false,
  },
  {
    id: 'step-6',
    title: 'Treino e Consistência',
    description:
      'Hardware não substitui memória muscular. O Galaxy A26 5G é um intermediário, então mantenha os gráficos no Médio/Baixo para garantir FPS estável.',
    details: [
      '**Aquecimento:** 10 minutos no Campo de Treino. Foque em alvos fixos até 80% de acerto, depois mude para alvos móveis.',
      '**FPS > Gráficos:** Nunca priorize texturas bonitas. Um travamento de frame no momento do tiro é fatal.',
      '**Paciência:** O quickscope é um estilo de jogo de alto risco. Comece com a Locus + Stopping Power para ter mais margem de erro antes de ir para a DLQ pura.',
    ],
    category: 'Treino',
    icon: 'Shield',
    completed: false,
  },
];

export default function NKConfig() {
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('codm_quickscope_guide');
    return saved ? JSON.parse(saved) : initialSteps;
  });

  useEffect(() => {
    localStorage.setItem('codm_quickscope_guide', JSON.stringify(steps));
  }, [steps]);

  const toggleStep = (id) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step,
      ),
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono">
      <div className="relative max-w-4xl mx-auto p-4 md:p-8">
        <header className="mb-10 border-b-2 border-cyan-500/30 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-cyan-400 text-3xl">🎯</span>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 uppercase tracking-tighter">
              Protocolo: Quickscope
            </h1>
          </div>
          <p className="text-cyan-600 text-sm uppercase tracking-widest mb-4">
            Status do Dispositivo: Galaxy A26 5G // Alvo: Pro Player
          </p>
          <div className="w-full bg-gray-900 border border-cyan-900/50 rounded-full h-2.5 mb-2 overflow-hidden">
            <div
              className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-cyan-700">
            <span>INICIALIZAÇÃO</span>
            <span>{Math.round(progress)}% CONCLUÍDO</span>
          </div>
        </header>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative border transition-all duration-300 ${
                step.completed
                  ? 'border-cyan-500/20 bg-cyan-950/10 opacity-70'
                  : 'border-gray-800 bg-gray-900/40 hover:border-cyan-500/50 hover:bg-gray-900/60'
              }`}
            >
              <div className="p-5 md:p-6 flex flex-col md:flex-row gap-5">
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={`w-12 h-12 flex items-center justify-center border-2 text-xl transition-all duration-300 ${
                      step.completed
                        ? 'border-cyan-400 bg-cyan-400 text-black'
                        : 'border-gray-700 text-gray-600 hover:border-cyan-500 hover:text-cyan-500'
                    }`}
                  >
                    {step.completed ? '✓' : ICONS[step.icon]}
                  </button>
                  <span className="text-xs text-gray-600 font-bold">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2
                      className={`text-xl font-bold tracking-wide ${step.completed ? 'text-cyan-700 line-through' : 'text-cyan-300'}`}
                    >
                      {step.title}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 border border-cyan-800 text-cyan-600 uppercase tracking-wider">
                      {step.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed border-l-2 border-gray-700 pl-3">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <span className="text-cyan-600 mt-0.5 shrink-0">›</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: detail.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong class="text-cyan-200 font-bold">$1</strong>',
                            ),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center border-t border-gray-800 pt-8 pb-4">
          <div className="flex justify-center items-center gap-2 mb-2 text-cyan-600">
            <span className="text-xl">🏆</span>
            <span className="uppercase tracking-widest font-bold">
              {completedCount === steps.length
                ? 'SISTEMA OTIMIZADO. PRONTO PARA O COMBATE.'
                : 'AGUARDANDO CALIBRAÇÃO...'}
            </span>
            <span className="text-xl">🏆</span>
          </div>
          <p className="text-xs text-gray-600">
            Dados salvos localmente no seu dispositivo.
          </p>
        </footer>
      </div>
    </div>
  );
}

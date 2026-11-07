import React, { useState, useEffect } from 'react';

const ARMAS_TUDO_CODM = [
  {
    categoria: 'Fuzis de Assalto (ARs)',
    armas: [
      'AK-47',
      'AK117',
      'ASM10',
      'M4',
      'M16',
      'BK57',
      'LK24',
      'ICR-1',
      'Man-O-War',
      'KN-44',
      'HBRa3',
      'HVK-30',
      'Type 25',
      'DR-H',
      'Peacekeeper MK2',
      'FR .556',
      'AS VAL',
      'CR-56 AMAX',
      'M13',
      'Swordfish',
      'Kilo 141',
      'Oden',
      'Krig 6',
      'EM2',
      'Maddox',
      'FFAR 1',
      'Grau 5.56',
      'Type 19',
      'BP50',
      'Lag 53',
      'Type 63',
    ],
  },
  {
    categoria: 'Submetralhadoras (SMGs)',
    armas: [
      'RUS-79U',
      'Chicom',
      'PDW-57',
      'Razorback',
      'MSMC',
      'HG 40',
      'Pharo',
      'GKS',
      'Cordite',
      'QQ9',
      'Fennec',
      'AGR 556',
      'QXR',
      'PP19 Bizon',
      'MX9',
      'P90 (CBR4)',
      'PPSh-41',
      'MAC-10',
      'KSP 45',
      'Switchblade X9',
      'LAPA',
      'Striker 45',
      'CX9',
      'Tec-9',
      'ISO',
    ],
  },
  {
    categoria: 'Fuzis de Precisão (Snipers)',
    armas: [
      'DL Q33',
      'Locus',
      'Arctic .50',
      'M21 EBR',
      'XPR-50',
      'NA-45',
      'Outlaw',
      'Rytec AMR',
      'SVD',
      'Koshka',
      'ZRG 20mm',
      'HDR',
      'LW3-Tundra',
    ],
  },
  {
    categoria: 'Metralhadoras Leves (LMGs)',
    armas: [
      'RPD',
      'M4LMG',
      'UL736',
      'S36',
      'Chopper',
      'Holger 26',
      'Had Hades',
      'PKM',
      'Dingo',
      'Bruen MK9',
      'MG42',
    ],
  },
  {
    categoria: 'Escopetas (Shotguns)',
    armas: [
      'BY15',
      'KRM-262',
      'HS0405',
      'HS2126',
      'Striker',
      'Echo',
      'JAK-12',
      'R9-0',
    ],
  },
  {
    categoria: 'Fuzis de Atirador (Marksman)',
    armas: ['Kilo Fuzil de Ferrolho', 'SKS', 'SP-R 208', 'MK2'],
  },
  {
    categoria: 'Pistolas (Secundárias)',
    armas: [
      'MW11',
      'J358',
      'Renetti',
      ' .50 GS',
      'Shorty',
      'L-CAR 9',
      'Dobvra',
      'Machine Pistol',
    ],
  },
  {
    categoria: 'Lançadores (Secundárias)',
    armas: ['SMRS', 'FHJ-18', 'Thumper', 'D13 Sector'],
  },
  {
    categoria: 'Armas Corpo a Corpo (Melee)',
    armas: [
      'Faca Padrão',
      'Faca de Combate',
      'Machado',
      'Canivete',
      'Bastão de Beisebol',
      'Nunchaku',
      'Manopla de Boxe',
      'Katana',
      'Foice',
      'Pá',
      'Machete',
      'Espada Curta',
      'Sai',
      'Lança',
      'Tear Gas Stick',
    ],
  },
];

export default function DamascoSkinTracker() {
  const [progresso, setProgresso] = useState(() => {
    const salvo = localStorage.getItem('codm_damascus_tracker_v2');
    return salvo ? JSON.parse(salvo) : {};
  });

  const [esconderConcluidas, setEsconderConcluidas] = useState(false);

  useEffect(() => {
    localStorage.setItem('codm_damascus_tracker_v2', JSON.stringify(progresso));
  }, [progresso]);

  const handleToggle = (nomeArma) => {
    setProgresso((prev) => ({ ...prev, [nomeArma]: !prev[nomeArma] }));
  };

  const limparTudo = () => {
    if (
      window.confirm('Tem certeza que deseja resetar todo o seu progresso?')
    ) {
      setProgresso({});
    }
  };

  const totalArmas = ARMAS_TUDO_CODM.reduce(
    (acc, cat) => acc + cat.armas.length,
    0,
  );
  const totalConcluido = Object.values(progresso).filter(Boolean).length;
  const porcentagemGeral = Math.round((totalConcluido / totalArmas) * 100) || 0;

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        color: '#2d3748',
        backgroundColor: '#f7fafc',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ margin: 0, color: '#1a202c', fontSize: '1.75rem' }}>
          🎯 Rastreador do Progresso Damasco (Atualizado)
        </h1>
        <p style={{ color: '#718096', margin: '5px 0 20px 0' }}>
          Para liberar a Damasco hoje, você precisa de Ouro em <b>todas</b> as
          armas abaixo.
        </p>

        {/* Barra de Progresso Real */}
        <div
          style={{
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            <span>Sua Jornada:</span>
            <span style={{ color: '#3182ce' }}>
              {totalConcluido} / {totalArmas} Armas ({porcentagemGeral}%)
            </span>
          </div>
          <div
            style={{
              background: '#e2e8f0',
              width: '100%',
              height: '14px',
              borderRadius: '7px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)',
                width: `${porcentagemGeral}%`,
                height: '100%',
                transition: 'width 0.4s ease',
              }}
            ></div>
          </div>
        </div>

        {/* Painel de Controle */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setEsconderConcluidas(!esconderConcluidas)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #cbd5e0',
              background: esconderConcluidas ? '#e2e8f0' : '#fff',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {esconderConcluidas
              ? '👁️ Mostrar Concluídas'
              : '🙈 Esconder Concluídas'}
          </button>
          <button
            onClick={limparTudo}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #fed7d7',
              background: '#ffffff',
              color: '#e53e3e',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            🗑️ Limpar Progresso
          </button>
        </div>
      </header>

      {/* Grid de Categorias */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {ARMAS_TUDO_CODM.map((item) => {
          const concluidasNaCategoria = item.armas.filter(
            (arma) => progresso[arma],
          ).length;
          const armasFiltradas = esconderConcluidas
            ? item.armas.filter((arma) => !progresso[arma])
            : item.armas;

          if (armasFiltradas.length === 0 && esconderConcluidas) return null;

          return (
            <section
              key={item.categoria}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '2px solid #f7fafc',
                  paddingBottom: '12px',
                }}
              >
                <h2
                  style={{ fontSize: '1.15rem', margin: 0, color: '#1a202c' }}
                >
                  {item.categoria}
                </h2>
                <span
                  style={{
                    fontSize: '0.85rem',
                    background:
                      concluidasNaCategoria === item.armas.length
                        ? '#c6f6d5'
                        : '#e2e8f0',
                    color:
                      concluidasNaCategoria === item.armas.length
                        ? '#22543d'
                        : '#4a5568',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {concluidasNaCategoria} / {item.armas.length} Mestradas
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '10px',
                }}
              >
                {armasFiltradas.map((arma) => {
                  const estaMarcada = !!progresso[arma];
                  return (
                    <label
                      key={arma}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: estaMarcada ? '#f0fff4' : '#fff',
                        border: estaMarcada
                          ? '1px solid #c6f6d5'
                          : '1px solid #e2e8f0',
                        color: estaMarcada ? '#38a169' : '#4a5568',
                        textDecoration: estaMarcada ? 'line-through' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={estaMarcada}
                        onChange={() => handleToggle(arma)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#38a169',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: estaMarcada ? '600' : '400',
                        }}
                      >
                        {arma}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

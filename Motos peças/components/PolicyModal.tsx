
import React from 'react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = type === 'privacy' ? {
    title: 'POLÍTICA DE PRIVACIDADE',
    text: `
      A MotoParts valoriza a segurança e privacidade de seus usuários. Esta política descreve como coletamos e protegemos seus dados.
      
      1. Coleta de Informações: Coletamos apenas os dados necessários para processamento de pedidos e melhoria da experiência de navegação.
      2. Uso de Dados: Seus dados nunca serão vendidos a terceiros. Utilizamos informações para entrega, marketing (com consentimento) e suporte.
      3. Segurança: Utilizamos criptografia de ponta e protocolos SSL para garantir que suas transações financeiras sejam 100% seguras.
      4. Direitos: Você pode solicitar a exclusão de seus dados a qualquer momento através do nosso suporte.
    `
  } : {
    title: 'TERMOS DE USO',
    text: `
      Ao acessar o site MotoParts, você concorda em cumprir estes termos de serviço.
      
      1. Uso da Licença: É concedida permissão para baixar temporariamente uma cópia dos materiais no site da MotoParts apenas para visualização transitória pessoal e não comercial.
      2. Isenção de Responsabilidade: Os materiais no site da MotoParts são fornecidos 'como estão'. Não oferecemos garantias implícitas além das legais.
      3. Limitações: Em nenhum caso a MotoParts ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais.
      4. Precisão: As peças de moto devem ser instaladas por profissionais qualificados. Não nos responsabilizamos por má instalação.
    `
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#121212] border border-gray-800 clip-mech p-8 md:p-12 shadow-2xl animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-brand transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        
        <h2 className="font-display text-3xl text-brand mb-8">{content.title}</h2>
        
        <div className="text-gray-400 font-sans text-sm leading-relaxed space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          {content.text.split('\n').map((line, i) => (
            <p key={i}>{line.trim()}</p>
          ))}
        </div>
        
        <div className="mt-10">
          <button 
            onClick={onClose}
            className="w-full bg-white/5 border border-gray-800 text-white font-display font-bold py-3 clip-btn hover:bg-brand hover:text-black transition-all uppercase"
          >
            ENTENDI E ACEITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;

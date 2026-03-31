import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const PROMOTIONS = [
  {
    id: 1,
    title: "Early Bird Aube",
    subtitle: "얼리버드 예약 프로모션",
    description: "60일 전 미리 예약하시는 분들께 15% 할인 혜택을 제공합니다. 여유롭게 당신의 휴식을 계획해 보세요.",
    period: "상시 진행",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Stay & Fire",
    subtitle: "불멍 세트 무료 제공",
    description: "평일(일~목) 2박 이상 연박하시는 분들께 스테이 오브의 시그니처 불멍 세트(장작, 오로라 가루)를 무료로 제공해 드립니다.",
    period: "2026.04.01 - 2026.05.31",
    image: "https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function Promotion() {
  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-6">PROMOTION</h1>
          <p className="font-sans text-zinc-500 text-sm tracking-widest uppercase">스테이 오브가 준비한 특별한 혜택</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROMOTIONS.map((promo, index) => (
            <motion.div 
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-medium tracking-widest text-zinc-900">
                  {promo.period}
                </div>
              </div>
              <h3 className="font-serif text-2xl text-zinc-900 mb-2">{promo.title}</h3>
              <p className="text-base font-medium text-zinc-900 mb-4">{promo.subtitle}</p>
              <p className="text-base text-zinc-500 leading-relaxed mb-6">{promo.description}</p>
              <Link to="/reservation" className="text-xs uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                예약하기
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Rooms() {
  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-6">ROOMS</h1>
          <p className="font-sans text-zinc-500 text-sm tracking-widest uppercase">머무는 이의 취향을 담은 두 개의 여백</p>
        </motion.div>

        <div className="space-y-32">
          {/* Room 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-serif text-3xl text-zinc-900 mb-4">Aube 01</h2>
              <p className="text-base text-zinc-500 mb-8 italic">"빛과 선이 머무는 곳"</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-12 max-w-md">
                미니멀한 라인과 화이트 톤이 돋보이는 프라이빗 스튜디오입니다. 
                불필요한 장식을 배제하고 오직 빛과 그림자만이 공간을 채우도록 설계되었습니다.
                아침 햇살이 가장 먼저 닿는 창가에서 고요한 티타임을 즐겨보세요.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12 text-sm text-zinc-500 border-t border-b border-zinc-200 py-6">
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Capacity</span>
                  기준 2인 / 최대 2인
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Size</span>
                  15평형 (원룸형)
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Bed</span>
                  Queen Size 1
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Price</span>
                  ₩ 250,000 ~
                </div>
              </div>
              <Link 
                to="/reservation?room=aube01" 
                className="inline-block border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-500 px-10 py-4 text-xs tracking-[0.2em] uppercase"
              >
                예약하기
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 aspect-[4/3] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Aube 01" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Room 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Aube 02" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-serif text-3xl text-zinc-900 mb-4">Aube 02</h2>
              <p className="text-base text-zinc-500 mb-8 italic">"깊이를 더하는 차분함"</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-12 max-w-md">
                따뜻한 우드 톤과 모던함이 조화를 이루는 라운지 다이닝 객실입니다.
                넓은 다이닝 테이블과 넉넉한 공간은 소중한 사람들과 함께하는 시간에
                깊이를 더해줍니다. 저녁 무렵의 은은한 조명 아래서 완벽한 휴식을 경험하세요.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12 text-sm text-zinc-500 border-t border-b border-zinc-200 py-6">
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Capacity</span>
                  기준 2인 / 최대 4인
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Size</span>
                  25평형 (거실+침실)
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Bed</span>
                  Queen Size 2
                </div>
                <div>
                  <span className="block uppercase tracking-widest mb-1 text-zinc-400">Price</span>
                  ₩ 350,000 ~
                </div>
              </div>
              <Link 
                to="/reservation?room=aube02" 
                className="inline-block border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-500 px-10 py-4 text-xs tracking-[0.2em] uppercase"
              >
                예약하기
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

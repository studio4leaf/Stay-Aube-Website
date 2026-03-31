import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Section 1: Main Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Stay Aube Hero" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight"
          >
            비워냄으로써<br />비로소 채워지는 시간.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sans text-base md:text-lg font-light tracking-wide opacity-90 mb-12 max-w-lg mx-auto leading-relaxed"
          >
            당신의 고단한 하루 끝, 정제된 공간 '스테이 오브'에서<br />온전한 쉼을 내어드립니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link 
              to="/reservation" 
              className="inline-block border border-white/50 hover:bg-white hover:text-black transition-colors duration-500 px-10 py-4 text-xs tracking-[0.2em] uppercase"
            >
              머무름 예약하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Brand Story */}
      <section className="py-32 md:py-48 px-6 bg-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl mb-12 text-zinc-900"
          >
            오롯이 나에게만 집중하는<br />새벽의 고요함.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-zinc-500 leading-loose text-base md:text-lg max-w-2xl mx-auto"
          >
            복잡한 일상을 잠시 내려놓으세요. 스테이 오브는 시선을 어지럽히는 모든 것을 덜어내고, 꼭 필요한 안온함만을 남겼습니다. 모던한 공간 속에 스며든 따뜻한 빛과 질감이 당신의 휴식을 더욱 깊게 만듭니다.
          </motion.p>
        </div>
        
        <div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Aesthetic interior detail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="aspect-square md:aspect-[4/5] overflow-hidden md:mt-32"
          >
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Aesthetic bed detail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3: Rooms Preview */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-6">머무는 이의 취향을 담은 두 개의 여백.</h2>
            <Link to="/rooms" className="text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors border-b border-zinc-300 pb-1">
              View All Rooms
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Room 01 */}
            <Link to="/reservation" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Aube 01" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white border border-white/50 px-8 py-3 text-xs uppercase tracking-[0.2em]">자세히 보기</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-zinc-900 mb-3">Aube 01</h3>
              <p className="text-base text-zinc-500 mb-2">"빛과 선이 머무는 곳"</p>
              <p className="text-sm text-zinc-400 leading-relaxed">미니멀한 라인과 화이트 톤이 돋보이는 프라이빗 스튜디오.</p>
            </Link>

            {/* Room 02 */}
            <Link to="/reservation" className="group block md:mt-24">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Aube 02" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white border border-white/50 px-8 py-3 text-xs uppercase tracking-[0.2em]">자세히 보기</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-zinc-900 mb-3">Aube 02</h3>
              <p className="text-base text-zinc-500 mb-2">"깊이를 더하는 차분함"</p>
              <p className="text-sm text-zinc-400 leading-relaxed">따뜻한 우드 톤과 모던함이 조화를 이루는 라운지 다이닝.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

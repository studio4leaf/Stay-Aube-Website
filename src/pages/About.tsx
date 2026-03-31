import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-6">ABOUT</h1>
          <p className="font-sans text-zinc-500 text-sm tracking-widest uppercase">스테이 오브의 철학</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto text-zinc-600 leading-loose text-base md:text-lg"
        >
          <p className="text-lg md:text-xl font-serif text-zinc-900 mb-12">
            "Aube(오브)는 프랑스어로 새벽을 뜻합니다."
          </p>
          <p className="mb-8">
            가장 어두운 밤이 지나고 빛이 스며드는 시간, 새벽.<br/>
            스테이 오브는 그 고요하고 차분한 새벽의 감성을 공간에 담아냈습니다.
          </p>
          <p className="mb-8">
            우리는 일상에서 너무 많은 시각적, 청각적 자극에 노출되어 있습니다.<br/>
            이곳에서는 시선을 어지럽히는 모든 것을 덜어내고,<br/>
            오직 당신의 온전한 쉼을 위한 '여백'만을 남겼습니다.
          </p>
          <div className="my-16 aspect-[21/9] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="About Stay Aube" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p>
            정제된 모던함 속에 스며든 따뜻한 빛과 질감.<br/>
            비워냄으로써 비로소 채워지는 당신만의 시간을 경험해 보세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

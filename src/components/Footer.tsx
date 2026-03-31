export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16 px-6 font-sans text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-serif text-xl text-white mb-6 tracking-widest">STAY AUBE</h3>
          <p className="leading-relaxed">
            비워냄으로써 비로소 채워지는 시간.<br />
            당신의 고단한 하루 끝, 정제된 공간에서<br />
            온전한 쉼을 내어드립니다.
          </p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-[0.2em] mb-6">Contact</h4>
          <p className="mb-2">T. 02-1234-5678</p>
          <p className="mb-2">E. hello@stayaube.com</p>
          <p>A. 서울특별시 강남구 테헤란로 123</p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-[0.2em] mb-6">Information</h4>
          <p className="mb-2 hover:text-white cursor-pointer transition-colors">이용안내</p>
          <p className="mb-2 hover:text-white cursor-pointer transition-colors">환불규정</p>
          <p className="mb-2 hover:text-white cursor-pointer transition-colors">개인정보처리방침</p>
          <p className="hover:text-white cursor-pointer transition-colors">이용약관</p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-[0.2em] mb-6">Social</h4>
          <p className="mb-2 hover:text-white cursor-pointer transition-colors">Instagram</p>
          <p className="hover:text-white cursor-pointer transition-colors">Journal</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} STAY AUBE. All rights reserved.</p>
        <p className="mt-4 md:mt-0 opacity-50">Designed by Aube</p>
      </div>
    </footer>
  );
}

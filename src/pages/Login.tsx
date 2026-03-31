import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || '/mypage';
      navigate(redirect);
    }
  }, [user, navigate, location]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        try {
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            role: 'user',
            createdAt: new Date().toISOString()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `users/${result.user.uid}`);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white p-12 shadow-sm border border-zinc-100 text-center"
      >
        <h1 className="font-serif text-3xl text-zinc-900 mb-4">나만의 휴식 기록하기</h1>
        <p className="font-sans text-zinc-500 text-base mb-12 leading-relaxed">
          스테이 오브에서의 온전한 쉼을 위해<br />당신의 여정을 기록합니다.
        </p>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full border border-zinc-200 py-4 flex items-center justify-center hover:bg-zinc-50 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            <span className="text-base text-zinc-700 font-medium">Google 계정으로 계속하기</span>
          </button>
          
          <button 
            disabled
            className="w-full border border-zinc-200 py-4 flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <span className="text-base text-zinc-700 font-medium">카카오톡으로 계속하기 (준비중)</span>
          </button>
        </div>

        <p className="mt-12 text-sm text-zinc-400">
          로그인 시 스테이 오브의 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </p>
      </motion.div>
    </div>
  );
}

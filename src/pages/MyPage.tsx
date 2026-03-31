import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Reservation } from '../types';
import { format } from 'date-fns';
import { signOut } from 'firebase/auth';

export default function MyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resData = snapshot.docs.map(doc => doc.data() as Reservation);
      setReservations(resData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reservations');
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-16 border-b border-zinc-200 pb-6"
        >
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-2">MY PAGE</h1>
            <p className="font-sans text-zinc-500 text-base">{user.displayName || user.email}님의 휴식 기록</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            로그아웃
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-8">Reservation History</h2>
          
          {reservations.length === 0 ? (
            <div className="bg-white p-12 text-center border border-zinc-100 shadow-sm">
              <p className="text-zinc-500 text-base mb-6">아직 기록된 휴식이 없습니다.</p>
              <button onClick={() => navigate('/reservation')} className="inline-block border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-500 px-8 py-3 text-xs tracking-[0.2em] uppercase">
                새로운 휴식 예약하기
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {reservations.map((res) => (
                <div key={res.id} className="bg-white p-8 border border-zinc-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`text-xs px-3 py-1 uppercase tracking-wider ${res.status === 'confirmed' ? 'bg-zinc-900 text-white' : res.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-zinc-100 text-zinc-600'}`}>
                        {res.status}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">{res.id}</span>
                    </div>
                    <h3 className="font-serif text-xl text-zinc-900 mb-1">{res.roomId === 'aube01' ? 'Aube 01' : 'Aube 02'}</h3>
                    <p className="text-base text-zinc-600">
                      {format(new Date(res.checkIn), 'yyyy.MM.dd')} - {format(new Date(res.checkOut), 'yyyy.MM.dd')} ({res.guests}인)
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">체크인 15:00 / 체크아웃 12:00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-zinc-900 mb-1">₩ {res.totalPrice.toLocaleString()}</p>
                    <p className="text-sm text-zinc-400">예약일: {format(new Date(res.createdAt), 'yyyy.MM.dd')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

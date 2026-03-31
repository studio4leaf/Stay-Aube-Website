import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Reservation, User } from '../types';
import { format, isToday, isFuture, isPast } from 'date-fns';

export default function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const resUnsubscribe = onSnapshot(collection(db, 'reservations'), (snapshot) => {
      const resData = snapshot.docs.map(doc => doc.data() as Reservation);
      setReservations(resData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reservations');
    });

    const usersUnsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => doc.data() as User);
      setUsers(usersData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });

    return () => {
      resUnsubscribe();
      usersUnsubscribe();
    };
  }, [isAdmin]);

  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const todayCheckIns = reservations.filter(r => isToday(new Date(r.checkIn)) && r.status === 'confirmed');
  const todayCheckOuts = reservations.filter(r => isToday(new Date(r.checkOut)) && r.status === 'confirmed');
  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const thisMonthRevenue = reservations
    .filter(r => r.status === 'confirmed' && new Date(r.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const handleConfirm = async (id: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status: 'confirmed' });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `reservations/${id}`);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status: 'cancelled' });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `reservations/${id}`);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-zinc-200 pb-6"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-2">ADMIN DASHBOARD</h1>
          <p className="font-sans text-zinc-500 text-sm">스테이 오브 관리자 페이지</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {/* Dashboard Cards */}
          <div className="bg-white p-6 border border-zinc-100 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">오늘 체크인</h3>
            <p className="font-serif text-3xl text-zinc-900">{todayCheckIns.length}건</p>
          </div>
          <div className="bg-white p-6 border border-zinc-100 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">오늘 체크아웃</h3>
            <p className="font-serif text-3xl text-zinc-900">{todayCheckOuts.length}건</p>
          </div>
          <div className="bg-white p-6 border border-zinc-100 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">신규 예약 대기</h3>
            <p className="font-serif text-3xl text-amber-600">{pendingReservations.length}건</p>
          </div>
          <div className="bg-white p-6 border border-zinc-100 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">이번 달 매출</h3>
            <p className="font-serif text-3xl text-zinc-900">₩ {thisMonthRevenue.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Recent Reservations */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-8">Recent Reservations</h2>
            <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 border-b border-zinc-100 text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Room</th>
                    <th className="p-4 font-medium">Dates</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {reservations.slice(0, 10).map((res) => (
                    <tr key={res.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-4 font-mono text-xs text-zinc-500">{res.id.slice(-6)}</td>
                      <td className="p-4 text-zinc-900">{res.roomId === 'aube01' ? 'Aube 01' : 'Aube 02'}</td>
                      <td className="p-4 text-zinc-600">
                        {format(new Date(res.checkIn), 'MM.dd')} - {format(new Date(res.checkOut), 'MM.dd')}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 uppercase tracking-wider ${res.status === 'confirmed' ? 'bg-zinc-900 text-white' : res.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="p-4 space-x-2">
                        {res.status === 'pending' && (
                          <button onClick={() => handleConfirm(res.id)} className="text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 px-2 py-1">Confirm</button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button onClick={() => handleCancel(res.id)} className="text-xs text-red-600 hover:text-red-800 border border-red-200 px-2 py-1">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CRM / Users */}
          <div>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-8">Customer Management</h2>
            <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden divide-y divide-zinc-100">
              {users.slice(0, 5).map((u) => {
                const userReservations = reservations.filter(r => r.userId === u.uid);
                return (
                  <div key={u.uid} className="p-4 hover:bg-zinc-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-zinc-900">{u.displayName || 'Unknown User'}</h4>
                      <span className="text-xs text-zinc-400 font-mono">{u.uid.slice(0, 6)}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">{u.email}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">방문 횟수: {userReservations.length}회</span>
                      <span className="text-zinc-400">가입일: {format(new Date(u.createdAt), 'yyyy.MM.dd')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

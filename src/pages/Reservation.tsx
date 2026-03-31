import { useState } from 'react';
import { motion } from 'motion/react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import 'react-day-picker/style.css';

const ROOMS = [
  { id: 'aube01', name: 'Aube 01', price: 250000, capacity: 2 },
  { id: 'aube02', name: 'Aube 02', price: 350000, capacity: 4 },
];

const OPTIONS = [
  { id: 'bbq', name: '바비큐 세트 (그릴, 숯, 집게)', price: 30000 },
  { id: 'fire', name: '불멍 세트 (장작, 오로라 가루)', price: 20000 },
];

export default function Reservation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].id);
  const [guests, setGuests] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step === 1 && (!dateRange.from || !dateRange.to)) {
      alert('체크인과 체크아웃 날짜를 선택해주세요.');
      return;
    }
    if (step === 3 && !user) {
      alert('예약을 위해 로그인이 필요합니다.');
      navigate('/login?redirect=/reservation');
      return;
    }
    setStep(step + 1);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const calculateTotal = () => {
    const room = ROOMS.find((r) => r.id === selectedRoom);
    if (!room || !dateRange.from || !dateRange.to) return 0;
    
    // Calculate nights
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let total = room.price * diffDays;
    
    selectedOptions.forEach((optId) => {
      const opt = OPTIONS.find((o) => o.id === optId);
      if (opt) total += opt.price;
    });
    
    return total;
  };

  const handleSubmit = async () => {
    if (!user || !dateRange.from || !dateRange.to) return;
    setIsSubmitting(true);
    
    const reservationId = `res_${Date.now()}`;
    const total = calculateTotal();
    
    try {
      await setDoc(doc(db, 'reservations', reservationId), {
        id: reservationId,
        userId: user.uid,
        roomId: selectedRoom,
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to.toISOString(),
        guests,
        options: selectedOptions,
        status: 'pending',
        createdAt: new Date().toISOString(),
        totalPrice: total
      });
      setStep(4);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `reservations/${reservationId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-4">RESERVATION</h1>
          <p className="font-sans text-zinc-500 text-sm tracking-widest uppercase">온전한 쉼을 위한 예약</p>
        </motion.div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-zinc-100">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif text-zinc-900 mb-8 text-center">날짜 선택</h2>
              <div className="flex justify-center mb-12">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  disabled={{ before: new Date() }}
                  className="font-sans text-sm"
                  classNames={{
                    day_selected: "bg-zinc-900 text-white hover:bg-zinc-800",
                    day_today: "font-bold text-zinc-900",
                  }}
                />
              </div>
              <div className="flex justify-between items-center border-t border-zinc-100 pt-8">
                <div className="text-base text-zinc-500">
                  {dateRange.from && dateRange.to ? (
                    <div className="flex flex-col gap-1">
                      <span>{format(dateRange.from, 'yyyy.MM.dd')} - {format(dateRange.to, 'yyyy.MM.dd')}</span>
                      <span className="text-sm text-zinc-400">체크인 15:00 / 체크아웃 12:00</span>
                    </div>
                  ) : (
                    '체크인/체크아웃 날짜를 선택해주세요'
                  )}
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!dateRange.from || !dateRange.to}
                  className="bg-zinc-900 text-white px-8 py-3 text-xs tracking-widest uppercase disabled:opacity-50"
                >
                  다음 단계
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif text-zinc-900 mb-8 text-center">객실 및 인원 선택</h2>
              
              <div className="space-y-6 mb-12">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Room</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROOMS.map((room) => (
                    <div 
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-6 border cursor-pointer transition-colors ${selectedRoom === room.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}
                    >
                      <h4 className="font-serif text-lg mb-2">{room.name}</h4>
                      <p className="text-sm text-zinc-500 mb-4">최대 {room.capacity}인</p>
                      <p className="text-base font-medium">₩ {room.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Guests</h3>
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50"
                  >-</button>
                  <span className="text-lg w-4 text-center">{guests}</span>
                  <button 
                    onClick={() => setGuests(Math.min(ROOMS.find(r => r.id === selectedRoom)?.capacity || 2, guests + 1))}
                    className="w-10 h-10 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50"
                  >+</button>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-100 pt-8">
                <button onClick={() => setStep(1)} className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900">이전</button>
                <button onClick={handleNext} className="bg-zinc-900 text-white px-8 py-3 text-xs tracking-widest uppercase">다음 단계</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif text-zinc-900 mb-8 text-center">옵션 및 결제</h2>
              
              <div className="space-y-6 mb-12">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Options</h3>
                <div className="space-y-4">
                  {OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center justify-between p-4 border border-zinc-200 cursor-pointer hover:bg-zinc-50">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedOptions.includes(opt.id)}
                          onChange={() => handleOptionToggle(opt.id)}
                          className="mr-4 w-4 h-4 accent-zinc-900"
                        />
                        <span className="text-base text-zinc-700">{opt.name}</span>
                      </div>
                      <span className="text-base font-medium">₩ {opt.price.toLocaleString()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 p-6 mb-12">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">Summary</h3>
                <div className="space-y-3 text-base text-zinc-600 mb-6">
                  <div className="flex justify-between items-start">
                    <span>일정</span>
                    <div className="text-right">
                      <div>{dateRange.from && format(dateRange.from, 'yyyy.MM.dd')} - {dateRange.to && format(dateRange.to, 'yyyy.MM.dd')}</div>
                      <div className="text-sm text-zinc-400 mt-1">체크인 15:00 / 체크아웃 12:00</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>객실</span>
                    <span>{ROOMS.find(r => r.id === selectedRoom)?.name} ({guests}인)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 pt-6">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-2xl">₩ {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-100 pt-8">
                <button onClick={() => setStep(2)} className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900">이전</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-zinc-900 text-white px-8 py-3 text-xs tracking-widest uppercase disabled:opacity-50"
                >
                  {isSubmitting ? '처리중...' : '예약 완료하기'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <h2 className="text-3xl font-serif text-zinc-900 mb-6">당신의 온전한 쉼을 준비하겠습니다.</h2>
              <p className="text-zinc-500 mb-12 text-base">예약이 성공적으로 접수되었습니다. 마이페이지에서 예약 내역을 확인하실 수 있습니다.</p>
              <Link to="/mypage" className="inline-block border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-500 px-10 py-4 text-xs tracking-[0.2em] uppercase">
                예약 내역 확인
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

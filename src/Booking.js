import React, { useState } from 'react';

const PaymentModal = ({ isVisible, onClose, totalAmount }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
        <div className="text-lg text-white mb-4">
          Total Amount: ${totalAmount}
        </div>
        <ul>
          <li className="mb-2">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Google Pay
            </button>
          </li>
          <li className="mb-2">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              PhonePe
            </button>
          </li>
          <li className="mb-2">
            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Paytm
            </button>
          </li>
          <li>
            <button className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Debit Card
            </button>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Booking = ({ setBooking }) => {
  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const seats1 = [22, 23, 24, 25, 26, 27];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatPrice = 235;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalAmount = selectedSeats.length * seatPrice;

  return (
    <div className="flex flex-col items-start h-full w-full bg-[url('https://media.istockphoto.com/id/1446047204/photo/user-buying-movie-tickets-online.jpg?s=2048x2048&w=is&k=20&c=qls59KQbA_pSEZpPWQP_nBaIIzg_YIL3WMW6YINA-Go=')] h-dvh bg-cover bg-contain">
      <div className="backdrop-brightness-50 h-full w-full">
        <div className="px-[40rem]  text-[30px] flex-1 text-white">Book Your Seats</div>
        <button
          onClick={() => setBooking(false)}
          className="absolute top-2 left- bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Back to Home
        </button>

        <div className="px-2 py-8">
          {rows.map((row) => (
            <div key={row} className="flex space-x-3 space-y-3 text-white items-center">
              <div className="px-2 font-bold w-6">{row}</div>
              {seats.map((seat) => {
                const seatId = `${row}-${seat}`;
                return (
                  <div
                    key={seatId}
                    onClick={() => toggleSeatSelection(seatId)}
                    className={`cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-end text-white px-2 py-1 rounded ${
                      selectedSeats.includes(seatId) ? 'bg-green-600' : 'bg-slate-500 hover:bg-blue-600'
                    }`}
                  >
                    {seat}
                  </div>
                );
              })}

              <div className="px-[10rem]"></div>

              {seats1.map((seat) => {
                const seatId = `${row}-${seat}`;
                return (
                  <div
                    key={seatId}
                    onClick={() => toggleSeatSelection(seatId)}
                    className={`cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-end text-white px-2 py-1 rounded ${
                      selectedSeats.includes(seatId) ? 'bg-green-600' : 'bg-slate-500 hover:bg-blue-600'
                    }`}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

    
        <div className="mt-8 px-[22rem] text-white font-bold text-2xl">
          Total Amount: ${totalAmount}
        </div>
        <div className="py-8 transition-colors px-[24em]">
          <button
            onClick={() => setModalVisible(true)}
            className="bg-blue-600 px-4 py-2 transition-all hover:scale-110 duration-300 rounded-md text-2xl hover:bg-green-600"
          >
            Pay Now
          </button>
        </div>

        <PaymentModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
};

export default Booking;

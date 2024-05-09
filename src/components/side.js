// icons
import { CgClose } from "react-icons/cg";

const Side = () => {
  return (
    <div className="min-h-screen w-[500px] bg-white shadow-lg flex flex-col">
      {/* items */}
      <div className="px-8 py-10">
        <div className="rounded-xl bg-neutral-50 p-5 mb-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Tin Cans</p>
            <button className="rounded-full h-9 w-9 hover:bg-neutral-200 text-xl flex justify-center items-center text-slate-600">
              <CgClose />
            </button>
          </div>
          <div className="flex justify-between">
            <p>5 kg @ 2.50 / kg</p>
            <p className="text-lg font-semibold">₱ 12.50</p>
          </div>
        </div>
      </div>

      {/* calculations */}
      <div className="border-y border-slate-300 py-10 px-8 mt-auto">
        <div className="font-bold flex justify-between mb-3 text-lg">
          <p>TOTAL:</p>
          <p>₱ 75.00</p>
        </div>
        <div className="text-slate-500 font-semibold flex justify-between mb-3 text-lg">
          <p>Total weight</p>
          <p>30 kg</p>
        </div>
        <div className="text-slate-500 font-semibold flex justify-between mb-3 text-lg">
          <p>No. of items</p>
          <p>6</p>
        </div>

        <input
          placeholder="Enter user id"
          className="block text-center mt-6 mb-3 w-full appearance-none bg-white border-2 border-slate-400 text-gray-700 py-3 pl-8 pr-4 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
        />

        <button className="bg-green-600 hover:bg-green-700 rounded-lg text-lg text-white p-2 mt-3 w-full">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Side;

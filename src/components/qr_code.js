import QRCode from "react-qr-code";

const QRCodeModal = () => {
  return (
    <div className="flex flex-col items-center w-fit bg-white rounded-xl shadow-lg p-9">
      <p className="text-xl text-green-600 font-semibold text-center">
        Scan This via the ScrapCycle App to
        <br />
        Complete the Transaction
      </p>

      <div className="w-64 h-64 p-4 border-4 border-green-600 rounded-lg my-6">
        <QRCode
          value={"value"}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>

      <div className="w-full border-t border-slate-300 pt-5 mt-5">
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
      </div>

      <button className="bg-green-600 w-full hover:bg-green-700 rounded-lg text-lg text-white p-2 mt-3">
        Done
      </button>
    </div>
  );
};

export default QRCodeModal;

// icons
import { HomeContext, supabase } from "@/app/page";
import { useContext, useEffect, useRef, useState } from "react";
import { CgClose, CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

const Side = () => {
  let { setItems, items } = useContext(HomeContext);
  const userIdRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  // confirm
  const confirmTransaction = async () => {
    setLoading(true);

    try {
      // array of items for database
      const itemsForDatabase = items.map((item) => ({
        user_id: userId,
        item: item["item"],
        price: item["price"],
        unit: item["unit"].trim(),
        quantity: item["quantity"].toString(),
        total: item["total"].toString(),
      }));

      const { error } = await supabase
        .from("collectedItems")
        .insert(itemsForDatabase);

      console.log(itemsForDatabase);

      if (error != null) {
        // show error
        if (error.code == "22P02") {
          toast.error("User does not exist!");
        } else {
          toast.error("Unexpected error!");
        }

        console.log(error);
      } else {
        // show result
        toast.success("Successfully saved data!");

        // clear items
        clearItems();
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // change UserId
  const changeUserId = (id) => {
    setUserId(id);
  };

  // clear items
  const clearItems = () => {
    setItems([]);
    userIdRef.current.value = "";
  };

  // delete item
  const deleteItem = (itemIndex) => {
    const newItems = items.filter((item, index) => index !== itemIndex);

    setItems(newItems);
  };

  // change total
  const changeTotal = () => {
    // get total value
    if (items.length > 0) {
      const value = items
        .map((item) => parseFloat(item["total"]))
        .reduce((prev, curr) => prev + curr);

      // set
      setTotal(value);
    }
  };

  useEffect(() => {
    changeTotal();
  }, [items]);

  return (
    <div className="h-screen w-[500px] bg-white shadow-lg flex flex-col relative">
      {/* spinner */}
      {loading && (
        <div className="h-full w-full flex justify-center items-center absolute top-0 bg-slate-700/20">
          <div className="animate-spin">
            <CgSpinner className="w-12 h-12 text-green-500" />
          </div>
        </div>
      )}

      {/* items */}
      <div className="px-8 pt-10 pb-5 flex-grow overflow-y-scroll">
        {items &&
          items.map((item, index) => (
            <div key={index} className="rounded-xl bg-neutral-50 p-5 mb-5">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">{item["item"]}</p>
                <button
                  onClick={() => deleteItem(index)}
                  className="rounded-full h-9 w-9 hover:bg-neutral-200 text-xl flex justify-center items-center text-slate-600"
                >
                  <CgClose />
                </button>
              </div>
              <div className="flex justify-between">
                <p>
                  {item["quantity"]} {item["unit"]} @ {item["price"]} /{" "}
                  {item["unit"]}
                </p>
                <p className="text-lg font-semibold">₱ {item["total"]}</p>
              </div>
            </div>
          ))}
      </div>

      {/* calculations */}
      <div className="border-y border-slate-300 py-10 px-8 mt-auto">
        <div className="font-bold flex justify-between mb-3 text-lg">
          <p>TOTAL:</p>
          <p>₱ {total}</p>
        </div>
        <div className="text-slate-500 font-semibold flex justify-between mb-3 text-lg">
          <p>No. of items</p>
          <p>{items.length}</p>
        </div>

        <input
          ref={userIdRef}
          onChange={(e) => changeUserId(e.target.value)}
          placeholder="Enter user id"
          className="block text-center mt-6 mb-3 w-full appearance-none bg-white border-2 border-slate-400 text-gray-700 py-3 pl-8 pr-4 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
        />

        <div className="flex justify-stretch w-full">
          <button
            onClick={clearItems}
            className="bg-red-500 hover:bg-red-700 rounded-lg text-lg text-white p-2 mt-3 flex-1 mr-1"
          >
            Clear
          </button>
          <button
            onClick={confirmTransaction}
            disabled={
              userId.trim() == "" || items.length == 0 || loading == true
            }
            className="bg-green-600 disabled:bg-gray-300 hover:bg-green-700 rounded-lg text-lg text-white p-2 mt-3 flex-1 ml-1"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Side;

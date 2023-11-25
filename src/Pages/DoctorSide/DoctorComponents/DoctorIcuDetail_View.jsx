import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctor_get_detail_appointments_view } from "../../../api/user";
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'https://hospitalmgnt-default-rtdb.asia-southeast1.firebasedatabase.app/',
  storageBucket: 'YOUR_STORAGE_BUCKET',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function DoctorIcuDetail_View() {
  const { icuId } = useParams();
  const [appointData, setAppointmentData] = useState(null);
  const [dpmData, setDpmData] = useState([]);
  const [disconnectedNodes, setDisconnectedNodes] = useState([]);
  const [connectedNodes, setConnectedNodes] = useState([]);

  const { data: AppointmentData, isLoading, error, refetch } = useQuery(
    ['doctor_get_detail_appointments_view', icuId],
    () => doctor_get_detail_appointments_view(icuId)
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setAppointmentData(AppointmentData);
    }
  }, [AppointmentData, isLoading, error]);

  useEffect(() => {
    const nodesRef = ref(db, '/');
    const unsubscribe = onValue(nodesRef, (snapshot) => {
      const updatedNodes = [];
      const connectNodes = [];

      if (snapshot && snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const nodeName = childSnapshot.key;
          const node = { id: nodeName, ...childSnapshot.val(), nodeName };

          if (node.is_connected === false) {
            updatedNodes.push(node);
          } else if (node.is_connected === true) {
            connectNodes.push(node);
          }
        });

        setConnectedNodes(connectNodes);
        setDisconnectedNodes(updatedNodes);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [db]);

  const getDisconnectedNodes = () => {
    const nodesRef = ref(db, '/');
    onValue(nodesRef, (snapshot) => {
      const disconnectedNodes = [];
      const connectNodes = [];

      snapshot.forEach((childSnapshot) => {
        const node = childSnapshot.val();
        const nodeName = childSnapshot.key;

        if (node.is_connected === false) {
          disconnectedNodes.push({ id: nodeName, ...node, nodeName });
        } else if (node.is_connected === true) {
          connectNodes.push(node);
        }
      });

      setConnectedNodes(connectNodes);
      setDisconnectedNodes(disconnectedNodes);
    });
  };



  const handleDisconnect = async (nodeName) => {
    console.log(nodeName, "Disconnecting...");

    try {
      const nodeRef = ref(db, `/${nodeName}`);
      const snapshot = await get(nodeRef);

      // Check if the node exists before updating
      if (snapshot.exists()) {
        await update(nodeRef, { user_id: "", is_connected: false });
        console.log(`${nodeName} disconnected successfully`);
      } else {
        console.log(`${nodeName} does not exist or already disconnected`);
      }

      // Refresh the list of disconnected nodes
      getDisconnectedNodes();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  useEffect(() => {
    const bpm = connectedNodes?.filter((data) => data?.user_id === icuId);
    setDpmData([...bpm]);
  }, [connectedNodes, icuId]);



  return (
    <div className='w-full h-full '>
      <div className='w-full h-full bg-[#FFD8D7]  flex '>
        <div className='w-3/12 h-full py-4 '>
          <div className='w-full h-full  flex flex-col  gap-3'>
            <div className='w-full h-3/6  relative flex flex-col gap-10 '>
              <div className='w-full h-full bg-transparent inset-0 z-10 pt-8'>
                <div className='w-full h-2/6 flex  justify-center items-center bg-transparent'>
                  <img src={appointData?.Patient_profile?.profile_pic} className='w-24 h-24 rounded-full shadow-lg ' alt="" />
                </div>
              </div>
              <div className='w-full h-4/5 absolute bottom-0 z-5 py-3 px-6'>
                <div className='w-full h-full bg-white shadow-lg rounded-[13px] pt-14'>
                  <div className='w-full h-full '>
                    <div className='w-full h-1/6 flex items-center justify-center'>
                      <h1 className='text-lg text-gray-500 '>
                        {appointData?.patient?.full_name}
                      </h1>
                    </div>
                    <div className='w-full h-5/6  flex flex-col  items-center justify-center '>
                      {/* <div className='flex bg-red-400 items-center justify-evenly w-full h-2/4'>
                        <div>
                        <label htmlFor="">DOB </label>
                        <h1>
                          erfe
                        </h1>
                        </div>
                        <div>
                          retet
                        </div>
                      </div>
                      <div className='flex bg-red-400 items-center justify-evenly w-full h-2/4'>
                        <div>
                          setFirebaseFirebase
                        </div>
                        <div>
                          retet
                        </div>
                      </div> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-3/6  px-6'>
              <div className='w-full h-full bg-white shadow-lg border-1 rounded-[13px] p-3'>
                <div className='w-full h-full flex items-center justify-center '>
                  <div className='bg-[#FF856E] w-48 h-48 rounded-full flex items-center justify-center'>
                    <div className='bg-white w-44 h-44 rounded-full flex items-center justify-center'>
                      <div className='w-20 h-20 flex flex-col items-center justify-center'>
                        <div className='w-full h-5/6  flex items-center justify-center '>
                          <h1 className='text-4xl font-bold '>
                            {dpmData[0] && dpmData[0].HeartRate !== undefined ? dpmData[0].HeartRate : '0'}
                          </h1>
                        </div>
                        <div className='w-full h-1/6  flex items-center justify-center '>
                          <h1 className='text-xl font-bold text-gray-400 '>BPM</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-9/12 h-full  py-4'>
          <div className='w-full h-full  flex flex-col  gap-3'>
            <div className='w-full h-3/6  relative flex flex-col gap-10 '>
              <div className='w-full h-full bg-transparent inset-0 z-10 pt-8'>
              </div>
              <div className='w-full h-4/5 absolute bottom-0 z-5 py-3 px-6'>
                <div className='w-full h-full flex gap-3 py-6 px-2'>
                  <div className='w-2/6 h-full bg-white shadow-lg rounded-[10px]'>

                  </div>
                  <div className='w-2/6 h-full bg-white shadow-lg rounded-[10px]'>

                  </div>
                  <div className='w-2/6 h-full bg-white shadow-lg rounded-[10px]'>

                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-3/6  px-6'>
              <div className='w-full h-full bg-white shadow-lg border-1 rounded-[13px]'>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Heart Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        AVG  Heart Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Is Connected
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Node Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dpmData && dpmData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.HeartRate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.Temperature}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.is_connected ? 'True' : 'False'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.nodeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.is_connected && (
                            <button
                              onClick={() => handleDisconnect(item?.nodeName)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Disconnect
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorIcuDetail_View
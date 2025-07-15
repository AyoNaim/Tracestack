'use client'

import ErrorComponent from "components/error"

export default function Home() {
  return (
    <ErrorComponent/>
  )
}
// import { useState } from 'react'

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const handleCreateLog = async () => {
//     setResponseMessage('');
//     setError('');

//     // IMPORTANT: Replace 'YOUR_ACTUAL_PROJECT_ID' with a real projectId
//     // You can get this from your Supabase 'projects' table.
//     // If you don't have one, manually insert a project into Supabase first.
//     const projectId = 'cmcxotz2a0000c89xlhdwhatv';

//     if (projectId !== 'cmcxotz2a0000c89xlhdwhatv') {
//       setError("Please replace your project ID with a real Project ID from Supabase.");
//       return;
//     }

//     const logData = {
//       message: `Test log from frontend at ${new Date().toISOString()}`,
//       level: "INFO",
//       projectId: projectId,
//       meta: {
//         source: "web-app",
//         action: "button_click_test",
//         environment: "development"
//       }
//     };

//     try {
//       console.log('Sending log data:', logData);
//       const response = await fetch('/api/logs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(logData),
//       });

//       const data = await response.json();
//       console.log('API Response:', data);

//       if (response.ok) {
//         setResponseMessage(`Log created successfully! Response: ${JSON.stringify(data)}`);
//       } else {
//         setError(`Failed to create log: ${data.error || response.statusText}`);
//         console.log(`an error has occurred`);
//       }
//     } catch (err: any) {
//       console.error('Error creating log:', err);
//       setError(`Error creating log: ${err.message || 'Unknown error'}`);
//     }
//   };

//   const createProject = async () => {
//     setLoading(true)

//     try {
//       const res = await fetch('/api/projects', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: 'TraceStack Dev Tool',
//           team: 'dev-team-id',
//         }),
//       })

//       const data = await res.json();
//       console.log('✅ API Response:', data)
//     } catch (error) {
//       console.error('❌ API Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <h1 className="text-4xl font-bold">Tracestack Web App</h1>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-24 after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 lg:static lg:w-auto lg:p-4 lg:before:w-full lg:after:hidden">
//          {/* Replace with your logo if you have one */}
//          <p className="text-2xl">Your Monorepo is Ready!</p>
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left">
//         <button
//           onClick={handleCreateLog}
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Test Create Log{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Click to send a test log through API to Worker and Supabase.
//           </p>
//         </button>

//         {responseMessage && (
//           <p className="mt-4 text-green-500">Success: {responseMessage}</p>
//         )}
//         {error && (
//           <p className="mt-4 text-red-500">Error: {error}</p>
//         )}
//       </div>
//     </main>
//   );
// }

    // <main className="flex flex-col items-center justify-center min-h-screen">
    //    {/* <button
    //     onClick={createProject}
    //     className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
    //     disabled={loading}
    //   >
    //     {loading ? 'Creating Project...' : 'Create Project via API'}
    //   </button>*/}
    // </main>
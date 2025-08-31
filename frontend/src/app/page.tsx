// // "use client";
// // import { useMemo, useState } from "react";
// // import useSWR from "swr";
// // import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

// // const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// // const fetcher = (url: string) => fetch(url).then(r => r.json());

// // type BeeRecord = {
// //   id: number;
// //   timestamp: string;
// //   temperatura: number;
// //   umidade: number;
// //   poluicao: number;
// //   abelhas_ativas: number;
// //   atividade_alta: number;
// //   atividade: string;
// // };

// // export default function Page() {
// //   // Fetch dados
// //   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
// //     `${BACKEND}/api/data/dados?limit=300`,
// //     fetcher,
// //     { refreshInterval: 3000 }
// //   );

// //   // Fetch stats
// //   const { data: stats = { total: 0, altas: 0, baixas: 0 } } = useSWR(
// //     `${BACKEND}/api/data/stats`,
// //     fetcher,
// //     { refreshInterval: 5000 }
// //   );

// //   const chartData = useMemo(() => {
// //     return [...data].reverse().map(d => ({
// //       t: new Date(d.timestamp).toLocaleTimeString(),
// //       temperatura: d.temperatura,
// //       umidade: d.umidade,
// //       poluicao: d.poluicao,
// //       atividade: d.atividade,
// //     }));
// //   }, [data]);

// //   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
// //   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

// //   const onPredict = async () => {
// //     const r = await fetch(`${BACKEND}/api/data/predicao`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(form)
// //     });
// //     const p = await r.json();
// //     setPred({ label: p.predicted_label, proba: p.proba_alta });
// //   };

// //   return (
// //     <div className="p-6 space-y-6 max-w-6xl mx-auto">
// //       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

// //       <div className="grid md:grid-cols-3 gap-4">
// //         <div className="rounded-2xl shadow p-4">
// //           <div className="text-sm text-gray-500">Total de Leituras</div>
// //           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
// //         </div>
// //         <div className="rounded-2xl shadow p-4">
// //           <div className="text-sm text-gray-500">Atividade Alta</div>
// //           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
// //         </div>
// //         <div className="rounded-2xl shadow p-4">
// //           <div className="text-sm text-gray-500">Atividade Baixa</div>
// //           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
// //         </div>
// //       </div>

// //       <div className="rounded-2xl shadow p-4">
// //         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
// //         <div className="w-full h-80">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <LineChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="t" />
// //               <YAxis />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="temperatura" dot={false} />
// //               <Line type="monotone" dataKey="umidade" dot={false} />
// //               <Line type="monotone" dataKey="poluicao" dot={false} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       <div className="grid md:grid-cols-2 gap-4">
// //         <div className="rounded-2xl shadow p-4">
// //           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
// //           <div className="w-full h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={[{ name: 'Altas', v: stats.altas ?? 0 }, { name: 'Baixas', v: stats.baixas ?? 0 }]}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="v" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         <div className="rounded-2xl shadow p-4">
// //           <h2 className="text-xl font-semibold mb-3">Predição</h2>
// //           <div className="space-y-3">
// //             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
// //               <div key={k} className="flex items-center gap-3">
// //                 <label className="w-32 capitalize">{k}</label>
// //                 <input
// //                   type="number"
// //                   value={(form as any)[k]}
// //                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
// //                   className="border rounded-xl px-3 py-2 w-full"
// //                 />
// //               </div>
// //             ))}
// //             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
// //             {pred.label && (
// //               <div className="text-lg">
// //                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
// //       {isLoading && <div>Carregando…</div>}
// //     </div>
// //   );
// // }



// "use client";
// import { useMemo, useState } from "react";
// import useSWR from "swr";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const fetcher = (url: string) => fetch(url).then(r => r.json());

// type BeeRecord = {
//   id?: number;
//   timestamp: string;
//   temperatura: number;
//   umidade: number;
//   poluicao: number;
//   abelhas_ativas: number;
//   atividade_alta: number;
//   atividade: string;
// };

// export default function Page() {
//   // Fetch dados
//   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
//     `${BACKEND}/api/data/dados?limit=300`,
//     fetcher,
//     { refreshInterval: 3000 }
//   );

//   // Fetch stats
//   const { data: statsData } = useSWR(
//     `${BACKEND}/api/data/stats`,
//     fetcher,
//     { refreshInterval: 5000 }
//   );

//   // Calcula estatísticas dinâmicas a partir dos dados recebidos
//   const stats = useMemo(() => {
//     const total = data.length;
//     const altas = data.filter(d => d.atividade === "alta").length;
//     const baixas = total - altas;
//     return { total, altas, baixas };
//   }, [data]);

//   // Prepara dados para gráfico de séries temporais
//   const chartData = useMemo(() => {
//     const reversed = [...data].reverse();
//     const windowSize = 5;
//     let sum = 0;
//     return reversed.map((d, i) => {
//       sum += d.abelhas_ativas;
//       if (i >= windowSize) sum -= reversed[i - windowSize].abelhas_ativas;
//       const mediaMovel = i >= windowSize - 1 ? sum / windowSize : sum / (i + 1);
//       return {
//         t: new Date(d.timestamp).toLocaleTimeString(),
//         temperatura: d.temperatura,
//         umidade: d.umidade,
//         poluicao: d.poluicao,
//         atividade: d.atividade,
//         mediaMovel,
//       };
//     });
//   }, [data]);

//   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
//   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

//   const onPredict = async () => {
//     const r = await fetch(`${BACKEND}/api/data/predicao`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const p = await r.json();
//     setPred({ label: p.predicted_label, proba: p.proba_alta });
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Total de Leituras</div>
//           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
//         </div>
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Alta</div>
//           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
//         </div>
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Baixa</div>
//           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
//         </div>
//       </div>

//       <div className="rounded-2xl shadow p-4">
//         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="t" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="temperatura" dot={false} />
//               <Line type="monotone" dataKey="umidade" dot={false} />
//               <Line type="monotone" dataKey="poluicao" dot={false} />
//               <Line type="monotone" dataKey="mediaMovel" stroke="#FF0000" dot={false} name="Média Atividade" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={[{ name: 'Altas', v: stats.altas ?? 0 }, { name: 'Baixas', v: stats.baixas ?? 0 }]}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="v" fill="#4ade80" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Predição</h2>
//           <div className="space-y-3">
//             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
//               <div key={k} className="flex items-center gap-3">
//                 <label className="w-32 capitalize">{k}</label>
//                 <input
//                   type="number"
//                   value={(form as any)[k]}
//                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
//                   className="border rounded-xl px-3 py-2 w-full"
//                 />
//               </div>
//             ))}
//             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
//             {pred.label && (
//               <div className="text-lg">
//                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
//       {isLoading && <div>Carregando…</div>}
//     </div>
//   );
// }

// "use client";
// import { useMemo, useState } from "react";
// import useSWR from "swr";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const fetcher = (url: string) => fetch(url).then(r => r.json());

// type BeeRecord = {
//   id?: number;
//   timestamp: string;
//   temperatura: number;
//   umidade: number;
//   poluicao: number;
//   abelhas_ativas: number;
//   atividade_alta: number;
//   atividade: string;
// };

// export default function Page() {
//   const ALERT_LIMIT = 70; // limite crítico de abelhas ativas

//   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
//     `${BACKEND}/api/data/dados?limit=300`,
//     fetcher,
//     { refreshInterval: 3000 }
//   );

//   const stats = useMemo(() => {
//     const total = data.length;
//     const altas = data.filter(d => d.atividade === "alta").length;
//     const baixas = total - altas;
//     const mediaAtividade = data.length ? data.reduce((acc, d) => acc + d.abelhas_ativas, 0) / data.length : 0;
//     return { total, altas, baixas, mediaAtividade };
//   }, [data]);

//   const chartData = useMemo(() => {
//     const reversed = [...data].reverse();
//     const windowSize = 5;
//     let sum = 0;
//     return reversed.map((d, i) => {
//       sum += d.abelhas_ativas;
//       if (i >= windowSize) sum -= reversed[i - windowSize].abelhas_ativas;
//       const mediaMovel = i >= windowSize - 1 ? sum / windowSize : sum / (i + 1);
//       return {
//         t: new Date(d.timestamp).toLocaleTimeString(),
//         temperatura: d.temperatura,
//         umidade: d.umidade,
//         poluicao: d.poluicao,
//         atividade: d.atividade,
//         mediaMovel,
//       };
//     });
//   }, [data]);

//   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
//   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

//   const onPredict = async () => {
//     const r = await fetch(`${BACKEND}/api/data/predicao`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const p = await r.json();
//     setPred({ label: p.predicted_label, proba: p.proba_alta });
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Total de Leituras</div>
//           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
//         </div>

//         <div className={`rounded-2xl shadow p-4 transition-colors ${stats.mediaAtividade >= ALERT_LIMIT ? "bg-red-500 text-white" : ""}`}>
//           <div className="text-sm text-gray-500 flex items-center gap-2">
//             Atividade Alta
//             {stats.mediaAtividade >= ALERT_LIMIT && <span>⚠️</span>}
//           </div>
//           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Baixa</div>
//           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
//         </div>
//       </div>

//       <div className="rounded-2xl shadow p-4">
//         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="t" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="temperatura" dot={false} />
//               <Line type="monotone" dataKey="umidade" dot={false} />
//               <Line type="monotone" dataKey="poluicao" dot={false} />
//               <Line type="monotone" dataKey="mediaMovel" stroke="#FF0000" dot={false} name="Média Atividade" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={[{ name: 'Altas', v: stats.altas ?? 0 }, { name: 'Baixas', v: stats.baixas ?? 0 }]}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="v" fill="#4ade80" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Predição</h2>
//           <div className="space-y-3">
//             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
//               <div key={k} className="flex items-center gap-3">
//                 <label className="w-32 capitalize">{k}</label>
//                 <input
//                   type="number"
//                   value={(form as any)[k]}
//                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
//                   className="border rounded-xl px-3 py-2 w-full"
//                 />
//               </div>
//             ))}
//             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
//             {pred.label && (
//               <div className="text-lg">
//                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
//       {isLoading && <div>Carregando…</div>}
//     </div>
//   );
// }

// "use client";
// import { useMemo, useState, useEffect } from "react";
// import useSWR from "swr";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const fetcher = (url: string) => fetch(url).then(r => r.json());

// type BeeRecord = {
//   id?: number;
//   timestamp: string;
//   temperatura: number;
//   umidade: number;
//   poluicao: number;
//   abelhas_ativas: number;
//   atividade_alta: number;
//   atividade: string;
// };

// export default function Page() {
//   const ALERT_LIMIT = 95;

//   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
//     `${BACKEND}/api/data/dados?limit=300`,
//     fetcher,
//     { refreshInterval: 3000 }
//   );

//   const [alertVisible, setAlertVisible] = useState(false);

//   // stats calculados a partir dos dados recebidos
//   const stats = useMemo(() => {
//     const total = data.length;
//     const altas = data.filter(d => d.atividade === "alta").length;
//     const baixas = total - altas;
//     const mediaAtividade = data.length ? data.reduce((acc, d) => acc + d.abelhas_ativas, 0) / data.length : 0;
//     return { total, altas, baixas, mediaAtividade };
//   }, [data]);

//   // alerta baseado na média
//   useEffect(() => {
//     if (stats.mediaAtividade >= ALERT_LIMIT) {
//       setAlertVisible(true);
//       const audio = new Audio("/emergency-alarm.mp3");
//       audio.play().catch(() => console.log("Erro ao tocar o som do alarme."));
//       const timer = setTimeout(() => setAlertVisible(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [stats.mediaAtividade]);

//   const chartData = useMemo(() => {
//     return [...data].reverse().map(d => ({
//       t: new Date(d.timestamp).toLocaleTimeString(),
//       temperatura: d.temperatura,
//       umidade: d.umidade,
//       poluicao: d.poluicao,
//       atividade: d.atividade,
//     }));
//   }, [data]);

//   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
//   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

//   const onPredict = async () => {
//     const r = await fetch(`${BACKEND}/api/data/predicao`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const p = await r.json();
//     setPred({ label: p.predicted_label, proba: p.proba_alta });
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

//       {alertVisible && (
//         <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-pulse z-50">
//           ⚠️ Alerta: Atividade de abelhas muito alta!
//         </div>
//       )}

//       {/* Cards de stats */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Total de Leituras</div>
//           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
//         </div>
//         <div className={`rounded-2xl shadow p-4 transition-colors ${stats.mediaAtividade >= ALERT_LIMIT ? "bg-red-500 text-white" : ""}`}>
//           <div className="text-sm text-gray-500 flex items-center gap-2">
//             Atividade Alta {stats.mediaAtividade >= ALERT_LIMIT && <span>⚠️</span>}
//           </div>
//           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
//         </div>
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Baixa</div>
//           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
//         </div>
//       </div>

//       {/* Série temporal */}
//       <div className="rounded-2xl shadow p-4">
//         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="t" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="temperatura" dot={false} />
//               <Line type="monotone" dataKey="umidade" dot={false} />
//               <Line type="monotone" dataKey="poluicao" dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Distribuição da atividade e predição */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={[{ name: 'Altas', v: stats.altas ?? 0 }, { name: 'Baixas', v: stats.baixas ?? 0 }]}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="v" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Predição</h2>
//           <div className="space-y-3">
//             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
//               <div key={k} className="flex items-center gap-3">
//                 <label className="w-32 capitalize">{k}</label>
//                 <input
//                   type="number"
//                   value={(form as any)[k]}
//                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
//                   className="border rounded-xl px-3 py-2 w-full"
//                 />
//               </div>
//             ))}
//             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
//             {pred.label && (
//               <div className="text-lg">
//                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
//       {isLoading && <div>Carregando…</div>}
//     </div>
//   );
// }



// "use client";
// import { useMemo, useState, useEffect } from "react";
// import useSWR from "swr";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const fetcher = (url: string) => fetch(url).then(r => r.json());

// type BeeRecord = {
//   id?: number;
//   timestamp: string;
//   temperatura: number;
//   umidade: number;
//   poluicao: number;
//   abelhas_ativas: number;
//   atividade_alta: number;
//   atividade: string;
// };

// export default function Page() {
//   const ALERT_LIMIT = 95;

//   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
//     `${BACKEND}/api/data/dados?limit=300`,
//     fetcher,
//     { refreshInterval: 3000 }
//   );

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [audioAllowed, setAudioAllowed] = useState(false);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

//   // Criar audio apenas no client
//   useEffect(() => {
//     setAudio(new Audio("/emergency-alarm.mp3"));
//   }, []);

//   // stats calculados a partir dos dados recebidos
//   const stats = useMemo(() => {
//     const total = data.length;
//     const altas = data.filter(d => d.atividade === "alta").length;
//     const baixas = total - altas;
//     const mediaAtividade = data.length ? data.reduce((acc, d) => acc + d.abelhas_ativas, 0) / data.length : 0;
//     return { total, altas, baixas, mediaAtividade };
//   }, [data]);

//   // alerta baseado na média
//   useEffect(() => {
//     if (stats.mediaAtividade >= ALERT_LIMIT && audioAllowed && audio) {
//       setAlertVisible(true);
//       audio.play().catch(() => console.log("Erro ao tocar o som do alarme."));
//       const timer = setTimeout(() => setAlertVisible(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [stats.mediaAtividade, audioAllowed, audio]);

//   const toggleAudio = () => {
//     if (!audio) return;
//     if (!audioAllowed) {
//       audio.play().then(() => {
//         audio.pause();
//         audio.currentTime = 0;
//         setAudioAllowed(true);
//       });
//     } else {
//       audio.pause();
//       setAudioAllowed(false);
//     }
//   };

//   const chartData = useMemo(() => {
//     return [...data].reverse().map(d => ({
//       t: new Date(d.timestamp).toLocaleTimeString(),
//       temperatura: d.temperatura,
//       umidade: d.umidade,
//       poluicao: d.poluicao,
//       atividade: d.atividade,
//     }));
//   }, [data]);

//   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
//   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

//   const onPredict = async () => {
//     const r = await fetch(`${BACKEND}/api/data/predicao`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const p = await r.json();
//     setPred({ label: p.predicted_label, proba: p.proba_alta });
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

//       {audio && (
//         <button
//           onClick={toggleAudio}
//           className={`px-4 py-2 rounded-xl fixed top-6 right-6 z-50 ${audioAllowed ? 'bg-red-600 text-white' : 'bg-black text-white'}`}
//         >
//           {audioAllowed ? "Desativar Alertas Sonoros" : "Ativar Alertas Sonoros"}
//         </button>
//       )}

//       {alertVisible && (
//         <div className="fixed top-16 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-pulse z-50">
//           ⚠️ Alerta: Atividade de abelhas muito alta!
//         </div>
//       )}

//       {/* Cards de stats */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Total de Leituras</div>
//           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
//         </div>
//         <div className={`rounded-2xl shadow p-4 transition-colors ${stats.mediaAtividade >= ALERT_LIMIT ? "bg-red-500 text-white" : ""}`}>
//           <div className="text-sm text-gray-500 flex items-center gap-2">
//             Atividade Alta {stats.mediaAtividade >= ALERT_LIMIT && <span>⚠️</span>}
//           </div>
//           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
//         </div>
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Baixa</div>
//           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
//         </div>
//       </div>

//       {/* Série temporal */}
//       <div className="rounded-2xl shadow p-4">
//         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="t" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="temperatura" dot={false} />
//               <Line type="monotone" dataKey="umidade" dot={false} />
//               <Line type="monotone" dataKey="poluicao" dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Distribuição da atividade e predição */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={[{ name: 'Altas', v: stats.altas ?? 0 }, { name: 'Baixas', v: stats.baixas ?? 0 }]}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="v" fill="#4ade80" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Predição</h2>
//           <div className="space-y-3">
//             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
//               <div key={k} className="flex items-center gap-3">
//                 <label className="w-32 capitalize">{k}</label>
//                 <input
//                   type="number"
//                   value={(form as any)[k]}
//                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
//                   className="border rounded-xl px-3 py-2 w-full"
//                 />
//               </div>
//             ))}
//             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
//             {pred.label && (
//               <div className="text-lg">
//                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
//       {isLoading && <div>Carregando…</div>}
//     </div>
//   );
// }



// "use client";
// import { useMemo, useState, useEffect } from "react";
// import useSWR from "swr";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";
// import { useRef } from "react";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const fetcher = (url: string) => fetch(url).then(r => r.json());


// type BeeRecord = {
//   id?: number;
//   timestamp: string;
//   temperatura: number;
//   umidade: number;
//   poluicao: number;
//   abelhas_ativas: number;
//   atividade_alta: number;
//   atividade: string;
// };

// export default function Page() {
//   const ALERT_LIMIT = 95;

//   const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
//     `${BACKEND}/api/data/dados?limit=300`,
//     fetcher,
//     { refreshInterval: 3000 }
//   );

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [audioAllowed, setAudioAllowed] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   // stats calculados a partir dos dados recebidos
//   const stats = useMemo(() => {
//     const total = data.length;
//     const altas = data.filter(d => d.atividade === "alta").length;
//     const baixas = total - altas;
//     const mediaAtividade = data.length ? data.reduce((acc, d) => acc + d.abelhas_ativas, 0) / data.length : 0;
//     return { total, altas, baixas, mediaAtividade };
//   }, [data]);

//   // alerta baseado na média
//   useEffect(() => {
//     if (stats.mediaAtividade >= ALERT_LIMIT && audioAllowed) {
//       setAlertVisible(true);
//       if (!audioRef.current) audioRef.current = new Audio("/emergency-alarm.mp3");
//       audioRef.current.loop = true; // toca em loop até desativar
//       audioRef.current.play().catch(() => console.log("Erro ao tocar o som do alarme."));
//       const timer = setTimeout(() => setAlertVisible(false), 5000);
//       return () => clearTimeout(timer);
//     } else if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }, [stats.mediaAtividade, audioAllowed]);

//   const chartData = useMemo(() => {
//     return [...data].reverse().map(d => ({
//       t: new Date(d.timestamp).toLocaleTimeString(),
//       temperatura: d.temperatura,
//       umidade: d.umidade,
//       poluicao: d.poluicao,
//       atividade: d.atividade,
//       abelhas_ativas: d.abelhas_ativas,
//     }));
//   }, [data]);

//   const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
//   const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

//   const onPredict = async () => {
//     const r = await fetch(`${BACKEND}/api/data/predicao`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const p = await r.json();
//     setPred({ label: p.predicted_label, proba: p.proba_alta });
//   };

//   const activityDistribution = [
//     {
//       name: "Altas",
//       v: stats.altas ?? 0,
//       perc: stats.total ? ((stats.altas / stats.total) * 100).toFixed(1) : "0",
//       fill: stats.mediaAtividade >= ALERT_LIMIT ? "#f87171" : "#4ade80",
//     },
//     {
//       name: "Baixas",
//       v: stats.baixas ?? 0,
//       perc: stats.total ? ((stats.baixas / stats.total) * 100).toFixed(1) : "0",
//       fill: "#60a5fa",
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

//       {alertVisible && (
//         <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-pulse z-50">
//           ⚠️ Alerta: Atividade de abelhas muito alta!
//         </div>
//       )}

//       {/* Botão para habilitar/desabilitar som */}
//       <div className="flex justify-end mb-4 items-center gap-2">
//         <input
//           type="checkbox"
//           checked={audioAllowed}
//           onChange={e => setAudioAllowed(e.target.checked)}
//         />
//         <span>Habilitar som de alerta</span>
//       </div>

//       {/* Cards de stats */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Total de Leituras</div>
//           <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
//         </div>

//         <div className={`rounded-2xl shadow p-4 transition-colors ${stats.mediaAtividade >= ALERT_LIMIT ? "bg-red-500 text-white" : ""}`}>
//           <div className="text-sm text-gray-500 flex items-center gap-2">
//             Atividade Alta {stats.mediaAtividade >= ALERT_LIMIT && <span>⚠️</span>}
//           </div>
//           <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Atividade Baixa</div>
//           <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <div className="text-sm text-gray-500">Média de Abelhas Ativas</div>
//           <div className="text-3xl font-semibold">{stats.mediaAtividade.toFixed(1)}</div>
//         </div>
//       </div>

//       {/* Série temporal */}
//       <div className="rounded-2xl shadow p-4">
//         <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="t" />
//               <YAxis />
//               <Tooltip />
//               <Legend verticalAlign="top" height={36} />
//               <Line type="monotone" dataKey="temperatura" dot={false} stroke="#f87171" name="Temperatura (°C)" />
//               <Line type="monotone" dataKey="umidade" dot={false} stroke="#60a5fa" name="Umidade (%)" />
//               <Line type="monotone" dataKey="poluicao" dot={false} stroke="#facc15" name="Poluição" />
//               <Line type="monotone" dataKey="abelhas_ativas" dot={false} stroke="#a78bfa" name="Abelhas Ativas" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Distribuição da atividade e predição */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={activityDistribution}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.perc}%)`, name]} />
//                 <Legend verticalAlign="top" height={36} />
//                 {activityDistribution.map((item, i) => (
//                   <Bar key={i} dataKey="v" fill={item.fill} name={`Leituras - ${item.name}`} />
//                 ))}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-3">Predição</h2>
//           <div className="space-y-3">
//             {(["temperatura", "umidade", "poluicao"] as const).map(k => (
//               <div key={k} className="flex items-center gap-3">
//                 <label className="w-32 capitalize">{k}</label>
//                 <input
//                   type="number"
//                   value={(form as any)[k]}
//                   onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
//                   className="border rounded-xl px-3 py-2 w-full"
//                 />
//               </div>
//             ))}
//             <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
//             {pred.label && (
//               <div className="text-lg">
//                 Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="text-red-600">Erro ao carregar dados.</div>}
//       {isLoading && <div>Carregando…</div>}
//     </div>
//   );
// }


"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import useSWR from "swr";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, Legend
} from "recharts";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const fetcher = (url: string) => fetch(url).then(r => r.json());

type BeeRecord = {
  id?: number;
  timestamp: string;
  temperatura: number;
  umidade: number;
  poluicao: number;
  abelhas_ativas: number;
  atividade_alta: number;
  atividade: string;
};

export default function Page() {
  const ALERT_LIMIT = 580;
  const RECENT_COUNT = 20;

  const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
    `${BACKEND}/api/data/dados?limit=300`,
    fetcher,
    { refreshInterval: 3000 }
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // stats calculados a partir dos dados recebidos
  const stats = useMemo(() => {
    const total = data.length;
    const altas = data.filter(d => d.atividade === "alta").length;
    const baixas = total - altas;

    // média das últimas leituras
    const recentData = data.slice(-RECENT_COUNT);
    const mediaRecente = recentData.length
      ? recentData.reduce((acc, d) => acc + d.abelhas_ativas, 0) / recentData.length
      : 0;

    const mediaAtividade = data.length
      ? data.reduce((acc, d) => acc + d.abelhas_ativas, 0) / data.length
      : 0;

    return { total, altas, baixas, mediaAtividade, mediaRecente };
  }, [data]);

  // define se o alerta está ativo (visual)
  const alertaAtivo = stats.mediaRecente >= ALERT_LIMIT;

  // alerta sonoro baseado na média recente e audioAllowed
  useEffect(() => {
    if (alertaAtivo && audioAllowed) {
      setAlertVisible(true);
      if (!audioRef.current) audioRef.current = new Audio("/emergency-alarm.mp3");
      if (audioRef.current.paused) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => console.log("Erro ao tocar o som do alarme."));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAlertVisible(false);
    }
  }, [alertaAtivo, audioAllowed]);

  const chartData = useMemo(() => {
    return [...data].reverse().map(d => ({
      t: new Date(d.timestamp).toLocaleTimeString(),
      temperatura: d.temperatura,
      umidade: d.umidade,
      poluicao: d.poluicao,
      atividade: d.atividade,
      abelhas_ativas: d.abelhas_ativas,
    }));
  }, [data]);

  const [form, setForm] = useState({ temperatura: 25, umidade: 60, poluicao: 30 });
  const [pred, setPred] = useState<{ label?: string; proba?: number }>({});

  const onPredict = async () => {
    const r = await fetch(`${BACKEND}/api/data/predicao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const p = await r.json();
    setPred({ label: p.predicted_label, proba: p.proba_alta });
  };

  // distribuição da atividade com cores dinâmicas
  const activityDistribution = [
    {
      name: "Altas",
      v: stats.altas ?? 0,
      perc: stats.total ? ((stats.altas / stats.total) * 100).toFixed(1) : "0",
      fill: alertaAtivo ? "#f87171" : "#4ade80",
    },
    {
      name: "Baixas",
      v: stats.baixas ?? 0,
      perc: stats.total ? ((stats.baixas / stats.total) * 100).toFixed(1) : "0",
      fill: "#60a5fa",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">🐝 Monitoramento de Abelhas – Dashboard</h1>

      {/* alerta visual */}
      {alertVisible && (
        <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-pulse z-50">
          ⚠️ Alerta: Atividade de abelhas muito alta!
        </div>
      )}

      {/* botão de som */}
      <div className="flex justify-end mb-4 items-center gap-2">
        <input
          type="checkbox"
          checked={audioAllowed}
          onChange={e => setAudioAllowed(e.target.checked)}
        />
        <span>Habilitar som de alerta</span>
      </div>

      {/* cards de stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Total de Leituras</div>
          <div className="text-3xl font-semibold">{stats.total ?? "–"}</div>
        </div>

        {/* Card de Atividade Alta – sem alerta visual */}
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            Atividade Alta
          </div>
          <div className="text-3xl font-semibold">{stats.altas ?? "–"}</div>
        </div>

        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Atividade Baixa</div>
          <div className="text-3xl font-semibold">{stats.baixas ?? "–"}</div>
        </div>

        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Média Geral</div>
          <div className="text-3xl font-semibold">{stats.mediaAtividade.toFixed(1)}</div>
        </div>

        {/* Card de Média Recente – agora com alerta visual */}
        <div className={`rounded-2xl shadow p-4 transition-colors ${alertaAtivo ? "bg-red-500 text-white" : ""}`}>
          <div className={`text-sm flex items-center gap-2 ${alertaAtivo ? 'text-white' : 'text-gray-500'}`}>
            Média Recente (Últimas {RECENT_COUNT}) {alertaAtivo && <span>⚠️</span>}
          </div>
          <div className="text-3xl font-semibold">{stats.mediaRecente.toFixed(1)}</div>
        </div>
      </div>


      {/* séries temporais */}
      <div className="rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Séries Temporais</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="temperatura" dot={false} stroke="#f87171" name="Temperatura (°C)" />
              <Line type="monotone" dataKey="umidade" dot={false} stroke="#60a5fa" name="Umidade (%)" />
              <Line type="monotone" dataKey="poluicao" dot={false} stroke="#facc15" name="Poluição" />
              <Line type="monotone" dataKey="abelhas_ativas" dot={false} stroke="#a78bfa" name="Abelhas Ativas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* distribuição da atividade */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.perc}%)`, name]} />
                <Legend verticalAlign="top" height={36} />
                {activityDistribution.map((item, i) => (
                  <Bar key={i} dataKey="v" fill={item.fill} name={`Leituras - ${item.name}`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* predição */}
        <div className="rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Predição</h2>
          <div className="space-y-3">
            {(["temperatura", "umidade", "poluicao"] as const).map(k => (
              <div key={k} className="flex items-center gap-3">
                <label className="w-32 capitalize">{k}</label>
                <input
                  type="number"
                  value={(form as any)[k]}
                  onChange={e => setForm({ ...form, [k]: Number(e.target.value) })}
                  className="border rounded-xl px-3 py-2 w-full"
                />
              </div>
            ))}
            <button onClick={onPredict} className="px-4 py-2 rounded-xl bg-black text-white">Prever</button>
            {pred.label && (
              <div className="text-lg">
                Resultado: <b>{pred.label}</b> {typeof pred.proba === 'number' && `(p≈${(pred.proba * 100).toFixed(1)}%)`}
              </div>
            )}
          </div>
        </div>
      </div>

      {error && <div className="text-red-600">Erro ao carregar dados.</div>}
      {isLoading && <div>Carregando…</div>}
    </div>
  );
}

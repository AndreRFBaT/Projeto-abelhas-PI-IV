"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import useSWR from "swr";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, Legend
} from "recharts";

const BACKEND = "http://localhost:8001";
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
  ruido_db: number;
  status_ruido: string;
};

export default function Page() {
  const ALERT_LIMIT = 600;
  const RECENT_COUNT = 1;

  const { data = [], error, isLoading } = useSWR<BeeRecord[]>(
    `${BACKEND}/api/data/dados`,
    fetcher,
    { refreshInterval: 3000 }
  );

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

    const ruidoRecente = recentData.length
      ? recentData[recentData.length - 1].ruido_db
      : 0;

    const statusRuido = recentData.length
      ? recentData[recentData.length - 1].status_ruido
      : "–";

    const alertaAtivo = mediaRecente >= ALERT_LIMIT;
    const alertaRuido = ruidoRecente > 80;

    const alertaAtivoTotal = alertaAtivo || alertaRuido;

    return { total, altas, baixas, mediaAtividade, mediaRecente, ruidoRecente, statusRuido, alertaAtivo, alertaRuido, alertaAtivoTotal };
  }, [data]);

  // alerta sonoro baseado na média recente e ruído
  useEffect(() => {
    if (stats.alertaAtivoTotal && audioAllowed) {
      if (!audioRef.current) audioRef.current = new Audio("/emergency-alarm.mp3");
      if (audioRef.current.paused) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => console.log("Erro ao tocar o som do alarme."));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [stats.alertaAtivoTotal, audioAllowed]);

  const chartData = useMemo(() => {
    return [...data].reverse().map(d => ({
      t: new Date(d.timestamp).toLocaleTimeString(),
      temperatura: d.temperatura,
      umidade: d.umidade,
      poluicao: d.poluicao,
      atividade: d.atividade,
      abelhas_ativas: d.abelhas_ativas,
      ruido: d.ruido_db,
      status_ruido: d.status_ruido,
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
      fill: stats.alertaAtivo ? "#f87171" : "#4ade80",
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
      {stats.alertaAtivoTotal && (
        <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-pulse z-50">
          ⚠️ Alerta ativo! {stats.alertaAtivo && "Atividade alta."} {stats.alertaRuido && "Ruído elevado."}
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

        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Atividade Alta</div>
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

        {/* Card de Ruído */}
        <div className={`rounded-2xl shadow p-4 transition-colors ${stats.alertaRuido ? "bg-red-500 text-white" : ""}`}>
          <div className={`text-sm flex items-center gap-2 ${stats.alertaRuido ? 'text-white' : 'text-gray-500'}`}>
            Ruído Recente {stats.alertaRuido && <span>⚠️</span>}
          </div>
          <div className="text-3xl font-semibold">{stats.ruidoRecente.toFixed(1)} dB</div>
          <div className="text-sm">{stats.statusRuido}</div>
        </div>

        {/* Card de Média Recente */}
        <div className={`rounded-2xl shadow p-4 transition-colors ${stats.alertaAtivo ? "bg-red-500 text-white" : ""}`}>
          <div className={`text-sm flex items-center gap-2 ${stats.alertaAtivo ? 'text-white' : 'text-gray-500'}`}>
            Média Recente (Últimas {RECENT_COUNT}) {stats.alertaAtivo && <span>⚠️</span>}
          </div>
          <div className="text-3xl font-semibold">{stats.mediaRecente.toFixed(1)}</div>
        </div>
      </div>

      {/* gráficos */}
      <div className="rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Temperatura, Umidade, Poluição e Ruído</h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="temperatura" dot={false} stroke="#f87171" name="Temperatura (°C)" />
              <Line type="monotone" dataKey="umidade" dot={false} stroke="#60a5fa" name="Umidade (%)" />
              <Line type="monotone" dataKey="poluicao" dot={false} stroke="#facc15" name="Poluição" />
              <Line type="monotone" dataKey="ruido" dot={false} stroke="#34d399" name="Ruído (dB)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Atividade das Abelhas</h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="abelhas_ativas" dot={false} stroke="#a78bfa" name="Abelhas Ativas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* distribuição + predição */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Distribuição da Atividade</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
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

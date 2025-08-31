import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), "data.db"); // path para o seu data.db
    const db = new Database(dbPath, { readonly: true });

    const rows = db.prepare("SELECT * FROM abelhas_data ORDER BY timestamp DESC LIMIT 300").all();
    db.close();

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao ler banco de dados" }, { status: 500 });
  }
}

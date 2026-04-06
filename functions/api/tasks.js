// functions/api/tasks.js
// Cloudflare Pages Function — handles all task read/write via KV

export async function onRequestGet({ env }) {
  try {
    const data = await env.TASKS_KV.get("tasks");
    const tasks = data ? JSON.parse(data) : [];
    return Response.json({ tasks });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    await env.TASKS_KV.put("tasks", JSON.stringify(body.tasks));
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

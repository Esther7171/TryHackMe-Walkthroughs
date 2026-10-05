// Rebuilds the Walkthroughs table in README.md from the room folders, so a new room only
// needs its own readme.md. Run by .github/workflows/readme-table.yml on every push.
//
// A room is listed when Room/<folder>/readme.md opens with the standard header:
//
//   # <div align="center">[Room Name - TryHackMe writeup](lab link)</div>
//   <div align="center">Room description</div>
//   <div align="center"> <img width="200" height="200" alt="Room Name" src="..."/> </div>
//   <div align="center"> <img alt="Difficulty: Easy" src=".../badge/Difficulty-Easy-..." /> <img alt="OS: Linux" src=".../badge/OS-Linux-blue" /> </div>
//
// From it come the row's name, difficulty, OS (both shown as badges) and description; the row
// links to the write-up itself. Topics: what is already written in the table is kept; an empty cell is filled from
// the techniques the write-up names. `only flag` is added while a room holds answers only and
// leaves by itself once the walkthrough is written.
import fs from 'node:fs';
import path from 'node:path';

const README = 'README.md';
const strip = s => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const enc = s => s.split('/').map(encodeURIComponent).join('/');
const cell = s => String(s || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const unshield = s => decodeURIComponent(s.replace(/--/g, '\u0000').replace(/__/g, '\u0001').replace(/_/g, ' ').replace(/\u0000/g, '-').replace(/\u0001/g, '_'));

// difficulty and OS are shown in the table as the same badges the rooms carry
const DIFF_COLOR = { easy: 'brightgreen', medium: 'yellow', hard: 'red', insane: 'purple', info: 'lightgrey' };
const shield = s => encodeURIComponent(s).replace(/-/g, '--').replace(/_/g, '__');
const pill = (text, color) => (text ? `![${text}](https://img.shields.io/badge/${shield(text)}-${color})` : '');

const TOPICS = [
  ['SQL injection', /sql ?injection|sqlmap|\bsqli\b/i], ['XSS', /\bxss\b|cross.site scripting/i], ['LFI', /\blfi\b|local file inclusion/i],
  ['SSRF', /\bssrf\b/i], ['SSTI', /\bssti\b|template injection/i], ['IDOR', /\bidor\b/i], ['File upload', /file upload/i],
  ['Command injection', /command injection/i], ['Deserialization', /deserializ/i], ['Buffer overflow', /buffer overflow|\bret2|rop chain/i],
  ['Docker', /docker|container escape/i], ['Active Directory', /active directory|kerberos|bloodhound/i], ['SMB', /\bsmb\b|smbclient|enum4linux/i],
  ['WordPress', /wordpress|wpscan/i], ['Jenkins', /jenkins/i], ['Brute force', /hydra|brute.?forc/i], ['Hash cracking', /hashcat|john the ripper|crackstation/i],
  ['Steganography', /steghide|stegseek|steganograph|binwalk/i], ['Metasploit', /metasploit|msfconsole|meterpreter/i], ['Reverse engineering', /ghidra|radare|reverse engineer/i],
  ['Memory forensics', /volatility/i], ['Phishing', /phish/i], ['Prompt injection', /prompt injection|\bllm\b/i], ['OSINT', /\bosint\b/i],
  ['SUID', /\bsuid\b/i], ['Sudo', /sudo -l|gtfobins/i], ['Cron job', /cron ?job|crontab/i], ['Privilege escalation', /privilege escalation|privesc/i],
];
function topicsOf(text) {
  const out = [...new Set((text.match(/CVE-\d{4}-\d{3,7}/gi) || []).map(c => c.toUpperCase()))].slice(0, 1);
  for (const [label, re] of TOPICS) { if (out.length >= 3) break; if (re.test(text)) out.push(label); }
  return out.map(t => '`' + t + '`').join(' ');
}

// ---- the table as it stands: topics written by hand are kept
let md = fs.readFileSync(README, 'utf8');
const nl = md.includes('\r\n') ? '\r\n' : '\n';
const lines = md.split(/\r?\n/);
const start = lines.findIndex(l => /^##\s+Walkthroughs\s*$/.test(l));
if (start === -1) throw new Error('README.md has no "## Walkthroughs" heading');
let end = lines.findIndex((l, i) => i > start && (/^---\s*$/.test(l) || /^##\s/.test(l)));
if (end === -1) end = lines.length;
const old = new Map();
for (let i = start + 1; i < end; i++) {
  const m = /^\|\s*\[[^\]]*\]\(\.\/Room\/([^/)]+)\//.exec(lines[i]);
  if (!m) continue;
  const cells = lines[i].split(/(?<!\\)\|/).map(c => c.trim());
  let folder = m[1];
  try { folder = decodeURIComponent(folder); } catch { /* as written */ }
  old.set(folder, { line: lines[i], topics: (cells[5] || '').replace(/\s*`only flag`\s*/g, ' ').trim() });
}

// ---- every room
const rooms = [];
const skipped = [];
for (const folder of fs.readdirSync('Room')) {
  const dir = path.join('Room', folder);
  if (!fs.statSync(dir).isDirectory()) continue;
  const file = fs.readdirSync(dir).find(n => /^readme\.md$/i.test(n));
  if (!file) continue;
  const raw = fs.readFileSync(path.join(dir, file), 'utf8').replace(/^﻿/, '');
  const L = raw.split(/\r?\n/);
  const first = L.findIndex(l => l.trim());
  const title = first === -1 ? null : /^#\s*<div[^>]*>\s*(?:\[([^\]]+)\]\([^)]*\)|([^<]+?))\s*<\/div>\s*$/.exec(L[first].trim());
  if (!title) { skipped.push(folder); if (old.has(folder)) rooms.push({ keep: old.get(folder).line, sort: folder }); continue; }
  const name = strip(title[1] || title[2]).replace(/\s*[-|:]\s*TryHackMe\s+(writeup|write-up|walkthrough)\s*$/i, '').trim();

  // the header is the run of centred divs, images and blank lines under the title
  let stop = first + 1, depth = 0;
  for (; stop < Math.min(L.length, first + 24); stop++) {
    const t = L[stop].trim();
    if (t && depth <= 0 && !/^(<\/?div\b|<br\b|<\/?img\b|<\/?p\b)/i.test(t)) break;
    depth += (t.match(/<div\b/gi) || []).length - (t.match(/<\/div>/gi) || []).length;
  }
  const head = L.slice(first + 1, stop).join('\n');
  let desc = '';
  for (const m of head.matchAll(/<div[^>]*align=['"]?center['"]?[^>]*>([\s\S]*?)<\/div>/gi)) { if (!/<img/i.test(m[1]) && strip(m[1])) { desc = strip(m[1]); break; } }
  const badge = k => { const m = new RegExp('img\\.shields\\.io/badge/' + k + '-((?:[^-"\'\\s]|--)+)-', 'i').exec(head); return m ? unshield(m[1]) : ''; };
  const body = L.slice(stop).join('\n');
  // answers only: almost nothing under the header (a room's tasks and flags, no walkthrough)
  const thin = strip(body).length < 410;
  const kept = (old.get(folder) || {}).topics || '';
  const topics = [kept || topicsOf(body), thin ? '`only flag`' : ''].filter(Boolean).join(' ');
  rooms.push({ sort: name, row: `| [${cell(name)}](./Room/${enc(folder)}/${file}) | ${pill(badge('Difficulty'), DIFF_COLOR[badge('Difficulty').toLowerCase()] || 'blue')} | ${pill(badge('OS'), 'blue')} | ${cell(desc)} | ${cell(topics)} |`, difficulty: badge('Difficulty').toLowerCase() });
}
rooms.sort((a, b) => a.sort.localeCompare(b.sort, 'en', { sensitivity: 'base', numeric: true }));

// ---- write the table and the counts
const total = rooms.length;
const table = [
  '## Walkthroughs', '',
  `All ${total} TryHackMe walkthroughs in this repository, A to Z. Each one is also on [deathesther.tech/writeups](https://deathesther.tech/writeups/) with search and filters.`, '',
  '| Room | Difficulty | OS | Description | Topics |',
  '|:---|:---:|:---:|---|---|',
  ...rooms.map(r => r.row || r.keep),
  '',
];
md = [...lines.slice(0, start), ...table, ...lines.slice(end)].join(nl);
const n = d => rooms.filter(r => r.difficulty === d).length;
const counts = [['Easy', n('easy')], ['Medium', n('medium')], ['Hard', n('hard')], ['Insane', n('insane')], ['Info', n('info')]].filter(([, c]) => c).map(([d, c]) => `${c} ${d}`).join(', ');
md = md.replace(/^\*\*Rooms:\*\* [^.]*\./m, `**Rooms:** ${counts}.`);
md = md.replace(/^\d+ TryHackMe walkthroughs and writeups/m, `${total} TryHackMe walkthroughs and writeups`);
md = md.replace(/badge\/Labs-\d+[^-)\s]*-/, `badge/Labs-${total}-`);
fs.writeFileSync(README, md);

console.log(`${total} rooms in the table (${counts}).`);
if (skipped.length) console.log('No standard header, row left as it was or not listed: ' + skipped.join(', '));

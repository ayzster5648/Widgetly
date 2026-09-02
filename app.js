/* =============================================================
   STUDENT DASHBOARD  —  vanilla JS widget board
   ============================================================= */

const COLS = 12;          // fixed columns (col width flexes to board)
const ROW  = 80;          // fixed row height (px)
const GAP  = 12;
const STORE_KEY = 'studentDash.v2';

/* ---------- Themes ---------- */
const THEMES = {
  taupe:{accent:'#a89684',dark:'#8f7d6b',a2:'#c4b4a3'}, clay:{accent:'#c08768',dark:'#a56f52',a2:'#d6a688'},
  sage:{accent:'#9aa87f',dark:'#7f8d66',a2:'#b6c199'},  dusk:{accent:'#9a8ba3',dark:'#7f7189',a2:'#b8abc0'},
  mocha:{accent:'#8a7059',dark:'#6f5946',a2:'#a98d75'}, slate:{accent:'#7f8a95',dark:'#67717b',a2:'#9caab6'},
  rose:{accent:'#c288a0',dark:'#a66d85',a2:'#d6a6bb'},  ocean:{accent:'#6f9aa8',dark:'#578291',a2:'#93b7c2'},
};

const WMO = {0:['☀️','Clear'],1:['🌤️','Mainly clear'],2:['⛅','Partly cloudy'],3:['☁️','Overcast'],45:['🌫️','Fog'],48:['🌫️','Rime fog'],51:['🌦️','Light drizzle'],53:['🌦️','Drizzle'],55:['🌧️','Dense drizzle'],61:['🌦️','Light rain'],63:['🌧️','Rain'],65:['🌧️','Heavy rain'],66:['🌧️','Freezing rain'],67:['🌧️','Freezing rain'],71:['🌨️','Light snow'],73:['🌨️','Snow'],75:['❄️','Heavy snow'],77:['🌨️','Snow grains'],80:['🌦️','Rain showers'],81:['🌧️','Rain showers'],82:['⛈️','Violent showers'],85:['🌨️','Snow showers'],86:['❄️','Snow showers'],95:['⛈️','Thunderstorm'],96:['⛈️','Storm w/ hail'],99:['⛈️','Storm w/ hail']};

const CATALOG = {
  clock:{name:'Flip Clock',icon:'🕓',w:5,h:2,minW:3,minH:2},
  timer:{name:'Focus Timer',icon:'⏱️',w:4,h:5,minW:3,minH:4},
  todo:{name:'To-Do List',icon:'✅',w:5,h:6,minW:3,minH:3},
  assign:{name:'Assignments',icon:'📚',w:4,h:6,minW:3,minH:4},
  weather:{name:'Weather',icon:'🌤️',w:3,h:4,minW:2,minH:3},
  spotify:{name:'Spotify',icon:'🎵',w:4,h:6,minW:3,minH:4},
  calendar:{name:'Calendar',icon:'📅',w:7,h:7,minW:5,minH:6},
  goals:{name:'Goals',icon:'🎯',w:5,h:5,minW:3,minH:3},
  habits:{name:'Habit Tracker',icon:'🔥',w:7,h:5,minW:4,minH:3},
  grades:{name:'Grade Calculator',icon:'🎓',w:5,h:7,minW:4,minH:5},
  notes:{name:'Quick Notes',icon:'📝',w:4,h:4,minW:2,minH:2},
  upcoming:{name:'Upcoming',icon:'⏳',w:5,h:5,minW:3,minH:3},
  tests:{name:'Tests & Exams',icon:'📝',w:4,h:6,minW:3,minH:4},
  schedule:{name:'Daily Schedule',icon:'🗓️',w:4,h:6,minW:3,minH:4},
  reminders:{name:'Reminders',icon:'🔔',w:4,h:5,minW:3,minH:3},
  quotes:{name:'Daily Quote',icon:'💬',w:6,h:3,minW:3,minH:2},
  alarm:{name:'Alarms',icon:'⏰',w:4,h:5,minW:3,minH:3},
  sounds:{name:'Study Sounds',icon:'🎧',w:7,h:6,minW:4,minH:4},
  journal:{name:'Journal & Mood',icon:'📔',w:5,h:6,minW:4,minH:5},
  gmail:{name:'Gmail',icon:'✉️',w:5,h:6,minW:4,minH:4},
};

/* ---------- Themed line icons (accent-coloured, replace emojis) ---------- */
const ICONS={
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/>',
  timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9.5"/><path d="M9.5 2h5"/>',
  todo:'<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18a2 2 0 0 1 2 2v11.5a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M8.5 12l2.2 2.2L16 9"/>',
  assign:'<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v16H7.5A2.5 2.5 0 0 0 5 20.5z"/><path d="M5 19.5A2.5 2.5 0 0 1 7.5 18H19v4H7.5A2.5 2.5 0 0 1 5 19.5"/>',
  weather:'<path d="M17.5 18a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.6A4 4 0 0 0 6.5 18z"/>',
  spotify:'<circle cx="12" cy="12" r="9.5"/><path d="M7 9.5c3.5-1 6.5-.6 9 1M7.5 13c2.7-.7 5-.4 7 .8M8 16c2-.5 3.6-.3 5 .6"/>',
  calendar:'<rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 2.5v4M16 2.5v4"/>',
  goals:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  habits:'<path d="M12 3s4.5 3.2 4.5 8a4.5 4.5 0 0 1-9 0c0-1.5.6-2.6.6-2.6s.4 1.6 1.7 1.6c1.6 0 1-3.4 2.2-7z"/>',
  grades:'<path d="M12 4L2.5 9 12 14l9.5-5z"/><path d="M6.5 11.5v4.2c0 1.2 2.5 2.8 5.5 2.8s5.5-1.6 5.5-2.8v-4.2"/>',
  notes:'<path d="M20 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="M18 3l3 3-9 9-4 1 1-4z"/>',
  upcoming:'<path d="M6 3h12M6 21h12M7.5 3v3.2a2 2 0 0 0 .6 1.4L12 12l3.9-4.4a2 2 0 0 0 .6-1.4V3M7.5 21v-3.2a2 2 0 0 1 .6-1.4L12 12l3.9 4.4a2 2 0 0 1 .6 1.4V21"/>',
  tests:'<rect x="8.5" y="2.5" width="7" height="3.5" rx="1"/><path d="M15.5 4H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.5"/><path d="M8.5 12h7M8.5 16h5"/>',
  schedule:'<rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 2.5v4M16 2.5v4"/><path d="M11.5 13h5M11.5 17h5M8 13h.01M8 17h.01"/>',
  reminders:'<path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17s-2.5-1.5-2.5-7.5"/><path d="M13.5 20a2 2 0 0 1-3 0"/>',
  quotes:'<path d="M9.5 6c-2.5 1-4 3-4 6v4h5v-5H7c0-2 1-3 2.5-3.5zM19 6c-2.5 1-4 3-4 6v4h5v-5h-3.5c0-2 1-3 2.5-3.5z"/>',
  alarm:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.2 1.5"/><path d="M5 4L2.5 6.5M19 4l2.5 2.5"/>',
  sounds:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14.5" width="4" height="6" rx="1.5"/><rect x="17" y="14.5" width="4" height="6" rx="1.5"/>',
  journal:'<path d="M6 3.5A1.5 1.5 0 0 1 7.5 2H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7.5A1.5 1.5 0 0 0 6 21.5z"/><path d="M6 20.5A1.5 1.5 0 0 1 7.5 19H20"/><path d="M10 2v7l2-1.4L14 9V2"/>',
  gmail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 5.5L20 7"/>',
  powerschool:'<path d="M12 4L2.5 9 12 14l9.5-5z"/><path d="M6.5 11.5v4.2c0 1.2 2.5 2.8 5.5 2.8s5.5-1.6 5.5-2.8v-4.2"/>',
};
function icon(t){ return `<svg class="wic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[t]||ICONS.notes}</svg>`; }

/* ============================================================ STATE */
let state = load() || defaultState();
let editing = false;
const runtime = {};

function uid(){ return Math.random().toString(36).slice(2,9); }
function isoIn(days){ const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); }

function defaultState(){
  return { theme:'taupe', widgets:[
    w('todo',    0,  0, 4, 6, seedTodos()),
    w('clock',   4,  0, 4, 2, {}),
    w('weather', 8,  0, 4, 4, {}),
    w('timer',   4,  2, 4, 4, {}),
    w('upcoming',8,  4, 4, 5, {}),
    w('spotify', 0,  6, 4, 6, seedSpotify()),
    w('assign',  4,  6, 4, 6, seedAssign()),
    w('quotes',  8,  9, 4, 3, seedQuotes()),
    w('goals',   0, 12, 4, 5, seedGoals()),
    w('reminders',4,12, 4, 4, seedReminders()),
    w('habits',  8, 12, 4, 5, seedHabits()),
    w('calendar',0, 17, 7, 6, seedEvents()),
    w('grades',  7, 17, 5, 6, seedGrades()),
    w('schedule',0, 23, 4, 6, seedSchedule()),
    w('tests',   4, 23, 4, 6, seedTests()),
    w('alarm',   8, 23, 4, 5, seedAlarms()),
    w('journal', 0, 29, 4, 6, seedJournal()),
    w('sounds',  4, 29, 8, 6, seedSounds()),
  ]};
}
function w(type,x,y,ww,h,data){ return {id:uid(),type,x,y,w:ww,h,data:data||{}}; }

function seedTodos(){ return {items:[
  {id:uid(),text:'Finish SS essay outline',done:false,pri:'high',due:isoIn(1),time:'23:59'},
  {id:uid(),text:'DeltaMath set 4',done:false,pri:'med',due:isoIn(2),time:''},
  {id:uid(),text:'Read Ch. 7 — English',done:true,pri:'low',due:isoIn(4),time:''},
]}; }
function seedSpotify(){ return {playlists:[
  {name:'Study Playlist',url:'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ'},
  {name:'Fav Playlist',url:'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'},
  {name:'Sad Playlist',url:'https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1'},
], active:null}; }
function seedAssign(){ return {demo:true,filter:'all',items:[
  {id:uid(),title:'SS Essay',course:'Social Studies',due:isoIn(2),done:false},
  {id:uid(),title:'DeltaMath',course:'Algebra',due:isoIn(1),done:false},
  {id:uid(),title:'Read Ch.7',course:'English',due:isoIn(4),done:false},
  {id:uid(),title:'Lab Report',course:'Biology',due:isoIn(6),done:false},
]}; }
function seedEvents(){ const m=new Date(); return {events:[
  {id:uid(),date:isoIn(1),title:'Math Test',time:'09:00'},
  {id:uid(),date:isoIn(1),title:'Club meeting',time:'15:30'},
  {id:uid(),date:isoIn(6),title:'Project Due',time:'23:59'},
], viewY:m.getFullYear(), viewM:m.getMonth()}; }
function seedGoals(){ return {tab:'day',day:[{id:uid(),text:'Drink water',done:false}],week:[{id:uid(),text:'Finish book',done:false}],month:[{id:uid(),text:'Raise Bio grade',done:false}]}; }
function seedHabits(){ return {habits:[
  {id:uid(),name:'Read 20 min',days:{}},{id:uid(),name:'Exercise',days:{}},{id:uid(),name:'No phone after 10',days:{}},
]}; }
function seedTests(){ return {items:[
  {id:uid(),name:'Biology Unit Test',subject:'Biology',date:isoIn(5),notes:'Chapters 4–6. Focus on cell respiration.',files:[]},
  {id:uid(),name:'Algebra Quiz',subject:'Algebra',date:isoIn(2),notes:'',files:[]},
]}; }
function seedSchedule(){ return {blocks:[
  {id:uid(),start:'15:30',end:'16:15',title:'Math homework',type:'task'},
  {id:uid(),start:'16:30',end:'17:00',title:'Read Ch.7',type:'task'},
  {id:uid(),start:'19:00',end:'19:45',title:'Study Biology',type:'study'},
]}; }
function seedReminders(){ return {items:[
  {id:uid(),text:'Bring gym clothes',time:'',done:false},
  {id:uid(),text:'Email teacher about makeup work',time:'',done:false},
]}; }
function seedQuotes(){ return {idx:0, auto:true, list:[
  "You don't have to be perfect — just consistent.",
  'Small progress is still progress.',
  'Discipline is choosing what you want most over what you want now.',
  'Study now so future-you can relax.',
  'One page at a time. One task at a time.',
  'Your only competition is who you were yesterday.',
  'Done is better than perfect.',
  'The secret to getting ahead is getting started.',
  "Believe you can and you're halfway there.",
  'A little progress each day adds up to big results.',
  "Don't watch the clock; do what it does — keep going.",
  'Success is the sum of small efforts repeated daily.',
  'The expert in anything was once a beginner.',
  'Push yourself, because no one else is going to do it for you.',
  "Difficult roads often lead to beautiful destinations.",
  'Focus on progress, not perfection.',
  'Your future is created by what you do today, not tomorrow.',
  "It always seems impossible until it's done.",
  'Great things never come from comfort zones.',
  'Be so good they can’t ignore you.',
  'Dream big. Start small. Act now.',
  "You are capable of more than you know.",
  'Mistakes are proof that you are trying.',
  'The best way out is always through.',
  'One day or day one — you decide.',
]}; }
function seedJournal(){ return { entries:{}, trackers:[{id:uid(),name:'Rate your day'}] }; }
function seedAlarms(){ return {items:[
  {id:uid(),time:'07:00',label:'Wake up',on:false},
  {id:uid(),time:'21:30',label:'Start winding down',on:false},
]}; }
function seedSounds(){ return {master:0.5, sounds:{}}; }
function seedGrades(){ return {quarter:'all', classes:[
  {id:uid(),name:'Algebra',include:true,quarters:{q1:[{id:uid(),name:'Quiz 1',earned:18,total:20},{id:uid(),name:'Homework',earned:45,total:50},{id:uid(),name:'Test 1',earned:88,total:100}],q2:[],q3:[],q4:[]}},
  {id:uid(),name:'Biology',include:true,quarters:{q1:[{id:uid(),name:'Lab 1',earned:23,total:25},{id:uid(),name:'Test',earned:79,total:100}],q2:[],q3:[],q4:[]}},
  {id:uid(),name:'English',include:true,quarters:{q1:[{id:uid(),name:'Essay',earned:92,total:100}],q2:[],q3:[],q4:[]}},
]}; }

/* ============================================================ PERSIST */
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }
function load(){
  try{
    let s=localStorage.getItem(STORE_KEY);
    if(s) return migrate(JSON.parse(s));
    const old=localStorage.getItem('studentDash.v1');       // migrate old data forward
    if(old) return migrate(JSON.parse(old));
    return null;
  }catch(e){ return null; }
}
function migrate(s){
  (s.widgets||[]).forEach(wd=>{
    if(wd.type==='grades'){
      wd.data.classes=wd.data.classes||[];
      wd.data.classes.forEach(c=>{
        if(!c.quarters){ c.quarters={q1:c.assignments||[],q2:[],q3:[],q4:[]}; delete c.assignments; }
        ['q1','q2','q3','q4'].forEach(q=> c.quarters[q]=c.quarters[q]||[]);
      });
      if(!wd.data.quarter) wd.data.quarter='q1';
    }
  });
  return s;
}

/* ============================================================ THEME */
function applyTheme(){
  const t=THEMES[state.theme]||THEMES.taupe, r=document.documentElement.style;
  r.setProperty('--accent',t.accent); r.setProperty('--accent-dark',t.dark); r.setProperty('--accent-2',t.a2);
  r.setProperty('--cell',colW()+'px'); r.setProperty('--row',ROW+'px');
}

/* ============================================================ LAYOUT ENGINE */
const board = document.getElementById('board');
function colW(){ return board.clientWidth / COLS; }
function isMobile(){ return board.clientWidth < 720; }

function overlaps(a,b){ return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y; }

/* push others out of the way of `active` (active never moves) */
function fixOverlaps(active){
  let guard=0, moved=true;
  while(moved && guard++<600){
    moved=false;
    const ws=state.widgets;
    for(let i=0;i<ws.length;i++){
      for(let j=0;j<ws.length;j++){
        if(i===j) continue;
        const a=ws[i], b=ws[j];
        if(!overlaps(a,b)) continue;
        let mover;
        if(a===active) mover=b;
        else if(b===active) mover=a;
        else mover = (a.y>b.y || (a.y===b.y && a.x>=b.x)) ? a : b;
        const anchor = mover===a ? b : a;
        mover.y = anchor.y + anchor.h;
        moved=true;
      }
    }
  }
}
/* gravity: float widgets up into free space */
function compact(){
  const ws=[...state.widgets].sort((a,b)=> a.y-b.y || a.x-b.x);
  for(const wd of ws){
    while(wd.y>0){
      wd.y--;
      if(state.widgets.some(o=> o!==wd && overlaps(wd,o))){ wd.y++; break; }
    }
  }
}
function layoutAll(){
  state.widgets.forEach(wd=>{
    const el=board.querySelector('.widget[data-id="'+wd.id+'"]');
    if(el) positionEl(el,wd);
  });
  fitBoardHeight();
}
function fitBoardHeight(){ let mb=0; state.widgets.forEach(wd=> mb=Math.max(mb,wd.y+wd.h)); board.style.height=((mb+1)*ROW)+'px'; }

function renderBoard(){
  board.innerHTML=''; applyTheme();
  if(isMobile()){
    board.classList.remove('grid-on'); board.style.height='auto';
    [...state.widgets].sort((a,b)=>(a.y-b.y)||(a.x-b.x)).forEach(wd=>{
      const el=buildWidget(wd);
      el.style.position='relative'; el.style.left=el.style.top='auto'; el.style.width='100%';
      el.style.height=(wd.h*ROW)+'px'; el.style.marginBottom='14px'; board.appendChild(el);
    });
    return;
  }
  board.classList.toggle('grid-on',editing);
  state.widgets.forEach(wd=>{ const el=buildWidget(wd); positionEl(el,wd); board.appendChild(el); });
  fitBoardHeight();
}
function positionEl(el,wd){
  const cw=colW();
  el.style.left=(wd.x*cw+GAP/2)+'px'; el.style.top=(wd.y*ROW+GAP/2)+'px';
  el.style.width=(wd.w*cw-GAP)+'px'; el.style.height=(wd.h*ROW-GAP)+'px';
}

function buildWidget(wd){
  const meta=CATALOG[wd.type];
  const el=document.createElement('section'); el.className='widget'; el.dataset.id=wd.id;
  const head=document.createElement('div'); head.className='w-head';
  head.innerHTML=`<span class="w-title">${icon(wd.type)} ${meta.name}</span><span class="w-actions"><button data-act="settings" title="Options">⚙</button><button data-act="remove" title="Remove">✕</button></span>`;
  el.appendChild(head);
  const body=document.createElement('div'); body.className='w-body'; el.appendChild(body);
  const rz=document.createElement('div'); rz.className='resize-handle'; el.appendChild(rz);
  try{ (RENDER[wd.type]||(()=>{}))(body,wd); }
  catch(err){ console.error('widget render failed:',wd.type,err); body.innerHTML=`<div class="empty-hint">⚠️ ${CATALOG[wd.type]?.name||wd.type} failed to load</div>`; }
  head.querySelector('[data-act=remove]').onclick=()=> removeWidget(wd.id);
  head.querySelector('[data-act=settings]').onclick=()=> widgetSettings(wd);
  enableDrag(head,el,wd); enableResize(rz,el,wd);
  return el;
}
function removeWidget(id){ state.widgets=state.widgets.filter(x=>x.id!==id); compact(); save(); renderBoard(); }

/* ---------- drag (with push + gravity) ---------- */
function enableDrag(handle,el,wd){
  handle.onpointerdown=(e)=>{
    if(!editing||isMobile()) return;
    e.preventDefault(); el.classList.add('dragging');
    const sx=e.clientX, sy=e.clientY, ox=wd.x, oy=wd.y;
    const move=(ev)=>{
      wd.x=Math.max(0,Math.min(COLS-wd.w, ox+Math.round((ev.clientX-sx)/colW())));
      wd.y=Math.max(0, oy+Math.round((ev.clientY-sy)/ROW));
      fixOverlaps(wd); layoutAll();
    };
    const up=()=>{
      el.classList.remove('dragging');
      document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up);
      compact(); save(); renderBoard();
    };
    document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
  };
}
/* ---------- resize (with push + gravity) ---------- */
function enableResize(handle,el,wd){
  handle.onpointerdown=(e)=>{
    if(!editing||isMobile()) return;
    e.preventDefault(); e.stopPropagation();
    const meta=CATALOG[wd.type], sx=e.clientX, sy=e.clientY, ow=wd.w, oh=wd.h;
    const move=(ev)=>{
      wd.w=Math.max(meta.minW,Math.min(COLS-wd.x, ow+Math.round((ev.clientX-sx)/colW())));
      wd.h=Math.max(meta.minH, oh+Math.round((ev.clientY-sy)/ROW));
      fixOverlaps(wd); layoutAll();
    };
    const up=()=>{
      document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up);
      compact(); save(); renderBoard();
    };
    document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
  };
}

/* ---------- add ---------- */
function addWidget(type){
  const meta=CATALOG[type];
  let maxY=0; state.widgets.forEach(x=> maxY=Math.max(maxY,x.y+x.h));
  const seed=({todo:seedTodos,spotify:seedSpotify,assign:seedAssign,calendar:seedEvents,goals:seedGoals,habits:seedHabits,grades:seedGrades,tests:seedTests,schedule:seedSchedule,reminders:seedReminders,quotes:seedQuotes,alarm:seedAlarms,sounds:seedSounds,journal:seedJournal})[type];
  const wid=w(type,0,maxY,meta.w,meta.h, seed?seed():{});
  state.widgets.push(wid);
  compact(); save(); if(!editing) setEditing(true); renderBoard(); closeDrawer();
  return wid;
}
function widgetBody(id){ const el=board.querySelector('.widget[data-id="'+id+'"]'); return el?el.querySelector('.w-body'):null; }

/* ============================================================ RENDERERS */
const RENDER={};

/* ---------- FLIP CLOCK (2 tiles) ---------- */
RENDER.clock=(body,wd)=>{
  delete runtime['clk'+wd.id];   // reset cache so a fresh rebuild always writes full tile markup
  body.innerHTML=`<div class="flip2"><div class="tile" id="ch-${wd.id}"></div><div class="tile" id="cm-${wd.id}"></div></div>`;
  const H=body.querySelector('#ch-'+wd.id), M=body.querySelector('#cm-'+wd.id);
  const draw=()=>{
    const n=new Date(); let h=n.getHours(); const ap=h>=12?'PM':'AM'; h=h%12||12;
    const hh=String(h).padStart(2,'0'), mm=String(n.getMinutes()).padStart(2,'0');
    const prev=runtime['clk'+wd.id]||{};
    const lab=H.querySelector('.lab');
    if(prev.hh!==hh || !lab){ H.innerHTML=`${hh}<span class="lab">${ap}</span>`; H.classList.remove('pulse'); void H.offsetWidth; H.classList.add('pulse'); }
    else lab.textContent=ap;
    if(prev.mm!==mm){ M.textContent=mm; M.classList.remove('pulse'); void M.offsetWidth; M.classList.add('pulse'); }
    runtime['clk'+wd.id]={hh,mm};
  };
  draw(); clearInterval(runtime['clkint'+wd.id]); runtime['clkint'+wd.id]=setInterval(draw,1000);
};

/* ---------- FOCUS TIMER ---------- */
RENDER.timer=(body,wd)=>{
  const d=wd.data; d.mode=d.mode||'pomodoro';
  d.workMin=d.workMin||25; d.breakMin=d.breakMin||5; d.longMin=d.longMin||15; d.rounds=d.rounds||4; d.timerMin=d.timerMin||5;
  const rt=runtime['tm'+wd.id]||(runtime['tm'+wd.id]={running:false,remain:d.workMin*60,elapsed:0,phase:'work',pomos:0,int:null});
  body.innerHTML=`
    <div class="w-title-row"><div class="w-title-lg">${icon('timer')} Timer</div><button class="w-gear" data-c="gear" title="Timer settings">⚙</button></div>
    <div class="timer-tabs"><button data-m="pomodoro">POMODORO</button><button data-m="timer">TIMER</button><button data-m="stopwatch">STOPWATCH</button></div>
    <div class="timer-display" id="disp-${wd.id}">00:00</div>
    <div class="timer-controls"><button class="btn" data-c="start">START</button><button class="btn ghost" data-c="reset">RESET</button></div>
    <div class="timer-meta" id="meta-${wd.id}"></div><div class="pomo-dots" id="dots-${wd.id}"></div>`;
  const disp=body.querySelector('#disp-'+wd.id), meta=body.querySelector('#meta-'+wd.id), dots=body.querySelector('#dots-'+wd.id);
  body.querySelectorAll('.timer-tabs button').forEach(b=>{ b.classList.toggle('active',b.dataset.m===d.mode);
    b.onclick=()=>{ d.mode=b.dataset.m; stop(); resetVals(); save(); RENDER.timer(body,wd); }; });
  body.querySelector('[data-c=gear]').onclick=()=> timerSettings(wd);
  const fmt=s=>{ s=Math.max(0,Math.floor(s)); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); };
  function paint(){
    disp.textContent = d.mode==='stopwatch'? fmt(rt.elapsed) : fmt(rt.remain);
    if(d.mode==='pomodoro'){ meta.textContent = rt.phase==='work'?'FOCUS TIME':(rt.phase==='long'?'LONG BREAK':'SHORT BREAK');
      dots.innerHTML=Array.from({length:d.rounds},(_,i)=>`<i class="${i<(rt.pomos%d.rounds)?'on':''}"></i>`).join(''); }
    else { meta.textContent=''; dots.innerHTML=''; }
  }
  function resetVals(){ if(d.mode==='pomodoro'){ rt.phase='work'; rt.remain=d.workMin*60; } else if(d.mode==='timer'){ rt.remain=d.timerMin*60; } else rt.elapsed=0; paint(); }
  function tick(){
    if(d.mode==='stopwatch'){ rt.elapsed++; }
    else { rt.remain--;
      if(rt.remain<=0){
        if(d.mode==='pomodoro'){
          if(rt.phase==='work'){ rt.pomos++; if(rt.pomos%d.rounds===0){ rt.phase='long'; rt.remain=d.longMin*60; } else { rt.phase='break'; rt.remain=d.breakMin*60; } ding(); }
          else { rt.phase='work'; rt.remain=d.workMin*60; ding(); }
        } else { stop(); ding(); rt.remain=d.timerMin*60; }
      }
    } paint();
  }
  function start(){ if(rt.running)return; rt.running=true; rt.int=setInterval(tick,1000); const s=body.querySelector('[data-c=start]'); if(s)s.textContent='PAUSE'; }
  function stop(){ rt.running=false; clearInterval(rt.int); const s=body.querySelector('[data-c=start]'); if(s)s.textContent='START'; }
  body.querySelector('[data-c=start]').onclick=()=> rt.running?stop():start();
  body.querySelector('[data-c=reset]').onclick=()=>{ stop(); resetVals(); };
  if(rt.remain==null) resetVals(); paint();
  if(rt.running) body.querySelector('[data-c=start]').textContent='PAUSE';
};
function timerSettings(wd){
  const d=wd.data;
  modal('Timer settings',`
    <div class="row2"><div><label class="fld">Focus / session (min)</label><input type="number" min="1" id="s-work" value="${d.workMin||25}"/></div>
    <div><label class="fld">Short break (min)</label><input type="number" min="1" id="s-break" value="${d.breakMin||5}"/></div></div>
    <div class="row2"><div><label class="fld">Long break (min)</label><input type="number" min="1" id="s-long" value="${d.longMin||15}"/></div>
    <div><label class="fld">Sessions → long break</label><input type="number" min="1" id="s-rounds" value="${d.rounds||4}"/></div></div>
    <label class="fld">Countdown timer (min)</label><input type="number" min="1" id="s-timer" value="${d.timerMin||5}"/>
    <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Save</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
  document.querySelector('[data-x=s]').onclick=()=>{
    d.workMin=+document.getElementById('s-work').value||25; d.breakMin=+document.getElementById('s-break').value||5;
    d.longMin=+document.getElementById('s-long').value||15; d.rounds=+document.getElementById('s-rounds').value||4;
    d.timerMin=+document.getElementById('s-timer').value||5;
    delete runtime['tm'+wd.id]; save(); closeModal(); renderBoard();
  };
}
function ding(){ try{ const a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value=660; g.gain.setValueAtTime(.2,a.currentTime); o.start(); g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.6); o.stop(a.currentTime+.6); }catch(e){} }

/* ---------- TO-DO ---------- */
RENDER.todo=(body,wd)=>{
  const d=wd.data; d.items=d.items||[];
  body.innerHTML=`<div class="w-title-lg">${icon('todo')} To-Do List</div>
    <div class="todo-add"><input id="ti-${wd.id}" placeholder="Add a task…"/><button class="btn" data-a="add">＋</button></div>
    <ul class="todo-list" id="tl-${wd.id}"></ul>`;
  const ul=body.querySelector('#tl-'+wd.id);
  const paint=()=>{
    const order={high:0,med:1,low:2};
    const items=[...d.items].sort((a,b)=>(a.done-b.done)||(order[a.pri]-order[b.pri]));
    ul.innerHTML=items.length? items.map(it=>{
      const overdue=it.due&&!it.done&&it.due<isoIn(0);
      return `<li class="todo-item pri-${it.pri} ${it.done?'done':''}" data-id="${it.id}">
        <div class="todo-check" data-a="toggle">${it.done?'✓':''}</div>
        <div class="todo-main"><div class="todo-text">${esc(it.text)}</div>
          <div class="todo-tags"><span class="chip">${it.pri.toUpperCase()}</span>${it.due?`<span class="chip due ${overdue?'overdue':''}">📅 ${fmtDue(it.due)}${it.time?' '+it.time:''}</span>`:''}</div></div>
        <button class="todo-del" data-a="del">✕</button></li>`;}).join('') : `<div class="empty-hint">No tasks yet — add one above ✨</div>`;
    ul.querySelectorAll('.todo-item').forEach(li=>{ const it=d.items.find(x=>x.id===li.dataset.id);
      li.querySelector('[data-a=toggle]').onclick=()=>{ it.done=!it.done; save(); paint(); };
      li.querySelector('[data-a=del]').onclick=()=>{ d.items=d.items.filter(x=>x.id!==it.id); save(); paint(); };
      li.querySelector('.todo-text').onclick=()=> openTodoModal(wd,it,paint,true); });
  };
  const inp=body.querySelector('#ti-'+wd.id);
  const add=()=>{ const v=inp.value.trim(); if(!v)return; openTodoModal(wd,{text:v},paint); inp.value=''; };
  body.querySelector('[data-a=add]').onclick=add; inp.onkeydown=e=>{ if(e.key==='Enter')add(); };
  paint();
};
function openTodoModal(wd,seed,paint,isEdit){
  const d=wd.data;
  modal('Task details',`
    <label class="fld">Task</label><input id="m-text" value="${esc(seed.text||'')}"/>
    <div class="row2"><div><label class="fld">Priority</label><select id="m-pri"><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option></select></div>
    <div><label class="fld">Due date</label><input type="date" id="m-due" value="${seed.due||''}"/></div></div>
    <label class="fld">Time (optional)</label><input type="time" id="m-time" value="${seed.time||''}"/>
    <div class="modal-actions"><button class="btn ghost" data-x="cancel">Cancel</button><button class="btn" data-x="save">Save task</button></div>`);
  document.getElementById('m-pri').value=seed.pri||'med';
  document.querySelector('[data-x=cancel]').onclick=closeModal;
  document.querySelector('[data-x=save]').onclick=()=>{
    const text=document.getElementById('m-text').value.trim(); if(!text){closeModal();return;}
    const pri=document.getElementById('m-pri').value, due=document.getElementById('m-due').value, time=document.getElementById('m-time').value;
    if(isEdit){ seed.text=text; seed.pri=pri; seed.due=due; seed.time=time; } else d.items.push({id:uid(),text,pri,due,time,done:false});
    save(); closeModal(); paint();
  };
}
function fmtDue(iso){ const d=new Date(iso+'T00:00'); return d.toLocaleDateString(undefined,{month:'short',day:'numeric'}); }

/* ---------- ASSIGNMENTS ---------- */
RENDER.assign=(body,wd)=>{
  const d=wd.data; d.items=d.items||[]; d.filter=d.filter||'all';
  const courses=[...new Set(d.items.map(i=>i.course))];
  body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('assign')} Assignments</div>${d.gcConnected?'<span class="conn-badge">✓ Classroom</span>':''}</div>
    ${d.demo?`<div class="demo-note">Demo data — connect Google Classroom below to pull your real to-dos, or add your own with ＋.</div>`:''}
    <button class="btn ghost sm block" data-a="gc-connect" style="margin-bottom:10px">${d.gcConnected?'↻ Sync Google Classroom':'🎓 Connect Google Classroom'}</button>
    <div class="assign-filter">
      <select id="af-s-${wd.id}"><option value="all">To-do (all)</option><option value="soon">Due soon</option><option value="done">Done</option></select>
      <select id="af-c-${wd.id}"><option value="all">All classes</option>${courses.map(c=>`<option>${esc(c)}</option>`).join('')}</select>
      <button class="btn sm" data-a="add">＋</button></div>
    <div id="al-${wd.id}"></div>`;
  body.querySelector('[data-a=gc-connect]').onclick=()=> googleConnect(wd,body);
  const list=body.querySelector('#al-'+wd.id), stSel=body.querySelector('#af-s-'+wd.id), coSel=body.querySelector('#af-c-'+wd.id);
  stSel.value=d.filter;
  const paint=()=>{
    let items=[...d.items];
    if(stSel.value==='done') items=items.filter(i=>i.done);
    else if(stSel.value==='soon') items=items.filter(i=>!i.done&&i.due&&i.due<=isoIn(3));
    else items=items.filter(i=>!i.done);
    if(coSel.value!=='all') items=items.filter(i=>i.course===coSel.value);
    items.sort((a,b)=>(a.due||'').localeCompare(b.due||''));
    list.innerHTML=items.length? items.map(i=>{ const soon=i.due&&i.due<=isoIn(2)&&!i.done;
      return `<div class="assign-item ${i.done?'assign-done':''}" data-id="${i.id}"><div class="assign-ic">${i.done?'✓':'📄'}</div>
        <div class="assign-main"><div class="assign-title">${esc(i.title)}</div><div class="assign-course">${esc(i.course)}</div>
        <div class="assign-due ${soon?'soon':''}">${i.due?'Due '+fmtDue(i.due):'No due date'}</div></div>
        <button class="todo-del" data-a="toggle">${i.done?'↩':'✓'}</button></div>`;}).join('') : `<div class="empty-hint">Nothing here 🎉</div>`;
    list.querySelectorAll('.assign-item').forEach(el=>{ const it=d.items.find(x=>x.id===el.dataset.id);
      el.querySelector('[data-a=toggle]').onclick=()=>{ it.done=!it.done; save(); paint(); }; });
  };
  stSel.onchange=()=>{ d.filter=stSel.value; save(); paint(); }; coSel.onchange=paint;
  body.querySelector('[data-a=add]').onclick=()=>{
    modal('Add assignment',`<label class="fld">Title</label><input id="a-t"/><label class="fld">Class</label><input id="a-c" placeholder="e.g. Algebra"/><label class="fld">Due date</label><input type="date" id="a-d"/>
      <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Add</button></div>`);
    document.querySelector('[data-x=c]').onclick=closeModal;
    document.querySelector('[data-x=s]').onclick=()=>{ const t=document.getElementById('a-t').value.trim(); if(!t){closeModal();return;}
      d.items.push({id:uid(),title:t,course:document.getElementById('a-c').value.trim()||'General',due:document.getElementById('a-d').value,done:false});
      d.demo=false; save(); closeModal(); RENDER.assign(body,wd); };
  };
  paint();
};

/* ---------- WEATHER ---------- */
RENDER.weather=(body,wd)=>{
  const d=wd.data;
  body.innerHTML=`<div class="weather-wrap" id="wx-${wd.id}"><div class="empty-hint">Loading weather…</div></div>`;
  const host=body.querySelector('#wx-'+wd.id);
  const show=(x)=>{ const [ic,desc]=WMO[x.code]||['🌡️','—'];
    host.innerHTML=`<div class="weather-city">${esc(x.city||'Your location')}</div><div class="weather-icon">${ic}</div>
      <div class="weather-temp">${Math.round(x.temp)}°</div><div class="weather-desc">${desc}</div>
      <div class="weather-row"><span>H ${Math.round(x.hi)}°</span><span>L ${Math.round(x.lo)}°</span><span>💨 ${Math.round(x.wind)}</span></div>
      <button class="btn ghost sm" data-a="loc" style="margin-top:10px">📍 Change location</button>`;
    host.querySelector('[data-a=loc]').onclick=()=> askCity(wd,body); };
  const fail=m=>{ host.innerHTML=`<div class="empty-hint">${m}</div><button class="btn ghost sm" data-a="loc">📍 Set location</button>`; host.querySelector('[data-a=loc]').onclick=()=>askCity(wd,body); };
  const fetchWx=(lat,lon,city)=> fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`)
    .then(r=>r.json()).then(j=>{ d.cache={city:city||d.city,temp:j.current.temperature_2m,code:j.current.weather_code,wind:j.current.wind_speed_10m,hi:j.daily.temperature_2m_max[0],lo:j.daily.temperature_2m_min[0]}; save(); show(d.cache); })
    .catch(()=> d.cache?show(d.cache):fail('Could not load weather'));
  if(d.lat&&d.lon){ if(d.cache)show(d.cache); fetchWx(d.lat,d.lon,d.city); }
  else if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>{ d.lat=p.coords.latitude; d.lon=p.coords.longitude; save(); fetchWx(d.lat,d.lon,''); }, ()=>fail('Allow location, or set a city 📍'), {timeout:8000});
  else fail('Set a city to see weather');
};
function askCity(wd,body){
  modal('Set location',`<label class="fld">City name</label><input id="wx-city" placeholder="e.g. Newark, NJ"/><div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Search</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
  document.querySelector('[data-x=s]').onclick=()=>{ const c=document.getElementById('wx-city').value.trim(); if(!c){closeModal();return;}
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(c)}&count=1`).then(r=>r.json()).then(j=>{
      if(j.results&&j.results[0]){ const g=j.results[0]; wd.data.lat=g.latitude; wd.data.lon=g.longitude; wd.data.city=g.name; save(); closeModal(); RENDER.weather(body,wd); } else alert('City not found'); }); };
}

/* ---------- SPOTIFY ---------- */
RENDER.spotify=(body,wd)=>{
  const d=wd.data; d.playlists=d.playlists||[];
  body.innerHTML=`<div class="spotify-head"><span class="dot">♪</span><div class="w-title-lg" style="margin:0">Spotify</div>
      ${d.spConnected?'<span class="conn-badge">✓ connected</span>':''}</div>
    <button class="btn ghost sm block" data-a="connect" style="margin-bottom:10px">${d.spConnected?'↻ Re-sync my playlists':'🎧 Log in & import my playlists'}</button>
    <div class="sp-list" id="sp-${wd.id}"></div>
    <div class="sp-add"><input id="spu-${wd.id}" placeholder="…or paste a playlist / track link"/><button class="btn" data-a="add">＋</button></div>
    <div id="spe-${wd.id}"></div>`;
  body.querySelector('[data-a=connect]').onclick=()=> spotifyClick(wd,body);
  const listEl=body.querySelector('#sp-'+wd.id), embedEl=body.querySelector('#spe-'+wd.id);
  const paint=()=>{
    listEl.innerHTML=d.playlists.length? d.playlists.map((p,i)=>`<div class="sp-pill ${d.active===i?'active':''}">
      <span class="nm" data-i="${i}">${esc(p.name)}</span>
      <button class="play-btn" data-i="${i}">${d.active===i?'❚❚':'▶'}</button>
      <button class="sp-x" data-del="${i}">✕</button></div>`).join('') : `<div class="empty-hint">Add a playlist or track link ↓</div>`;
    const sel=(i)=>{ d.active=(d.active===i?null:i); save(); paint(); };
    listEl.querySelectorAll('.nm').forEach(b=> b.onclick=()=>sel(+b.dataset.i));
    listEl.querySelectorAll('.play-btn').forEach(b=> b.onclick=()=>sel(+b.dataset.i));
    listEl.querySelectorAll('[data-del]').forEach(b=> b.onclick=()=>{ d.playlists.splice(+b.dataset.del,1); d.active=null; save(); paint(); });
    if(d.active!=null&&d.playlists[d.active]){ const emb=toEmbed(d.playlists[d.active].url);
      embedEl.innerHTML=emb?`<iframe class="sp-embed" style="height:${wd.h>5?352:152}px" src="${emb}" allow="encrypted-media; autoplay" loading="lazy"></iframe>`:`<div class="empty-hint">Unrecognized Spotify link</div>`;
    } else embedEl.innerHTML='';
  };
  const inp=body.querySelector('#spu-'+wd.id);
  const add=()=>{ const u=inp.value.trim(); if(!u)return; const nm=prompt('Name this playlist/track:','My Playlist')||'Playlist'; d.playlists.push({name:nm,url:u}); inp.value=''; save(); paint(); };
  body.querySelector('[data-a=add]').onclick=add; inp.onkeydown=e=>{ if(e.key==='Enter')add(); };
  paint();
};
function toEmbed(url){ try{ const m=url.match(/open\.spotify\.com\/(playlist|track|album|artist|episode|show)\/([A-Za-z0-9]+)/); if(m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
  const u=url.match(/spotify:(playlist|track|album):([A-Za-z0-9]+)/); if(u) return `https://open.spotify.com/embed/${u[1]}/${u[2]}`; }catch(e){} return null; }

/* ---------- CALENDAR (with event chips) ---------- */
RENDER.calendar=(body,wd)=>{
  const d=wd.data; d.events=d.events||[]; const now=new Date();
  if(d.viewY==null){ d.viewY=now.getFullYear(); d.viewM=now.getMonth(); }
  const paint=()=>{
    const first=new Date(d.viewY,d.viewM,1), startDow=first.getDay(), days=new Date(d.viewY,d.viewM+1,0).getDate();
    const monthName=first.toLocaleDateString(undefined,{month:'long',year:'numeric'});
    let cells=''; ['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach(dw=> cells+=`<div class="cal-dow">${dw}</div>`);
    for(let i=0;i<startDow;i++) cells+=`<div class="cal-cell empty"></div>`;
    for(let day=1;day<=days;day++){
      const iso=`${d.viewY}-${String(d.viewM+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const evs=d.events.filter(e=>e.date===iso).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
      const chips=evs.slice(0,2).map(e=>`<div class="cal-chip">${e.time?esc(e.time)+' ':''}${esc(e.title)}</div>`).join('');
      const more=evs.length>2?`<div class="cal-more">+${evs.length-2} more</div>`:'';
      cells+=`<div class="cal-cell ${iso===isoIn(0)?'today':''}" data-date="${iso}"><span class="daynum">${day}</span><div class="cal-evs">${chips}${more}</div></div>`;
    }
    body.innerHTML=`<div class="cal-head"><div class="cal-month">${monthName}</div>
      <div class="cal-nav"><button class="icon-btn" data-n="-1">‹</button><button class="icon-btn" data-n="1">›</button><button class="btn sm" data-n="add">＋ Event</button></div></div>
      <div class="cal-grid">${cells}</div><div class="cal-events" id="ce-${wd.id}"></div>`;
    body.querySelector('[data-n="-1"]').onclick=()=>{ d.viewM--; if(d.viewM<0){d.viewM=11;d.viewY--;} save(); paint(); };
    body.querySelector('[data-n="1"]').onclick=()=>{ d.viewM++; if(d.viewM>11){d.viewM=0;d.viewY++;} save(); paint(); };
    body.querySelector('[data-n=add]').onclick=()=> addEvent(isoIn(0));
    body.querySelectorAll('.cal-cell:not(.empty)').forEach(c=> c.onclick=()=> addEvent(c.dataset.date));
    const up=[...d.events].filter(e=>e.date>=isoIn(0)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,5);
    body.querySelector('#ce-'+wd.id).innerHTML=up.length?`<div class="w-sub" style="margin-bottom:6px">Upcoming</div>`+up.map(e=>`<div class="cal-ev-item"><span><span class="dotc"></span><b>${esc(e.title)}</b> · ${fmtDue(e.date)}${e.time?' '+e.time:''}</span><button class="mini-del" data-ev="${e.id}">✕</button></div>`).join(''):'';
    body.querySelectorAll('[data-ev]').forEach(b=> b.onclick=(ev)=>{ ev.stopPropagation(); d.events=d.events.filter(x=>x.id!==b.dataset.ev); save(); paint(); });
  };
  const addEvent=(date)=>{
    modal('Add event',`<label class="fld">Event</label><input id="e-t"/>
      <div class="row2"><div><label class="fld">Date</label><input type="date" id="e-d" value="${date}"/></div><div><label class="fld">Time</label><input type="time" id="e-tm"/></div></div>
      <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Add event</button></div>`);
    document.querySelector('[data-x=c]').onclick=closeModal;
    document.querySelector('[data-x=s]').onclick=()=>{ const t=document.getElementById('e-t').value.trim(); if(!t){closeModal();return;}
      d.events.push({id:uid(),title:t,date:document.getElementById('e-d').value,time:document.getElementById('e-tm').value}); save(); closeModal(); paint(); };
  };
  paint();
};

/* ---------- GOALS ---------- */
RENDER.goals=(body,wd)=>{
  const d=wd.data; d.tab=d.tab||'day'; d.day=d.day||[]; d.week=d.week||[]; d.month=d.month||[];
  const paint=()=>{ const list=d[d.tab];
    body.innerHTML=`<div class="w-title-lg">${icon('goals')} Goals</div>
      <div class="goal-tabs"><button data-t="day">DAY</button><button data-t="week">WEEK</button><button data-t="month">MONTH</button></div>
      <div class="todo-add"><input id="g-${wd.id}" placeholder="New ${d.tab} goal…"/><button class="btn" data-a="add">＋</button></div>
      <ul class="goal-list">${list.length?list.map(g=>`<li class="goal-item ${g.done?'done':''}" data-id="${g.id}"><div class="goal-box" data-a="t">${g.done?'✓':''}</div><span>${esc(g.text)}</span><button class="mini-del" data-a="d">✕</button></li>`).join(''):`<div class="empty-hint">Set a goal for the ${d.tab} ✨</div>`}</ul>`;
    body.querySelectorAll('.goal-tabs button').forEach(b=>{ b.classList.toggle('active',b.dataset.t===d.tab); b.onclick=()=>{ d.tab=b.dataset.t; save(); paint(); }; });
    const inp=body.querySelector('#g-'+wd.id); const add=()=>{ const v=inp.value.trim(); if(!v)return; d[d.tab].push({id:uid(),text:v,done:false}); save(); paint(); };
    body.querySelector('[data-a=add]').onclick=add; inp.onkeydown=e=>{ if(e.key==='Enter')add(); };
    body.querySelectorAll('.goal-item').forEach(li=>{ const g=list.find(x=>x.id===li.dataset.id);
      li.querySelector('[data-a=t]').onclick=()=>{ g.done=!g.done; save(); paint(); };
      li.querySelector('[data-a=d]').onclick=()=>{ d[d.tab]=list.filter(x=>x.id!==g.id); save(); paint(); }; });
  };
  paint();
};

/* ---------- HABITS ---------- */
RENDER.habits=(body,wd)=>{
  const d=wd.data; d.habits=d.habits||[]; const week=weekDates();
  const paint=()=>{
    body.innerHTML=`<div class="w-title-lg">${icon('habits')} Habits</div><div class="todo-add"><input id="h-${wd.id}" placeholder="New habit…"/><button class="btn" data-a="add">＋</button></div><div id="hl-${wd.id}"></div>`;
    const host=body.querySelector('#hl-'+wd.id);
    host.innerHTML=d.habits.length? d.habits.map(h=>`<div class="habit-row" data-id="${h.id}"><div class="habit-top"><span class="habit-name">${esc(h.name)}</span>
      <span class="habit-streak">🔥 ${streak(h)}d <button class="mini-del" data-a="del">✕</button></span></div>
      <div class="habit-week">${week.map(dt=>`<div class="habit-day"><div class="dlab">${dt.lab}</div><div class="dbox ${h.days[dt.iso]?'on':''} ${dt.iso===isoIn(0)?'today':''}" data-iso="${dt.iso}"></div></div>`).join('')}</div></div>`).join('') : `<div class="empty-hint">Track a habit to build streaks 🔥</div>`;
    host.querySelectorAll('.habit-row').forEach(row=>{ const h=d.habits.find(x=>x.id===row.dataset.id);
      row.querySelector('[data-a=del]').onclick=()=>{ d.habits=d.habits.filter(x=>x.id!==h.id); save(); paint(); };
      row.querySelectorAll('.dbox').forEach(bx=> bx.onclick=()=>{ h.days[bx.dataset.iso]=!h.days[bx.dataset.iso]; save(); paint(); }); });
    const inp=body.querySelector('#h-'+wd.id); const add=()=>{ const v=inp.value.trim(); if(!v)return; d.habits.push({id:uid(),name:v,days:{}}); save(); paint(); };
    body.querySelector('[data-a=add]').onclick=add; inp.onkeydown=e=>{ if(e.key==='Enter')add(); };
  };
  paint();
};
function weekDates(){ const out=[],now=new Date(),dow=now.getDay(),monday=new Date(now); monday.setDate(now.getDate()-((dow+6)%7));
  const L=['M','T','W','T','F','S','S']; for(let i=0;i<7;i++){ const dt=new Date(monday); dt.setDate(monday.getDate()+i); out.push({iso:dt.toISOString().slice(0,10),lab:L[i]}); } return out; }
function streak(h){ let s=0; const dt=new Date(); for(;;){ const iso=dt.toISOString().slice(0,10); if(h.days[iso]){s++; dt.setDate(dt.getDate()-1);} else { if(iso===isoIn(0)){ dt.setDate(dt.getDate()-1); continue; } break; } if(s>365)break; } return s; }

/* ---------- GRADE CALCULATOR (quarters, percent only) ---------- */
const QUARTERS=[['all','ALL'],['q1','Q1'],['q2','Q2'],['q3','Q3'],['q4','Q4']];
const LETTERS=[['A',93],['A-',90],['B+',87],['B',83],['B-',80],['C+',77],['C',73],['C-',70],['D+',67],['D',63],['D-',60],['F',0]];
function letterFor(p){ for(const [l,m] of LETTERS){ if(p>=m) return l; } return 'F'; }
function qPct(list){ let e=0,t=0; (list||[]).forEach(a=>{ e+=+a.earned||0; t+=+a.total||0; }); return t? e/t*100 : null; }
function classPct(c,q){ if(q==='all'){ const v=['q1','q2','q3','q4'].map(k=>qPct(c.quarters[k])).filter(x=>x!=null); return v.length? v.reduce((a,b)=>a+b,0)/v.length : null; } return qPct(c.quarters[q]); }

RENDER.grades=(body,wd)=>{
  const d=wd.data; d.classes=d.classes||[]; d.quarter=d.quarter||'all';
  const paint=()=>{
    const q=d.quarter;
    const incl=d.classes.filter(c=>c.include && classPct(c,q)!=null);
    const avg=incl.length? incl.reduce((s,c)=>s+classPct(c,q),0)/incl.length : null;
    body.innerHTML=`<div class="w-title-lg">${icon('grades')} Grades</div>
      <div class="q-tabs">${QUARTERS.map(([k,l])=>`<button data-q="${k}" class="${q===k?'active':''}">${l}</button>`).join('')}</div>
      <div class="grade-overall"><div><div class="glab">${q==='all'?'Average (all quarters)':'Average · '+q.toUpperCase()}</div><div class="big">${avg==null?'—':avg.toFixed(1)+'%'}</div></div>
        <div style="text-align:right"><div class="glab">Classes</div><div class="big">${incl.length}</div></div></div>
      <div id="gc-${wd.id}"></div>
      <button class="btn ghost block" data-a="addclass" style="margin-top:6px">＋ Add class</button>`;
    body.querySelectorAll('.q-tabs button').forEach(b=> b.onclick=()=>{ d.quarter=b.dataset.q; d.open=null; save(); paint(); });
    const host=body.querySelector('#gc-'+wd.id);
    host.innerHTML=d.classes.map(c=>{ const pct=classPct(c,q), open=d.open===c.id, list=q==='all'?[]:c.quarters[q];
      return `<div class="class-card" data-id="${c.id}">
        <div class="class-top" data-a="toggle"><div><div class="class-name">${esc(c.name)}</div>
          <div class="class-meta">${q==='all'?'across all quarters':(list.length+' assignment'+(list.length===1?'':'s'))} · <label style="cursor:pointer"><input type="checkbox" ${c.include?'checked':''} data-a="incl" style="width:auto;vertical-align:middle"> count</label></div></div>
          <div style="text-align:right"><div class="class-grade">${pct==null?'—':pct.toFixed(1)+'%'}</div>${pct!=null?`<span class="letter">${letterFor(pct)}</span>`:''}</div></div>
        ${open?(q==='all'?`<div class="q-breakdown">${['q1','q2','q3','q4'].map(k=>{ const p=qPct(c.quarters[k]); return `<div class="q-cell"><div class="ql">${k.toUpperCase()}</div><div class="qv">${p==null?'—':p.toFixed(0)+'%'}</div></div>`;}).join('')}</div>`
        :`<div class="assign-table"><div class="arow head"><span>Assignment</span><span>Earned</span><span>Total</span><span>%</span><span></span></div>
          ${list.map(a=>{ const p=(+a.total)?( (+a.earned/+a.total)*100 ):null; return `<div class="arow" data-aid="${a.id}"><span class="an">${esc(a.name)}</span>
            <input value="${a.earned}" data-f="earned"/><input value="${a.total}" data-f="total"/>
            <span class="pct">${p==null?'—':p.toFixed(0)+'%'}</span><button class="mini-del" data-a="delA">✕</button></div>`;}).join('')}
          <button class="btn sm" data-a="addA" style="margin-top:8px">＋ Assignment</button><button class="mini-del" data-a="delC" style="float:right;margin-top:8px">Delete class</button></div>`):''}
      </div>`;}).join('');
    host.querySelectorAll('.class-card').forEach(card=>{ const c=d.classes.find(x=>x.id===card.dataset.id);
      card.querySelector('[data-a=toggle]').onclick=(e)=>{ if(e.target.closest('[data-a=incl]'))return; d.open=(d.open===c.id?null:c.id); save(); paint(); };
      const inc=card.querySelector('[data-a=incl]'); if(inc) inc.onclick=(e)=>{ e.stopPropagation(); c.include=inc.checked; save(); paint(); };
      card.querySelectorAll('.arow[data-aid]').forEach(row=>{ const a=c.quarters[q].find(x=>x.id===row.dataset.aid);
        row.querySelectorAll('input').forEach(inp=> inp.onchange=()=>{ a[inp.dataset.f]=parseFloat(inp.value)||0; save(); paint(); });
        const del=row.querySelector('[data-a=delA]'); if(del) del.onclick=()=>{ c.quarters[q]=c.quarters[q].filter(x=>x.id!==a.id); save(); paint(); }; });
      const addA=card.querySelector('[data-a=addA]'); if(addA) addA.onclick=()=>{ const nm=prompt('Assignment name:','New Assignment'); if(nm===null)return; c.quarters[q].push({id:uid(),name:nm||'Assignment',earned:0,total:100}); save(); paint(); };
      const delC=card.querySelector('[data-a=delC]'); if(delC) delC.onclick=()=>{ if(confirm('Delete '+c.name+'?')){ d.classes=d.classes.filter(x=>x.id!==c.id); save(); paint(); } };
    });
    body.querySelector('[data-a=addclass]').onclick=()=>{ const nm=prompt('Class name:','New Class'); if(nm===null)return;
      const nc={id:uid(),name:nm||'Class',include:true,quarters:{q1:[],q2:[],q3:[],q4:[]}}; d.classes.push(nc); d.open=nc.id; if(d.quarter==='all')d.quarter='q1'; save(); paint(); };
  };
  paint();
};

/* ---------- NOTES ---------- */
RENDER.notes=(body,wd)=>{ const d=wd.data;
  body.innerHTML=`<div class="w-title-lg">${icon('notes')} Notes</div><textarea class="notes-area" placeholder="Jot anything…">${esc(d.text||'')}</textarea>`;
  const ta=body.querySelector('textarea'); ta.oninput=()=>{ d.text=ta.value; save(); };
};

/* ---------- JOURNAL & MOOD ---------- */
const MOODS=[
  {v:1,face:'😞',color:'#c07a63',label:'Rough'},
  {v:2,face:'😕',color:'#d69a68',label:'Low'},
  {v:3,face:'😐',color:'#cbb98d',label:'Okay'},
  {v:4,face:'🙂',color:'#9fae7f',label:'Good'},
  {v:5,face:'😄',color:'#8a9a6b',label:'Great'},
];
function moodColor(v){ const m=MOODS.find(x=>x.v===v); return m?m.color:'var(--card-2)'; }
function moodFace(v){ const m=MOODS.find(x=>x.v===v); return m?m.face:''; }
RENDER.journal=(body,wd)=>{
  const d=wd.data; d.entries=d.entries||{}; d.trackers=d.trackers||[{id:uid(),name:'Rate your day'}];
  const today=isoIn(0);
  const entry=()=> d.entries[today]||(d.entries[today]={mood:0,text:'',ratings:{}});
  const paint=()=>{
    const e=entry();
    body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('journal')} Journal</div>
        <button class="w-gear" data-a="history" title="Mood calendar">▦</button></div>
      <div class="jrnl-date">${new Date(today+'T00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</div>
      <div class="jrnl-label">How do you feel today?</div>
      <div class="mood-row">${MOODS.map(m=>`<button class="mood ${e.mood===m.v?'sel':''}" data-m="${m.v}" style="--mc:${m.color}" title="${m.label}"><span class="mf">${m.face}</span></button>`).join('')}</div>
      <div id="jt-${wd.id}"></div>
      <div class="jrnl-label">Journal</div>
      <textarea class="jrnl-text" id="jx-${wd.id}" placeholder="What's on your mind today?">${esc(e.text||'')}</textarea>`;
    const tHost=body.querySelector('#jt-'+wd.id);
    tHost.innerHTML=d.trackers.map(t=>`<div class="track-row" data-t="${t.id}"><div class="track-top"><span class="track-name">${esc(t.name)}</span>${d.trackers.length>0?`<button class="mini-del" data-del="${t.id}">✕</button>`:''}</div>
        <div class="track-scale">${[1,2,3,4,5].map(n=>`<button class="ts ${(e.ratings[t.id]||0)>=n?'on':''}" data-t="${t.id}" data-n="${n}" title="${n}"></button>`).join('')}</div></div>`).join('')
      + `<button class="btn ghost sm" data-a="addtrack" style="margin:4px 0 2px">＋ Track something</button>`;
    body.querySelectorAll('.mood').forEach(b=> b.onclick=()=>{ e.mood=+b.dataset.m; save(); paint(); });
    tHost.querySelectorAll('.ts').forEach(b=> b.onclick=()=>{ const tid=b.dataset.t, n=+b.dataset.n; e.ratings[tid]=(e.ratings[tid]===n?0:n); save(); paint(); });
    tHost.querySelectorAll('[data-del]').forEach(b=> b.onclick=()=>{ d.trackers=d.trackers.filter(x=>x.id!==b.dataset.del); save(); paint(); });
    tHost.querySelector('[data-a=addtrack]').onclick=()=>{ const nm=prompt('What do you want to rate each day? (e.g. Sleep, Stress, Productivity)'); if(!nm||!nm.trim())return; d.trackers.push({id:uid(),name:nm.trim()}); save(); paint(); };
    body.querySelector('#jx-'+wd.id).oninput=(ev)=>{ e.text=ev.target.value; save(); };
    body.querySelector('[data-a=history]').onclick=()=> journalHistory(wd);
  };
  paint();
};
function journalHistory(wd){
  const d=wd.data; const n=new Date(); let vy=n.getFullYear(), vm=n.getMonth();
  const render=()=>{
    const first=new Date(vy,vm,1), sd=first.getDay(), days=new Date(vy,vm+1,0).getDate();
    let cells=''; ['S','M','T','W','T','F','S'].forEach(x=>cells+=`<div class="mc-dow">${x}</div>`);
    for(let i=0;i<sd;i++) cells+='<div></div>';
    for(let day=1;day<=days;day++){ const iso=`${vy}-${String(vm+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`; const e=d.entries[iso];
      const has=e&&e.mood; const col=has?moodColor(e.mood):'var(--card-2)';
      cells+=`<button class="mc-cell ${iso===isoIn(0)?'today':''}" data-iso="${iso}" style="background:${col}${has?';color:#fff':''}" title="${iso}">${has?moodFace(e.mood):day}</button>`;
    }
    modal('Mood calendar',`<div class="mc-head"><button class="icon-btn" data-n="-1">‹</button><b>${first.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</b><button class="icon-btn" data-n="1">›</button></div>
      <div class="mc-grid">${cells}</div>
      <div class="mc-legend">${MOODS.map(m=>`<span><i style="background:${m.color}"></i>${m.label}</span>`).join('')}</div>
      <p style="font-size:11.5px;font-weight:600;color:var(--ink-soft);margin-top:10px">Tap any day to read or edit that day's entry.</p>`);
    document.querySelector('[data-n="-1"]').onclick=()=>{ vm--; if(vm<0){vm=11;vy--;} render(); };
    document.querySelector('[data-n="1"]').onclick=()=>{ vm++; if(vm>11){vm=0;vy++;} render(); };
    document.querySelectorAll('.mc-cell').forEach(c=> c.onclick=()=> journalDay(wd, c.dataset.iso, render));
  };
  render();
}
function journalDay(wd,iso,back){
  const d=wd.data; const e=d.entries[iso]||(d.entries[iso]={mood:0,text:'',ratings:{}});
  modal(new Date(iso+'T00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'}),`
    <div class="jrnl-label">Mood</div><div class="mood-row" id="dm">${MOODS.map(m=>`<button class="mood ${e.mood===m.v?'sel':''}" data-m="${m.v}" style="--mc:${m.color}" title="${m.label}"><span class="mf">${m.face}</span></button>`).join('')}</div>
    ${d.trackers.map(t=>`<div class="jrnl-label">${esc(t.name)}</div><div class="track-scale" data-t="${t.id}">${[1,2,3,4,5].map(n=>`<button class="ts ${(e.ratings[t.id]||0)>=n?'on':''}" data-n="${n}"></button>`).join('')}</div>`).join('')}
    <div class="jrnl-label">Journal</div><textarea class="jrnl-text" id="dtext" style="min-height:120px">${esc(e.text||'')}</textarea>
    <div class="modal-actions"><button class="btn ghost" data-x="back">‹ Calendar</button><button class="btn" data-x="save">Save</button></div>`);
  document.querySelectorAll('#dm .mood').forEach(b=> b.onclick=()=>{ e.mood=+b.dataset.m; document.querySelectorAll('#dm .mood').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); });
  document.querySelectorAll('.track-scale[data-t]').forEach(sc=> sc.querySelectorAll('.ts').forEach(b=> b.onclick=()=>{ const tid=sc.dataset.t, num=+b.dataset.n; e.ratings[tid]=(e.ratings[tid]===num?0:num); sc.querySelectorAll('.ts').forEach((x,i)=> x.classList.toggle('on', (e.ratings[tid]||0)>=i+1)); }));
  const commit=()=>{ e.text=document.getElementById('dtext').value; save(); };
  document.querySelector('[data-x=save]').onclick=()=>{ commit(); closeModal(); renderBoard(); };
  document.querySelector('[data-x=back]').onclick=()=>{ commit(); back&&back(); };
}

/* ---------- GMAIL (read-only) ---------- */
RENDER.gmail=(body,wd)=>{
  const d=wd.data; d.msgs=d.msgs||[];
  body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('gmail')} Gmail</div>${d.gmConnected?'<span class="conn-badge">✓ connected</span>':''}</div>
    <button class="btn ghost sm block" data-a="connect" style="margin-bottom:10px">${d.gmConnected?'↻ Refresh inbox':'✉️ Connect Gmail'}</button>
    <div id="gm-${wd.id}">${d.msgs.length? d.msgs.map(m=>`<a class="gm-item" href="${esc(m.link)}" target="_blank" rel="noopener">
        <div class="gm-from">${m.unread?'<i class="gm-dot"></i>':''}${esc(m.from)}<span class="gm-date">${esc(m.date)}</span></div>
        <div class="gm-subj">${esc(m.subject)}</div><div class="gm-snip">${esc(m.snippet)}</div></a>`).join('')
      : `<div class="empty-hint">${d.gmConnected?'Inbox empty 🎉':'Connect to browse your recent emails'}</div>`}</div>`;
  body.querySelector('[data-a=connect]').onclick=()=> gmailConnect(wd,body);
};

/* ---------- UPCOMING (aggregates due tasks / events / tests) ---------- */
function relWhen(iso,time){
  const today=isoIn(0);
  const dd=Math.round((new Date(iso+'T00:00')-new Date(today+'T00:00'))/86400000);
  let lbl = dd<0?`${-dd}d overdue` : dd===0?'Today' : dd===1?'Tomorrow' : `in ${dd} days`;
  if(time) lbl+=' · '+time;
  return {dd,lbl};
}
RENDER.upcoming=(body,wd)=>{
  const items=[];
  state.widgets.forEach(x=>{
    if(x.type==='todo') (x.data.items||[]).forEach(i=>{ if(i.due&&!i.done) items.push({icon:'✅',title:i.text,date:i.due,time:i.time,kind:'Task'}); });
    if(x.type==='assign') (x.data.items||[]).forEach(i=>{ if(i.due&&!i.done) items.push({icon:'📚',title:i.title,date:i.due,time:'',kind:i.course}); });
    if(x.type==='calendar') (x.data.events||[]).forEach(e=>{ if(e.date>=isoIn(-1)) items.push({icon:'📅',title:e.title,date:e.date,time:e.time,kind:'Event'}); });
    if(x.type==='tests') (x.data.items||[]).forEach(t=>{ if(t.date>=isoIn(-1)) items.push({icon:'📝',title:t.name,date:t.date,time:'',kind:t.subject||'Test'}); });
  });
  items.sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));
  const top=items.slice(0,10);
  body.innerHTML=`<div class="w-title-lg">${icon('upcoming')} Upcoming</div>${top.length?top.map(i=>{ const r=relWhen(i.date,i.time);
    return `<div class="assign-item"><div class="assign-ic">${i.icon}</div><div class="assign-main"><div class="assign-title">${esc(i.title)}</div><div class="assign-course">${esc(i.kind)}</div>
      <div class="assign-due ${r.dd<=1?'soon':''}">${r.lbl} · ${fmtDue(i.date)}</div></div></div>`;}).join('') : `<div class="empty-hint">Nothing due soon — add tasks, events or tests 🎉</div>`}`;
};

/* ---------- TESTS & EXAMS (countdown + file attachments) ---------- */
RENDER.tests=(body,wd)=>{
  const d=wd.data; d.items=d.items||[];
  const paint=()=>{
    const items=[...d.items].sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('tests')} Tests & Exams</div><button class="w-gear" data-a="add" title="Add test">＋</button></div>
      ${items.length?items.map(t=>{ const r=relWhen(t.date,''); const soon=r.dd<=3;
        return `<div class="test-card" data-id="${t.id}"><div class="test-top"><div><div class="assign-title">${esc(t.name)}</div><div class="assign-course">${esc(t.subject||'')}</div></div>
          <div class="test-count ${soon?'soon':''}">${r.dd<0?'past':r.dd===0?'TODAY':r.dd+'d'}</div></div>
          <div class="test-meta">${fmtDue(t.date)}${t.files&&t.files.length?` · 📎 ${t.files.length} file${t.files.length===1?'':'s'}`:''}</div></div>`;}).join('') : `<div class="empty-hint">Add a test to start a countdown ⏳</div>`}`;
    body.querySelector('[data-a=add]').onclick=()=> openTest(wd,{files:[]},paint);
    body.querySelectorAll('.test-card').forEach(c=>{ const t=d.items.find(x=>x.id===c.dataset.id); c.onclick=()=> openTest(wd,t,paint,true); });
  };
  paint();
};
function openTest(wd,seed,paint,isEdit){
  const d=wd.data; seed.files=seed.files||[];
  modal(isEdit?'Test details':'Add test',`
    <label class="fld">Test name</label><input id="t-n" value="${esc(seed.name||'')}"/>
    <div class="row2"><div><label class="fld">Subject</label><input id="t-s" value="${esc(seed.subject||'')}"/></div>
    <div><label class="fld">Date</label><input type="date" id="t-d" value="${seed.date||''}"/></div></div>
    <label class="fld">Notes / study guide</label><textarea id="t-notes" style="min-height:70px">${esc(seed.notes||'')}</textarea>
    <label class="fld">Attach files (study guides, PDFs, images)</label>
    <input type="file" id="t-file" multiple style="padding:6px"/>
    <div id="t-files" style="margin-top:8px"></div>
    <div class="modal-actions">${isEdit?'<button class="btn ghost" data-x="del" style="margin-right:auto">Delete</button>':''}<button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">${isEdit?'Save':'Add test'}</button></div>`);
  const filesHost=document.getElementById('t-files');
  const drawFiles=()=>{ filesHost.innerHTML=seed.files.map((f,i)=>`<div class="file-chip"><span data-open="${i}">📎 ${esc(f.name)}</span><button data-rm="${i}">✕</button></div>`).join('');
    filesHost.querySelectorAll('[data-open]').forEach(s=> s.onclick=()=>{ const f=seed.files[+s.dataset.open]; const wnd=window.open(); if(wnd) wnd.document.write(`<iframe src="${f.dataUrl}" style="border:none;width:100%;height:100vh"></iframe>`); });
    filesHost.querySelectorAll('[data-rm]').forEach(b=> b.onclick=()=>{ seed.files.splice(+b.dataset.rm,1); drawFiles(); }); };
  drawFiles();
  document.getElementById('t-file').onchange=(e)=>{ [...e.target.files].forEach(file=>{ if(file.size>4*1024*1024){ alert(`"${file.name}" is over 4 MB — too large for browser storage. Try a smaller file or keep it as a note.`); return; }
    const rd=new FileReader(); rd.onload=()=>{ seed.files.push({name:file.name,type:file.type,dataUrl:rd.result}); drawFiles(); }; rd.readAsDataURL(file); }); };
  document.querySelector('[data-x=c]').onclick=closeModal;
  const delBtn=document.querySelector('[data-x=del]'); if(delBtn) delBtn.onclick=()=>{ d.items=d.items.filter(x=>x.id!==seed.id); save(); closeModal(); paint(); };
  document.querySelector('[data-x=s]').onclick=()=>{ const name=document.getElementById('t-n').value.trim(); if(!name){closeModal();return;}
    const rec={name,subject:document.getElementById('t-s').value.trim(),date:document.getElementById('t-d').value,notes:document.getElementById('t-notes').value,files:seed.files};
    if(isEdit) Object.assign(seed,rec); else d.items.push({id:uid(),...rec});
    try{ save(); }catch(e){ alert('Could not save — attachments may be too large for browser storage.'); }
    closeModal(); paint(); };
}

/* ---------- DAILY SCHEDULE (time blocking) ---------- */
RENDER.schedule=(body,wd)=>{
  const d=wd.data; d.blocks=d.blocks||[];
  const paint=()=>{
    const blocks=[...d.blocks].sort((a,b)=>(a.start||'').localeCompare(b.start||''));
    body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('schedule')} Today's Schedule</div><button class="w-gear" data-a="add" title="Add block">＋</button></div>
      <div class="sched-list">${blocks.length?blocks.map(b=>`<div class="sched-block type-${b.type||'task'}" data-id="${b.id}">
        <div class="sched-time">${esc(b.start||'')}${b.end?'–'+esc(b.end):''}</div>
        <div class="sched-title">${esc(b.title)}</div><button class="mini-del" data-a="del">✕</button></div>`).join(''):`<div class="empty-hint">Block out your day ⏱️</div>`}</div>`;
    body.querySelector('[data-a=add]').onclick=()=> addBlock();
    body.querySelectorAll('.sched-block').forEach(el=>{ const b=d.blocks.find(x=>x.id===el.dataset.id);
      el.querySelector('[data-a=del]').onclick=(e)=>{ e.stopPropagation(); d.blocks=d.blocks.filter(x=>x.id!==b.id); save(); paint(); };
      el.onclick=()=> addBlock(b); });
  };
  const addBlock=(seed)=>{ seed=seed||{};
    modal(seed.id?'Edit block':'Add time block',`<label class="fld">What</label><input id="b-t" value="${esc(seed.title||'')}"/>
      <div class="row2"><div><label class="fld">Start</label><input type="time" id="b-s" value="${seed.start||''}"/></div><div><label class="fld">End</label><input type="time" id="b-e" value="${seed.end||''}"/></div></div>
      <label class="fld">Type</label><select id="b-ty"><option value="task">Task</option><option value="study">Study</option><option value="event">Event</option><option value="break">Break</option></select>
      <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Save</button></div>`);
    if(seed.type) document.getElementById('b-ty').value=seed.type;
    document.querySelector('[data-x=c]').onclick=closeModal;
    document.querySelector('[data-x=s]').onclick=()=>{ const t=document.getElementById('b-t').value.trim(); if(!t){closeModal();return;}
      const rec={title:t,start:document.getElementById('b-s').value,end:document.getElementById('b-e').value,type:document.getElementById('b-ty').value};
      if(seed.id) Object.assign(seed,rec); else d.blocks.push({id:uid(),...rec}); save(); closeModal(); paint(); };
  };
  paint();
};

/* ---------- REMINDERS ---------- */
RENDER.reminders=(body,wd)=>{
  const d=wd.data; d.items=d.items||[];
  const paint=()=>{
    body.innerHTML=`<div class="w-title-lg">${icon('reminders')} Reminders</div>
      <div class="todo-add"><input id="r-${wd.id}" placeholder="I must remember to…"/><button class="btn" data-a="add">＋</button></div>
      <ul class="goal-list">${d.items.length?d.items.map(r=>`<li class="goal-item ${r.done?'done':''}" data-id="${r.id}"><div class="goal-box" data-a="t">${r.done?'✓':''}</div>
        <span>${esc(r.text)}${r.time?` <span class="chip">⏰ ${r.time}</span>`:''}</span><button class="mini-del" data-a="d">✕</button></li>`).join(''):`<div class="empty-hint">Add something you must not forget 🔔</div>`}</ul>`;
    const inp=body.querySelector('#r-'+wd.id);
    const add=()=>{ const v=inp.value.trim(); if(!v)return;
      const time=prompt('Remind at a time? (HH:MM, or leave blank)','')||'';
      d.items.push({id:uid(),text:v,time:time.trim(),done:false}); if(time.trim()) requestNotify(); save(); paint(); };
    body.querySelector('[data-a=add]').onclick=add; inp.onkeydown=e=>{ if(e.key==='Enter')add(); };
    body.querySelectorAll('.goal-item').forEach(li=>{ const r=d.items.find(x=>x.id===li.dataset.id);
      li.querySelector('[data-a=t]').onclick=()=>{ r.done=!r.done; save(); paint(); };
      li.querySelector('[data-a=d]').onclick=()=>{ d.items=d.items.filter(x=>x.id!==r.id); save(); paint(); }; });
  };
  paint();
};

/* ---------- DAILY QUOTE ---------- */
RENDER.quotes=(body,wd)=>{
  const d=wd.data; d.list=d.list||[]; d.idx=d.idx||0; if(d.auto==null)d.auto=true;
  const paint=()=>{
    const q=d.list.length? d.list[d.idx%d.list.length] : 'Add your own quotes with ⚙';
    body.innerHTML=`<div class="quote-wrap"><div class="quote-mark">“</div><div class="quote-text">${esc(q)}</div>
      <div class="quote-ctrls"><button class="w-gear" data-a="prev">‹</button>
        <button class="w-gear" data-a="auto" title="Auto-rotate">${d.auto?'⏸':'▶'}</button>
        <button class="w-gear" data-a="edit" title="Manage quotes">⚙</button>
        <button class="w-gear" data-a="next">›</button></div></div>`;
    body.querySelector('[data-a=prev]').onclick=()=>{ d.idx=(d.idx-1+d.list.length)%d.list.length; save(); paint(); };
    body.querySelector('[data-a=next]').onclick=()=>{ d.idx=(d.idx+1)%d.list.length; save(); paint(); };
    body.querySelector('[data-a=auto]').onclick=()=>{ d.auto=!d.auto; save(); paint(); };
    body.querySelector('[data-a=edit]').onclick=()=> manage();
  };
  const manage=()=>{
    modal('Manage quotes',`<label class="fld">Your quotes (one per line)</label><textarea id="q-list" style="min-height:160px">${esc(d.list.join('\n'))}</textarea>
      <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Save</button></div>`);
    document.querySelector('[data-x=c]').onclick=closeModal;
    document.querySelector('[data-x=s]').onclick=()=>{ d.list=document.getElementById('q-list').value.split('\n').map(s=>s.trim()).filter(Boolean); d.idx=0; save(); closeModal(); paint(); };
  };
  clearInterval(runtime['q'+wd.id]);
  runtime['q'+wd.id]=setInterval(()=>{ if(d.auto&&d.list.length){ d.idx=(d.idx+1)%d.list.length; paint(); } }, 18000);
  paint();
};

/* ---------- ALARMS ---------- */
RENDER.alarm=(body,wd)=>{
  const d=wd.data; d.items=d.items||[];
  const paint=()=>{
    const items=[...d.items].sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('alarm')} Alarms</div><button class="w-gear" data-a="add" title="Add alarm">＋</button></div>
      ${items.length?items.map(a=>`<div class="alarm-row" data-id="${a.id}"><div><div class="alarm-time">${esc(a.time)}</div><div class="alarm-label">${esc(a.label||'')}</div></div>
        <div style="display:flex;align-items:center;gap:8px"><label class="switch"><input type="checkbox" ${a.on?'checked':''} data-a="on"><span class="track"></span></label><button class="mini-del" data-a="del">✕</button></div></div>`).join(''):`<div class="empty-hint">Add an alarm to get notified ⏰</div>`}`;
    body.querySelector('[data-a=add]').onclick=()=>{
      modal('Add alarm',`<div class="row2"><div><label class="fld">Time</label><input type="time" id="al-t"/></div><div><label class="fld">Label</label><input id="al-l" placeholder="Wake up"/></div></div>
        <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Add</button></div>`);
      document.querySelector('[data-x=c]').onclick=closeModal;
      document.querySelector('[data-x=s]').onclick=()=>{ const t=document.getElementById('al-t').value; if(!t){closeModal();return;}
        d.items.push({id:uid(),time:t,label:document.getElementById('al-l').value.trim()||'Alarm',on:true}); requestNotify(); save(); closeModal(); paint(); };
    };
    body.querySelectorAll('.alarm-row').forEach(row=>{ const a=d.items.find(x=>x.id===row.dataset.id);
      row.querySelector('[data-a=on]').onchange=(e)=>{ a.on=e.target.checked; if(a.on)requestNotify(); save(); };
      row.querySelector('[data-a=del]').onclick=()=>{ d.items=d.items.filter(x=>x.id!==a.id); save(); paint(); }; });
  };
  paint();
};

/* ---------- STUDY SOUNDS (ambient mixer, synthesized) ---------- */
const AE={ctx:null,master:null,active:{},buffers:{}};
function aeCtx(){ if(!AE.ctx){ AE.ctx=new (window.AudioContext||window.webkitAudioContext)(); AE.master=AE.ctx.createGain(); AE.master.gain.value=0.5; AE.master.connect(AE.ctx.destination); } if(AE.ctx.state==='suspended') AE.ctx.resume(); return AE.ctx; }
function noiseBuffer(kind){ if(AE.buffers[kind]) return AE.buffers[kind]; const ctx=aeCtx(), len=ctx.sampleRate*3, b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0);
  if(kind==='white'){ for(let i=0;i<len;i++) d[i]=Math.random()*2-1; }
  else if(kind==='brown'){ let last=0; for(let i=0;i<len;i++){ const wn=Math.random()*2-1; last=(last+0.02*wn)/1.02; d[i]=last*3.5; } }
  else { let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0; for(let i=0;i<len;i++){ const wn=Math.random()*2-1; b0=0.99886*b0+wn*0.0555179; b1=0.99332*b1+wn*0.0750759; b2=0.96900*b2+wn*0.1538520; b3=0.86650*b3+wn*0.3104856; b4=0.55000*b4+wn*0.5329522; b5=-0.7616*b5-wn*0.0168980; d[i]=(b0+b1+b2+b3+b4+b5+b6+wn*0.5362)*0.11; b6=wn*0.115926; } }
  AE.buffers[kind]=b; return b; }
const SOUND_DEF={
  rain:{icon:'🌧️',name:'Rain',base:'white',filter:{type:'highpass',freq:900},g:0.5},
  ocean:{icon:'🌊',name:'Ocean Waves',base:'brown',filter:{type:'lowpass',freq:600},lfo:{rate:0.12,depth:0.7},g:0.8},
  wind:{icon:'🍃',name:'Wind',base:'white',filter:{type:'bandpass',freq:500,q:0.6},lfoF:{rate:0.09,depth:280},g:0.5},
  forest:{icon:'🌲',name:'Forest',base:'white',filter:{type:'bandpass',freq:2600,q:0.5},g:0.3},
  fire:{icon:'🔥',name:'Fireplace',base:'brown',filter:{type:'lowpass',freq:850},lfo:{rate:2.2,depth:0.35},g:0.8},
  coffee:{icon:'☕',name:'Coffee Shop',base:'pink',filter:{type:'lowpass',freq:1100},g:0.7},
  brown:{icon:'🟤',name:'Brown Noise',base:'brown',g:0.7},
  white:{icon:'⚪',name:'White Noise',base:'white',g:0.4},
  pink:{icon:'🌸',name:'Pink Noise',base:'pink',g:0.55},
};
function startAmb(key,vol){ if(AE.active[key]) return; const ctx=aeCtx(), def=SOUND_DEF[key];
  const src=ctx.createBufferSource(); src.buffer=noiseBuffer(def.base); src.loop=true;
  const g=ctx.createGain(); g.gain.value=(vol==null?0.5:vol)*(def.g||0.5);
  let node=src, extra=[];
  if(def.filter){ const f=ctx.createBiquadFilter(); f.type=def.filter.type; f.frequency.value=def.filter.freq; if(def.filter.q)f.Q.value=def.filter.q; node.connect(f); node=f;
    if(def.lfoF){ const lo=ctx.createOscillator(), la=ctx.createGain(); lo.frequency.value=def.lfoF.rate; la.gain.value=def.lfoF.depth; lo.connect(la); la.connect(f.frequency); lo.start(); extra.push(lo); } }
  node.connect(g); g.connect(AE.master);
  if(def.lfo){ const lo=ctx.createOscillator(), la=ctx.createGain(); lo.frequency.value=def.lfo.rate; la.gain.value=g.gain.value*def.lfo.depth; lo.connect(la); la.connect(g.gain); lo.start(); extra.push(lo); }
  src.start(); AE.active[key]={src,g,extra}; }
function stopAmb(key){ const a=AE.active[key]; if(a){ try{a.src.stop();}catch(e){} (a.extra||[]).forEach(o=>{try{o.stop();}catch(e){}}); delete AE.active[key]; } }
function setAmbVol(key,vol){ const a=AE.active[key]; if(a) a.g.gain.value=vol*(SOUND_DEF[key].g||0.5); }

RENDER.sounds=(body,wd)=>{
  const d=wd.data; d.master=d.master==null?0.5:d.master; d.sounds=d.sounds||{};
  const activeCount=()=>Object.values(d.sounds).filter(s=>s&&s.on).length;
  const paint=()=>{
    body.innerHTML=`<div class="w-title-row"><div class="w-title-lg">${icon('sounds')} Study Sounds</div><span class="w-sub">${activeCount()} active</span></div>
      <div class="snd-master"><span>🔊 Master</span><input type="range" min="0" max="100" value="${Math.round(d.master*100)}" id="sm-${wd.id}"/><button class="btn sm" data-a="stopall">Stop all</button></div>
      <div class="snd-grid">${Object.entries(SOUND_DEF).map(([k,def])=>{ const st=d.sounds[k]||{on:false,vol:0.5};
        return `<div class="snd-card ${st.on?'on':''}" data-k="${k}"><div class="snd-head"><span class="snd-ic">${def.icon}</span><span class="snd-name">${def.name}</span></div>
          <input type="range" class="snd-vol" min="0" max="100" value="${Math.round((st.vol==null?0.5:st.vol)*100)}" data-k="${k}" ${st.on?'':'disabled'}/></div>`;}).join('')}</div>`;
    if(AE.master) AE.master.gain.value=d.master;
    body.querySelector('#sm-'+wd.id).oninput=(e)=>{ d.master=e.target.value/100; if(AE.master)AE.master.gain.value=d.master; save(); };
    body.querySelector('[data-a=stopall]').onclick=()=>{ Object.keys(d.sounds).forEach(k=>{ if(d.sounds[k])d.sounds[k].on=false; stopAmb(k); }); save(); paint(); };
    body.querySelectorAll('.snd-card').forEach(card=>{ const k=card.dataset.k;
      card.querySelector('.snd-head').onclick=()=>{ const st=d.sounds[k]||(d.sounds[k]={on:false,vol:0.5}); st.on=!st.on;
        if(st.on){ aeCtx(); if(AE.master)AE.master.gain.value=d.master; startAmb(k,st.vol); } else stopAmb(k); save(); paint(); }; });
    body.querySelectorAll('.snd-vol').forEach(sl=> sl.oninput=(e)=>{ const k=sl.dataset.k; const st=d.sounds[k]||(d.sounds[k]={on:false,vol:0.5}); st.vol=e.target.value/100; setAmbVol(k,st.vol); save(); });
  };
  paint();
};

/* ============================================================ ALARMS / NOTIFY TICK */
function requestNotify(){ try{ if('Notification' in window && Notification.permission==='default') Notification.requestPermission(); }catch(e){} }
function notify(title,bodyText){ try{ if('Notification' in window && Notification.permission==='granted') new Notification(title,{body:bodyText}); }catch(e){} alarmBeep(); }
function alarmBeep(){ try{ const ctx=aeCtx(); for(let n=0;n<3;n++){ const o=ctx.createOscillator(), g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value=880; const t=ctx.currentTime+n*0.5; g.gain.setValueAtTime(0.001,t); g.gain.exponentialRampToValueAtTime(0.4,t+0.02); g.gain.exponentialRampToValueAtTime(0.001,t+0.4); o.start(t); o.stop(t+0.42); } }catch(e){} }
const firedKey={};
function checkAlarms(){
  const now=new Date(); const hm=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'); const stamp=isoIn(0)+' '+hm;
  state.widgets.forEach(x=>{
    if(x.type==='alarm') (x.data.items||[]).forEach(a=>{ if(a.on&&a.time===hm&&firedKey[a.id]!==stamp){ firedKey[a.id]=stamp; notify('⏰ '+(a.label||'Alarm'), a.time); } });
    if(x.type==='reminders') (x.data.items||[]).forEach(r=>{ if(r.time===hm&&!r.done&&firedKey[r.id]!==stamp){ firedKey[r.id]=stamp; notify('🔔 Reminder', r.text); } });
  });
}
setInterval(checkAlarms, 15000);

/* ============================================================ WIDGET SETTINGS */
function widgetSettings(wd){
  if(wd.type==='timer') return timerSettings(wd);
  modal(CATALOG[wd.type].name,`<p style="font-weight:600;color:var(--ink-soft)">Use this widget's own controls to edit its content. In edit mode you can drag it by the header, resize from the corner, or remove it with ✕.</p><div class="modal-actions"><button class="btn" data-x="c">Got it</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
}

/* ============================================================ MODAL / DRAWER */
function modal(title,html){ document.getElementById('modalTitle').textContent=title; document.getElementById('modalBody').innerHTML=html; document.getElementById('modalBackdrop').classList.remove('hidden'); }
function closeModal(){ document.getElementById('modalBackdrop').classList.add('hidden'); }
document.getElementById('modalClose').onclick=closeModal;
document.getElementById('modalBackdrop').onclick=(e)=>{ if(e.target.id==='modalBackdrop') closeModal(); };

const APPS=[
  {app:'spotify',   ic:'spotify',     name:'Spotify',          sub:'log in · playlists'},
  {app:'classroom', ic:'assign',      name:'Google Classroom', sub:'log in · to-dos'},
  {app:'gmail',     ic:'gmail',       name:'Gmail',            sub:'log in · inbox'},
  {app:'powerschool',ic:'powerschool',name:'PowerSchool',      sub:'grades (manual)'},
];
function openDrawer(){ const gal=document.getElementById('widgetGallery');
  gal.style.display='block';
  gal.innerHTML=`
    <div class="drawer-sec">Connect an app — signs you in</div>
    <div class="app-grid">${APPS.map(a=>`<div class="app-card" data-app="${a.app}"><div class="ic">${icon(a.ic)}</div><div class="nm">${a.name}</div><div class="app-sub">${a.sub}</div></div>`).join('')}</div>
    <div class="drawer-sec">Widgets</div>
    <div class="widget-gallery">${Object.entries(CATALOG).map(([k,m])=>`<div class="gal-card" data-t="${k}"><div class="ic">${icon(k)}</div><div class="nm">${m.name}</div></div>`).join('')}</div>`;
  gal.querySelectorAll('.gal-card').forEach(c=> c.onclick=()=> addWidget(c.dataset.t));
  gal.querySelectorAll('.app-card').forEach(c=> c.onclick=()=> connectApp(c.dataset.app));
  document.getElementById('drawer').classList.remove('hidden'); document.getElementById('drawerBackdrop').classList.remove('hidden'); }
function connectApp(app){
  closeDrawer();
  if(app==='powerschool') return powerSchoolInfo();
  const type = app==='classroom' ? 'assign' : app;
  let wd=state.widgets.find(x=>x.type===type);
  if(!wd){ wd=addWidget(type); }
  const body=widgetBody(wd.id);
  if(type==='spotify') spotifyClick(wd,body);
  else if(type==='assign') googleConnect(wd,body);
  else if(type==='gmail') gmailConnect(wd,body);
}
function powerSchoolInfo(){
  modal('PowerSchool',`
    <p style="font-weight:600;line-height:1.55;font-size:13px;color:var(--ink)">PowerSchool doesn't offer a personal student login for outside apps — there's no public account you can sign into — so a live grade sync can't be built here.</p>
    <p style="font-weight:600;line-height:1.55;font-size:13px;color:var(--ink-soft)">The <b>Grade Calculator</b> works just like PowerSchool though: add each class and enter assignments' points, and it shows your % per class and overall, by quarter.</p>
    <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Add Grade Calculator</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
  document.querySelector('[data-x=s]').onclick=()=>{ closeModal(); addWidget('grades'); };
}
function closeDrawer(){ document.getElementById('drawer').classList.add('hidden'); document.getElementById('drawerBackdrop').classList.add('hidden'); }
document.getElementById('drawerClose').onclick=closeDrawer; document.getElementById('drawerBackdrop').onclick=closeDrawer;
document.getElementById('addWidgetBtn').onclick=openDrawer;

/* ============================================================ EDIT / TOOLBAR */
function setEditing(on){ editing=on; const b=document.getElementById('editToggle'); b.classList.toggle('active',on); b.textContent=on?'✓ Done':'✎ Edit Layout'; board.classList.toggle('editing',on); renderBoard(); }
document.getElementById('editToggle').onclick=()=> setEditing(!editing);
document.getElementById('resetBtn').onclick=()=>{ if(confirm('Reset the whole dashboard to defaults? This clears your data.')){ localStorage.removeItem('studentDash.v1'); state=defaultState(); save(); renderBoard(); } };

const themeBtn=document.getElementById('themeBtn'), themePop=document.getElementById('themePop');
themeBtn.onclick=()=>{ themePop.innerHTML=Object.entries(THEMES).map(([k,t])=>`<div class="swatch ${state.theme===k?'sel':''}" data-t="${k}" style="background:${t.accent}"></div>`).join('');
  const r=themeBtn.getBoundingClientRect(); themePop.style.top=(r.bottom+8)+'px'; themePop.style.left=(r.left-40)+'px'; themePop.classList.toggle('hidden');
  themePop.querySelectorAll('.swatch').forEach(s=> s.onclick=()=>{ state.theme=s.dataset.t; save(); applyTheme(); renderBoard(); themePop.classList.add('hidden'); }); };
document.addEventListener('click',(e)=>{ if(!themePop.contains(e.target)&&e.target!==themeBtn) themePop.classList.add('hidden'); });

/* ============================================================ NAV VIEWS */
document.querySelectorAll('.nav-link').forEach(b=> b.onclick=()=>{ document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active')); b.classList.add('active'); showView(b.dataset.view); });
function showView(v){
  const tb=document.querySelector('.toolbar'); const host=document.getElementById('infoView');
  if(v==='home'){ tb.style.display='flex'; if(host)host.style.display='none'; board.style.display='block'; renderBoard(); return; }
  tb.style.display='none'; board.style.display='none';
  const views={
    customize:`<div class="info-card"><h2>🎨 Customize</h2><p>Everything on the <b>Home</b> board is yours to arrange:</p><ul>
      <li><b>Edit Layout</b> — drag a widget by its header; widgets push each other and never overlap. Resize from the bottom-right corner.</li>
      <li><b>Add Widget</b> — drop in any of the ${Object.keys(CATALOG).length} widget types.</li>
      <li><b>Theme</b> — pick an accent color to recolor the whole board.</li>
      <li>Everything saves automatically in your browser.</li></ul>
      <p>Widgets: ${Object.values(CATALOG).map(m=>m.icon+' '+m.name).join(' · ')}</p></div>`,
    settings:`<div class="info-card"><h2>⚙️ Settings</h2><ul>
      <li><b>Data</b> — stored locally in your browser. Nothing leaves your device.</li>
      <li><b>Timer</b> — click the ⚙ on the Focus Timer to set focus / short break / long break minutes and sessions.</li>
      <li><b>Weather</b> — uses your location via the free Open-Meteo API, or set a city.</li>
      <li><b>Spotify</b> — paste any playlist/track link to embed a real player.</li>
      <li><b>Reset</b> — the ↺ Reset button restores defaults.</li></ul></div>`,
    how:`<div class="info-card"><h2>❓ How it works</h2>
      <p><b>Moving widgets:</b> click <b>✎ Edit Layout</b>, then drag a widget by its top bar. Others slide out of the way — nothing overlaps. Drag the corner to resize. ✕ removes, ⚙ opens options.</p>
      <p><b>Grade calculator:</b> pick a quarter tab (Q1–Q4) or <b>ALL</b> for the average across quarters. Each class shows its average <b>%</b>; expand a class to enter points earned / total per assignment — each assignment shows its own <b>%</b>. The header shows your overall average percent (no GPA).</p>
      <p><b>Calendar:</b> events show as little tabs inside each day (like Google Calendar); click a day to add one.</p>
      <p><b>Connecting accounts (Spotify &amp; Google Classroom):</b> real logins only work when the dashboard is opened through its local server — run <code>node serve.js</code> and open <b>http://127.0.0.1:5599</b> (not a double-clicked file). You never type a password into the dashboard: you log in on Google's / Spotify's own page and they hand back a read-only token stored in your browser.</p>
      <p><b>Spotify:</b> click <b>🎧 Log in &amp; import my playlists</b> in the Spotify widget. First time, it walks you through creating a free Spotify app for a Client ID (redirect URI <code>http://127.0.0.1:5599/</code>). Then it lists your saved playlists to pick from. Browsing works on any account; full in-page playback needs Spotify Premium (otherwise the embed player / previews). You can still paste playlist links anytime.</p>
      <p><b>Google Classroom:</b> click <b>🎓 Connect Google Classroom</b> in the Assignments widget. First time, it walks you through a free Google Cloud project + OAuth Client ID (add origin <code>http://127.0.0.1:5599</code> and yourself as a test user). Then it pulls your active courses and their not-yet-done assignments into the widget.</p></div>`
  };
  let h=host; if(!h){ h=document.createElement('div'); h.id='infoView'; h.className='info-view'; board.after(h); } h.innerHTML=views[v]; h.style.display='block';
}

/* ============================================================ INTEGRATIONS (Spotify + Google Classroom)
   Both use client-side OAuth (no server secret): Spotify = Authorization Code + PKCE, Google = Identity Services.
   Requires being served over http(s) at a fixed origin (run serve.js → http://127.0.0.1:5599), NOT file://. */
function servedOverHttp(){ return location.protocol==='http:'||location.protocol==='https:'; }
function needServerAlert(){ alert('Logins need the dashboard opened through its local server.\n\nRun:  node serve.js\nthen open  http://127.0.0.1:5599\n\n(They can\'t run from a double-clicked file.)'); }

/* ---------- shared PKCE helpers ---------- */
function randStr(n){ const a=new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a,b=>('0'+(b&0xff).toString(16)).slice(-2)).join(''); }
async function sha256b64url(s){ const h=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return btoa(String.fromCharCode(...new Uint8Array(h))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }

/* ---------- SPOTIFY ---------- */
const SP_REDIRECT = location.origin + location.pathname;   // full page URL incl. subpath (e.g. /Widgetly/)
const SP_SCOPES = 'playlist-read-private playlist-read-collaborative';
function spClientId(){ return localStorage.getItem('sd.spClientId')||''; }
function spTok(){ try{ return JSON.parse(localStorage.getItem('sd.spTok')||'null'); }catch(e){ return null; } }
function saveSpTok(j){ const prev=spTok(); const tok={ access_token:j.access_token, refresh_token:j.refresh_token||(prev&&prev.refresh_token), expires_at:Date.now()+((j.expires_in||3600)-60)*1000 }; localStorage.setItem('sd.spTok',JSON.stringify(tok)); }
function spotifyConnected(){ return !!spTok(); }
function spotifyDisconnect(){ localStorage.removeItem('sd.spTok'); }

function spotifySetup(after){
  modal('Connect Spotify — one-time setup', `
    <p style="font-weight:700;color:var(--danger);line-height:1.45;font-size:12.5px">Heads-up: Spotify now requires <b>Spotify Premium</b> to use its Web API, so importing playlists only works on a Premium account. On a free account, paste playlist links instead (Share → Copy link).</p>
    <p style="font-weight:600;color:var(--ink-soft);line-height:1.5;font-size:13px">To connect (Premium accounts):</p>
    <ol style="font-size:13px;line-height:1.6;padding-left:18px;font-weight:500">
      <li>Open <b>developer.spotify.com/dashboard</b> → log in → <b>Create app</b>.</li>
      <li>Any name. For <b>Redirect URI</b> paste exactly:<br><code style="background:var(--card-2);padding:2px 6px;border-radius:6px">${esc(SP_REDIRECT)}</code></li>
      <li>Tick <b>Web API</b>, save, open the app's <b>Settings</b>, copy the <b>Client ID</b>, paste it below.</li>
    </ol>
    <label class="fld">Spotify Client ID</label><input id="sp-cid" value="${esc(spClientId())}" placeholder="e.g. 3f9a…"/>
    <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Save &amp; log in</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
  document.querySelector('[data-x=s]').onclick=()=>{ const v=document.getElementById('sp-cid').value.trim(); if(!v){closeModal();return;} localStorage.setItem('sd.spClientId',v); closeModal(); (after||spotifyConnect)(); };
}
async function spotifyConnect(){
  if(!servedOverHttp()) return needServerAlert();
  const cid=spClientId(); if(!cid) return spotifySetup();
  const verifier=randStr(48); const challenge=await sha256b64url(verifier);
  sessionStorage.setItem('sd.spVerifier',verifier);
  const p=new URLSearchParams({ client_id:cid, response_type:'code', redirect_uri:SP_REDIRECT, code_challenge_method:'S256', code_challenge:challenge, scope:SP_SCOPES });
  location.href='https://accounts.spotify.com/authorize?'+p.toString();
}
async function spotifyHandleRedirect(){
  const params=new URLSearchParams(location.search); const code=params.get('code'); const verifier=sessionStorage.getItem('sd.spVerifier');
  if(!code||!verifier) return false;
  sessionStorage.removeItem('sd.spVerifier');
  try{
    const body=new URLSearchParams({ client_id:spClientId(), grant_type:'authorization_code', code, redirect_uri:SP_REDIRECT, code_verifier:verifier });
    const r=await fetch('https://accounts.spotify.com/api/token',{ method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
    const j=await r.json(); if(j.access_token) saveSpTok(j);
  }catch(e){}
  history.replaceState({},'',location.pathname);
  return true;
}
async function spToken(){ const t=spTok(); if(!t) return null; if(Date.now()<t.expires_at) return t.access_token;
  if(!t.refresh_token) return null;
  try{ const body=new URLSearchParams({ client_id:spClientId(), grant_type:'refresh_token', refresh_token:t.refresh_token }); const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}); const j=await r.json(); if(j.access_token){ saveSpTok(j); return j.access_token; } }catch(e){} return null; }
async function spFetchPlaylists(){ const tok=await spToken(); if(!tok) return null; const out=[]; let url='https://api.spotify.com/v1/me/playlists?limit=50';
  try{ while(url){ const r=await fetch(url,{headers:{Authorization:'Bearer '+tok}});
    if(r.status===403) return 'premium';   // Spotify blocks Web API for non-Premium accounts
    if(!r.ok) break; const j=await r.json(); (j.items||[]).forEach(p=>{ if(p&&p.external_urls&&p.external_urls.spotify) out.push({name:p.name, url:p.external_urls.spotify}); }); url=j.next; } }catch(e){} return out; }
function mergePlaylists(wd,list){ wd.data.playlists=wd.data.playlists||[]; const seen=new Set(wd.data.playlists.map(p=>p.url)); (list||[]).forEach(p=>{ if(!seen.has(p.url)){ wd.data.playlists.push(p); seen.add(p.url); } }); }
async function spotifyClick(wd,body){
  if(!servedOverHttp()) return needServerAlert();
  if(!spClientId()) return spotifySetup();
  const list=await spFetchPlaylists();
  if(list==='premium'){ alert("Spotify now requires Spotify Premium to use its Web API, so importing your playlists is blocked on a free account — that's Spotify's rule, not the dashboard's.\n\nYou can still use your playlists for free: in Spotify open a playlist → ⋯ (or right-click) → Share → Copy link, then paste it in the box below. It embeds the real player."); return; }
  if(list===null){ spotifyConnect(); return; }   // no/expired token → log in
  mergePlaylists(wd,list); wd.data.spConnected=true; save(); RENDER.spotify(body,wd);
  alert('Imported '+list.length+' playlist'+(list.length===1?'':'s')+' from your Spotify.');
}

/* ---------- GOOGLE CLASSROOM (Google Identity Services) ---------- */
const GC_SCOPES='https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.student-submissions.me.readonly';
function gClientId(){ return localStorage.getItem('sd.gClientId')||''; }
let gToken=null;
function loadGIS(){ return new Promise((res,rej)=>{ if(window.google&&google.accounts&&google.accounts.oauth2) return res(); const s=document.createElement('script'); s.src='https://accounts.google.com/gsi/client'; s.async=true; s.onload=()=>res(); s.onerror=()=>rej(new Error('Could not load Google sign-in (need internet).')); document.head.appendChild(s); }); }
function googleSetup(after){
  modal('Connect Google Classroom — one-time setup', `
    <p style="font-weight:600;color:var(--ink-soft);line-height:1.5;font-size:13px">One-time free setup so the dashboard can read <b>your</b> Classroom to-dos:</p>
    <ol style="font-size:12.5px;line-height:1.6;padding-left:18px;font-weight:500">
      <li>Open <b>console.cloud.google.com</b> → create a project.</li>
      <li><b>APIs &amp; Services → Library</b> → enable <b>Google Classroom API</b>.</li>
      <li><b>OAuth consent screen</b>: External, add yourself under <b>Test users</b>.</li>
      <li><b>Credentials → Create credentials → OAuth client ID → Web application</b>. Under <b>Authorized JavaScript origins</b> add:<br><code style="background:var(--card-2);padding:2px 6px;border-radius:6px">${esc(location.origin)}</code></li>
      <li>Copy the <b>Client ID</b> and paste below.</li>
    </ol>
    <label class="fld">Google Client ID</label><input id="g-cid" value="${esc(gClientId())}" placeholder="…apps.googleusercontent.com"/>
    <div class="modal-actions"><button class="btn ghost" data-x="c">Cancel</button><button class="btn" data-x="s">Save &amp; connect</button></div>`);
  document.querySelector('[data-x=c]').onclick=closeModal;
  document.querySelector('[data-x=s]').onclick=()=>{ const v=document.getElementById('g-cid').value.trim(); if(!v){closeModal();return;} localStorage.setItem('sd.gClientId',v); closeModal(); if(after)after(); };
}
async function googleConnect(wd,body){
  if(!servedOverHttp()) return needServerAlert();
  if(!gClientId()) return googleSetup(()=>googleConnect(wd,body));
  try{ await loadGIS(); }catch(e){ return alert(e.message); }
  const tc=google.accounts.oauth2.initTokenClient({ client_id:gClientId(), scope:GC_SCOPES, callback:(resp)=>{ if(resp&&resp.access_token){ gToken=resp.access_token; classroomSync(wd,body); } else alert('Google sign-in was cancelled.'); } });
  tc.requestAccessToken();
}
async function classroomSync(wd,body){
  if(!gToken) return; const h={Authorization:'Bearer '+gToken}; const items=[];
  const gj=async(u)=>{ const r=await fetch(u,{headers:h}); if(!r.ok) throw new Error('Classroom API '+r.status); return r.json(); };
  try{
    const cr=await gj('https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&pageSize=40');
    for(const c of (cr.courses||[])){
      let cw={}; try{ cw=await gj(`https://classroom.googleapis.com/v1/courses/${c.id}/courseWork?pageSize=60&courseWorkStates=PUBLISHED`); }catch(e){ continue; }
      const subMap={}; try{ const sub=await gj(`https://classroom.googleapis.com/v1/courses/${c.id}/courseWork/-/studentSubmissions?pageSize=200`); (sub.studentSubmissions||[]).forEach(s=>{ subMap[s.courseWorkId]=s.state; }); }catch(e){}
      (cw.courseWork||[]).forEach(w=>{ const st=subMap[w.id]; const done = st==='TURNED_IN'||st==='RETURNED';
        let due=''; if(w.dueDate){ due=`${w.dueDate.year}-${String(w.dueDate.month).padStart(2,'0')}-${String(w.dueDate.day).padStart(2,'0')}`; }
        items.push({ id:'gc-'+w.id, title:w.title||'(untitled)', course:c.name||'Class', due, done, gc:true }); });
    }
  }catch(e){ return alert('Classroom sync failed: '+e.message+'\n(Check the API is enabled and you are added as a test user.)'); }
  wd.data.items=(wd.data.items||[]).filter(i=>!i.gc).concat(items);
  wd.data.demo=false; wd.data.gcConnected=true; save(); if(body) RENDER.assign(body,wd);
  alert('Synced '+items.length+' Classroom assignment'+(items.length===1?'':'s')+'.');
}

/* ---------- GMAIL (Google Identity Services, read-only) ---------- */
const GM_SCOPE='https://www.googleapis.com/auth/gmail.readonly';
let gmailToken=null;
async function gmailConnect(wd,body){
  if(!servedOverHttp()) return needServerAlert();
  if(!gClientId()) return googleSetup(()=>gmailConnect(wd,body));
  try{ await loadGIS(); }catch(e){ return alert(e.message); }
  const tc=google.accounts.oauth2.initTokenClient({ client_id:gClientId(), scope:GM_SCOPE, callback:(resp)=>{ if(resp&&resp.access_token){ gmailToken=resp.access_token; gmailFetch(wd,body); } else alert('Gmail sign-in was cancelled.'); } });
  tc.requestAccessToken();
}
function mailDate(s){ if(!s) return ''; const d=new Date(s); if(isNaN(d)) return ''; const now=new Date(); return d.toDateString()===now.toDateString()? d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}) : d.toLocaleDateString(undefined,{month:'short',day:'numeric'}); }
async function gmailFetch(wd,body){
  if(!gmailToken) return; const h={Authorization:'Bearer '+gmailToken};
  const gj=async(u)=>{ const r=await fetch(u,{headers:h}); if(!r.ok) throw new Error('Gmail API '+r.status); return r.json(); };
  try{
    const list=await gj('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=12&labelIds=INBOX');
    const msgs=[];
    for(const it of (list.messages||[])){
      let m; try{ m=await gj(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${it.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`); }catch(e){ continue; }
      const hdr={}; ((m.payload&&m.payload.headers)||[]).forEach(x=>hdr[x.name]=x.value);
      const from=(hdr.From||'(unknown)').replace(/\s*<[^>]*>/,'').replace(/(^"|"$)/g,'').trim()||hdr.From;
      msgs.push({ from, subject:hdr.Subject||'(no subject)', snippet:(m.snippet||'').replace(/&#39;/g,"'"), date:mailDate(hdr.Date), unread:(m.labelIds||[]).includes('UNREAD'), link:'https://mail.google.com/mail/u/0/#inbox/'+(it.threadId||it.id) });
    }
    wd.data.msgs=msgs; wd.data.gmConnected=true; save(); RENDER.gmail(body,wd);
  }catch(e){ alert('Gmail failed: '+e.message+'\n(Enable the Gmail API in your Google Cloud project and add the gmail.readonly scope to the OAuth consent screen.)'); }
}

/* ============================================================ UTIL / BOOT */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
let rzTimer; window.addEventListener('resize',()=>{ clearTimeout(rzTimer); rzTimer=setTimeout(renderBoard,150); });
(async()=>{
  applyTheme();
  const returned = servedOverHttp() ? await spotifyHandleRedirect() : false;
  if(returned && spotifyConnected()){ const spW=state.widgets.find(x=>x.type==='spotify'); if(spW){ const list=await spFetchPlaylists(); if(list){ mergePlaylists(spW,list); spW.data.spConnected=true; save(); } } }
  renderBoard();
})();

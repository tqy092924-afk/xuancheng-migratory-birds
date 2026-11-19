/* Offline, accessible SVG charts. No CDN, external fonts, fetches or chart runtime. */
(() => {
  'use strict';
  const DATA = window.WETLAND_DATA;
  if (!DATA) return;
  const NS = 'http://www.w3.org/2000/svg';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => new Intl.NumberFormat('zh-CN', {maximumFractionDigits:3}).format(n);
  const seriesColor = name => `var(--series-${name})`;
  let tooltip;
  let tooltipContext;
  function element(tag, attrs = {}, text = '') {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    if (text) el.textContent = text;
    return el;
  }
  function sourceLink(id, compact = false) {
    const s = DATA.sources[id];
    if (!s) return '';
    return `<a href="${esc(s.url)}" title="${esc(s.title)}" target="_blank" rel="noopener noreferrer">${esc(compact ? s.publisher + ' · ' + s.date : s.publisher + '《' + s.title + '》 · ' + s.date)} ↗</a>`;
  }
  function sources(container, records) {
    const ids = [...new Set(records.map(r => r.source))];
    const list = document.createElement('ul');
    list.className = 'data-source-list';
    list.setAttribute('aria-label', '本图来源');
    list.innerHTML = ids.map(id => `<li>${sourceLink(id,true)}</li>`).join('');
    container.appendChild(list);
  }
  function table(container, rows, heading = '查看数据表') {
    const details = document.createElement('details');
    details.className = 'data-table-details';
    details.innerHTML = `<summary>${esc(heading)}</summary><div class="data-table-scroll"><table class="data-table"><thead><tr><th scope="col">记录 / 指标</th><th scope="col">数值 / 分类</th><th scope="col">记录说明</th><th scope="col">来源</th></tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${esc(r.label || r.title)}${r.sub ? '<br><small>'+esc(r.sub)+'</small>' : ''}</th><td>${esc(r.display || r.group || r.date || '—')}</td><td>${esc(r.note || r.text || '')}</td><td>${sourceLink(r.source,true)}</td></tr>`).join('')}</tbody></table></div>`;
    container.appendChild(details);
  }
  function hideTooltip() {
    if (tooltip) tooltip.hidden = true;
    if (tooltipContext) tooltipContext.target.setAttribute('aria-pressed','false');
    tooltipContext = null;
  }
  function showTooltip(record, event, pinned = false) {
    if (tooltipContext?.pinned && !pinned) return;
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'data-tooltip';
      tooltip.id = 'wetland-data-tooltip';
      tooltip.setAttribute('role','tooltip');
      document.body.appendChild(tooltip);
    }
    const target = event.currentTarget;
    if (tooltipContext?.target !== target) {
      hideTooltip();
      const s = DATA.sources[record.source];
      tooltip.innerHTML = `<span class="data-tooltip-label">${esc(record.label)}</span><strong>${esc(record.display)}</strong><span>${esc(record.sub)}</span><span class="data-tooltip-source">${esc(s.publisher)} · ${esc(s.date)}</span>`;
      // The floating element sits outside the chart and needs its resolved colour.
      tooltip.style.setProperty('--record-color',getComputedStyle(target).getPropertyValue('--record-color'));
    }
    tooltip.hidden = false;
    target.setAttribute('aria-pressed',String(pinned));
    const bounds = target.getBoundingClientRect();
    const pointer = Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
    const px = pointer ? event.clientX : bounds.left + bounds.width * .55;
    const py = pointer ? event.clientY : bounds.top + 24;
    tooltipContext = {record, target, pointer, x:px, y:py, pinned};
    const x = Math.max(12, Math.min(px + 18, window.innerWidth - tooltip.offsetWidth - 12));
    let y = py + 16;
    if (y + tooltip.offsetHeight > window.innerHeight - 12) y = py - tooltip.offsetHeight - 14;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${Math.max(12,y)}px`;
  }
  function updateTooltipAfterScroll() {
    if (!tooltipContext || !tooltip || tooltip.hidden) return;
    const {record,target,pointer,x,y,pinned} = tooltipContext;
    // A scroll event can arrive after pointerenter even though layout already
    // settled. Keep the tooltip when the pointer still hits the same data row.
    // On a real scroll away, hit testing also accounts for clipping and headers.
    if (!target.isConnected || (pointer && !target.contains(document.elementFromPoint(x,y)))) {
      hideTooltip();
      return;
    }
    if (!pointer) {
      const bounds = target.getBoundingClientRect();
      if (document.activeElement !== target || bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
        hideTooltip();
        return;
      }
    }
    showTooltip(record,{currentTarget:target,...(pointer ? {clientX:x,clientY:y} : {})},pinned);
  }
  function controls(container, choices, selected, onChange, label) {
    const group = document.createElement('div');
    group.className = 'data-controls';
    group.setAttribute('role','group');
    group.setAttribute('aria-label',label);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'data-control';
      btn.textContent = choice.label;
      btn.style.setProperty('--control-color',seriesColor(choice.color));
      btn.setAttribute('aria-pressed',String(choice.value === selected));
      btn.addEventListener('click', () => {
        group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b === btn)));
        hideTooltip();
        onChange(choice.value);
      });
      group.appendChild(btn);
    });
    container.appendChild(group);
    return group;
  }
  function bars(container, records, options = {}) {
    container.replaceChildren();
    const max = options.max || Math.max(...records.map(r=>r.value))*1.1;
    const chart=document.createElement('div');chart.className='data-bar-chart';
    chart.setAttribute('role','group');chart.setAttribute('aria-label',options.label||'交互条形图');
    const axis=document.createElement('div');axis.className='data-bar-axis';
    axis.setAttribute('aria-hidden','true');
    const scale=document.createElement('div');scale.className='data-bar-scale';
    const ticks=options.ticks || 4;
    for(let i=0;i<=ticks;i++){const tick=document.createElement('span');tick.textContent=fmt(max*i/ticks);scale.appendChild(tick);}
    axis.innerHTML=`<span class="data-axis-caption">数量 / ${esc(options.unit||records[0]?.unit||'')}</span>`;
    axis.appendChild(scale);chart.appendChild(axis);
    records.forEach((r,i) => {
      const start=r.low ? 100*r.low/max:0;
      const length=100*r.value/max-start;
      const color=seriesColor(options.colors[i]);
      const group=document.createElement('div');group.className='data-bar-record data-hit';
      group.style.setProperty('--bar-color',color);
      bindRecord(group,r);
      group.innerHTML=`<div class="data-bar-label"><strong>${esc(r.label)}</strong><span>${esc(r.sub)}</span></div><div class="data-bar-plot"></div><strong class="data-bar-value">${esc(r.display)}</strong>`;
      const svg=element('svg',{viewBox:'0 0 100 28',preserveAspectRatio:'none','aria-hidden':'true'});
      svg.appendChild(element('rect',{x:0,y:3,width:100,height:22,rx:.6,fill:'#e8e9e1'}));
      for(let t=1;t<ticks;t++)svg.appendChild(element('line',{x1:100*t/ticks,y1:0,x2:100*t/ticks,y2:28,stroke:'#fff','stroke-width':.5}));
      if(r.low)svg.appendChild(element('line',{x1:0,y1:14,x2:start,y2:14,stroke:color,'stroke-width':.5,'stroke-dasharray':'1 1'}));
      svg.appendChild(element('rect',{x:start,y:3,width:length,height:22,rx:.6,fill:color,'fill-opacity':r.low ? .75 : 1,class:'data-bar'}));
      if(r.low){svg.appendChild(element('line',{x1:start,y1:1,x2:start,y2:27,stroke:color,'stroke-width':.6}));svg.appendChild(element('line',{x1:start+length,y1:1,x2:start+length,y2:27,stroke:color,'stroke-width':.6}));}
      group.querySelector('.data-bar-plot').appendChild(svg);
      chart.appendChild(group);
    });
    container.appendChild(chart);
  }
  function bindRecord(target,record){
    target.tabIndex=0;
    target.setAttribute('role','button');
    target.setAttribute('aria-pressed','false');
    target.setAttribute('aria-label',`${record.label}，${record.display}。${record.sub}。${record.note}`);
    const hover = event => { if (event.pointerType !== 'touch') showTooltip(record,event); };
    target.addEventListener('pointerenter',hover);
    target.addEventListener('pointermove',hover);
    target.addEventListener('pointerleave',() => {
      if (tooltipContext?.target === target && !tooltipContext.pinned) hideTooltip();
    });
    target.addEventListener('focus',event => showTooltip(record,event));
    target.addEventListener('blur',() => { if (tooltipContext?.target === target) hideTooltip(); });
    target.addEventListener('click',event => {
      if (tooltipContext?.target === target && tooltipContext.pinned) hideTooltip();
      else showTooltip(record,event.detail ? event : {currentTarget:target},true);
    });
    target.addEventListener('keydown',event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) target.click();
      }
    });
  }
  function columns(container,records,options={}){
    container.replaceChildren();const max=options.max||Math.max(...records.map(r=>r.value))*1.15;
    const chart=document.createElement('div');chart.className='data-column-chart';chart.setAttribute('role','group');chart.setAttribute('aria-label',options.label||'标注式柱状图');
    const unit=document.createElement('p');unit.className='data-column-unit';unit.textContent=options.unit||records[0]?.unit||'';container.appendChild(unit);
    const axis=document.createElement('div');axis.className='data-column-axis';axis.setAttribute('aria-hidden','true');for(let i=4;i>=0;i--){const v=document.createElement('span');v.textContent=fmt(max*i/4);v.style.top=`${(4-i)*25}%`;axis.append(v)}
    const plots=document.createElement('div');plots.className='data-columns';plots.style.setProperty('--columns',records.length);
    records.forEach((r,i)=>{
      const row=document.createElement('div');row.className='data-column-record data-hit';bindRecord(row,r);
      const low=r.low||0,height=100*(r.value-low)/max,bottom=100*low/max;
      const color=seriesColor(options.colors[i]);
      row.style.setProperty('--bar-color',color);
      row.innerHTML=`<div class="data-column-plot"><span class="data-column-bar ${r.low?'is-range':''}" style="height:${height}%;bottom:${bottom}%"></span><strong class="data-column-value" style="bottom:${100*r.value/max}%">${esc(r.display)}</strong></div><div class="data-column-label"><strong>${esc(r.label)}</strong><span>${esc(r.sub)}</span></div>`;plots.appendChild(row);
    });chart.append(axis,plots);container.append(chart);
  }
  function water(){
    const root=document.getElementById('chart-water');if(!root)return;root.replaceChildren();
    const unit=document.createElement('p');unit.className='data-figure-note';unit.textContent='总磷浓度：毫克/升。2021年节点为年度水质评价。';root.append(unit);
    const chart=document.createElement('div');chart.className='data-water-chart';
    chart.innerHTML='<div class="data-water-axis" aria-hidden="true"><span></span><div><span>0</span><span>0.05</span><span>0.10</span><span>0.15</span><span>0.20</span></div><span></span></div>';
    DATA.water.forEach(r=>{
      const node=document.createElement('div');node.className='data-water-node data-hit';bindRecord(node,r);
      node.dataset.record=r.source;
      node.innerHTML=`<div class="data-water-date"><strong>${esc(r.label)}</strong><span>${esc(r.sub)}</span></div><div class="data-water-measure">${r.value===null?`<p class="data-water-qualitative">${esc(r.qualitative)}</p>`:`<div class="data-water-track"><span style="width:${r.value/.2*100}%"></span></div>`}</div><strong class="data-water-value">${esc(r.display)}</strong>`;chart.append(node);
    });root.append(chart);
    const months=document.createElement('details');months.className='data-water-months';months.innerHTML='<summary>2019年2—5月总磷记录</summary>';const monthly=document.createElement('div');months.append(monthly);bars(monthly,[.08,.065,.06,.16].map((v,i)=>({label:`2019年${i+2}月`,sub:'南漪湖 · 当月总磷浓度',value:v,display:v.toFixed(3)+' 毫克/升',note:'2019年9月30日政策解读披露的逐月监测记录。',source:'water2019'})),{colors:['brook','fern','jade','pine'],max:.2,unit:'毫克/升',label:'2019年2至5月南漪湖总磷逐月记录'});root.append(months);table(root,DATA.water,'查看水质节点记录');sources(root,DATA.water);
  }
  function inputs(){
    const root=document.getElementById('chart-inputs');if(!root)return;root.replaceChildren();
    const team={label:'郎溪县鸟类保护工作专班',sub:'2025年12月成立',value:1,display:'1 个专班',unit:'个',note:'2026年1月29日报道，专班下设巡护督导、巡护暗访、联合执法组。',source:'patrol'};
    const visual=document.createElement('div');visual.className='data-input-plots';
    const draw=type=>{
      visual.replaceChildren();visual.dataset.inputType=type;
      const parts=type==='funds'?[{title:'财政资金 · 万元',rows:DATA.investment,max:10000,unit:'万元',colors:['pine','lake','field']}]:type==='equipment'?[{title:'监控设备 · 个',rows:DATA.patrol.equipment.slice(0,1),max:8,unit:'个',colors:['jade']},{title:'水利设施 · 座',rows:DATA.patrol.equipment.slice(1),max:8,unit:'座',colors:['cedar','brook']}]:[{title:'专职巡护人员 · 名',rows:DATA.patrol.people,max:120,unit:'名',colors:['lagoon','fern']},{title:'保护组织 · 个',rows:[team],max:2,unit:'个',colors:['laurel']}];
      visual.classList.toggle('has-two-plots',parts.length===2);parts.forEach(part=>{const section=document.createElement('section');section.className='data-input-plot';section.innerHTML=`<h5>${esc(part.title)}</h5>`;const plot=document.createElement('div');columns(plot,part.rows,{max:part.max,unit:part.unit,label:part.title,colors:part.colors});section.append(plot);visual.append(section)});
    };
    controls(root,[{value:'funds',label:'财政资金',color:'pine'},{value:'equipment',label:'硬件设施',color:'jade'},{value:'people',label:'巡护力量',color:'lagoon'}],'funds',draw,'选择投入类型');root.append(visual);draw('funds');
    const extra=document.createElement('details');extra.className='data-action-extra';extra.innerHTML='<summary>巡护行动记录</summary>';const actionPlot=document.createElement('div');bars(actionPlot,DATA.patrol.action,{colors:['inlet','willow','spruce'],max:440,unit:'次',label:'郎溪县2025年12月至2026年1月巡护行动'});extra.append(actionPlot);root.append(extra);
    const rows=[...DATA.investment,...DATA.patrol.equipment,...DATA.patrol.people,team,...DATA.patrol.action];table(root,rows,'查看全部投入记录');sources(root,rows);
  }
  function chartShell(id) {
    const root=document.getElementById(id);
    if(!root)return null;
    root.replaceChildren();
    const visual=document.createElement('div');
    visual.className='data-scroll-chart';
    return {root,visual};
  }
  function barChart(id, groups, choices, initial, options = {}) {
    const shell=chartShell(id);if(!shell)return;
    const all=Object.values(groups).flat();
    let live=document.createElement('p');
    live.className='data-sr-only';live.setAttribute('aria-live','polite');
    const draw=value=>{
      const settings=typeof options==='function'?options(value):options;(settings.vertical?columns:bars)(shell.visual,groups[value],settings);
      live.textContent=`当前显示：${choices.find(c=>c.value===value)?.label || ''}，${groups[value].length}条记录。`;
    };
    if(choices.length>1) controls(shell.root,choices,initial,draw,'选择图表数据类型');
    shell.root.append(shell.visual,live);draw(initial);
    table(shell.root,all);sources(shell.root,all);
  }
  function detail(panel, r, title, body) {
    panel.innerHTML=`<strong>${esc(title)}</strong><p>${esc(body)}</p>${sourceLink(r.source,true)}`;
  }
  function species() {
    const root=document.getElementById('chart-species');if(!root)return;
    root.replaceChildren();
    const grid=document.createElement('div');grid.className='data-species-lanes';grid.setAttribute('aria-label','鸟类照片名录');
    const lanes={};
    for (const group of ['一级保护','二级保护','其他记录']) {
      const lane=document.createElement('section');
      lane.className='data-species-lane';
      lane.dataset.protection=group;
      lane.innerHTML=`<h5>${group==='其他记录'?'其他常见鸟类':'国家'+group}</h5><div class="data-species-grid"></div>`;
      lanes[group]=lane.querySelector('div');
      grid.append(lane);
    }
    const panel=document.createElement('div');panel.className='data-species-detail';panel.id='data-species-detail';panel.setAttribute('aria-live','polite');
    const show=r=>{
      const group=r.group==='其他记录'?'地方观鸟记录':`国家${r.group}`;
      panel.dataset.protection=r.group;
      panel.innerHTML=`
        <div class="data-species-detail-copy">
          <div class="data-species-detail-heading"><h5>${esc(r.label)}</h5><span>${esc(group)} · ${esc(r.place)}</span></div>
          <p>${esc(r.note)}</p>
          <div class="data-species-detail-sources"><span>记录：${sourceLink(r.source,true)}</span></div>
        </div>
        <figure class="data-species-detail-photo">
          <img src="${esc(r.photo.image)}" alt="${esc(r.label)}物种资料照片" decoding="async">
          <figcaption>摄影 · <a href="${esc(r.photo.url)}" target="_blank" rel="noopener noreferrer">${esc(r.photo.author)} ↗</a></figcaption>
        </figure>`;
      grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.species===r.label)));
    };
    DATA.species.forEach((r,i)=>{
      const b=document.createElement('button');b.type='button';b.className='data-species-button';b.dataset.species=r.label;b.setAttribute('aria-pressed',String(i===0));
      b.setAttribute('aria-label',`${r.label}，${r.group}，记录地点${r.place}`);
      b.setAttribute('aria-controls',panel.id);
      b.innerHTML=`<span class="data-species-thumb"><img src="${esc(r.photo.image)}" alt="${esc(r.label)}物种资料图" width="180" height="130" loading="lazy" decoding="async" style="object-position:${esc(r.photo.position)}"></span><strong>${esc(r.label)}</strong><small>${esc(r.group==='其他记录'?'地方记录':`国家${r.group}`)}</small>`;
      b.addEventListener('click',()=>show(r));lanes[r.group].appendChild(b);
    });
    root.append(grid,panel);show(DATA.species[0]);
    const photoCaption=document.createElement('p');photoCaption.className='data-species-credit';
    photoCaption.innerHTML='<button type="button">查看全部物种照片来源</button>';
    photoCaption.querySelector('button').addEventListener('click',()=>{
      const methods=document.getElementById('data-methods'),credits=document.getElementById('data-photo-credits');
      if(methods&&credits){methods.open=true;credits.scrollIntoView({behavior:'instant',block:'start'});credits.focus({preventScroll:true});}
    });
    root.appendChild(photoCaption);table(root,DATA.species,'查看物种记录表');sources(root,DATA.species);
    const credits=document.getElementById('data-photo-credits');
    if(credits){credits.setAttribute('tabindex','-1');credits.innerHTML='<h4>物种照片来源</h4><ul class="data-photo-credits">'+DATA.species.map(r=>{
      const p=r.photo,license=p.licenseUrl?` · <a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.license)}</a>`:'';
      return `<li><strong>${esc(r.label)}</strong> · <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.author)} ↗</a>${license}</li>`;
    }).join('')+'</ul>';}
  }
  function restoration() {
    const root=document.getElementById('chart-restoration');if(!root)return;root.replaceChildren();
    const grid=document.createElement('div');grid.className='data-compare';grid.innerHTML='<div class="data-compare-head"><span>对照维度</span><span>早期状态 / 记录</span><span>治理措施 / 后续记录</span></div>';
    DATA.restorationCompare.forEach(r=>{
      const row=document.createElement('details');row.className='data-compare-row';row.innerHTML=`<summary><span class="data-compare-label">${esc(r.label)}</span><span class="data-compare-before"><strong>${esc(r.before)}</strong><small>${esc(r.beforeContext)}</small></span><span class="data-compare-after"><strong>${esc(r.after)}</strong><small>${esc(r.afterContext)}</small></span></summary><div class="data-compare-note"><p>${esc(r.note)}</p><div>${sourceLink(r.beforeSource,true)}${r.beforeSource!==r.source?' · '+sourceLink(r.source,true):''}</div></div>`;grid.append(row);
    });root.append(grid);
    const more=document.createElement('details');more.className='data-action-extra';more.innerHTML='<summary>其他修复记录</summary><ul>'+DATA.restoration.slice(2).map(r=>`<li><strong>${esc(r.label)} · ${esc(r.display)}</strong><span>${esc(r.sub)}</span>${sourceLink(r.source,true)}</li>`).join('')+'</ul>';root.append(more);
    table(root,DATA.restorationCompare.map(r=>({...r,display:r.before+' / '+r.after,note:r.beforeContext+'；'+r.afterContext+'。'+r.note})),'查看修复对照记录');sources(root,[...DATA.restorationCompare,...DATA.restorationCompare.map(r=>({source:r.beforeSource})),...DATA.restoration]);
  }
  function timeline() {
    const root=document.getElementById('chart-timeline');if(!root)return;
    root.replaceChildren();
    const calendar=document.createElement('div');calendar.className='data-calendar';
    const grid=document.createElement('div');grid.className='data-timeline';
    const panel=document.createElement('div');panel.className='data-calendar-detail';panel.setAttribute('aria-live','polite');
    let events=[];
    const show=index=>{
      const r=events[index];
      panel.style.setProperty('--event-color',grid.children[index].style.getPropertyValue('--event-color'));
      grid.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      panel.innerHTML=`<span class="data-calendar-season">${esc(r.season)} 越冬季</span><p class="data-calendar-date">${esc(r.date)}</p><h4>${esc(r.title)}</h4><p class="data-calendar-text">${esc(r.text)}</p><div class="data-calendar-source">${sourceLink(r.source,true)}</div>`;
    };
    const draw=season=>{
      grid.replaceChildren();events=DATA.timeline.filter(r=>r.season===season);
      const colors=season==='2024—2025'?['lake','field','lagoon']:['pine','jade','fern'];
      events.forEach((r,i)=>{
        const b=document.createElement('button');b.type='button';b.className='data-time-button';b.setAttribute('aria-pressed',String(i===0));
        b.style.setProperty('--event-color',seriesColor(colors[i]));
        b.innerHTML=`<span class="data-event-dot" aria-hidden="true"></span><span><small>${esc(r.date)}</small><strong>${esc(r.title)}</strong></span><span aria-hidden="true">→</span>`;
        b.addEventListener('click',()=>show(i));
        grid.appendChild(b);
      });
      show(0);
    };
    controls(root,[{value:'2024—2025',label:'2024—2025 越冬季',color:'lake'},{value:'2025—2026',label:'2025—2026 越冬季',color:'pine'}],'2025—2026',draw,'选择越冬季');
    calendar.append(grid,panel);root.appendChild(calendar);draw('2025—2026');table(root,DATA.timeline,'查看全部时间记录');sources(root,DATA.timeline);
  }
  function init() {
    const section=document.getElementById('data');
    if(!section||section.hidden||section.dataset.chartsReady==='true')return;
    section.dataset.chartsReady='true';
    const observed=DATA.observations.filter(r=>r.group==='observed');
    const forecast=DATA.observations.filter(r=>r.group==='forecast');
    // A single record appears once in the data table; filtering never changes the axis.
    const obs=chartShell('chart-observations');
    if(obs){
      const observationColors=['pine','jade','field','lake'];
      const draw=value=>{
        const records=value==='all'?DATA.observations:value==='observed'?observed:forecast;
        const colors=records.map(record=>observationColors[DATA.observations.indexOf(record)]);
        columns(obs.visual,records,{colors,max:32000,unit:'只',label:'南漪湖代表性候鸟记录，不同统计口径不作趋势'});
      };
      controls(obs.root,[{value:'all',label:'全部记录',color:'pine'},{value:'observed',label:'观测记录',color:'jade'},{value:'forecast',label:'高峰预判',color:'lake'}],'all',draw,'按记录性质筛选');
      obs.root.appendChild(obs.visual);draw('all');table(obs.root,DATA.observations);sources(obs.root,DATA.observations);
    }
    species();
    barChart('chart-area',DATA.area,[{value:'restoration',label:'生态修复面积',color:'pine'},{value:'site',label:'湖泊 / 公园规模',color:'lake'}],'restoration',value=>({vertical:true,colors:value==='restoration'?['pine','jade','field']:['lake','fern'],max:value==='restoration'?1400:20000,unit:'公顷',label:value==='restoration'?'各处湿地生态修复面积':'湖泊面积与公园占地'}));
    water();restoration();inputs();
    timeline();
    document.querySelectorAll('[data-chart-source]').forEach(el=>{el.innerHTML=sourceLink(el.dataset.chartSource,true);});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTooltip();});
  document.addEventListener('pointerdown',event=>{
    if (tooltipContext && !tooltipContext.target.contains(event.target)) hideTooltip();
  },true);
  window.addEventListener('scroll',updateTooltipAfterScroll,true);
  window.addEventListener('resize',hideTooltip);
  document.addEventListener('wetland:sectionchange',()=>{hideTooltip();init();});
  window.initWetlandCharts=init;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


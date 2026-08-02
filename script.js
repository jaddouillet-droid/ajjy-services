(function(){
 var h=document.getElementById('hdr'),over=h&&h.dataset.over==='1',t=false;
 function up(){var y=window.scrollY;
  if(over){h.classList.toggle('over',y<80);h.classList.toggle('solid',y>=80)}
  else{h.classList.add('solid')}}
 if(h){up();window.addEventListener('scroll',function(){if(t)return;t=true;
  requestAnimationFrame(function(){up();t=false})},{passive:true})}
 var b=document.getElementById('bg'),m=document.getElementById('mm'),x=document.getElementById('mx');
 function o(){m.classList.add('open');document.body.classList.add('lk');b.setAttribute('aria-expanded','true');var f=m.querySelector('a');if(f)f.focus()}
 function c(){m.classList.remove('open');document.body.classList.remove('lk');b.setAttribute('aria-expanded','false');b.focus()}
 if(b)b.addEventListener('click',o); if(x)x.addEventListener('click',c);
 if(m)Array.prototype.forEach.call(m.querySelectorAll('a'),function(a){a.addEventListener('click',c)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m&&m.classList.contains('open'))c()});
})();
(function(){
 if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion:reduce)').matches){
  Array.prototype.forEach.call(document.querySelectorAll('.rv'),function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(en){en.forEach(function(e,i){
  if(e.isIntersecting){setTimeout(function(){e.target.classList.add('in')},Math.min(i*55,280));io.unobserve(e.target)}})},
  {rootMargin:'0px 0px -8% 0px',threshold:.06});
 Array.prototype.forEach.call(document.querySelectorAll('.rv'),function(e){io.observe(e)});
})();
(function(){
 var EP='';
 function dg(s){return (s||'').replace(/[^0-9]/g,'')}
 function v(el){var x=el.value.trim();
  if(el.type==='tel'){var d=dg(x);return d.length>=9&&d.length<=13}
  if(el.tagName==='SELECT')return el.selectedIndex>0;return x.length>1}
 function mk(el){var g=el.closest('.fl');if(!g)return true;var r=v(el);g.classList.toggle('bad',!r);return r}
 Array.prototype.forEach.call(document.querySelectorAll('.fm form'),function(f){
  var box=f.parentNode,dn=box.querySelector('.dn'),ms=f.querySelector('.ms'),
      btn=f.querySelector('button[type=submit]'),fs=f.querySelectorAll('input[required],select[required]');
  Array.prototype.forEach.call(fs,function(el){
   el.addEventListener('blur',function(){mk(el)});
   el.addEventListener('change',function(){mk(el)});
   el.addEventListener('input',function(){var g=el.closest('.fl');if(g&&g.classList.contains('bad'))mk(el)})});
  f.addEventListener('submit',function(e){
   e.preventDefault();ms.className='ms';ms.textContent='';
   var good=true,first=null;
   Array.prototype.forEach.call(fs,function(el){if(!mk(el)){good=false;if(!first)first=el}});
   if(!good){if(first)first.focus();ms.className='ms on';ms.textContent='Merci de corriger les champs signales.';return}
   if(f.querySelector('[name=_honey]').value)return;
   if(!EP){ms.className='ms on';
    ms.innerHTML='Le formulaire n\'est pas encore relie a une adresse de reception. Appelez le <a href="tel:0484891586" style="text-decoration:underline"><b>04 84 89 15 86</b></a>.';return}
   var d={_subject:'Demande - AJJY Services',_template:'table',_captcha:'false'};
   Array.prototype.forEach.call(f.querySelectorAll('input,select,textarea'),function(el){
    if(el.name&&el.name!=='_honey')d[el.name]=el.value.trim()});
   d.page=document.title;
   btn.disabled=true;var lb=btn.textContent;btn.textContent='Envoi en cours...';
   fetch(EP,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
    .then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(){f.hidden=true;if(dn)dn.className='dn on';track('formulaire_envoye',{page:location.pathname})})
    .catch(function(){btn.disabled=false;btn.textContent=lb;ms.className='ms on';
     ms.innerHTML='L\'envoi a echoue. Appelez le <a href="tel:0484891586" style="text-decoration:underline"><b>04 84 89 15 86</b></a>.';
     track('formulaire_erreur',{page:location.pathname})})})});
})();
/* Suivi de conversion. Compatible GA4, Tag Manager et Plausible.
   Sans outil charge, rien n'est envoye ni stocke. */
(function(){
 window.dataLayer=window.dataLayer||[];
 window.track=function(n,p){try{window.dataLayer.push(Object.assign({event:n},p||{}));
  if(typeof gtag==='function')gtag('event',n,p||{});
  if(typeof plausible==='function')plausible(n,{props:p||{}})}catch(e){}};
 document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;
  var h=a.getAttribute('href')||'';
  if(h.indexOf('tel:')===0)track('appel_telephone',{page:location.pathname});
  else if(h.indexOf('contact.html')!==-1)track('clic_devis',{page:location.pathname})},true)})();
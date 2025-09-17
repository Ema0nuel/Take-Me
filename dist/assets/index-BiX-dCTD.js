(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const e of a.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();class p{constructor(t={}){this.props=t,this.state={},this.element=null}setState(t){this.state={...this.state,...t},this.update()}createElement(t){const n=document.createElement("div");return n.innerHTML=t.trim(),n.firstElementChild}render(){return this.createElement("<div></div>")}mount(t){this.element=this.render(),t.appendChild(this.element),this.afterMount?.()}update(){const t=this.render();this.element&&this.element.parentNode&&(this.element.parentNode.replaceChild(t,this.element),this.element=t,this.afterMount?.())}unmount(){this.beforeUnmount?.(),this.element?.remove(),this.element=null}afterMount(){}beforeUnmount(){}}class M{constructor(){this.liveRegion=this.createLiveRegion()}createLiveRegion(){let t=document.getElementById("sr-live");return t||(t=document.createElement("div"),t.id="sr-live",t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.style.cssText=`
                position: absolute;
                left: -9999px;
                height: 1px;
                width: 1px;
                overflow: hidden;
            `,document.body.appendChild(t)),t}announce({title:t,description:n}){document.title=t||"Take Me | Notes",this.liveRegion.textContent=n||t}}new M;const T="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20200%20200'%3e%3cstyle%3e%20:root%20{%20--icon-primary:%20%234f46e5;%20--icon-secondary:%20%23818cf8;%20--icon-background:%20%23ffffff;%20--icon-check:%20%234ade80;%20}%20@media%20(prefers-color-scheme:%20dark)%20{%20:root%20{%20--icon-primary:%20%23818cf8;%20--icon-secondary:%20%234f46e5;%20--icon-background:%20%231a1a1a;%20--icon-check:%20%2322c55e;%20}%20}%20.note-lines%20{%20stroke:%20var(--icon-primary);%20stroke-width:%202;%20fill:%20none;%20}%20.checkmark%20{%20fill:%20none;%20stroke:%20var(--icon-check);%20stroke-width:%204;%20stroke-linecap:%20round;%20stroke-linejoin:%20round;%20filter:%20drop-shadow(0%201px%202px%20rgba(0,%200,%200,%200.1));%20}%20%3c/style%3e%3c!--%20Note%20paper%20background%20with%20rounded%20corners%20--%3e%3crect%20x='40'%20y='30'%20width='120'%20height='140'%20rx='12'%20fill='var(--icon-background)'%20stroke='var(--icon-primary)'%20stroke-width='2'%20/%3e%3c!--%20Note%20lines%20with%20improved%20spacing%20--%3e%3cg%20class='note-lines'%3e%3cline%20x1='60'%20y1='65'%20x2='140'%20y2='65'%20/%3e%3cline%20x1='60'%20y1='95'%20x2='140'%20y2='95'%20/%3e%3cline%20x1='60'%20y1='125'%20x2='100'%20y2='125'%20/%3e%3c/g%3e%3c!--%20Improved%20checkmark%20with%20better%20positioning%20and%20animation%20--%3e%3cg%20transform='translate(-10,%200)'%3e%3cpath%20class='checkmark'%20d='M135%20115%20l12%2012%20l24%20-24'%20stroke-dasharray='50'%20stroke-dashoffset='50'%20%3e%3canimate%20attributeName='stroke-dashoffset'%20from='50'%20to='0'%20dur='0.6s'%20fill='freeze'%20calcMode='ease-out'%20/%3e%3c/path%3e%3c/g%3e%3c/svg%3e";class I extends p{constructor(){super(),this.state={visible:!0,loading:!0},this.onFinish=null}render(){return this.createElement(`
            <div class="splash-screen ${this.state.visible?"visible":"hidden"}">
                <div class="splash-content">
                    <div class="logo-container">
                        <img src="${T}" alt="Take Me Logo" class="app-logo" />
                    </div>
                    <div class="brand-text">
                        <h1 class="app-title">Take Me</h1>
                        <p class="app-subtitle">Your thoughts, captured.</p>
                    </div>
                    ${this.state.loading?`
                        <div class="loading-indicator">
                            <div class="loading-bar"></div>
                        </div>
                    `:""}
                </div>
            </div>
        `)}afterMount(){setTimeout(()=>{this.setState({loading:!1})},1500),setTimeout(()=>{this.setState({visible:!1}),typeof this.onFinish=="function"&&this.onFinish()},2e3)}}const g=new Date;function E(){const i=g.getFullYear(),t=String(g.getMonth()+1).padStart(2,"0"),n=String(g.getDate()).padStart(2,"0");return`${i}-${t}-${n}`}function C(){const i=String(g.getHours()).padStart(2,"0"),t=String(g.getMinutes()).padStart(2,"0"),n=String(g.getSeconds()).padStart(2,"0");return`${i}:${t}:${n}`}function u(){return JSON.parse(localStorage.getItem("take-me-notes-storage"))||[]}function O(i){const t=u(),n=i;t.push(n),localStorage.setItem("take-me-notes-storage",JSON.stringify(t))}class k extends p{constructor(t){super(t),this.state={currentPath:window.location.hash||"#/"}}render(){return this.createElement(`
            <nav class="bottom-nav">
                <div class="nav-fade"></div>
                <div class="nav-content">
                    <a href="#/" class="nav-item ${this.state.currentPath==="#/"?"active":""}" aria-label="Home">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2"/>
                            <polyline points="9 22 9 12 15 12 15 22" stroke-width="2"/>
                        </svg>
                        <span>Home</span>
                    </a>
                    <a href="#/notes" class="nav-item ${this.state.currentPath==="#/notes"?"active":""}" aria-label="Notes">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
                            <polyline points="14 2 14 8 20 8" stroke-width="2"/>
                            <line x1="16" y1="13" x2="8" y2="13" stroke-width="2"/>
                            <line x1="16" y1="17" x2="8" y2="17" stroke-width="2"/>
                            <polyline points="10 9 9 9 8 9" stroke-width="2"/>
                        </svg>
                        <span>Notes</span>
                    </a>
                    <!--
                    <a href="#/settings" class="nav-item ${this.state.currentPath==="#/settings"?"active":""}" aria-label="Settings">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="3" stroke-width="2"/>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-width="2"/>
                        </svg>
                        <span>Settings</span>
                    </a> -->
                </div>
            </nav>
        `)}afterMount(){window.addEventListener("hashchange",()=>{const t=window.location.hash;this.state.currentPath!==t&&this.setState({currentPath:t})})}beforeUnmount(){window.removeEventListener("hashchange",()=>{})}}class w{static async requestPermission(){if(!("Notification"in window)){console.error("This browser does not support notifications");return}try{return await Notification.requestPermission()==="granted"}catch(t){return console.error("Error requesting notification permission:",t),!1}}static async sendNotification(t,n={}){if(Notification.permission!=="granted"&&!await this.requestPermission())return;const o={...{icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",silent:!1,body:"New notification from Take Me",tag:"take-me-notification",data:{dateOfArrival:Date.now()}},...n};"serviceWorker"in navigator&&navigator.serviceWorker.controller?await(await navigator.serviceWorker.ready).showNotification(t,o):new Notification(t,o)}static async notifyNoteCreated(t){const n={body:`New note created: "${t}"`,icon:"/icons/icon-192x192.png",badge:"/icons/notification-badge.png",vibrate:[100,50,100],tag:"note-created",actions:[{action:"view",title:"View note"}],data:{type:"note-created",dateOfArrival:Date.now()}};await this.sendNotification("Note Created",n)}static async notifyNoteDeleted(){const t={body:"Note has been deleted",icon:"/icons/icon-192x192.png",badge:"/icons/notification-badge.png",vibrate:[100,50,100],tag:"note-deleted",data:{type:"note-deleted",dateOfArrival:Date.now()}};await this.sendNotification("Note Deleted",t)}static async notifyNoteUpdated(t){const n={body:`Note updated: "${t}"`,icon:"/icons/icon-192x192.png",badge:"/icons/notification-badge.png",vibrate:[100,50,100],tag:"note-updated",actions:[{action:"view",title:"View note"}],data:{type:"note-updated",dateOfArrival:Date.now()}};await this.sendNotification("Note Updated",n)}}class L extends p{constructor(t){super(t),this.noteId=t?.noteId||window.location.hash.split("/")[2];const s=u().find(o=>o.id===this.noteId);this.state={note:s,mode:"view"}}render(){return this.state.note?this.createElement(`
            <div class="note-detail-view app-container">
                <header class="note-header">
                    <div class="header-inner">
                        <button class="back-button" aria-label="Go back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span class="header-title">${this.state.note.title||"Note"}</span>
                        <div class="header-actions">
                            <button class="edit-toggle-btn btn-primary">${this.state.mode==="edit"?"Save":"Edit"}</button>
                            <button class="delete-button btn-danger" aria-label="Delete note">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
                <main class="note-content mt-16 pb-24">
                    <div class="note-details-card">
                        ${this.state.mode==="edit"?`
                            <input type="text"
                                   class="note-title-input"
                                   maxlength="80"
                                   value="${this.state.note.title}"
                                   placeholder="Edit title..." />
                            <textarea class="note-content-input"
                                      rows="20"
                                      maxlength="200000"
                                      placeholder="Edit your note...">${this.state.note.content}</textarea>
                        `:`
                            <h1 class="note-title">${this.state.note.title}</h1>
                            <div class="note-date-time">
                                <span>${this.state.note.date}</span>
                                <span>${this.state.note.time}</span>
                            </div>
                            <div class="note-content-display">${this.state.note.content}</div>
                        `}
                    </div>
                </main>
                ${new k({currentPath:"#/notes"}).render().outerHTML}
            </div>
        `):this.createElement(`
                <div class="note-detail-view loading">
                    <div class="loading-spinner"></div>
                </div>
            `)}afterMount(){const t=this.element.querySelector(".back-button"),n=this.element.querySelector(".edit-toggle-btn"),s=this.element.querySelector(".delete-button"),o=this.element.querySelector(".note-title-input"),a=this.element.querySelector(".note-content-input");t?.addEventListener("click",()=>window.history.back()),n?.addEventListener("click",async()=>{if(this.state.mode==="edit"){if(o.value.trim()&&a.value.trim()){const e=u(),r=e.findIndex(h=>h.id===this.noteId);r!==-1&&(e[r]={...e[r],title:o.value.trim(),content:a.value.trim(),date:E(),time:C()},localStorage.setItem("take-me-notes-storage",JSON.stringify(e)),this.setState({note:e[r],mode:"view"}),await w.notifyNoteUpdated(e[r].title))}}else this.setState({mode:"edit"})}),s?.addEventListener("click",async()=>{let e=u();e=e.filter(r=>r.id!==this.noteId),localStorage.setItem("take-me-notes-storage",JSON.stringify(e)),await w.notifyNoteDeleted(),window.location.hash="#/"}),this.state.mode==="edit"&&o?.focus()}}class ${constructor(t={}){this.routes=t,this.currentComponent=null,this.container=null}init(t){if(this.container=t,this.isFirstLoad){const n=new I;n.mount(this.container),setTimeout(()=>{n.unmount(),this.handleRoute(),this.isFirstLoad=!1},2e3)}window.addEventListener("hashchange",()=>this.handleRoute()),this.isFirstLoad||this.handleRoute()}handleRoute(){const t=window.location.hash||"#/";let n=this.routes[t];if(n||(t.match(/^#\/notes\/(.+)$/)&&this.routes["#/notes/:id"]?n=this.routes["#/notes/:id"]:n=this.routes["#/"]),!!n){if(this.currentComponent&&this.currentComponent.unmount(),this.container.innerHTML="",t.startsWith("#/notes/")&&n.component===L){const s=t.split("/")[2];this.currentComponent=new n.component({noteId:s})}else this.currentComponent=new n.component;this.currentComponent.mount(this.container),document.title=n.title||""}}navigate(t){window.location.hash=t}}class B extends p{constructor(t){super(t),this.state={recentNotes:u()},this.handleNoteClick=this.handleNoteClick.bind(this)}render(){return this.createElement(`
            <div class="home-view app-container">
                <header class="express-header">
                    <div class="header-inner">
                        <h1 class="header-title">Notes</h1>
                        <a href="#/notes" class="new-note-btn" aria-label="Create new note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </a>
                    </div>
                </header>
                <main class="notes-container mt-24 pb-24">
                    <h2 class="section-title">Recent Notes</h2>
                    <div class="notes-grid">
                        ${this.state.recentNotes.length?this.state.recentNotes.map(t=>this.renderNoteCard(t)).join(""):this.renderEmptyState()}
                    </div>
                </main>
                ${new k({currentPath:"#/"}).render().outerHTML}
            </div>
        `)}renderNoteCard(t){return`
            <div class="note-card" data-note-id="${t.id}" role="button" tabindex="0">
                <div class="note-card-content">
                    <div class="note-card-main">
                        <h3 class="note-title">${t.title}</h3>
                        <p class="note-preview">${t.content}</p>
                    </div>
                    <button class="delete-note" aria-label="Delete note" data-note-id="${t.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <div class="note-meta">
                    <span class="note-date">${t.date}</span>
                    <span class="note-time">${t.time}</span>
                </div>
            </div>
        `}renderEmptyState(){return`
            <div class="empty-state">
                <p>No notes yet</p>
            </div>
        `}afterMount(){this.element.querySelectorAll(".note-card").forEach(t=>{t.addEventListener("click",n=>{if(n.target.closest(".delete-note")){n.stopPropagation();const s=n.target.closest(".delete-note").dataset.noteId;this.handleDeleteNote(s)}else{const s=t.dataset.noteId;this.handleNoteClick(s)}}),t.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key===" "){n.preventDefault();const s=t.dataset.noteId;this.handleNoteClick(s)}})}),this.element.addEventListener("touchstart",()=>{},{passive:!0})}handleNoteClick(t){window.location.hash=`#/notes/${t}`}async handleDeleteNote(t){let n=u();n=n.filter(s=>s.id!==t),localStorage.setItem("take-me-notes-storage",JSON.stringify(n)),this.setState({recentNotes:u()}),await w.notifyNoteDeleted()}}class P extends p{constructor(t){super(t),this.state={note:{title:"",content:""},mode:"edit"}}render(){return this.createElement(`
            <div class="notes-view app-container">
                <header class="notes-header">
                    <div class="header-inner">
                        <button class="back-btn" aria-label="Go back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span class="header-title">New Note</span>
                        <div class="header-actions">
                            <button class="save-btn btn-primary">Save</button>
                        </div>
                    </div>
                </header>
                <main class="notes-content pt-24 pb-24">
                    <div class="note-form-card">
                        <input type="text" 
                               class="note-title-input"
                               maxlength="80"
                               placeholder="Title your note..."
                               value="${this.state.note.title}" />
                        <textarea class="note-content-input"
                                  rows="20"
                                  maxlength="2000"
                                  placeholder="Start writing your thoughts here...">${this.state.note.content}</textarea>
                    </div>
                </main>
                ${new k({currentPath:"#/notes"}).render().outerHTML}
            </div>
        `)}afterMount(){const t=this.element.querySelector(".back-btn"),n=this.element.querySelector(".save-btn"),s=this.element.querySelector(".note-title-input"),o=this.element.querySelector(".note-content-input");t?.addEventListener("click",()=>window.history.back()),n?.addEventListener("click",async()=>{if(s.value.trim()&&o.value.trim()){const a={id:crypto.randomUUID(),title:s.value.trim(),content:o.value.trim(),date:E(),time:C()};O(a),this.setState({note:{title:"",content:""}}),await w.notifyNoteCreated(a.title),window.location.hash=`#/notes/${a.id}`}}),s?.focus()}}class D extends p{constructor(t){super(t),this.state={showInstallButton:!1},this.deferredPrompt=null,this.handleInstallClick=this.handleInstallClick.bind(this)}render(){return this.state.showInstallButton?this.createElement(`
            <button class="install-button" aria-label="Install app">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Install App
            </button>
        `):null}afterMount(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.setState({showInstallButton:!0})}),this.element&&this.element.addEventListener("click",this.handleInstallClick)}async handleInstallClick(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();const{outcome:t}=await this.deferredPrompt.userChoice;console.log(`User response to the install prompt: ${t}`),this.deferredPrompt=null,this.setState({showInstallButton:!1})}beforeUnmount(){this.element&&this.element.removeEventListener("click",this.handleInstallClick)}}class H extends p{constructor(t){super(t),this.state={currentView:null},this.router=new $({"#/":{component:B,title:"Take Me | Home"},"#/notes":{component:P,title:"Take Me | Notes"},"#/notes/:id":{component:L,title:"Take Me | Note Detail"}}),this.installButton=new D}render(){return this.createElement(`
            <div class="app-container">
                <main id="main-content">
                    <div id="view-container"></div>
                </main>
                ${this.installButton.render()?.outerHTML||""}
            </div>
        `)}afterMount(){const t=this.element.querySelector("#view-container");this.router.init(t),this.installButton.afterMount()}beforeUnmount(){this.installButton.beforeUnmount()}}function A(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var b={exports:{}};/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */var q=b.exports,N;function F(){return N||(N=1,(function(i){(function(t,n){i.exports?i.exports=n():t.Toastify=n()})(q,function(t){var n=function(e){return new n.lib.init(e)},s="1.12.0";n.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},n.lib=n.prototype={toastify:s,constructor:n,init:function(e){return e||(e={}),this.options={},this.toastElement=null,this.options.text=e.text||n.defaults.text,this.options.node=e.node||n.defaults.node,this.options.duration=e.duration===0?0:e.duration||n.defaults.duration,this.options.selector=e.selector||n.defaults.selector,this.options.callback=e.callback||n.defaults.callback,this.options.destination=e.destination||n.defaults.destination,this.options.newWindow=e.newWindow||n.defaults.newWindow,this.options.close=e.close||n.defaults.close,this.options.gravity=e.gravity==="bottom"?"toastify-bottom":n.defaults.gravity,this.options.positionLeft=e.positionLeft||n.defaults.positionLeft,this.options.position=e.position||n.defaults.position,this.options.backgroundColor=e.backgroundColor||n.defaults.backgroundColor,this.options.avatar=e.avatar||n.defaults.avatar,this.options.className=e.className||n.defaults.className,this.options.stopOnFocus=e.stopOnFocus===void 0?n.defaults.stopOnFocus:e.stopOnFocus,this.options.onClick=e.onClick||n.defaults.onClick,this.options.offset=e.offset||n.defaults.offset,this.options.escapeMarkup=e.escapeMarkup!==void 0?e.escapeMarkup:n.defaults.escapeMarkup,this.options.ariaLive=e.ariaLive||n.defaults.ariaLive,this.options.style=e.style||n.defaults.style,e.backgroundColor&&(this.options.style.background=e.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var e=document.createElement("div");e.className="toastify on "+this.options.className,this.options.position?e.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(e.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):e.className+=" toastify-right",e.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var r in this.options.style)e.style[r]=this.options.style[r];if(this.options.ariaLive&&e.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)e.appendChild(this.options.node);else if(this.options.escapeMarkup?e.innerText=this.options.text:e.innerHTML=this.options.text,this.options.avatar!==""){var h=document.createElement("img");h.src=this.options.avatar,h.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?e.appendChild(h):e.insertAdjacentElement("afterbegin",h)}if(this.options.close===!0){var c=document.createElement("button");c.type="button",c.setAttribute("aria-label","Close"),c.className="toast-close",c.innerHTML="&#10006;",c.addEventListener("click",(function(v){v.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var l=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&l>360?e.insertAdjacentElement("afterbegin",c):e.appendChild(c)}if(this.options.stopOnFocus&&this.options.duration>0){var d=this;e.addEventListener("mouseover",function(v){window.clearTimeout(e.timeOutValue)}),e.addEventListener("mouseleave",function(){e.timeOutValue=window.setTimeout(function(){d.removeElement(e)},d.options.duration)})}if(typeof this.options.destination<"u"&&e.addEventListener("click",(function(v){v.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&e.addEventListener("click",(function(v){v.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var f=o("x",this.options),m=o("y",this.options),y=this.options.position=="left"?f:"-"+f,S=this.options.gravity=="toastify-top"?m:"-"+m;e.style.transform="translate("+y+","+S+")"}return e},showToast:function(){this.toastElement=this.buildToast();var e;if(typeof this.options.selector=="string"?e=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?e=this.options.selector:e=document.body,!e)throw"Root element is not defined";var r=n.defaults.oldestFirst?e.firstChild:e.lastChild;return e.insertBefore(this.toastElement,r),n.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(e){e.className=e.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),e.parentNode&&e.parentNode.removeChild(e),this.options.callback.call(e),n.reposition()}).bind(this),400)}},n.reposition=function(){for(var e={top:15,bottom:15},r={top:15,bottom:15},h={top:15,bottom:15},c=document.getElementsByClassName("toastify"),l,d=0;d<c.length;d++){a(c[d],"toastify-top")===!0?l="toastify-top":l="toastify-bottom";var f=c[d].offsetHeight;l=l.substr(9,l.length-1);var m=15,y=window.innerWidth>0?window.innerWidth:screen.width;y<=360?(c[d].style[l]=h[l]+"px",h[l]+=f+m):a(c[d],"toastify-left")===!0?(c[d].style[l]=e[l]+"px",e[l]+=f+m):(c[d].style[l]=r[l]+"px",r[l]+=f+m)}return this};function o(e,r){return r.offset[e]?isNaN(r.offset[e])?r.offset[e]:r.offset[e]+"px":"0px"}function a(e,r){return!e||typeof r!="string"?!1:!!(e.className&&e.className.trim().split(/\s+/gi).indexOf(r)>-1)}return n.lib.init.prototype=n.lib,n})})(b)),b.exports}var V=F();const W=A(V),x={wifiOn:`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6.5c3.79 0 7.17 1.52 9.65 3.97l-2.03 2.03c-1.91-1.91-4.56-3-7.62-3s-5.71 1.09-7.62 3l-2.03-2.03C4.83 8.02 8.21 6.5 12 6.5zm0 5c2.32 0 4.45.8 6.14 2.12l-2.03 2.03c-1.11-.74-2.45-1.15-3.89-1.15s-2.78.41-3.89 1.15L6.3 13.62C7.99 12.3 10.12 11.5 12 11.5zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 21.5 12 21.5 9.5 20.38 9.5 19s1.12-2.5 2.5-2.5z"/>
    </svg>`,wifiOff:`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.64 4.36L20.36 3.08 3.08 20.36 4.36 21.64 21.64 4.36zM12 6.5c3.79 0 7.17 1.52 9.65 3.97l-2.03 2.03c-1.91-1.91-4.56-3-7.62-3-.79 0-1.57.07-2.31.22l1.41 1.41c.29-.03.59-.05.9-.05 2.32 0 4.45.8 6.14 2.12l-2.03 2.03c-1.11-.74-2.45-1.15-3.89-1.15-.59 0-1.17.08-1.71.22L12 6.5zm0 10c1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.31-.73 1.76l1.41 1.41c.89-.89 1.44-2.12 1.44-3.47 0-2.76-2.24-5-5-5-.76 0-1.47.17-2.12.47l1.41 1.41c.17-.05.35-.08.54-.08z"/>
    </svg>`};class z{constructor(){this.initialize(),this.updateOnlineStatus(navigator.onLine)}initialize(){window.addEventListener("online",()=>this.updateOnlineStatus(!0)),window.addEventListener("offline",()=>this.updateOnlineStatus(!1))}updateOnlineStatus(t){const n=t?x.wifiOn:x.wifiOff;W({node:this.createToastElement(t,n),duration:3e3,gravity:"top",position:"right",stopOnFocus:!0,className:"network-status-toast",style:{background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",color:"#000",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",padding:"12px 24px",borderRadius:"8px"}}).showToast()}createToastElement(t,n){const s=document.createElement("div");return s.style.display="flex",s.style.alignItems="center",s.style.gap="8px",s.innerHTML=`
            <span style="color: ${t?"#4CAF50":"#F44336"}">${n}</span>
            <span>${t?"Back online":"You are offline"}</span>
        `,s}}class R{constructor(){this.deferredPrompt=null,this.banner=null,this.initialize()}initialize(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.showInstallBanner()})}createBanner(){const t=document.createElement("div");return t.className="install-banner",t.innerHTML=`
            <div class="install-banner-content">
                <div class="install-banner-text">
                    <span class="text-black-color">Install Take Me Notes</span>
                    <span>on your mobile</span>
                </div>
                <div class="install-banner-buttons">
                    <button class="install-button">Install</button>
                    <button class="dismiss-button">Not now</button>
                </div>
            </div>
        `,t.querySelector(".install-button").addEventListener("click",()=>this.installApp()),t.querySelector(".dismiss-button").addEventListener("click",()=>this.dismissBanner()),t}showInstallBanner(){this.banner||(this.banner=this.createBanner(),document.body.appendChild(this.banner),setTimeout(()=>{this.banner.classList.add("show")},100))}dismissBanner(){this.banner&&(this.banner.classList.remove("show"),setTimeout(()=>{this.banner.remove(),this.banner=null},300))}async installApp(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();const{outcome:t}=await this.deferredPrompt.userChoice;console.log(`User response to the install prompt: ${t}`),this.deferredPrompt=null,this.dismissBanner()}}document.addEventListener("touchmove",function(i){i.touches.length===1&&i.changedTouches[0].clientX<30&&i.preventDefault()},{passive:!1});new R;new z;"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{const i=await navigator.serviceWorker.register("/service-worker.js");console.log("ServiceWorker registration successful"),await w.requestPermission()}catch(i){console.error("ServiceWorker registration failed:",i)}});document.getElementById("notify-btn")?.addEventListener("click",()=>{w.sendNotification("Hello!",{body:"This is a test notification"})});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js",{type:"module"}).then(i=>{console.log("SW registered:",i)}).catch(i=>{console.log("SW registration failed:",i)})});class U{constructor(){this.app=null,this.root=document.getElementById("app"),this.currentModuleId=null}mount(t=H){this.unmount(),this.app=new t,this.app.mount(this.root),this.currentModuleId=t.id}unmount(){this.app&&(this.app.beforeUnmount(),this.root.innerHTML="",this.app=null)}}const j=new U;j.mount();
//# sourceMappingURL=index-BiX-dCTD.js.map

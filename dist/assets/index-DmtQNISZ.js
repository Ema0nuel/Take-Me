(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();class c{constructor(t={}){this.props=t,this.state={},this.element=null}setState(t){this.state={...this.state,...t},this.update()}createElement(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}render(){return this.createElement("<div></div>")}mount(t){this.element=this.render(),t.appendChild(this.element),this.afterMount?.()}update(){const t=this.render();this.element&&this.element.parentNode&&(this.element.parentNode.replaceChild(t,this.element),this.element=t,this.afterMount?.())}unmount(){this.beforeUnmount?.(),this.element?.remove(),this.element=null}afterMount(){}beforeUnmount(){}}class p{constructor(){this.liveRegion=this.createLiveRegion()}createLiveRegion(){let t=document.getElementById("sr-live");return t||(t=document.createElement("div"),t.id="sr-live",t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.style.cssText=`
                position: absolute;
                left: -9999px;
                height: 1px;
                width: 1px;
                overflow: hidden;
            `,document.body.appendChild(t)),t}announce({title:t,description:e}){document.title=t||"Take Me | Notes",this.liveRegion.textContent=e||t}}new p;const l=new Date;function d(){const s=l.getFullYear(),t=String(l.getMonth()+1).padStart(2,"0"),e=String(l.getDate()).padStart(2,"0");return`${s}-${t}-${e}`}function h(){const s=String(l.getHours()).padStart(2,"0"),t=String(l.getMinutes()).padStart(2,"0"),e=String(l.getSeconds()).padStart(2,"0");return`${s}:${t}:${e}`}function a(){return JSON.parse(localStorage.getItem("take-me-notes-storage"))||[]}function v(s){const t=a(),e=s;t.push(e),localStorage.setItem("take-me-notes-storage",JSON.stringify(t))}class u extends c{constructor(t){super(t),this.noteId=t?.noteId||window.location.hash.split("/")[2];const o=a().find(n=>n.id===this.noteId);this.state={note:o,mode:"view"},this.handleInput=this.handleInput.bind(this)}render(){return this.state.note?this.createElement(`
            <div class="note-detail-view">
                <header class="note-header">
                    <button class="back-button" aria-label="Go back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="btn delete-button" aria-label="Delete note">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="edit-toggle-btn header-actions ${this.state.mode==="edit"?"save-btn":" edit-btn"}">
                        ${this.state.mode==="edit"?"Save":"Edit"}
                    </button>
                </header>
                <main class="note-content">
                    ${this.state.mode==="edit"?`
                        <input type="text"
                               class="note-title-input"
                               value="${this.state.note.title}"
                               placeholder="Note title"
                        />
                        <textarea class="note-content-input"
                                  placeholder="Start writing...">${this.state.note.content}</textarea>
                    `:`
                        <h1 class="note-title">${this.state.note.title}</h1>
                        <div class="note-content">${this.state.note.content}</div>
                    `}
                </main>
            </div>
        `):this.createElement(`
                <div class="note-detail-view loading">
                    <div class="loading-spinner"></div>
                </div>
            `)}afterMount(){this.element.querySelector(".back-button")?.addEventListener("click",()=>window.history.back()),this.element.querySelector(".delete-button")?.addEventListener("click",()=>this.handleDelete()),this.element.querySelector(".edit-toggle-btn")?.addEventListener("click",()=>{this.state.mode==="edit"?this.handleSave():this.setState({mode:"edit"})});const n=this.element.querySelector(".note-title-input");this.state.mode==="edit"&&n.focus()}beforeUnmount(){}handleInput(t){const e=this.element.querySelector(".note-title-input"),o=this.element.querySelector(".note-content-input");this.setState({note:{...this.state.note,title:e?.value||"",content:o?.value||""}})}handleSave(){const t=a(),e=this.element.querySelector(".note-title-input"),o=this.element.querySelector(".note-content-input");if(e.value.trim()&&o.value.trim()){const n=t.findIndex(i=>i.id===this.noteId);n!==-1&&(t[n]={...t[n],title:e.value.trim(),content:o.value.trim(),date:d(),time:h()},this.setState({note:t[n]})),localStorage.setItem("take-me-notes-storage",JSON.stringify(t)),this.setState({mode:"view"})}}handleDelete(){let t=a();t=t.filter(e=>e.id!==this.noteId),localStorage.setItem("take-me-notes-storage",JSON.stringify(t)),window.location.hash="#/"}}class f{constructor(t={}){this.routes=t,this.currentComponent=null,this.container=null}init(t){this.container=t,window.addEventListener("hashchange",()=>this.handleRoute()),this.handleRoute()}handleRoute(){const t=window.location.hash||"#/";let e=this.routes[t];if(e||(t.match(/^#\/notes\/(.+)$/)&&this.routes["#/notes/:id"]?e=this.routes["#/notes/:id"]:e=this.routes["#/"]),!!e){if(this.currentComponent&&this.currentComponent.unmount(),this.container.innerHTML="",t.startsWith("#/notes/")&&e.component===u){const o=t.split("/")[2];this.currentComponent=new e.component({noteId:o})}else this.currentComponent=new e.component;this.currentComponent.mount(this.container),document.title=e.title||""}}navigate(t){window.location.hash=t}}class m extends c{constructor(t){super(t),this.state={currentPath:window.location.hash||"#/"}}render(){return this.createElement(`
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
        `)}afterMount(){window.addEventListener("hashchange",()=>{const t=window.location.hash;this.state.currentPath!==t&&this.setState({currentPath:t})})}beforeUnmount(){window.removeEventListener("hashchange",()=>{})}}class w extends c{constructor(t){super(t),this.state={recentNotes:a()}}render(){return this.createElement(`
            <div class="home-view overflow-auto h-screen">
                <header class="express-header">
                    <h1 class="header-title">Notes</h1>
                    <a href="#/notes" aria-label="Notes" class="new-note-btn" aria-label="Create new note">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </header>

                <main class="notes-container">
                    <h2 class="section-title">Recent Notes</h2>
                    <div class="notes-grid">
                        ${this.state.recentNotes.length?this.state.recentNotes.map(t=>this.renderNoteCard(t)).join(""):this.renderEmptyState()}
                    </div>
                </main>

                ${new m().render().outerHTML}
            </div>
        `)}renderNoteCard(t){return`
            <div class="note-card" data-note-id="${t.id}">
                <div class="flex flex-col ">
                    <h3 class="note-title">${t.title}</h3>
                    <p class="note-preview">${t.content.substring(0,99)}${t.content.length>100?"...":""}</p>
                    <div class="note-meta">
                        <span class="note-date text-gray-400 font-thin">${t.date}</span>
                    </div>
                </div>
                <button class="delete-note" aria-label="Delete note">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        `}renderEmptyState(){return`
            <div class="empty-state">
                <p>No notes yet</p>
            </div>
        `}afterMount(){this.element.addEventListener("click",t=>{const e=t.target.closest(".note-card");if(t.target.closest(".delete-note")){t.stopPropagation();const n=e.dataset.noteId;console.log(n),this.handleDeleteNote(n)}else if(e){const n=e.dataset.noteId;this.handleNoteClick(n)}})}handleNoteClick(t){window.location.hash=`#/notes/${t}`}handleDeleteNote(t){let e=a();e=e.filter(o=>o.id!==t),localStorage.setItem("take-me-notes-storage",JSON.stringify(e)),this.setState({recentNotes:a()})}}class g extends c{constructor(t){super(t),this.state={note:{title:"",content:""},mode:"edit"}}render(){return this.createElement(`
            <div class="notes-view overflow-hidden h-screen">
                <header class="notes-header">
                    <button class="back-btn" aria-label="Go back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="header-actions">
                        ${this.state.mode==="edit"?`
                            <button class="save-btn">Done</button>
                        `:`
                            <button class="edit-btn">Edit</button>
                        `}
                    </div>
                </header>

                <main class="notes-content">
                    ${this.state.mode==="edit"?`
                        <input type="text" 
                               class="note-title-input" 
                               placeholder="Note title"
                               value="${this.state.note.title}"
                        />
                        <div class="editor-container">
                            <textarea class="note-content-input" 
                                      placeholder="Start writing..."
                            >${this.state.note.content}</textarea>
                        </div>
                    `:`
                        <h1 class="note-title">${this.state.note.title||"Untitled"}</h1>
                        <div class="note-content">${this.state.note.content}</div>
                    `}
                </main>

                ${new m({currentPath:"#/notes"}).render().outerHTML}
            </div>
        `)}afterMount(){this.element.querySelector(".back-btn")?.addEventListener("click",()=>{window.history.back()});const e=this.element.querySelector(".save-btn"),o=this.element.querySelector(".edit-btn"),n=this.element.querySelector(".note-title-input"),i=this.element.querySelector(".note-content-input");e?.addEventListener("click",()=>{if(n.value.trim()&&i.value.trim()){const r={id:crypto.randomUUID(),title:n.value.trim(),content:i.value.trim(),date:d(),time:h()};v(r),this.setState({note:{title:n.value,content:i.value}}),window.location.hash=`#/notes/${r.id}`,this.setState({mode:"view"})}}),o?.addEventListener("click",()=>{this.setState({mode:"edit"})}),this.state.note.title||n?.focus()}}class b extends c{constructor(t){super(t),this.state={showInstallButton:!1},this.deferredPrompt=null,this.handleInstallClick=this.handleInstallClick.bind(this)}render(){return this.state.showInstallButton?this.createElement(`
            <button class="install-button" aria-label="Install app">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Install App
            </button>
        `):null}afterMount(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.setState({showInstallButton:!0})}),this.element&&this.element.addEventListener("click",this.handleInstallClick)}async handleInstallClick(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();const{outcome:t}=await this.deferredPrompt.userChoice;console.log(`User response to the install prompt: ${t}`),this.deferredPrompt=null,this.setState({showInstallButton:!1})}beforeUnmount(){this.element&&this.element.removeEventListener("click",this.handleInstallClick)}}class k extends c{constructor(t){super(t),this.state={currentView:null},this.router=new f({"#/":{component:w,title:"Take Me | Home"},"#/notes":{component:g,title:"Take Me | Notes"},"#/notes/:id":{component:u,title:"Take Me | Note Detail"}}),this.installButton=new b}render(){return this.createElement(`
            <div class="app-container">
                <main id="main-content">
                    <div id="view-container"></div>
                </main>
                ${this.installButton.render()?.outerHTML||""}
            </div>
        `)}afterMount(){const t=this.element.querySelector("#view-container");this.router.init(t),this.installButton.afterMount()}beforeUnmount(){this.installButton.beforeUnmount()}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js",{type:"module"}).then(s=>{console.log("SW registered:",s)}).catch(s=>{console.log("SW registration failed:",s)})});class S{constructor(){this.app=null,this.root=document.getElementById("app"),this.currentModuleId=null}mount(t=k){this.unmount(),this.app=new t,this.app.mount(this.root),this.currentModuleId=t.id}unmount(){this.app&&(this.app.beforeUnmount(),this.root.innerHTML="",this.app=null)}}const y=new S;y.mount();
//# sourceMappingURL=index-DmtQNISZ.js.map

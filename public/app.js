const dialog=document.querySelector("#demo");
const logList=document.querySelector("#log");
const status=document.querySelector("#status");
let opener=null;
function log(message){const item=document.createElement("li");item.textContent=message;logList.prepend(item);}
function open(mode){opener=document.activeElement;try{if(mode==="modal")dialog.showModal();else dialog.show();status.textContent="Opened with "+(mode==="modal"?"showModal()":"show()");log("open: "+mode);}catch(error){status.textContent=error.message;log("error: "+error.message);}}
document.querySelector("#modal").addEventListener("click",()=>open("modal"));
document.querySelector("#nonmodal").addEventListener("click",()=>open("nonmodal"));
dialog.addEventListener("cancel",()=>{log("cancel event (Escape or platform cancel action)");});
dialog.addEventListener("close",()=>{log("close event; returnValue = "+(dialog.returnValue||"(empty)"));status.textContent="Closed with returnValue: "+(dialog.returnValue||"(empty)");if(opener instanceof HTMLElement){opener.focus();log("focus restored to opener");}});
dialog.addEventListener("click",event=>{if(event.target===dialog)log("backdrop area clicked; dialog remains open");});
log("Dialog support: "+("HTMLDialogElement" in window));

let selectedDoc="Other";let files=[];let lang="en";let requestNo=1025;
const $=id=>document.getElementById(id);
document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;$("languageScreen").classList.add("hidden");$("orderScreen").classList.remove("hidden")});
document.querySelectorAll(".doc").forEach(b=>b.onclick=()=>{selectedDoc=b.dataset.doc;document.querySelectorAll(".doc").forEach(x=>x.style.outline="");b.style.outline="3px solid #e6b84b";calculate()});
$("fileInput").onchange=e=>{files=[...e.target.files];renderPreview();calculate()};
["printType","layout","copies"].forEach(id=>$(id).addEventListener("input",calculate));
function renderPreview(){const box=$("preview");box.innerHTML="";if(!files.length){box.innerHTML="<span>No file selected</span>";return}files.forEach(f=>{if(f.type.startsWith("image/")){const img=document.createElement("img");img.src=URL.createObjectURL(f);box.appendChild(img)}else if(f.type==="application/pdf"){const frame=document.createElement("iframe");frame.src=URL.createObjectURL(f);box.appendChild(frame)}else{box.textContent=f.name}})}
function calculate(){let copies=Math.max(1,parseInt($("copies").value||1));let layout=$("layout").value;let count=Math.max(1,files.length);
let sheets=count*copies;
if(selectedDoc==="Aadhaar Card"&&files.length>=2&&layout==="duplex") sheets=Math.ceil(files.length/2)*copies;
if(layout==="duplex"&&files.length>=2) sheets=Math.ceil(files.length/2)*copies;
let pricePer=sheets<=14?($("printType").value==="bw"?5:10):($("printType").value==="bw"?3:7);
$("sheets").textContent=sheets;$("total").textContent="₹"+(sheets*pricePer)}
$("submit").onclick=()=>{if(!files.length){alert("Please upload your document first.");return}const id="RS-"+requestNo++;$("request").textContent="Request ID: "+id+" — "+(document.querySelector('input[name="payment"]:checked').value==="cash"?"CASH PENDING":"PAID");};
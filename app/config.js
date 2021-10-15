
//Obtendo elementos
let desktop = document.querySelector(".desktop-controller");
let windowsCon =  document.querySelector(".desktop-container");
let windowOp = document.querySelectorAll(".op");

window.onload = ()=>{
windows(true);
document.addEventListener("contextmenu",(e)=>e.preventDefault());
}

//É o componente principal
const windows = (Login = false)=>{
	
if(!!Login){
const config = {

//É responsável pela barra de configurações
windowsBar: ()=>{
	document.addEventListener("mouseup",(e)=>{
		if(e.button == "2"){
			windowsCon.style.display = "block";
			windowsCon.style.left = `${e.clientX}px`;
			windowsCon.style.top = `${e.clientY}px`
		}
		else{
			windowsCon.style.display = "none";
		}
	})
	windowOp.forEach((op,id)=>{
		op.addEventListener("click",(e)=>{
			switch(id){
				case 0:
					if(op.innerHTML == "Nova Pasta"){
						windowsCon.style.display = "none";
						config.programs.setPrograms({
							t: "folder",
						})
					}
					break;
			}
		})
	})
},

programs:{
	//Faz uma varredura no Array de programas
	getPrograms:()=>{
		for(let i in programs){
			const {name,icon} = programs[i];
			config.programs.setPrograms({
				t: "program",
				n: name,
				i: icon,
			});
		}
	},
	//Cria ''programas''
	setPrograms:({t,n,i})=>{

		let div = document.createElement("div");
		div.classList.add("program");
		desktop.appendChild(div);
		let icon = document.createElement("img");

		switch(t){
		case "program":
			let name = document.createElement("p");
			div.appendChild(icon);
			div.appendChild(name);	
			icon.setAttribute("src",i);
			name.innerHTML = n;	
			break;

		case "folder":
			const {icon:folderIcon} = folders[0];
			let input = document.createElement("input");
			div.appendChild(icon);
			div.appendChild(input);
			icon.setAttribute("src",folderIcon)
			input.focus();
			input.addEventListener("keypress",(e)=>{
				if(e.keyCode == "13"){
					input.style.display = "none";
					windowsCon.style.display = "none";
					let name = document.createElement("p");
					div.appendChild(name);
					name.innerHTML = input.value;
					programs.push({name:input.value,icon:folderIcon})
				}
			})
			break;
		}
		
	},

	//Retorna todos os programas ''instalados''
	allPrograms:()=>{
		return programs.length;
	}
},

//Define as horas
hour: (h,m,d,me,a)=>{
	let getHours = document.querySelector("#hours-id");
	let getDate = document.querySelector("#date-id");
	let date = new Date();
	h = date.getHours();
	m = date.getMinutes();
	d = date.getDay();
	me = date.getMonth();
	a = date.getFullYear();
	getHours.innerHTML = (m<10)? `${h}:0${m}` : `${h}:${m}`
	getDate.innerHTML = `${d}/${me}/${a}`
},

//É responsável pelos eventos nos icones
eventIcons: ()=>{
	let progAr = document.querySelectorAll(".program");
	const dragIconEnter = ()=>{
		progAr.forEach((prog)=>{
			prog.addEventListener("dragenter",(e)=>{
				prog.classList.add("drag-in-enter");
			})
		})
	}
	const dragIconLeave = ()=>{
		progAr.forEach((prog)=>{
			prog.addEventListener("dragend",(e)=>{
				prog.classList.remove("drag-in-enter")
				prog.classList.add("drag-in-end");
				prog.style.marginLeft = `${e.clientX}px`
				prog.style.marginTop = `${e.clientY}px`
			})
		})
	}
	dragIconEnter();
	dragIconLeave();
},

//Define as configurações do Desktop
deskTop: {
	DefaultConfig: ()=>{
		let gtInput = document.querySelector(".desktop-footer input");
		gtInput.addEventListener("click",(e)=>{
			gtInput.style.backgroundColor = "grey";
		})
	}
}
}

config.windowsBar();
config.programs.getPrograms();
config.deskTop.DefaultConfig();
//Executa a cada 1s
setInterval(() => {
config.hour();
config.eventIcons();
}, 100);
return{
config,
}
}
}

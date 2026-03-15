addEventListener("mousemove",(e)=>{
    console.log("Mouse Moving at: ",e.clientX,e.clientY)
    document.body.style.setProperty("--x",e.clientX + 'px')
    document.body.style.setProperty("--y",e.clientY + 'px')
})
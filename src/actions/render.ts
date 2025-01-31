export const handleFigureCaption = (el:HTMLElement)=>{
    el.querySelectorAll('figure').forEach((figure)=>{
        const content:string =figure.getAttribute('content') ||''
        figure.innerHTML = content
    })
}
const cursor = document.querySelector(".cursor");

window.addEventListener("mouseout", (e) => {

    if (!e.relatedTarget) {

        cursor.style.opacity = "0";

        window.parent.postMessage({
            type: "pdf-mouseleave"
        }, "*");

    }

});

window.addEventListener("mouseover", () => {

    cursor.style.opacity = "1";

    window.parent.postMessage({
        type: "pdf-mouseenter"
    }, "*");

});

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate(){

    currentX += (mouseX-currentX)*0.5;
    currentY += (mouseY-currentY)*0.5;

    cursor.style.left=currentX+"px";
    cursor.style.top=currentY+"px";

    requestAnimationFrame(animate);
}

animate();
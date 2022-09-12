export class Toast{
    static create(text, color){
        Toastify({
            text: text,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: color,
            },
        }).showToast();
    }
}
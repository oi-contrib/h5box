let libPath = import.meta.env.MODE == "development" ? window.location.origin + "/node_modules/pdfjs-dist" : "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305"

export let pdfjsLibPath = libPath
export let pdfjsWorkerSrc = pdfjsLibPath + "/build/pdf.worker.min.js"
'use strict'

// 万華鏡キャンバス
const cv = document.createElement("canvas")
cv.width = cv.height = 400
const ctx = cv.getContext("2d")
// 文字キャンバス
const tcv = document.createElement("canvas")
tcv.width = tcv.height = 400
const tctx = tcv.getContext("2d")
tctx.textBaseline = "middle"
tctx.textAlign = "center"


;(() => {
    document.getElementById('text').addEventListener('input', refresh)
    document.getElementById('ans').addEventListener('change', refresh)
    document.getElementById('half').addEventListener('change', refresh)

    const list = ['size', 'x', 'y', 'r', 'n']
    for (const name of list) {
        document.getElementById(name).addEventListener('input', rangeOnChange)
        updateDispValueById(name)
    }
})()

refresh()


function refresh() {
    const ans_on = document.getElementById('ans').checked
    const half_on = document.getElementById('half').checked

    // 文字生成
    const text = document.getElementById('text').value
    const sz = +document.getElementById('size').value
    const r = +document.getElementById('r').value

    tctx.font = "bold " + sz + "px sans-serif"
    tctx.resetTransform()
    tctx.clearRect(0, 0, tcv.width, tcv.height)
    tctx.translate(tcv.width/2, tcv.height/2)
    tctx.rotate(r * Math.PI / 180)
    tctx.fillStyle = '#333'
    tctx.fillText(text, 0, 0)

    // 万華鏡生成
    const x = +document.getElementById('x').value
    const y = +document.getElementById('y').value
    const n = +document.getElementById('n').value

    const ang = 360 / n
    const deg = ang * Math.PI / 180

    // リセット
    ctx.globalAlpha = 1
    ctx.resetTransform()
    ctx.clearRect(0, 0, cv.width, cv.height)
    
    ctx.translate(cv.width/2, cv.height/2)
    for (let i=0; i<n; i++) {
        ctx.rotate(deg)
        if (ans_on && i !== 0) {
            ctx.globalAlpha = Math.min(0.4, 2.5 / n)
        }
        ctx.drawImage(tcv, x-cv.width/2, y-cv.height/2)
    }

    if (half_on) convertHalfTone()
    cv2img()
}

function convertHalfTone() {
    // キャンバス全体のピクセル情報を取得
    const imageData = ctx.getImageData(0, 0, cv.width, cv.height)
    const width = imageData.width
    const height = imageData.height
    const pixels = imageData.data       // ピクセル配列：RGBA4要素で1ピクセル
    
    // ピクセル単位で操作
    const n = 2 // 1/n を除去
    for (let i=0; i < width * height; ++i) {
        const base = i * n * 4
        pixels[base + 0] = 0    // Red
        pixels[base + 1] = 0    // Green
        pixels[base + 2] = 0    // Blue
        pixels[base + 3] = 0    // Alpha
    }
    
    // 変更した内容をキャンバスに書き戻す
    ctx.putImageData(imageData, 0, 0);
}    

// inputイベント時に値をセットする関数
function rangeOnChange(e) {
    const t = document.getElementById("v-" + e.target.id)
    t.innerText = e.target.value;
    refresh()
}

function updateDispValueById(element_id) {
    const e = document.getElementById("v-" + element_id)
    e.innerText = document.getElementById(element_id).value
}

function cv2img() {
    document.getElementById("cv").src = cv.toDataURL("image/png")
}

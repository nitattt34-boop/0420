let capture;
let mode = "0"; // 預設 0: 看看我們捏出來的虛擬鏡頭長怎樣
let txt = "一二三四五田雷電龕龘";

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // 🌟 終極大絕招：不用 createCapture，我們用 createGraphics 創造一個「虛擬攝影機」！
    // 這樣就算電腦沒有實體鏡頭，你一樣有畫面可以順利交作業！
    capture = createGraphics(640, 480);
}

function draw() {
    background('#e7c6ff');
    
    // --- 🎬 這裡是虛擬攝影機裡面的畫面 (假裝是影片) ---
    capture.background(100, 150, 200); // 假裝是深藍色的背景
    capture.noStroke();
    // 畫一顆會跟著時間左右移動的粉紅色大球（假裝是你的臉）
    capture.fill(255, 200, 200);
    capture.ellipse(capture.width / 2 + sin(frameCount * 0.05) * 150, capture.height / 2, 250, 250);
    // 畫一個會跟著滑鼠移動的黃色方塊（假裝是你的手）
    capture.fill(255, 255, 100);
    capture.rect(mouseX % capture.width, mouseY % capture.height, 100, 100);
    // ------------------------------------------------

    // 讀取我們剛剛畫的假畫面的像素
    capture.loadPixels();
    
    let span = map(mouseX, 0, width, 10, 50);
    span = constrain(span, 10, 50);
    
    let targetW = width * 0.6;
    let targetH = height * 0.6;
    
    let scaleX = targetW / capture.width;
    let scaleY = targetH / capture.height;

    if (mode === "0") {
        // === 模式 0：顯示原始的虛擬攝影機畫面 ===
        imageMode(CENTER);
        push();
        translate(width / 2, height / 2);
        image(capture, 0, 0, targetW, targetH);
        pop();
        
    } else {
        // === 模式 1~5：像素操作特效 ===
        push();
        translate(width / 2, height / 2);
        scale(scaleX, scaleY); 
        translate(-capture.width / 2, -capture.height / 2);
        
        for(let x = 0; x < capture.width; x += span) {
            for(let y = 0; y < capture.height; y += span) {
                let index = (y * capture.width + x) * 4; 
                let r = capture.pixels[index];
                let g = capture.pixels[index + 1];
                let b = capture.pixels[index + 2];
                let bk = (r + g + b) / 3; 
                
                push();
                translate(x, y); 
                
                if (mode == "1") {
                    fill(r, g, b); noStroke(); rect(0, 0, span * 0.9);
                } else if (mode == "2") {
                    // 現在有畫面了，模式 2 絕對會有圓圈！
                    fill(bk); noStroke(); let s = map(bk, 0, 255, 0, span); ellipse(0, 0, s);
                } else if (mode == "3") {
                    fill(r, g, b); textSize(span); textAlign(LEFT, TOP); text("天", 0, 0);
                } else if (mode == "4") {
                    fill(r, g, b); textSize(span); textAlign(LEFT, TOP); let bkId = int(map(bk, 0, 255, 9, 0)); text(txt[bkId], 0, 0);
                } else if (mode == "5") {
                    fill(r, g, b); noStroke(); let s = map(r, 0, 255, 5, span); rect(0, 0, s, s);
                }
                pop();
            }
        }
        pop();
    }
    
    // --- 專屬作業標頭浮水印 ---
    push();
    fill(40); 
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("教育科技學系 - 陳君慈 (414730688)", 15, 15);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4' || key === '5') {
        mode = key;
    }
}